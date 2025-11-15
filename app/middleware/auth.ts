/**
 * Middleware de autenticación
 * Protege rutas que requieren que el usuario esté autenticado
 */
export default defineNuxtRouteMiddleware(async (to, from) => {
  const { isAuthenticated, checkAuth } = useAuth()

  // Verificar autenticación
  await checkAuth()

  if (!isAuthenticated.value) {
    // Guardar la ruta a la que intentaba acceder
    return navigateTo({
      path: '/auth/login',
      query: { redirect: to.fullPath }
    })
  }
})
