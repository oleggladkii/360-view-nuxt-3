<template>
  <section class="min-h-screen bg-gray-50">
    <div v-if="tour" class="flex h-screen overflow-hidden">
      <!-- Left Column: Video + Description -->
      <div class="flex w-2/3 flex-col overflow-y-auto">
        <!-- Video Player -->
        <div class="relative aspect-video w-full bg-gray-800">
          <video
            v-if="tour.preview_url"
            :src="tour.preview_url"
            controls
            class="h-full w-full object-cover"
          >
            Your browser does not support the video tag.
          </video>
          <div v-else class="flex h-full w-full items-center justify-center bg-gray-800 text-gray-400">
            <div class="text-center">
              <svg
                class="mx-auto h-12 w-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              <p class="mt-2 text-sm">No video available</p>
            </div>
          </div>
        </div>

        <!-- Description Panel -->
        <div class="flex-1 bg-white p-6">
          <h1 class="text-2xl font-semibold text-gray-900">{{ tour.name }}</h1>

          <!-- Author Info -->
          <div class="mt-4 flex items-center gap-3">
            <div class="h-10 w-10 shrink-0 rounded-full bg-gray-300" />
            <div>
              <p class="text-sm font-medium text-gray-900">Author</p>
              <p class="text-xs text-gray-500">Realtor</p>
            </div>
          </div>

          <!-- Stats -->
          <div class="mt-4 flex flex-wrap gap-6 text-sm text-gray-600">
            <div class="flex items-center gap-2">
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>{{ tour.tour_date ? new Date(tour.tour_date).toLocaleDateString() : "Not specified" }}</span>
            </div>
            <div class="flex items-center gap-2">
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              <span class="capitalize">{{ tour.time_of_day || "Not specified" }}</span>
            </div>
            <div class="flex items-center gap-2">
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{{ tour.views_count || 0 }} views</span>
            </div>
          </div>

          <!-- Description Text -->
          <div class="mt-6">
            <p class="text-sm leading-relaxed text-gray-700">
              {{ tour.description || "No description available." }}
            </p>
            <p v-if="tour.city || tour.country" class="mt-4 text-sm text-gray-600">
              <span class="font-medium">Location:</span>
              {{ tour.city }}{{ tour.country ? `, ${tour.country}` : "" }}
            </p>
          </div>

          <!-- Edit Button (for current user) -->
          <ClientOnly>
            <div v-if="isCurrentUser" class="mt-6">
              <NuxtLink
                :to="`/tours/${tour.id}/edit`"
                class="inline-block rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-gray-800"
              >
                Edit Tour
              </NuxtLink>
            </div>
          </ClientOnly>
        </div>
      </div>

      <!-- Right Column: Map -->
      <div class="w-1/3 bg-gray-200">
        <div class="relative h-full w-full">
          <!-- Map placeholder -->
          <div class="flex h-full w-full items-center justify-center bg-gray-200 text-gray-500">
            <div class="text-center">
              <svg
                class="mx-auto h-16 w-16"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                />
              </svg>
              <p class="mt-2 text-sm">Map view</p>
              <p v-if="tour.gpx_path" class="mt-1 text-xs text-gray-400">
                GPX: {{ tour.gpx_path }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="flex min-h-screen items-center justify-center">
      <div class="text-center">
        <p class="text-gray-500">Tour not found.</p>
        <NuxtLink
          to="/profile?tab=tours"
          class="mt-4 inline-block rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-gray-800"
        >
          Back to Tours
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Tour } from "~/interfaces/Tour";

const route = useRoute();
const toast = useToast();

useHead({
  title: "Tour Details",
});

const tourId = computed(() => route.params.id as string);

const { data: tour, error } = await useFetch<Tour>(`/api/tours/${tourId.value}/view`, {
  headers: useRequestHeaders(["cookie"]),
});

const auth = useAuthStore();

if (error.value) {
  console.error("Failed to load tour:", error.value);
  if (import.meta.client) {
    toast.error({ message: "Failed to load tour. Please try again." });
  }
  await navigateTo("/profile?tab=tours");
}

const isCurrentUser = computed(() => {
  return auth.user?.id === tour.value?.user_id;
});
</script>
