import { defineStore } from 'pinia'
import type { User as SupabaseUser } from '@supabase/supabase-js'

export interface AuthUser {
  id: string
  name?: string
  email?: string
}

export const useAuthStore = defineStore('auth', () => {
  const supabase = useSupabaseClient()

  const isLoggedIn = ref<boolean>(false)
  const user = ref<AuthUser | null>(null)
  const isInitialized = ref<boolean>(false)

  const authUserCookie = useCookie<AuthUser | null>('auth_user', {
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  })

  function mapSupabaseUser(su: SupabaseUser): AuthUser {
    const fullName =
      su?.user_metadata?.full_name ??
      su?.user_metadata?.name ??
      su?.user_metadata?.given_name

    return {
      id: su?.id,
      name: fullName ?? undefined,
      email: su?.email ?? undefined,
    }
  }

  function setUser(next: AuthUser | null) {
    user.value = next
    isLoggedIn.value = !!next
    authUserCookie.value = next
  }

  async function init() {
    if (isInitialized.value) return

    if (authUserCookie.value) {
      setUser(authUserCookie.value)
    }

    if (typeof window !== 'undefined') {
      const { data: sessionData } = await supabase.auth.getSession()
      const currentUser = sessionData.session?.user
      if (currentUser) {
        setUser(mapSupabaseUser(currentUser))
      } else {
        setUser(null)
      }

      supabase.auth.onAuthStateChange((_event, session) => {
        const su = session?.user ?? null
        setUser(su ? mapSupabaseUser(su) : null)
      })
    }

    isInitialized.value = true
  }

  async function logout() {
    await supabase.auth.signOut()
    setUser(null)
  }

  if (typeof window !== 'undefined') {
    void init()
  }

  return { isLoggedIn, user, init, logout }
})


