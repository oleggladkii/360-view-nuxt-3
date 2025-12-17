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

            <!-- Share Section -->
            <div class="flex items-center justify-between rounded-2xl bg-indigo-50 p-6 opacity-0 translate-y-4" ref="shareSection">
              <div>
                <h3 class="text-lg font-bold text-gray-900">Share This Tour</h3>
              </div>
              <button 
                @click="shareTour"
                class="group relative flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition-all hover:bg-indigo-600 hover:text-white hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span>Copy Link</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5 transition-transform group-hover:scale-110">
                  <path fill-rule="evenodd" d="M15.75 4.5a3 3 0 11.825 2.066l-8.421 4.679a3.002 3.002 0 010 1.51l8.421 4.679a3 3 0 11-.729 1.31l-8.421-4.678a3 3 0 110-4.132l8.421-4.679a3 3 0 01-.096-.755z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>

            <div ref="creatorCard" class="flex items-center gap-4 p-6 bg-gray-50 rounded-2xl opacity-0 translate-y-4">
              <div v-if="tour.user?.avatar_url" class="h-12 w-12 rounded-full overflow-hidden">
                <img :src="getProxiedImageUrl(tour.user.avatar_url) || undefined" :alt="tour.user.full_name || 'Creator'" class="h-full w-full object-cover" />
              </div>
              <div v-else class="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                  <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clip-rule="evenodd" />
                </svg>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-900">Created by</p>
                <p class="text-base text-gray-600">{{ tour.user?.full_name || 'Unknown User' }}</p>
              </div>
            </div>
          </div>

          <!-- Sidebar Stats -->
          <div ref="sidebar" class="space-y-6 opacity-0 translate-y-4">
            <div 
              class="group relative overflow-hidden rounded-3xl bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-gray-100 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:ring-gray-200"
            >
              <!-- Decorative background splash -->
              <div class="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-indigo-50 to-purple-50 blur-2xl transition-all duration-500 group-hover:scale-150" />
              
              <div class="relative z-10">
                <div class="mb-8">
                  <h3 class="text-xl font-bold text-gray-900">Tour Details</h3>
                </div>

                <div class="space-y-4">
                  <!-- Date -->
                  <div class="detail-item flex items-center gap-3 opacity-0 translate-x-4">
                    <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600 transition-transform duration-300 group-hover:scale-110">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5">
                        <path d="M12.75 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM7.5 15.75a.75.75 0 100-1.5 .75.75 0 000 1.5zM8.25 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM9.75 15.75a.75.75 0 100-1.5 .75.75 0 000 1.5zM10.5 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12 15.75a.75.75 0 100-1.5 .75.75 0 000 1.5zM12.75 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM14.25 15.75a.75.75 0 100-1.5 .75.75 0 000 1.5zM15 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 15.75a.75.75 0 100-1.5 .75.75 0 000 1.5zM15 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 13.5a.75.75 0 100-1.5 .75.75 0 000 1.5z" />
                        <path fill-rule="evenodd" d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z" clip-rule="evenodd" />
                      </svg>
                    </div>
                    <div class="text-sm font-medium text-gray-700">
                      {{ tour.tour_date ? new Date(tour.tour_date).toLocaleDateString(undefined, { dateStyle: 'long' }) : 'N/A' }}
                    </div>
                  </div>
                  
                  <!-- Views -->
                  <div class="detail-item flex items-center gap-3 opacity-0 translate-x-4">
                    <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-transform duration-300 group-hover:scale-110">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5">
                        <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                        <path fill-rule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clip-rule="evenodd" />
                      </svg>
                    </div>
                    <div class="text-sm font-medium text-gray-700">
                      {{ tour.views_count ? tour.views_count.toLocaleString() : 0 }} views
                    </div>
                  </div>

                  <!-- Location -->
                  <div class="detail-item flex items-center gap-3 opacity-0 translate-x-4">
                    <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition-transform duration-300 group-hover:scale-110">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5">
                        <path fill-rule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
                      </svg>
                    </div>
                    <div class="text-sm font-medium text-gray-700">
                      {{ tour.city }}, {{ tour.country }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <ClientOnly>
              <div v-if="isCurrentUser" class="flex flex-col gap-3">
                <NuxtLink
                  :to="`/tours/${tour.id}/edit`"
                  class="flex w-full items-center justify-center rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-bold text-gray-700 shadow-sm transition-all hover:bg-gray-50 hover:shadow-md hover:-translate-y-0.5"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="mr-2 h-4 w-4">
                    <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
                    <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
                  </svg>
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
const { getProxiedImageUrl } = useImageProxy();

// Refs for animations
const heroImage = ref<HTMLElement | null>(null);
const badge = ref<HTMLElement | null>(null);
const title = ref<HTMLElement | null>(null);
const location = ref<HTMLElement | null>(null);
const cta = ref<HTMLElement | null>(null);
const aboutTitle = ref<HTMLElement | null>(null);
const aboutDesc = ref<HTMLElement | null>(null);
const creatorCard = ref<HTMLElement | null>(null);
const shareSection = ref<HTMLElement | null>(null);
const sidebar = ref<HTMLElement | null>(null);

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
  if (shareSection.value) contentTl.to(shareSection.value, { opacity: 1, y: 0 }, "-=0.4");
  if (sidebar.value) {
    contentTl.to(sidebar.value, { opacity: 1, y: 0 }, "-=0.4");
    
    // Animate detail items staggering in
    const items = sidebar.value.querySelectorAll('.detail-item');
    if (items.length) {
      contentTl.to(items, {
        opacity: 1,
        x: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: "back.out(1.5)"
      }, "-=0.3");
    }
  }
});

const shareTour = () => {
  if (import.meta.client) {
    const url = window.location.href;
    navigator.clipboard.writeText(url)
      .then(() => {
        toast.success({ message: "Link copied to clipboard! 📋" });
      })
      .catch((err) => {
        console.error('Could not copy text: ', err);
        toast.error({ message: "Failed to copy link" });
      });
  }
};

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
  const isAdminOrSuperAdmin = auth.userRole === 'admin' || auth.userRole === 'superadmin';
  return isAdminOrSuperAdmin || auth.user?.id === tour.value?.user_id;
});
</script>
