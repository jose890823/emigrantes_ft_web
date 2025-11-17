<script setup lang="ts">
import type { POA } from '~/types/api'

definePageMeta({
  middleware: 'auth'
})

const { getMyPoas, getStatusLabel, getStatusColor, getTypeLabel } = usePoa()
const toast = useToast()

const poas = ref<POA[]>([])
const isLoading = ref(false)
const selectedStatus = ref('all')
const searchQuery = ref('')
const mounted = ref(false)

const loadPoas = async () => {
  isLoading.value = true
  try {
    const filters = selectedStatus.value !== 'all' ? { status: selectedStatus.value } : {}
    const result = await getMyPoas(filters)

    if (result.success && result.data) {
      poas.value = result.data
    } else {
      toast.error('Error', 'No se pudieron cargar los POAs')
    }
  } catch (error) {
    toast.error('Error', 'Ocurrió un error al cargar los POAs')
  } finally {
    isLoading.value = false
  }
}

const filteredPoas = computed(() => {
  return poas.value.filter(poa =>
    poa.clientFullName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    poa.type.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

// Función para obtener las clases de badge según el estado
const getStatusBadgeClasses = (status: string) => {
  const classes: Record<string, string> = {
    draft: 'bg-gray-100 text-gray-800',
    pending: 'bg-yellow-100 text-yellow-800',
    in_review: 'bg-blue-100 text-blue-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
    notarized: 'bg-purple-100 text-purple-800',
    activated: 'bg-indigo-100 text-indigo-800',
    executed: 'bg-cyan-100 text-cyan-800',
    completed: 'bg-emerald-100 text-emerald-800',
    cancelled: 'bg-slate-100 text-slate-800',
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

// Función para obtener el color de la barra según el estado
const getStatusBarColor = (status: string) => {
  const colors: Record<string, string> = {
    draft: '#9ca3af',
    pending: '#fbbf24',
    in_review: '#3b82f6',
    approved: '#10b981',
    rejected: '#ef4444',
    notarized: '#a855f7',
    activated: '#6366f1',
    executed: '#06b6d4',
    completed: '#10b981',
    cancelled: '#64748b',
  }
  return colors[status] || '#9ca3af'
}

onMounted(() => {
  loadPoas()
  setTimeout(() => {
    mounted.value = true
  }, 100)
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50 py-8">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
      <!-- Header with Animation -->
      <div
        class="flex flex-col md:flex-row md:items-center md:justify-between mb-8 transition-all duration-700 transform"
        :class="mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'"
      >
        <div class="flex items-center gap-4">
          <div class="w-14 h-14 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-xl flex items-center justify-center shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" x2="8" y1="13" y2="13"/>
              <line x1="16" x2="8" y1="17" y2="17"/>
              <line x1="10" x2="8" y1="9" y2="9"/>
            </svg>
          </div>
          <div>
            <h1 class="text-3xl font-bold bg-gradient-to-r from-[#0A1F44] to-[#1e3a6b] bg-clip-text text-transparent">
              Mis POAs
            </h1>
            <p class="text-gray-600 mt-1">Gestiona tus poderes notariales duraderos</p>
          </div>
        </div>
        <NuxtLink to="/poa/create" class="mt-4 md:mt-0">
          <button class="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white font-bold rounded-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14"/>
              <path d="M12 5v14"/>
            </svg>
            Crear Nuevo POA
          </button>
        </NuxtLink>
      </div>

      <!-- Filters with Animation -->
      <div
        class="bg-white rounded-2xl shadow-lg p-6 mb-8 transition-all duration-700 transform"
        :class="mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
        style="transition-delay: 100ms"
      >
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Search -->
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.3-4.3"/>
              </svg>
              Buscar
            </label>
            <div class="relative">
              <svg xmlns="http://www.w3.org/2000/svg" class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.3-4.3"/>
              </svg>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Buscar por nombre o tipo..."
                class="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] transition-all duration-200 bg-gray-50 hover:bg-white"
              />
            </div>
          </div>

          <!-- Status Filter -->
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="4" x2="20" y1="12" y2="12"/>
                <line x1="4" x2="20" y1="6" y2="6"/>
                <line x1="4" x2="20" y1="18" y2="18"/>
              </svg>
              Estado
            </label>
            <select
              v-model="selectedStatus"
              @change="loadPoas"
              class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] transition-all duration-200 bg-gray-50 hover:bg-white cursor-pointer"
            >
              <option value="all">Todos los estados</option>
              <option value="draft">Borrador</option>
              <option value="pending">Pendiente</option>
              <option value="in_review">En Revisión</option>
              <option value="approved">Aprobado</option>
              <option value="notarized">Notariado</option>
              <option value="activated">Activado</option>
            </select>
          </div>
        </div>
      </div>

      <!-- POAs List -->
      <div v-if="isLoading" class="flex justify-center py-16">
        <div class="flex flex-col items-center gap-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 text-[#D4AF37] animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
          </svg>
          <p class="text-gray-600 font-medium">Cargando tus POAs...</p>
        </div>
      </div>

      <div
        v-else-if="filteredPoas.length === 0"
        class="bg-white rounded-2xl shadow-lg p-16 text-center transition-all duration-700 transform"
        :class="mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
        style="transition-delay: 200ms"
      >
        <div class="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/>
            <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>
          </svg>
        </div>
        <h3 class="text-2xl font-bold text-gray-800 mb-3">No se encontraron POAs</h3>
        <p class="text-gray-500 mb-8 max-w-md mx-auto">
          {{ poas.length === 0 ? 'Aún no has creado ningún poder notarial. Comienza ahora para proteger tus bienes.' : 'No hay POAs que coincidan con tu búsqueda. Intenta con otros filtros.' }}
        </p>
        <NuxtLink v-if="poas.length === 0" to="/poa/create">
          <button class="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white font-bold rounded-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14"/>
              <path d="M12 5v14"/>
            </svg>
            Crear Mi Primer POA
          </button>
        </NuxtLink>
      </div>

      <div v-else class="grid grid-cols-1 gap-6">
        <NuxtLink
          v-for="(poa, index) in filteredPoas"
          :key="poa.id"
          :to="`/poa/${poa.id}`"
          class="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-1 flex"
          :class="mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
          :style="{ transitionDelay: `${200 + index * 50}ms` }"
        >
          <!-- Status Bar on Left -->
          <div class="w-2 flex-shrink-0" :style="{ background: `linear-gradient(to bottom, ${getStatusBarColor(poa.status)}, ${getStatusBarColor(poa.status)}aa)` }"></div>

          <div class="relative p-6 flex-1">
            <!-- Gradient Background Overlay - Only on Hover -->
            <div class="absolute inset-0 bg-gradient-to-r from-transparent to-transparent transition-all duration-500 group-hover:from-[#D4AF37]/10 group-hover:to-[#D4AF37]/5"></div>

            <!-- Single Row with All Info -->
            <div class="relative flex items-center gap-4">
              <!-- Icon Badge -->
              <div class="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-xl flex items-center justify-center shadow-md flex-shrink-0 transform group-hover:scale-110 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
                  <path d="m9 12 2 2 4-4"/>
                </svg>
              </div>

              <!-- Name and Type Stacked - Fixed Width -->
              <div class="w-56 flex-shrink-0">
                <h3 class="text-base font-bold text-[#0A1F44] group-hover:text-[#D4AF37] transition-colors leading-tight truncate">
                  {{ poa.clientFullName }}
                </h3>
                <p class="text-sm text-gray-600 font-medium mt-0.5 truncate">
                  {{ getTypeLabel(poa.type) }} POA
                </p>
              </div>

              <!-- Creado -->
              <div class="flex items-center gap-1.5 flex-shrink-0 text-xs">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
                  <line x1="16" x2="16" y1="2" y2="6"/>
                  <line x1="8" x2="8" y1="2" y2="6"/>
                  <line x1="3" x2="21" y1="10" y2="10"/>
                </svg>
                <span class="text-gray-500">Creado:</span>
                <span class="font-bold text-gray-900">{{ new Date(poa.createdAt).toLocaleDateString() }}</span>
              </div>

              <!-- Enviado -->
              <div v-if="poa.submittedAt" class="flex items-center gap-1.5 flex-shrink-0 text-xs">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="m22 2-7 20-4-9-9-4Z"/>
                  <path d="M22 2 11 13"/>
                </svg>
                <span class="text-gray-500">Enviado:</span>
                <span class="font-bold text-gray-900">{{ new Date(poa.submittedAt).toLocaleDateString() }}</span>
              </div>

              <!-- Aprobado -->
              <div v-if="poa.approvedAt" class="flex items-center gap-1.5 flex-shrink-0 text-xs">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <path d="m9 11 3 3L22 4"/>
                </svg>
                <span class="text-gray-500">Aprobado:</span>
                <span class="font-bold text-gray-900">{{ new Date(poa.approvedAt).toLocaleDateString() }}</span>
              </div>

              <!-- Spacer -->
              <div class="flex-1"></div>

              <!-- Status Badge -->
              <span
                :class="['px-3 py-1.5 rounded-xl text-xs font-bold shadow-sm flex-shrink-0', getStatusBadgeClasses(poa.status)]"
              >
                {{ getStatusLabel(poa.status) }}
              </span>

              <!-- Ver detalles -->
              <div class="flex items-center gap-2 text-[#D4AF37] flex-shrink-0 ml-4">
                <span class="font-bold text-sm">Ver detalles</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M5 12h14"/>
                  <path d="m12 5 7 7-7 7"/>
                </svg>
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
