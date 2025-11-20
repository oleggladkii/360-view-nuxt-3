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
    <ul class="space-y-4">
      <li
        v-for="tour in tours"
        :key="tour.id"
        class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition hover:border-gray-300"
      >
        <div class="flex items-start justify-between gap-4">
          <div class="flex flex-col gap-1 flex-1">
            <h3 class="text-lg font-semibold text-gray-900">
              {{ tour.name }}
            </h3>
            <p class="text-sm text-gray-500">
              {{ tour.description }}
            </p>
          </div>
          <div
            :ref="(el) => setMenuRef(el, tour.id)"
            class="relative shrink-0"
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
              class="absolute right-0 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
            >
              <NuxtLink
                :to="`/tours/${tour.id}`"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                @click="closeMenu"
              >
                View
              </NuxtLink>
              <NuxtLink
                :to="`/tours/${tour.id}/edit`"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                @click="closeMenu"
              >
                Edit
              </NuxtLink>
              <button
                type="button"
                class="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors"
                @click="handleDelete(tour.id)"
              >
                Delete
              </button>
            </div>
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

