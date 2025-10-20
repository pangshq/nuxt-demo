// Global route middleware to enforce authentication via a cookie
// Bypasses the login page and public routes listed below
export default defineNuxtRouteMiddleware((to) => {
  const publicPaths = new Set(['/login'])
  if (publicPaths.has(to.path)) return

  // Read token from cookie so it works on server and client
  const token = useCookie<string | null>('token').value
  if (!token) {
    const redirect = encodeURIComponent(to.fullPath)
    return navigateTo(`/login?redirect=${redirect}`)
  }
})

