<template>
  <div>
    <section class="relative overflow-hidden bg-linear-to-br from-gray-50 via-gray-100 to-gray-50 text-gray-900 min-h-screen">
      <div class="mx-auto max-w-7xl px-6 py-24 lg:flex lg:items-center lg:gap-12">
        <div class="max-w-xl">
          <h1 class="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Real Estate Agent
          </h1>
          <p class="mt-6 text-lg text-gray-700">
            Create and explore 360° property tours. To do this, please sign in.
          </p>

          <div class="mt-8 flex flex-wrap gap-4">
            <template v-if="!auth.isLoggedIn">
              <a
                href="#"
                @click="openLogin"
                class="rounded-full bg-indigo-600 px-6 py-3 font-semibold text-white shadow-lg hover:bg-indigo-500 transition"
              >
                Get Started
              </a>
            </template>
          </div>
        </div>
      </div>
      <div class="absolute inset-0 -z-10">
        <div class="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 bg-indigo-400/20 blur-3xl rounded-full"></div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
import { useUiStore } from '~/stores/ui'

const ui = useUiStore()
const auth = useAuthStore()

const openLogin = () => {
  ui.openLoginModal();
};
</script>