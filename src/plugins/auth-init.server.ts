import type { User as SupabaseUser } from "@supabase/supabase-js";

export default defineNuxtPlugin(async (nuxtApp) => {
  if (!nuxtApp.ssrContext?.event) {
    return;
  }

  try {
    const { data } = await useFetch<{ user: SupabaseUser | null }>("/api/auth/me", {
      headers: useRequestHeaders(["cookie"]),
    });

    if (data.value?.user) {
      const authStore = useAuthStore();
      authStore.setUser(data.value.user);
    }
  } catch (error) {
    console.error("auth-init.server: error initializing auth", error);
  }
});