<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

const { user } = useAuth()
const api = useApi()

// Animation state
const mounted = ref(false)

// Dashboard stats
const stats = ref({
  activePoas: 0,
  totalDocuments: 0,
  totalPayments: 0,
  unreadNotifications: 0
})

const loading = ref(true)

// Load dashboard stats
const loadStats = async () => {
  try {
    loading.value = true
    const response = await api.get('/poa/stats')
    if (response.success && response.data) {
      stats.value = response.data
    }
  } catch (error) {
    console.error('Error loading dashboard stats:', error)
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  // Load stats
  await loadStats()

  // Trigger animation
  setTimeout(() => {
    mounted.value = true
  }, 100)
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50 py-8">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
      <!-- Welcome Header with Animation -->
      <div
        class="mb-8 transition-all duration-700 transform"
        :class="mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'"
      >
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-xl flex items-center justify-center shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
              <path d="M5 3v4"/>
              <path d="M19 17v4"/>
              <path d="M3 5h4"/>
              <path d="M17 19h4"/>
            </svg>
          </div>
          <div>
            <h1 class="text-3xl font-bold bg-gradient-to-r from-[#0A1F44] to-[#1e3a6b] bg-clip-text text-transparent">
              ¡Bienvenido, {{ user?.firstName }}!
            </h1>
            <p class="text-gray-600 mt-1 text-sm">
              Gestiona tus poderes notariales de forma segura
            </p>
          </div>
        </div>
      </div>

      <!-- Stats Grid with Gradient Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <!-- POAs Activos Card -->
        <div
          class="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 overflow-hidden"
          :class="mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
          style="transition-delay: 100ms"
        >
          <div class="p-6 relative">
            <!-- Gradient Background -->
            <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#D4AF37]/10 to-transparent rounded-bl-[100px] transition-all duration-500 group-hover:scale-110"></div>

            <div class="relative flex items-start justify-between">
              <div class="flex-1">
                <p class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">POAs Activos</p>
                <p class="text-4xl font-bold bg-gradient-to-r from-[#D4AF37] to-[#B8941F] bg-clip-text text-transparent">{{ stats.activePoas }}</p>
                <p class="text-xs text-gray-400 mt-2">Poderes vigentes</p>
              </div>
              <div class="w-14 h-14 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-2xl flex items-center justify-center shadow-lg transform transition-transform duration-500 group-hover:rotate-12">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" x2="8" y1="13" y2="13"/>
                  <line x1="16" x2="8" y1="17" y2="17"/>
                  <line x1="10" x2="8" y1="9" y2="9"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Documentos Card -->
        <div
          class="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 overflow-hidden"
          :class="mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
          style="transition-delay: 200ms"
        >
          <div class="p-6 relative">
            <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-transparent rounded-bl-[100px] transition-all duration-500 group-hover:scale-110"></div>

            <div class="relative flex items-start justify-between">
              <div class="flex-1">
                <p class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Documentos</p>
                <p class="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">{{ stats.totalDocuments }}</p>
                <p class="text-xs text-gray-400 mt-2">Archivos guardados</p>
              </div>
              <div class="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-400 rounded-2xl flex items-center justify-center shadow-lg transform transition-transform duration-500 group-hover:rotate-12">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Pagos Card -->
        <div
          class="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 overflow-hidden"
          :class="mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
          style="transition-delay: 300ms"
        >
          <div class="p-6 relative">
            <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-bl-[100px] transition-all duration-500 group-hover:scale-110"></div>

            <div class="relative flex items-start justify-between">
              <div class="flex-1">
                <p class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Pagos</p>
                <p class="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent">${{ stats.totalPayments }}</p>
                <p class="text-xs text-gray-400 mt-2">Balance total</p>
              </div>
              <div class="w-14 h-14 bg-gradient-to-br from-emerald-600 to-emerald-400 rounded-2xl flex items-center justify-center shadow-lg transform transition-transform duration-500 group-hover:rotate-12">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/>
                  <path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/>
                  <path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Notificaciones Card -->
        <div
          class="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 overflow-hidden"
          :class="mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
          style="transition-delay: 400ms"
        >
          <div class="p-6 relative">
            <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-transparent rounded-bl-[100px] transition-all duration-500 group-hover:scale-110"></div>

            <div class="relative flex items-start justify-between">
              <div class="flex-1">
                <p class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Notificaciones</p>
                <p class="text-4xl font-bold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">{{ stats.unreadNotifications }}</p>
                <p class="text-xs text-gray-400 mt-2">Mensajes nuevos</p>
              </div>
              <div class="w-14 h-14 bg-gradient-to-br from-purple-600 to-purple-400 rounded-2xl flex items-center justify-center shadow-lg transform transition-transform duration-500 group-hover:rotate-12">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>
                  <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions with Modern Design -->
      <div
        class="bg-white rounded-2xl shadow-lg p-8 mb-8 transition-all duration-700"
        :class="mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
        style="transition-delay: 500ms"
      >
        <div class="flex items-center gap-3 mb-6">
          <div class="w-10 h-10 bg-gradient-to-br from-[#0A1F44] to-[#1e3a6b] rounded-xl flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
            </svg>
          </div>
          <h2 class="text-2xl font-bold text-[#0A1F44]">Acciones Rápidas</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <!-- Mis POAs -->
          <NuxtLink
            to="/poa"
            class="group relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-5 border-2 border-gray-200 hover:border-[#D4AF37] hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div class="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/0 to-[#D4AF37]/0 group-hover:from-[#D4AF37]/5 group-hover:to-[#D4AF37]/10 transition-all duration-300"></div>
            <div class="relative flex flex-col gap-3">
              <div class="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-xl flex items-center justify-center shadow-md transform group-hover:scale-110 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
                  <path d="m9 12 2 2 4-4"/>
                </svg>
              </div>
              <div>
                <p class="font-bold text-gray-900 group-hover:text-[#D4AF37] transition-colors text-lg">Mis POAs</p>
                <p class="text-sm text-gray-500 mt-1">Ver poderes notariales</p>
              </div>
            </div>
          </NuxtLink>

          <!-- Crear POA -->
          <NuxtLink
            to="/poa/create"
            class="group relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-5 border-2 border-gray-200 hover:border-blue-500 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div class="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-500/0 group-hover:from-blue-500/5 group-hover:to-blue-500/10 transition-all duration-300"></div>
            <div class="relative flex flex-col gap-3">
              <div class="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-400 rounded-xl flex items-center justify-center shadow-md transform group-hover:scale-110 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <path d="M12 18v-6"/>
                  <path d="M9 15h6"/>
                </svg>
              </div>
              <div>
                <p class="font-bold text-gray-900 group-hover:text-blue-600 transition-colors text-lg">Crear POA</p>
                <p class="text-sm text-gray-500 mt-1">Nuevo poder notarial</p>
              </div>
            </div>
          </NuxtLink>

          <!-- Mi Perfil -->
          <NuxtLink
            to="/profile"
            class="group relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-5 border-2 border-gray-200 hover:border-emerald-500 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div class="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-emerald-500/0 group-hover:from-emerald-500/5 group-hover:to-emerald-500/10 transition-all duration-300"></div>
            <div class="relative flex flex-col gap-3">
              <div class="w-12 h-12 bg-gradient-to-br from-emerald-600 to-emerald-400 rounded-xl flex items-center justify-center shadow-md transform group-hover:scale-110 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <circle cx="12" cy="10" r="3"/>
                  <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"/>
                </svg>
              </div>
              <div>
                <p class="font-bold text-gray-900 group-hover:text-emerald-600 transition-colors text-lg">Mi Perfil</p>
                <p class="text-sm text-gray-500 mt-1">Editar información</p>
              </div>
            </div>
          </NuxtLink>

          <!-- Soporte -->
          <NuxtLink
            to="/support"
            class="group relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-5 border-2 border-gray-200 hover:border-purple-500 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div class="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-purple-500/0 group-hover:from-purple-500/5 group-hover:to-purple-500/10 transition-all duration-300"></div>
            <div class="relative flex flex-col gap-3">
              <div class="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-400 rounded-xl flex items-center justify-center shadow-md transform group-hover:scale-110 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 1 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z"/>
                  <path d="M21 16v2a4 4 0 0 1-4 4h-5"/>
                </svg>
              </div>
              <div>
                <p class="font-bold text-gray-900 group-hover:text-purple-600 transition-colors text-lg">Soporte</p>
                <p class="text-sm text-gray-500 mt-1">Contacta con nosotros</p>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>

      <!-- Recent Activity with Better Empty State -->
      <div
        class="bg-white rounded-2xl shadow-lg p-8 transition-all duration-700"
        :class="mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
        style="transition-delay: 600ms"
      >
        <div class="flex items-center gap-3 mb-6">
          <div class="w-10 h-10 bg-gradient-to-br from-[#0A1F44] to-[#1e3a6b] rounded-xl flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
            </svg>
          </div>
          <h2 class="text-2xl font-bold text-[#0A1F44]">Actividad Reciente</h2>
        </div>

        <div class="text-center py-12">
          <div class="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/>
              <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>
            </svg>
          </div>
          <p class="text-gray-600 font-medium text-lg">No hay actividad reciente</p>
          <p class="text-sm text-gray-400 mt-2 max-w-md mx-auto">
            Tus acciones y actualizaciones aparecerán aquí para que puedas hacer seguimiento fácilmente
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Animaciones suaves para los gradientes */
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.group:hover .animate-float {
  animation: float 3s ease-in-out infinite;
}
</style>
