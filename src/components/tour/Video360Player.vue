<template>
  <ClientOnly>
    <div class="relative w-full h-full bg-black">
      <video
        ref="videoElement"
        class="video-js vjs-default-skin vjs-big-play-centered"
        crossorigin="anonymous"
        playsinline
      >
        <source :src="src" type="video/mp4">
      </video>
    </div>
    <template #fallback>
      <div class="flex items-center justify-center w-full h-full bg-black text-white">
        <p>Loading 360° player...</p>
      </div>
    </template>
  </ClientOnly>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue';

const props = defineProps<{
  src: string;
}>();

const emit = defineEmits<{
  (e: 'timeupdate', time: number): void;
  (e: 'ready'): void;
}>();

const videoElement = ref<HTMLVideoElement | null>(null);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let player: any = null;

const initPlayer = async () => {
  if (!videoElement.value) {
    console.error('Video element not found');
    return;
  }

  try {
    console.log('Initializing video player...');
    
    // Dynamically import video.js and plugins
    const [videojsModule] = await Promise.all([
      import('video.js'),
      import('video.js/dist/video-js.css'),
      import('videojs-vr/dist/videojs-vr.css'),
      // @ts-expect-error - videojs-vr doesn't have type definitions
      import('videojs-vr')
    ]);

    const videojs = videojsModule.default;
    
    console.log('Video.js loaded, creating player...');

    // Initialize video.js player
    player = videojs(videoElement.value, {
      controls: false,
      autoplay: true,
      muted: false,
      preload: 'auto',
      fluid: true,
      responsive: true,
      aspectRatio: '16:9',
    });

    console.log('Player created:', player);

    // Wait for player to be ready
    player.ready(() => {
      console.log('Player ready, initializing VR...');
      
      // Initialize VR plugin
      if (player && typeof player.vr === 'function') {
        player.vr({
          projection: '360',
          debug: true,
          forceCardboard: false,
        });
        console.log('VR plugin initialized');
      } else {
        console.error('VR plugin not available');
      }

      // Try to play
      setTimeout(() => {
        const playPromise = player.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log('Autoplay started successfully');
            })
            .catch((error: Error) => {
              console.warn('Autoplay prevented:', error);
            });
        }
      }, 100);

      emit('ready');
    });

    // Listen to timeupdate
    player.on('timeupdate', () => {
      emit('timeupdate', player.currentTime());
    });

    // Error handling
    player.on('error', (error: any) => {
      console.error('Video.js error:', error, player.error());
    });

  } catch (error) {
    console.error('Failed to initialize player:', error);
  }
};

onMounted(async () => {
  if (typeof window === 'undefined') return;
  
  // Wait for next tick to ensure DOM is ready
  await nextTick();
  
  // Small delay to ensure ClientOnly has rendered
  setTimeout(() => {
    initPlayer();
  }, 100);
});

onBeforeUnmount(() => {
  if (player) {
    try {
      player.dispose();
    } catch (error) {
      console.error('Error disposing player:', error);
    }
    player = null;
  }
});

watch(() => props.src, async (newSrc) => {
  if (player && newSrc) {
    console.log('Source changed to:', newSrc);
    player.src({ src: newSrc, type: 'video/mp4' });
    await player.load();
    
    setTimeout(() => {
      const playPromise = player.play();
      if (playPromise !== undefined) {
        playPromise.catch((error: Error) => {
          console.warn('Autoplay prevented after source change:', error);
        });
      }
    }, 100);
  }
});
</script>

<style scoped>
.video-js {
  width: 100% !important;
  height: 100% !important;
}

:deep(.vjs-control-bar) {
  display: flex !important;
}

:deep(.vjs-big-play-button) {
  display: block !important;
}
</style>
