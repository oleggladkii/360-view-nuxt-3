<template>
  <div
    class="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ring-1 ring-gray-900/5"
  >
    <!-- Image Container -->
    <div class="relative aspect-[4/3] overflow-hidden bg-gray-100">
      <img
        :src="tour.preview_url || 'https://placehold.co/600x400?text=No+Preview'"
        :alt="tour.name"
        class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
      
      <!-- Badges Overlay -->
      <div class="absolute top-3 left-3 flex flex-col gap-2">
        <span 
          class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium backdrop-blur-md"
          :class="tour.time_of_day === 'night' ? 'bg-indigo-900/80 text-indigo-100' : 'bg-amber-100/80 text-amber-800'"
        >
          {{ tour.time_of_day === 'night' ? '🌙 Night' : '☀️ Day' }}
        </span>
      </div>

      <!-- Views Badge -->
      <div class="absolute bottom-3 right-3">
        <span class="inline-flex items-center gap-1 rounded-full bg-black/50 px-2.5 py-0.5 text-xs font-medium text-white backdrop-blur-md">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-3.5 h-3.5">
            <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
            <path fill-rule="evenodd" d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 8.201 2.372 9.336 6.41.175.624.175 1.283 0 1.907C18.201 15.322 14.257 17.694 10 17.694 5.743 17.694 1.799 15.322.664 11.284zM10 15.833c2.857 0 5.698-1.405 7.381-3.938C15.698 9.308 12.857 7.903 10 7.903c-2.857 0-5.698 1.405-7.381 3.992C4.302 14.428 7.143 15.833 10 15.833z" clip-rule="evenodd" />
          </svg>
          {{ tour.views_count }}
        </span>
      </div>
    </div>

    <!-- Content -->
    <div class="flex flex-1 flex-col p-5">
      <div class="flex items-center justify-between gap-2 text-xs text-gray-500 mb-2">
        <span class="flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-3.5 h-3.5">
            <path fill-rule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.62.829.799 1.654 1.381 2.274 1.766.311.192.571.337.757.433.093.048.187.095.281.14l.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clip-rule="evenodd" />
          </svg>
          {{ tour.city }}, {{ tour.country }}
        </span>
        <time :datetime="tour.tour_date">{{ formatDate(tour.tour_date) }}</time>
      </div>

      <h3 class="text-lg font-bold text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
        {{ tour.name }}
      </h3>
      
      <div class="mt-2 text-sm text-gray-600 line-clamp-2 flex-1" v-html="tour.description"></div>

      <div class="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
        <NuxtLink
          :to="`/tours/${tour.id}`"
          class="text-sm font-semibold text-blue-600 hover:text-blue-500 flex items-center gap-1"
        >
          View Tour
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4 transition-transform group-hover:translate-x-0.5">
            <path fill-rule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clip-rule="evenodd" />
          </svg>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Tour } from '~/interfaces/Tour';

const props = defineProps<{
  tour: Tour;
}>();

const formatDate = (dateString: string) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};
</script>
