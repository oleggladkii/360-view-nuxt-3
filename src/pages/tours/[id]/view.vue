<template>
  <div class="relative h-screen w-screen overflow-hidden bg-black">
    <ClientOnly>
      <div v-if="tour" class="h-full w-full">
        <!-- 360 Video Player -->
        <Video360Player
          v-if="tour.video_url"
          :src="tour.video_url"
          @timeupdate="onTimeUpdate"
          @ready="onPlayerReady"
        />
        <div v-else class="flex h-full items-center justify-center text-white">
          <p>No 360° video available for this tour.</p>
        </div>

        <!-- UI Overlay -->
        <div class="absolute inset-0 pointer-events-none">
          <!-- Top Bar -->
          <div class="absolute top-0 left-0 right-0 p-6 flex justify-between items-start bg-gradient-to-b from-black/60 to-transparent pointer-events-auto">
            <NuxtLink
              :to="`/tours/${tour.id}`"
              class="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md hover:bg-white/20 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                <path fill-rule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clip-rule="evenodd" />
              </svg>
              Exit Tour
            </NuxtLink>

            <div class="text-right">
              <h1 class="text-xl font-bold text-white drop-shadow-md">{{ tour.name }}</h1>
              <p class="text-sm text-gray-200 drop-shadow-sm">{{ tour.city }}</p>
            </div>
          </div>

          <!-- Bottom Left: Mini Map (GTA Style) -->
          <div class="absolute bottom-8 left-8 h-48 w-48 pointer-events-auto transition-transform hover:scale-105">
            <MiniMap
              v-if="tour.gpx_path"
              :gpx-url="tour.gpx_path"
              :current-time="currentTime"
            />
            <div v-else class="h-full w-full rounded-full bg-gray-900/80 border-4 border-white/50 flex items-center justify-center backdrop-blur-sm">
              <span class="text-xs text-gray-400">No GPS Data</span>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="flex h-full items-center justify-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Tour } from '~/interfaces/Tour';
import Video360Player from '~/components/tour/Video360Player.vue';
import MiniMap from '~/components/tour/MiniMap.vue';

const route = useRoute();
const toast = useToast();

useHead({
  title: "360° Tour View",
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' }
  ]
});

const tourId = computed(() => route.params.id as string);
const currentTime = ref(0);

const { data: tour, error } = await useFetch<Tour>(`/api/tours/${tourId.value}/view`, {
  headers: useRequestHeaders(["cookie"]),
});

if (error.value) {
  console.error("Failed to load tour:", error.value);
  if (import.meta.client) {
    toast.error({ message: "Failed to load tour." });
  }
  await navigateTo("/tours");
}

const onTimeUpdate = (time: number) => {
  currentTime.value = time;
};

const onPlayerReady = () => {
  console.log("Player ready");
};
</script>
