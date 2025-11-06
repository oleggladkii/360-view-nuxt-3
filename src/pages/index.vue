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
              Virtual Real Estate Tours 
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
  title: 'Virtual Real Estate Tours',
})

const ui = useUiStore()
const auth = useAuthStore()

const openLogin = () => {
  ui.openLoginModal();
};
</script>