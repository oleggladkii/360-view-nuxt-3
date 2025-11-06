import tailwindcss from "@tailwindcss/vite";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  srcDir: 'src/',
  components: [
    { path: '~/components', pathPrefix: true },
  ],
  css: ['@/assets/css/main.css'],
  modules: ['@nuxt/eslint', '@pinia/nuxt', '@nuxtjs/supabase'],
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
  imports: {
    dirs: ['~/stores'],
  },
})