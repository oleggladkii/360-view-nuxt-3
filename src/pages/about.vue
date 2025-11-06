<template>
  <div>
    <section class="relative overflow-hidden bg-linear-to-br from-gray-50 via-gray-100 to-gray-50 text-gray-900 min-h-screen">
      <div class="mx-auto max-w-7xl px-6 py-24 lg:flex lg:items-center lg:gap-12">
        <div>
          <h1 class="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Welcome to the About page!
          </h1>
          <p class="mt-6 text-lg text-gray-700">
            Welcome to the About page! Here you can find more information about our project.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'About',
})
</script>