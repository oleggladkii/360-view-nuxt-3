<template>
  <div>
    <section class="relative bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 text-gray-900 min-h-screen overflow-hidden">
      <div class="absolute inset-0 pointer-events-none" style="z-index: 0;">
        <div class="absolute top-0 left-0 h-96 w-96 bg-orange-400 rounded-full opacity-60 blur-2xl" style="transform: translate(-25%, -25%);"/>
        <div class="absolute bottom-0 left-0 h-[32rem] w-[32rem] bg-blue-200 rounded-full opacity-50 blur-2xl" style="transform: translate(-25%, 25%);"/>
        <div class="absolute top-1/2 right-0 h-80 w-80 bg-purple-300 rounded-full opacity-40 blur-2xl" style="transform: translate(25%, -50%);"/>
        <div class="absolute top-0 right-1/4 h-64 w-64 bg-pink-300 rounded-full opacity-45 blur-2xl" style="transform: translate(50%, -30%);"/>
        <div class="absolute bottom-1/4 right-1/3 h-72 w-72 bg-indigo-300 rounded-full opacity-35 blur-2xl" style="transform: translate(30%, 20%);"/>
      </div>

      <div class="relative mx-auto max-w-7xl px-6 py-24 lg:py-32 min-h-screen flex items-center" style="z-index: 1;">
        <div class="lg:flex lg:items-center lg:gap-12">
          <div class="max-w-xl lg:flex-1">
            <h1 class="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              Virtual City 360° Tours
            </h1>
            <p class="mt-6 text-lg text-gray-700">
              Build your own virtual tours or discover existing ones.
            </p>

            <div class="mt-8 flex flex-wrap gap-4">
              <template v-if="!auth.isLoggedIn">
                <button
                  type="button"
                  class="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg hover:bg-blue-500 transition"
                  @click="openLogin"
                >
                  Get Started
                  <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </button>
              </template>
            </div>
          </div>

          <div class="mt-12 lg:mt-0 lg:flex-1 relative">
            <div class="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                :src="heroImage"
                alt="Modern houses"
                class="w-full h-auto object-cover"
              >
              <div class="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent"/>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- How it works Section -->
    <section class="bg-white py-24 lg:py-32">
      <div class="mx-auto max-w-7xl px-6">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            How it works
          </h2>
          <p class="mt-4 text-lg text-gray-600">
            Create and share immersive virtual tours in just a few simple steps
          </p>
        </div>

        <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <!-- Step 1: Sign up for free -->
          <div class="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
            <div class="flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-6 mx-auto">
              <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3">
              Sign up for free
            </h3>
            <p class="text-gray-600">
              Create your account in seconds and start building your virtual tours immediately.
            </p>
          </div>

          <!-- Step 2: Upload 360° content -->
          <div class="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
            <div class="flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6 mx-auto">
              <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3">
              Upload 360° content
            </h3>
            <p class="text-gray-600">
              Upload your 360° photos and videos to create immersive experiences.
            </p>
          </div>

          <!-- Step 3: Create immersive tours -->
          <div class="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
            <div class="flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 mb-6 mx-auto">
              <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3">
              Create immersive tours
            </h3>
            <p class="text-gray-600">
              Connect your content with hotspots and create interactive navigation paths.
            </p>
          </div>

          <!-- Step 4: Share with the world -->
          <div class="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
            <div class="flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 mb-6 mx-auto">
              <svg class="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3">
              Share with the world
            </h3>
            <p class="text-gray-600">
              Publish and share your tours with friends, family, or the entire community.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
import { useUiStore } from '~/stores/ui'
import heroImage from '~/assets/images/hero-section.webp'

defineOptions({
  name: 'IndexPage'
})

useHead({
  title: 'Virtual City 360° Tours',
})

const ui = useUiStore()
const auth = useAuthStore()

const openLogin = () => {
  ui.openLoginModal();
};
</script>