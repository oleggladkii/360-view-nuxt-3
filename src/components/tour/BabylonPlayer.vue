<template>
  <div class="h-full w-full">
    <canvas ref="canvasRef"></canvas>
    <button
      class="play-pause-btn"
      @click="togglePlayPause"
      :aria-label="isPlaying ? 'Pause' : 'Play'"
    >
      <svg
        v-if="isPlaying"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <rect x="6" y="4" width="4" height="16" />
        <rect x="14" y="4" width="4" height="16" />
      </svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M8 5v14l11-7z" />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import * as BABYLON from 'babylonjs'
import { usePlayerStore } from '@/stores/player'

const props = defineProps<{
  src: string
}>()

const canvasRef = ref<HTMLCanvasElement | null>(null)
const currentTime = ref<number | null>(null)
const isPlaying = ref<boolean>(false)
const playerStore = usePlayerStore()
let engine: BABYLON.Engine | null = null
let scene: BABYLON.Scene | null = null
let camera: BABYLON.UniversalCamera | null = null
let dome: BABYLON.VideoDome | null = null
let resizeHandler: (() => void) | null = null

const createScene = (): BABYLON.Scene => {
  if (!engine || !canvasRef.value) {
    throw new Error('Engine or canvas not initialized')
  }

  const s = new BABYLON.Scene(engine)

  camera = new BABYLON.UniversalCamera('Camera', BABYLON.Vector3.Zero(), s)
  camera.attachControl(canvasRef.value, true)
  camera.angularSensibility = 2000

  // Create VideoDome with prop src
  dome = new BABYLON.VideoDome(
    'videoDome',
    [props.src],
    {
      clickToPlay: true,
      resolution: 512,
      size: 256,
      generateMipMaps: false,
      halfDomeMode: false,
      useDirectMapping: false,
    },
    s,
  )
  dome.videoMode = BABYLON.VideoDome.MODE_TOPBOTTOM

  const applyDomeSettings = () => {
    if (!dome) return

    dome.textureMode = BABYLON.VideoDome.MODE_MONOSCOPIC
    dome.fovMultiplier = 2.0

    dome.videoMode = BABYLON.VideoDome.MODE_MONOSCOPIC

    if (dome.mesh && dome.mesh.material) {
      const material = dome.mesh.material as BABYLON.Material & {
        _markAllSubMeshesAsMiscDirty?: () => void
      }
      material._markAllSubMeshesAsMiscDirty?.()
    }
  }

  applyDomeSettings()

  requestAnimationFrame(() => {
    applyDomeSettings()
  })

  if (dome.videoTexture?.video) {
    const updateSettings = () => {
      applyDomeSettings()
    }
    const setupVideoListeners = () => {
      if (dome?.videoTexture?.video) {
        const video = dome.videoTexture.video
        video.addEventListener('play', () => {
          isPlaying.value = true
          playerStore.setIsPlaying(true)
        })
        video.addEventListener('pause', () => {
          isPlaying.value = false
          playerStore.setIsPlaying(false)
        })
        video.addEventListener('ended', () => {
          isPlaying.value = false
          playerStore.setIsPlaying(false)
        })
        isPlaying.value = !video.paused
        playerStore.setIsPlaying(!video.paused)
      }
    }

    dome.videoTexture.video.addEventListener('loadedmetadata', updateSettings)
    dome.videoTexture.video.addEventListener('canplay', () => {
      updateSettings()
      setupVideoListeners()
    })
    if (dome.videoTexture.video.readyState >= 2) {
      updateSettings()
      setupVideoListeners()
    }
  }

  return s
}

onMounted(() => {
  const canvas = canvasRef.value as HTMLCanvasElement
  engine = new BABYLON.Engine(canvas, true)
  scene = createScene()

  engine.runRenderLoop(() => {
    scene?.render()
    if (dome?.videoTexture?.video) {
      currentTime.value = dome.videoTexture.video.currentTime
      playerStore.setCurrentTime(currentTime.value)
    }
    if (camera) {
      const rotation = camera.rotation
      playerStore.setCameraRotation({
        yaw: rotation.y,
        pitch: rotation.x,
        roll: rotation.z,
      })
    }
  })

  resizeHandler = () => engine?.resize()
  window.addEventListener('resize', resizeHandler)
})

// Watch for src changes
watch(() => props.src, (newSrc) => {
  if (dome && dome.videoTexture) {
    // Babylon VideoDome doesn't have a simple setSrc, might need to recreate or update texture
    // For simplicity in this iteration, we might need to dispose and recreate if src changes dynamically
    // But VideoDome is complex. Let's try updating the video element directly if accessible
    // or just assume full reload for now as it's safer.
    // However, the provided example didn't handle src change.
    // Let's try to update the video source.
    const video = dome.videoTexture.video;
    if (video) {
        video.src = newSrc;
        video.load();
        video.play().catch(() => {});
    }
  }
})

onBeforeUnmount(() => {
  if (resizeHandler) {
    window.removeEventListener('resize', resizeHandler)
    resizeHandler = null
  }
  engine?.dispose()
  engine = null
  scene = null
  camera = null
  dome = null
})

const togglePlayPause = () => {
  if (!dome?.videoTexture?.video) return

  const video = dome.videoTexture.video
  if (video.paused) {
    video.play()
  } else {
    video.pause()
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%; /* Changed from 100vh to 100% to fit parent */
  display: flex;
  position: relative;
}

canvas {
  width: 100%;
  height: 100%;
  outline: none;
}

.play-pause-btn {
  position: absolute;
  bottom: 24px; /* Moved to bottom left/center or keep top right? User example had top right. Let's keep top right but maybe adjust */
  left: 50%;
  transform: translateX(-50%);
  /* Let's stick to user example position */
  top: auto;
  right: auto;
  bottom: 30px;
  
  width: 50px;
  height: 50px;
  background: rgba(0, 0, 0, 0.7);
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  transition:
    background-color 0.2s ease,
    transform 0.1s ease;
}

/* User example had it at top right: top: 16px; right: 16px; */
/* I will revert to user example positioning to be safe */
.play-pause-btn {
  top: 16px;
  right: 16px;
  bottom: auto;
  left: auto;
  transform: none;
}

.play-pause-btn:hover {
  background: rgba(0, 0, 0, 0.9);
  transform: scale(1.05);
}

.play-pause-btn:active {
  transform: scale(0.95);
}

.play-pause-btn svg {
  width: 24px;
  height: 24px;
}
</style>
