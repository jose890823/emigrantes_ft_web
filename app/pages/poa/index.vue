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
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 class="text-3xl font-bold text-[#0A1F44]">Mis POAs</h1>
          <p class="text-gray-600 mt-2">Gestiona tus poderes notariales duraderos</p>
        </div>
        <NuxtLink to="/poa/create" class="mt-4 md:mt-0">
          <button class="flex items-center gap-2 px-6 py-3 bg-[#D4AF37] text-[#0A1F44] font-bold rounded-lg hover:bg-[#0A1F44] hover:text-white transition-all duration-300 shadow-md hover:shadow-xl">
            <Icon name="lucide:plus" class="w-5 h-5" />
            Crear Nuevo POA
          </button>
        </NuxtLink>
      </div>

      <!-- Filters -->
      <div class="bg-white rounded-xl shadow-md p-6 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Search -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Buscar</label>
            <div class="relative">
              <Icon name="lucide:search" class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Buscar por nombre o tipo..."
                class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
              />
            </div>
          </div>

          <!-- Status Filter -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Estado</label>
            <select
              v-model="selectedStatus"
              @change="loadPoas"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
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
      <div v-if="isLoading" class="flex justify-center py-12">
        <Icon name="lucide:loader-2" class="w-8 h-8 text-[#D4AF37] animate-spin" />
      </div>

      <div v-else-if="filteredPoas.length === 0" class="bg-white rounded-xl shadow-md p-12 text-center">
        <Icon name="lucide:inbox" class="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 class="text-xl font-semibold text-gray-700 mb-2">No se encontraron POAs</h3>
        <p class="text-gray-500 mb-6">
          {{ poas.length === 0 ? 'Aún no has creado ningún POA' : 'No hay POAs que coincidan con tu búsqueda' }}
        </p>
        <NuxtLink v-if="poas.length === 0" to="/poa/create">
          <button class="px-6 py-3 bg-[#D4AF37] text-[#0A1F44] font-bold rounded-lg hover:bg-[#0A1F44] hover:text-white transition-all duration-300">
            Crear Mi Primer POA
          </button>
        </NuxtLink>
      </div>

      <div v-else class="grid grid-cols-1 gap-6">
        <NuxtLink
          v-for="poa in filteredPoas"
          :key="poa.id"
          :to="`/poa/${poa.id}`"
          class="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
        >
          <div class="p-6">
            <div class="flex items-start justify-between mb-4">
              <div class="flex-1">
                <h3 class="text-xl font-bold text-[#0A1F44] group-hover:text-[#D4AF37] transition-colors">
                  {{ poa.clientFullName }}
                </h3>
                <p class="text-sm text-gray-500 mt-1">
                  {{ getTypeLabel(poa.type) }} POA
                </p>
              </div>
              <span
                :class="['px-3 py-1 rounded-full text-xs font-semibold', getStatusBadgeClasses(poa.status)]"
              >
                {{ getStatusLabel(poa.status) }}
              </span>
            </div>

            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p class="text-gray-500">Creado</p>
                <p class="font-semibold text-gray-900">
                  {{ new Date(poa.createdAt).toLocaleDateString() }}
                </p>
              </div>
              <div v-if="poa.submittedAt">
                <p class="text-gray-500">Enviado</p>
                <p class="font-semibold text-gray-900">
                  {{ new Date(poa.submittedAt).toLocaleDateString() }}
                </p>
              </div>
              <div v-if="poa.approvedAt">
                <p class="text-gray-500">Aprobado</p>
                <p class="font-semibold text-gray-900">
                  {{ new Date(poa.approvedAt).toLocaleDateString() }}
                </p>
              </div>
              <div class="flex items-center gap-2 text-[#D4AF37]">
                <Icon name="lucide:arrow-right" class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                <span class="font-semibold">Ver detalles</span>
              </div>
            </div>
          </div>

          <div class="h-1" :style="{ backgroundColor: getStatusBarColor(poa.status) }"></div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
