import { defineStore } from "pinia";
import type { User as SupabaseUser } from "@supabase/supabase-js";

type EmailCredentials = {
  email: string;
  password: string;
};

export const useAuthStore = defineStore(
  "auth",
  () => {
    const supabase = useSupabaseClient();
    const supabaseUser = useSupabaseUser();

    const user = ref<SupabaseUser | null>(supabaseUser.value as SupabaseUser | null);
    const userRole = ref<string | null>(null);
    const isLoggedIn = computed(() => !!user.value);

    const fetchUserRole = async () => {
      if (!user.value?.id) {
        return;
      }

      const { data, error } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.value.id)
        .single();

      if (data) {
        userRole.value = data.role;
      }
    };

    const setUser = (data: SupabaseUser | null) => {
      user.value = data;
      if (data) {
        fetchUserRole();
      } else {
        userRole.value = null;
      }
    };

    const logout = async () => {
      await supabase.auth.signOut();
      setUser(null);
    };

    const loginWithEmail = async ({ email, password }: EmailCredentials) => {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        throw error;
      }

      setUser(data.user ?? null);

      return data;
    };

    const registerWithEmail = async ({ email, password }: EmailCredentials) => {
      const { data, error } = await supabase.auth.signUp({ email, password });

      if (error) {
        throw error;
      }

      setUser(data.user ?? null);

      return data;
    };

    const resetPassword = async (email: string) => {
      const redirectTo = typeof window !== "undefined" ? window.location.origin : undefined;
      const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });

      if (error) {
        throw error;
      }
    };

    const loginWithGoogle = async () => {
      const redirectTo = typeof window !== "undefined" ? window.location.origin : undefined;
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo },
      });

      if (error) {
        console.error(error);
        throw error;
      }
    };

    const init = () => {
      user.value = supabaseUser.value as SupabaseUser | null;
      if (user.value) {
        fetchUserRole();
      }
    };

    return {
      isLoggedIn,
      user,
      userRole,
      fetchUserRole,
      setUser,
      logout,
      loginWithEmail,
      registerWithEmail,
      resetPassword,
      loginWithGoogle,
      init,
    };
  },
);
