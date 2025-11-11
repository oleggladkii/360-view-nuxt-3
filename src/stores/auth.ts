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
    const isLoggedIn = computed(() => !!user.value);

    const setUser = (data: SupabaseUser | null) => {
      user.value = data;
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
    };

    return {
      isLoggedIn,
      user,
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
