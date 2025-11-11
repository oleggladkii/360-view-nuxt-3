export default defineNuxtRouteMiddleware((to) => {
  const user = useSupabaseUser()
  if (!user.value) {
    const next = encodeURIComponent(to.fullPath)
    return navigateTo(`/?login=true&next=${next}`)
  }
})