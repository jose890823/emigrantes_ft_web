/**
 * Middleware guest
 * Redirige usuarios autenticados (para páginas de login/registro)
 */
export default defineNuxtRouteMiddleware(async (to, from) => {
  const { isAuthenticated, checkAuth } = useAuth()

  // Verificar autenticación
  await checkAuth()

  if (isAuthenticated.value) {
    // Si el usuario ya está autenticado, redirigir al dashboard
    return navigateTo('/dashboard')
  }
})
