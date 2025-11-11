import type { User as SupabaseUser } from "@supabase/supabase-js"
import type { RouteLocationMatched } from "vue-router"

export default defineNuxtPlugin(() => {
    const router = useRouter()
    const auth = useAuthStore()
    const client = useSupabaseClient()
    const route = useRoute()
    auth.init()

    const isProtectedRoute = (r = route) => {
        return r.matched?.some((m: RouteLocationMatched) => {
            return m?.meta?.auth === true
          }) ?? false
      }

    client.auth.onAuthStateChange((event, session) => {
        auth.setUser(session?.user as SupabaseUser | null)
        if (event === 'SIGNED_OUT' && isProtectedRoute()) {
            router.replace('/')
        }
    })
})