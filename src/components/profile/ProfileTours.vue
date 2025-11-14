<template>
  <section class="flex flex-col gap-8">
    <header>
      <h2 class="text-2xl font-semibold text-gray-900">Tours</h2>
      <p class="mt-2 text-sm text-gray-500">
        You currently have {{ tours.length }} virtual {{ tours.length === 1 ? "tour" : "tours" }} ready to share.
      </p>
    </header>
    <ul class="space-y-4">
      <li
        v-for="tour in tours"
        :key="tour.id"
        class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition hover:border-gray-300"
      >
        <div class="flex flex-col gap-1">
          <h3 class="text-lg font-semibold text-gray-900">
            {{ tour.title }}
          </h3>
          <p class="text-sm text-gray-500">
            {{ tour.description }}
          </p>
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
type Tour = {
  id: string;
  title: string;
  description: string;
};

defineProps<{
  tours: Tour[];
}>();
</script>

