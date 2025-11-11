<template>
  <div>
    <section class="relative overflow-hidden bg-linear-to-br from-gray-50 via-gray-100 to-gray-50 text-gray-900 min-h-screen">
      <div class="mx-auto max-w-7xl px-6 py-24 lg:flex lg:items-center lg:gap-12">
        <div>
          <h1 class="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            Welcome to the Profile page!
          </h1>
          <p class="mt-6 text-lg text-gray-700">
            User data
          </p>
          <ClientOnly fallback="Loading...">
            <div>id: {{ user?.id }}</div>
            <div>full name: {{ user?.user_metadata?.full_name }}</div>
            <div>email: {{ user?.user_metadata?.email }}</div>
          </ClientOnly>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'My Profile',
})
definePageMeta({ auth: true, middleware: 'auth' })
const auth = useAuthStore()
const { user } = storeToRefs(auth)
</script>