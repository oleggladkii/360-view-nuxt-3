<template>
  <div ref="mapContainer" class="mini-map"></div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { usePlayerStore } from '@/stores/player'

const mapContainer = ref<HTMLDivElement | null>(null)
const playerStore = usePlayerStore()
let map: L.Map | null = null
let marker: L.Marker | null = null

interface RouteSegment {
  from: [number, number]
  to: [number, number]
  duration: number
}

const route: RouteSegment[] = [
  {
    from: [40.714926, -74.007938],
    to: [40.716003, -74.007079],
    duration: 10,
  },
  {
    from: [40.716003, -74.007079],
    to: [40.715235, -74.005422],
    duration: 10,
  },
  {
    from: [40.715235, -74.005422],
    to: [40.714169, -74.006312],
    duration: 10,
  },
  {
    from: [40.714169, -74.006312],
    to: [40.714926, -74.007938],
    duration: 10,
  },
]

const totalRouteDuration = route.reduce((sum, seg) => sum + seg.duration, 0)

const getCoordinatesFromTimestamp = (timestamp: number): [number, number] => {
  const normalizedTimestamp = timestamp % totalRouteDuration

  let accumulatedTime = 0
  let segmentIndex = 0

  for (let i = 0; i < route.length; i++) {
    const segment = route[i]
    if (segment && normalizedTimestamp <= accumulatedTime + segment.duration) {
      segmentIndex = i
      break
    }
    if (segment) {
      accumulatedTime += segment.duration
    }
  }

  const segment = route[segmentIndex]
  if (!segment) {
    return route[0]?.from || [40.758, -73.9855]
  }

  const timeInSegment = normalizedTimestamp - accumulatedTime
  const progress = Math.min(timeInSegment / segment.duration, 1)

  const lat = segment.from[0] + (segment.to[0] - segment.from[0]) * progress
  const lng = segment.from[1] + (segment.to[1] - segment.from[1]) * progress

  return [lat, lng]
}

onMounted(() => {
  if (!mapContainer.value) return

  const startPoint = route[0]?.from || [40.758, -73.9855]
  map = L.map(mapContainer.value, {
    center: startPoint,
    zoom: 15,
    zoomControl: false,
    attributionControl: false,
  })

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors',
  }).addTo(map)

  const initialCoords = getCoordinatesFromTimestamp(0)

  const customIcon = L.icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  })

  marker = L.marker(initialCoords, { icon: customIcon }).addTo(map)

  map.setView(initialCoords, 15)
})

watch(
  () => playerStore.currentTime,
  (newTime) => {
    if (newTime !== null && marker && map) {
      const coords = getCoordinatesFromTimestamp(newTime)
      marker.setLatLng(coords)
      map.setView(coords, map.getZoom(), {
        animate: true,
        duration: 0.5,
      })
    }
  },
)

onBeforeUnmount(() => {
  if (map) {
    map.remove()
    map = null
  }
  marker = null
})
</script>

<style scoped>
.mini-map {
  position: fixed;
  left: 8px;
  bottom: 8px;
  width: 260px;
  height: 260px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid rgba(255, 255, 255, 0.9);
  z-index: 100;
  opacity: 0.7;
  transition: all 0.4s ease-in-out;
}
.mini-map:hover {
  opacity: 1;
  border-radius: 8px;
  width: 300px;
  height: 300px;
}

:deep(.leaflet-container) {
  background: transparent;
}
</style>
