<template>
  <div id="map" class="h-full w-full rounded-full overflow-hidden border-4 border-white shadow-2xl"></div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, watch, ref } from 'vue';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const props = defineProps<{
  gpxUrl?: string;
  currentTime: number;
}>();

let map: L.Map | null = null;
let marker: L.Marker | null = null;
let polyline: L.Polyline | null = null;
let gpxPoints: { lat: number; lon: number; time?: Date }[] = [];

// Fix for default marker icon in Nuxt/Leaflet
const fixMarkerIcon = () => {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  });
};

const parseGpx = async (url: string) => {
  try {
    const response = await fetch(url);
    const str = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(str, "text/xml");
    const trkpts = doc.querySelectorAll('trkpt');
    
    const points: { lat: number; lon: number; time?: Date }[] = [];
    trkpts.forEach(pt => {
      const lat = parseFloat(pt.getAttribute('lat') || '0');
      const lon = parseFloat(pt.getAttribute('lon') || '0');
      const timeEle = pt.querySelector('time');
      const time = timeEle ? new Date(timeEle.textContent || '') : undefined;
      points.push({ lat, lon, time });
    });
    return points;
  } catch (e) {
    console.error("Error parsing GPX:", e);
    return [];
  }
};

onMounted(async () => {
  if (typeof window === 'undefined') return;
  
  fixMarkerIcon();

  map = L.map('map', {
    zoomControl: false,
    attributionControl: false,
    dragging: false, // GTA style: map moves, not user dragging
    scrollWheelZoom: false,
    doubleClickZoom: false,
    boxZoom: false,
    keyboard: false
  }).setView([51.505, -0.09], 16);

  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    maxZoom: 19,
  }).addTo(map);

  if (props.gpxUrl) {
    gpxPoints = await parseGpx(props.gpxUrl);
    if (gpxPoints.length > 0) {
      const latlngs = gpxPoints.map(p => [p.lat, p.lon] as [number, number]);
      polyline = L.polyline(latlngs, { color: '#3b82f6', weight: 4 }).addTo(map);
      
      // Set initial position
      const start = gpxPoints[0];
      marker = L.marker([start.lat, start.lon]).addTo(map);
      map.setView([start.lat, start.lon], 16);
    }
  }
});

watch(() => props.currentTime, (newTime) => {
  if (!map || !marker || gpxPoints.length === 0) return;

  // Simple synchronization logic:
  // Assuming video duration matches GPX duration roughly, or we map based on index.
  // A better approach requires knowing the video start time and GPX timestamps.
  // For this demo, let's assume the video covers the whole GPX track linearly or we map percentage.
  // Since we don't have total duration passed here easily without more props, 
  // let's try to map based on a rough estimate or just move the marker along the path if we had duration.
  
  // IMPROVEMENT: We really need total duration to map percentage.
  // For now, let's assume 1 second = 1 point (very naive) or just show the first point.
  // REALISTIC IMPLEMENTATION: We need to find the point in GPX closest to (StartTime + newTime).
  
  // Let's assume the GPX has timestamps.
  if (gpxPoints[0].time) {
    const startTime = gpxPoints[0].time.getTime();
    const targetTime = startTime + (newTime * 1000);
    
    // Find point closest to targetTime
    const closest = gpxPoints.reduce((prev, curr) => {
      if (!prev.time || !curr.time) return prev;
      return (Math.abs(curr.time.getTime() - targetTime) < Math.abs(prev.time.getTime() - targetTime) ? curr : prev);
    });

    if (closest) {
      marker.setLatLng([closest.lat, closest.lon]);
      map.panTo([closest.lat, closest.lon], { animate: true });
    }
  } else {
    // Fallback: Map percentage if we knew total duration. 
    // Without it, we can't sync accurately.
    // Let's just stay at start for now if no time data.
  }
});

onBeforeUnmount(() => {
  if (map) {
    map.remove();
  }
});
</script>

<style scoped>
#map {
  /* GTA Style circular map */
  border-radius: 9999px;
  border: 4px solid rgba(255, 255, 255, 0.8);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5);
}
</style>
