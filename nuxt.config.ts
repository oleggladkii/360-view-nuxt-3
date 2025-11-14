import tailwindcss from "@tailwindcss/vite";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  srcDir: 'src/',
  serverDir: 'server/',
  components: [
    { path: '~/components', pathPrefix: true },
  ],
  css: ['@/assets/css/main.css'],
  modules: [
    '@nuxt/eslint',
    '@pinia/nuxt',
    '@nuxtjs/supabase',
    'nuxt-toast',
    '@nuxt/image',
  ],
  image: {
    domains: ['lh3.googleusercontent.com'],
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
    css: {
      devSourcemap: true,
    },
    build: {
      cssCodeSplit: false,
    },
    optimizeDeps: {
      exclude: ['#app-manifest'],
    },
  },
  supabase: {
    redirect: false
  },
  toast: {
    settings: {
      rtl: true,
      position: 'topRight',
      timeout: 5000,
      progressBar: false,
      // ... see https://github.com/marcelodolza/iziToast for all options
    }
  },
  imports: {
    dirs: ['~/stores'],
  },
})