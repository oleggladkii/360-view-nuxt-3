<template>
  <header class="absolute top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-sm shadow-sm border-b border-gray-200">
    <nav class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="shrink-0">
          <NuxtLink to="/" class="text-xl font-bold text-gray-900 hover:text-gray-700 transition-colors">
            <img src="/assets/images/logo.png" alt="Logo" class="inline-block h-8 w-auto align-middle mr-2" />
          </NuxtLink>
        </div>

        <div class="flex items-center gap-6">
          <NuxtLink to="/about" class="text-gray-700 hover:text-gray-900 font-medium transition-colors">
            About
          </NuxtLink>

          <template v-if="!isLoggedIn">
            <button
              type="button"
              class="text-gray-700 hover:text-gray-900 font-medium transition-colors cursor-pointer"
              @click="openLogin"
            >
              Login
            </button>
          </template>
          <template v-else>
            <NuxtLink to="/profile" class="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              Profile
            </NuxtLink>
            <div class="shrink-0">
              <button
                type="button"
                class="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                @click="toggleProfileMenu"
              >
                <span class="absolute -inset-1.5"></span>
                <span class="sr-only">Open user menu</span>
                <div
                  class="h-8 w-8 rounded-full bg-gray-600 flex items-center justify-center text-white font-medium"
                >
                  {{ userInitial }}
                </div>
              </button>
            </div>
          </template>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/stores/auth';
import { useUiStore } from '~/stores/ui';

const auth = useAuthStore();
const { isLoggedIn, user } = storeToRefs(auth);

const ui = useUiStore();

const userInitial = computed(() => {
  if (!user.value) return 'U';
  return user.value.name?.charAt(0).toUpperCase() || 'U';
});

const toggleProfileMenu = () => {
  console.log('Profile menu clicked');
};

const openLogin = () => {
  ui.openLoginModal();
};
</script>

