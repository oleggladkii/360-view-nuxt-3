<template>
  <div class="relative h-screen w-screen overflow-hidden bg-black">
    <ClientOnly>
      <div v-if="tour" class="h-full w-full">
        <BabylonPlayer
          v-if="tour.video_url"
          :src="tour.video_url"
        />
        <div v-else class="flex h-full items-center justify-center text-white">
          <p>No 360° video available for this tour.</p>
        </div>

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
        </div>
        <MiniMap
          :gpx-data="tour.gpx_text"
        />
      </div>

      <div v-else class="flex h-full items-center justify-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Tour } from '~/interfaces/Tour';
import BabylonPlayer from '~/components/tour/BabylonPlayer.vue';
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
</script>
