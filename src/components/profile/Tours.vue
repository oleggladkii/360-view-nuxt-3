<template>
  <section class="flex flex-col gap-8">
    <header>
      <div class="flex items-center justify-between gap-4">
        <div class="flex-1">
          <h2 class="text-2xl font-semibold text-gray-900">Tours</h2>
          <p class="mt-2 text-sm text-gray-500">
            You currently have {{ tours.length }} virtual {{ tours.length === 1 ? "tour" : "tours" }} ready to share.
          </p>
        </div>
        <NuxtLink
          to="/tours/create"
          class="rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
        >
          Add Tour
        </NuxtLink>
      </div>
    </header>
    <ul class="space-y-4 overflow-visible">
      <li
        v-for="tour in tours"
        :key="tour.id"
        class="rounded-lg border border-gray-200 bg-white p-0 shadow-sm transition hover:border-gray-300 flex flex-col md:flex-row"
      >
        <!-- Preview Image -->
        <div class="w-full md:w-52 h-40 flex-shrink-0 bg-gray-100 flex items-center justify-center">
          <img
            v-if="tour.preview_url"
            :src="tour.preview_url"
            alt="Tour preview"
            class="w-full h-full object-cover"
          />
          <div
            v-else
            class="flex items-center justify-center w-full h-full text-gray-400 text-2xl italic"
          >
            No Image
          </div>
        </div>
        <!-- Info -->
        <div class="flex flex-1 flex-col justify-between p-6 overflow-visible">
          <div class="flex items-start justify-between gap-6">
            <div class="flex-1 flex flex-col gap-2">
              <h3 class="text-lg font-semibold text-gray-900 truncate" :title="tour.name">
                {{ truncateText(tour.name, 40) }}
              </h3>
            </div>
            <div
              :ref="(el) => setMenuRef(el, tour.id)"
              class="relative shrink-0 ml-2 overflow-visible"
            >
              <button
                type="button"
                class="flex items-center justify-center w-8 h-8 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                @click.stop="toggleMenu(tour.id)"
              >
                <span class="sr-only">Open menu</span>
                <svg
                  class="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                </svg>
              </button>
              <div
                v-if="openMenuId === tour.id"
                class="absolute right-0 top-full mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
              >
                <NuxtLink
                  :to="`/tours/${tour.id}`"
                  class="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  @click="closeMenu"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fill-rule="evenodd" d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 8.201 2.372 9.336 6.41.175.624.175 1.283 0 1.907C18.201 15.322 14.257 17.694 10 17.694 5.743 17.694 1.799 15.322.664 11.284zM10 15.833c2.857 0 5.698-1.405 7.381-3.938C15.698 9.308 12.857 7.903 10 7.903c-2.857 0-5.698 1.405-7.381 3.992C4.302 14.428 7.143 15.833 10 15.833z" clip-rule="evenodd" />
                  </svg>
                  View
                </NuxtLink>
                <NuxtLink
                  :to="`/tours/${tour.id}/edit`"
                  class="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  @click="closeMenu"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
                    <path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" />
                  </svg>
                  Edit
                </NuxtLink>
                <button
                  type="button"
                  class="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors"
                  @click="handleDelete(tour.id)"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4">
                    <path fill-rule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clip-rule="evenodd" />
                  </svg>
                  Delete
                </button>
              </div>
            </div>
          </div>
          <div class="flex flex-wrap gap-4 mt-4 text-xs text-gray-500">
            <span v-if="tour.city || tour.country" class="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-3.5 h-3.5">
                <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
              </svg>
              {{ tour.country }}, {{ tour.city }}
            </span>
            <span v-if="tour.tour_date" class="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-3.5 h-3.5">
                <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
              </svg>
              {{ formatDate(tour.tour_date) }}
            </span>
            <span v-if="tour.time_of_day" class="flex items-center gap-1">
              <svg v-if="tour.time_of_day === 'day'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-3.5 h-3.5">
                <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-3.5 h-3.5">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
              {{ capitalize(tour.time_of_day) }}
            </span>
          </div>
        </div>
      </li>
      <li
        v-if="!tours.length"
        class="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-6 text-center text-sm text-gray-500"
      >
        You have not created any tours yet.
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { onClickOutside } from "@vueuse/core";
import type { Tour } from "~/interfaces/Tour";

const toast = useToast();

const tours = ref<Tour[]>([]);
const { data, error, refresh } = await useFetch<Tour[]>("/api/users/me/tours", {
  headers: useRequestHeaders(["cookie"]),
});

if (data.value) {
  tours.value = data.value;
}

if (error.value) {
  toast.error({ message: "Failed to load tours." });
}

const openMenuId = ref<string | null>(null);
const menuRefs = ref<Record<string, HTMLElement | null>>({});

const setMenuRef = (el: Element | ComponentPublicInstance | null, tourId: string) => {
  if (el && el instanceof HTMLElement) {
    menuRefs.value[tourId] = el;
  }
};

const toggleMenu = (tourId: string) => {
  if (openMenuId.value === tourId) {
    openMenuId.value = null;
  } else {
    openMenuId.value = tourId;
  }
};

const closeMenu = () => {
  openMenuId.value = null;
};

const truncateText = (text: string, maxLength: number): string => {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

const formatDate = (dateString: string): string => {
  if (!dateString) return "";
  try {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return dateString;
  }
};

const capitalize = (text: string): string => {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

const handleDelete = async (tourId: string) => {
  try {
    await $fetch(`/api/tours/${tourId}`, {
      method: "DELETE",
    });

    toast.success({ message: "Tour deleted successfully." });
    await refresh();
    if (data.value) {
      tours.value = data.value;
    }
    closeMenu();
  } catch (error) {
    console.error("Failed to delete tour:", error);
    toast.error({ message: "Failed to delete tour. Please try again." });
  } finally {
    closeMenu();
  }
};

watch(
  () => openMenuId.value,
  (menuId) => {
    if (menuId && menuRefs.value[menuId]) {
      onClickOutside(menuRefs.value[menuId]!, closeMenu);
    }
  },
);
</script>

