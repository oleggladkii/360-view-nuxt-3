<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header Section -->
    <section class="relative overflow-hidden bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50">
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute top-0 right-0 h-96 w-96 bg-blue-200 rounded-full opacity-30 blur-3xl" style="transform: translate(25%, -25%);"/>
        <div class="absolute bottom-0 left-0 h-80 w-80 bg-purple-200 rounded-full opacity-30 blur-3xl" style="transform: translate(-25%, 25%);"/>
      </div>

      <div class="relative mx-auto max-w-7xl px-6 py-24 lg:py-32">
        <div class="max-w-3xl">
          <h1 class="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Explore Virtual Tours
          </h1>
          <p class="mt-6 text-xl text-gray-600">
            Discover cities from a whole new perspective through immersive 360° virtual tours.
          </p>
        </div>
      </div>
    </section>

    <!-- Filters & Grid Section -->
    <section class="mx-auto max-w-7xl px-6 py-12">
      <!-- Controls -->
      <div class="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <!-- Search -->
        <div class="relative max-w-md flex-1">
          <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clip-rule="evenodd" />
            </svg>
          </div>
          <input
            v-model="searchQuery"
            type="text"
            class="block w-full rounded-full border-0 py-2.5 pl-10 pr-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 transition-shadow"
            placeholder="Search tours, cities, countries..."
          />
        </div>

        <!-- Filter Toggles -->
        <div class="flex items-center gap-2 rounded-lg bg-white p-1 shadow-sm ring-1 ring-gray-200">
          <button
            v-for="option in filterOptions"
            :key="option.value"
            @click="activeFilter = option.value"
            class="relative rounded-md px-4 py-2 text-sm font-medium transition-all duration-200"
            :class="[
              activeFilter === option.value
                ? 'bg-blue-50 text-blue-700 shadow-sm'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            ]"
          >
            {{ option.label }}
          </button>
        </div>
      </div>

      <!-- Grid -->
      <div v-if="loading" class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="n in 6" :key="n" class="animate-pulse">
          <div class="aspect-[4/3] rounded-2xl bg-gray-200 mb-4"></div>
          <div class="h-4 w-3/4 bg-gray-200 rounded mb-2"></div>
          <div class="h-4 w-1/2 bg-gray-200 rounded"></div>
        </div>
      </div>

      <div v-else-if="filteredTours.length > 0" class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <TourCard
          v-for="tour in filteredTours"
          :key="tour.id"
          :tour="tour"
        />
      </div>

      <div v-else class="text-center py-20">
        <div class="mx-auto h-24 w-24 text-gray-300">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
        </div>
        <h3 class="mt-2 text-lg font-semibold text-gray-900">No tours found</h3>
        <p class="mt-1 text-gray-500">Try adjusting your search or filters to find what you're looking for.</p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import type { Tour } from '~/interfaces/Tour';
import TourCard from '~/components/tour/TourCard.vue';

useHead({
  title: 'Explore Tours - Virtual City 360',
});

const client = useSupabaseClient();
const loading = ref(true);
const tours = ref<Tour[]>([]);
const searchQuery = ref('');
const activeFilter = ref<'all' | 'day' | 'night'>('all');

const filterOptions = [
  { label: 'All', value: 'all' },
  { label: '☀️ Day', value: 'day' },
  { label: '🌙 Night', value: 'night' },
] as const;

const fetchTours = async () => {
  loading.value = true;
  try {
    const { data, error } = await client
      .from('tours')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    tours.value = data as Tour[];
  } catch (error) {
    console.error('Error fetching tours:', error);
    useNuxtApp().$toast.error('Failed to load tours');
  } finally {
    loading.value = false;
  }
};

const filteredTours = computed(() => {
  return tours.value.filter(tour => {
    // Filter by Day/Night
    if (activeFilter.value !== 'all' && tour.time_of_day !== activeFilter.value) {
      return false;
    }

    // Filter by Search Query
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase();
      return (
        tour.name.toLowerCase().includes(query) ||
        tour.city.toLowerCase().includes(query) ||
        tour.country.toLowerCase().includes(query) ||
        (tour.description && tour.description.toLowerCase().includes(query))
      );
    }

    return true;
  });
});

onMounted(() => {
  fetchTours();
});
</script>

<style scoped>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>