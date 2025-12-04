<template>
  <div class="min-h-screen bg-white pt-[64px]">
    <div v-if="tour" class="relative">
      <!-- Hero Section -->
      <div class="relative h-[70vh] w-full overflow-hidden">
        <div class="absolute inset-0 bg-gray-900/60 z-10" />
        <img
          :src="tour.preview_url || 'https://placehold.co/1920x1080?text=No+Preview'"
          :alt="tour.name"
          class="absolute -top-[25%] h-[150%] w-full object-cover will-change-transform"
          ref="heroImage"
        />
        
        <div class="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
          <span 
            class="mb-4 inline-flex items-center rounded-full px-3 py-1 text-sm font-medium backdrop-blur-md opacity-0 translate-y-4"
            ref="badge"
            :class="tour.time_of_day === 'night' ? 'bg-indigo-900/80 text-indigo-100' : 'bg-amber-100/80 text-amber-800'"
          >
            {{ tour.time_of_day === 'night' ? '🌙 Night Tour' : '☀️ Day Tour' }}
          </span>
          
          <h1 
            class="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl drop-shadow-lg opacity-0 translate-y-8"
            ref="title"
          >
            {{ tour.name }}
          </h1>
          
          <div 
            class="mt-4 flex items-center gap-2 text-gray-200 drop-shadow-md opacity-0 translate-y-6"
            ref="location"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
              <path fill-rule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.62.829.799 1.654 1.381 2.274 1.766.311.192.571.337.757.433.093.048.187.095.281.14l.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clip-rule="evenodd" />
            </svg>
            <span class="text-lg">{{ tour.city }}, {{ tour.country }}</span>
          </div>

          <div 
            class="mt-10 opacity-0 scale-90"
            ref="cta"
          >
            <NuxtLink
              :to="`/tours/${tour.id}/view`"
              class="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-white px-8 py-4 text-lg font-bold text-gray-900 transition-all hover:bg-gray-50 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              <span class="relative z-10">Start 360° Tour</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 relative z-10 transition-transform group-hover:translate-x-1">
                <path fill-rule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clip-rule="evenodd" />
              </svg>
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Details Section -->
      <div class="mx-auto max-w-4xl px-6 py-16">
        <div class="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <!-- Main Content -->
          <div class="lg:col-span-2 space-y-8">
            <div>
              <h2 ref="aboutTitle" class="text-2xl font-bold text-gray-900 opacity-0 translate-y-4">About this tour</h2>
              <div ref="aboutDesc" class="mt-4 text-lg leading-relaxed text-gray-600 opacity-0 translate-y-4" v-html="tour.description || 'No description provided for this tour.'" />
            </div>

            <div ref="creatorCard" class="flex items-center gap-4 p-6 bg-gray-50 rounded-2xl opacity-0 translate-y-4">
              <div class="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                  <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clip-rule="evenodd" />
                </svg>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-900">Created by</p>
                <p class="text-base text-gray-600">Tour Creator</p>
              </div>
            </div>
          </div>

          <!-- Sidebar Stats -->
          <div ref="sidebar" class="space-y-6 opacity-0 translate-y-4">
            <div class="rounded-2xl bg-gray-50 p-6">
              <h3 class="font-semibold text-gray-900 mb-4">Tour Details</h3>
              <dl class="space-y-4">
                <div class="flex justify-between">
                  <dt class="text-gray-500">Date</dt>
                  <dd class="font-medium text-gray-900">{{ tour.tour_date ? new Date(tour.tour_date).toLocaleDateString() : 'N/A' }}</dd>
                </div>
                <div class="flex justify-between">
                  <dt class="text-gray-500">Views</dt>
                  <dd class="font-medium text-gray-900">{{ tour.views_count || 0 }}</dd>
                </div>
              </dl>
            </div>

            <ClientOnly>
              <div v-if="isCurrentUser" class="flex flex-col gap-3">
                <NuxtLink
                  :to="`/tours/${tour.id}/edit`"
                  class="flex w-full items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50"
                >
                  Edit Tour
                </NuxtLink>
              </div>
            </ClientOnly>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="flex min-h-screen items-center justify-center">
      <div class="text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4" />
        <p class="text-gray-500">Loading tour...</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Tour } from "~/interfaces/Tour";
import gsap from 'gsap';
import { useWindowScroll } from '@vueuse/core';

const { y } = useWindowScroll();

// Refs for animations
const heroImage = ref(null);
const badge = ref(null);
const title = ref(null);
const location = ref(null);
const cta = ref(null);
const aboutTitle = ref(null);
const aboutDesc = ref(null);
const creatorCard = ref(null);
const sidebar = ref(null);

// Parallax effect
watch(y, (newY) => {
  if (heroImage.value) {
    gsap.to(heroImage.value, {
      y: newY * 0.25,
      duration: 0.1,
      ease: "none",
      overwrite: "auto"
    });
  }
});

onMounted(() => {
  // Hero animations
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
  
  if (badge.value) tl.to(badge.value, { opacity: 1, y: 0, duration: 0.8 });
  if (title.value) tl.to(title.value, { opacity: 1, y: 0, duration: 0.8 }, "-=0.6");
  if (location.value) tl.to(location.value, { opacity: 1, y: 0, duration: 0.8 }, "-=0.6");
  if (cta.value) tl.to(cta.value, { opacity: 1, scale: 1, duration: 0.8 }, "-=0.6");

  // Content animations
  const contentTl = gsap.timeline({ 
    defaults: { ease: "power2.out", duration: 0.6 },
    delay: 0.5 
  });

  if (aboutTitle.value) contentTl.to(aboutTitle.value, { opacity: 1, y: 0 });
  if (aboutDesc.value) contentTl.to(aboutDesc.value, { opacity: 1, y: 0 }, "-=0.4");
  if (creatorCard.value) contentTl.to(creatorCard.value, { opacity: 1, y: 0 }, "-=0.4");
  if (sidebar.value) contentTl.to(sidebar.value, { opacity: 1, y: 0 }, "-=0.4");
});

const route = useRoute();
const toast = useToast();
const auth = useAuthStore();

useHead({
  title: "Tour Details",
});

const tourId = computed(() => route.params.id as string);

const { data: tour, error } = await useFetch<Tour>(`/api/tours/${tourId.value}/view`, {
  headers: useRequestHeaders(["cookie"]),
});

if (error.value) {
  console.error("Failed to load tour:", error.value);
  if (import.meta.client) {
    toast.error({ message: "Failed to load tour. Please try again." });
  }
  await navigateTo("/tours");
}

const isCurrentUser = computed(() => {
  return auth.user?.id === tour.value?.user_id;
});
</script>
