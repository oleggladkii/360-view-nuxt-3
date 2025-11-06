import { defineStore } from 'pinia'

export interface AuthUser {
  id: string
  name?: string
  email?: string
  avatar_url?: string
}

export const useAuthStore = defineStore(
  'auth',
  () => {
    const supabase = useSupabaseClient()

    const isLoggedIn = ref<boolean>(false)
    const user = ref<AuthUser | null>(null)

    const setUser = (data: AuthUser | null) => {
      user.value = data
      isLoggedIn.value = !!data
    }

    const logout = async () => {
      await supabase.auth.signOut()
      setUser(null)
    }

    return { isLoggedIn, user, logout }
  }
)


