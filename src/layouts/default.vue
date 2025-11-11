<template>
<div>
    <AppHeader />
    <slot />
    <LoginForm />
</div>
</template>

<script setup lang="ts">
import type { User as SupabaseUser } from '@supabase/supabase-js'
const route = useRoute()
const auth = useAuthStore()
watch(
  () => route.query,
  (newQuery) => {
    if (newQuery.login === "true") {
      const ui = useUiStore();
      ui.openLoginModal();
    }
  },
  { deep: true, immediate: true }
);

if (import.meta.server) {
  const { data } = await useFetch('/api/auth/me', {
    headers: useRequestHeaders(['cookie'])
  })
  auth.setUser(data.value?.user as SupabaseUser | null)
}

</script>