<script setup lang="ts">
/**
 * Lista de referidos del agente
 */
import type { Referral, ReferralStatus } from '~/types/agent'

definePageMeta({
  layout: 'default',
  middleware: 'auth'
})

const { getMyReferrals, loading } = useAgent()

const referrals = ref<Referral[]>([])
const totalPages = ref(1)
const currentPage = ref(1)
const selectedStatus = ref<ReferralStatus | ''>('')

const statusOptions = [
  { value: '', label: 'Todos' },
  { value: 'registered', label: 'Registrados' },
  { value: 'converted', label: 'Convertidos' },
  { value: 'expired', label: 'Expirados' }
]

const loadReferrals = async () => {
  const result = await getMyReferrals({
    status: selectedStatus.value || undefined,
    page: currentPage.value,
    limit: 10
  })

  if (result.success && result.data) {
    referrals.value = result.data.items
    totalPages.value = result.data.totalPages
  }
}

onMounted(loadReferrals)

watch([selectedStatus, currentPage], loadReferrals)

const statusStyles: Record<string, string> = {
  registered: 'bg-yellow-100 text-yellow-800',
  converted: 'bg-green-100 text-green-800',
  expired: 'bg-gray-100 text-gray-800'
}

const statusLabels: Record<string, string> = {
  registered: 'Registrado',
  converted: 'Convertido',
  expired: 'Expirado'
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <NuxtLink to="/agentes/dashboard" class="inline-flex items-center gap-2 text-gray-600 hover:text-[#0A1F44] mb-4 transition-colors">
          <Icon name="lucide:arrow-left" class="w-4 h-4" />
          Volver al Dashboard
        </NuxtLink>
        <h1 class="text-3xl font-bold text-[#0A1F44]">Mis Referidos</h1>
        <p class="text-gray-600 mt-1">Listado de todos los usuarios que se registraron con tu enlace</p>
      </div>

      <!-- Filters -->
      <div class="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div class="flex flex-col sm:flex-row gap-4">
          <div class="sm:w-48">
            <label class="block text-sm font-medium text-gray-700 mb-1">Estado</label>
            <select
              v-model="selectedStatus"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
            >
              <option v-for="option in statusOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <!-- Table -->
      <div class="bg-white rounded-xl shadow-sm overflow-hidden">
        <div v-if="loading" class="flex items-center justify-center py-20">
          <Icon name="lucide:loader-2" class="w-8 h-8 animate-spin text-[#D4AF37]" />
        </div>

        <div v-else-if="referrals.length === 0" class="text-center py-20 text-gray-500">
          <Icon name="lucide:users" class="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p class="text-lg">No tienes referidos aún</p>
          <p class="text-sm mt-1">Comparte tu enlace para empezar a ganar comisiones</p>
        </div>

        <table v-else class="w-full">
          <thead class="bg-gray-50 border-b">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usuario</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha Registro</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conversión</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-for="referral in referrals" :key="referral.id" class="hover:bg-gray-50">
              <td class="px-6 py-4">
                <div>
                  <p class="font-medium text-[#0A1F44]">
                    {{ referral.referredUser?.firstName }} {{ referral.referredUser?.lastName }}
                  </p>
                  <p class="text-sm text-gray-500">{{ referral.referredUser?.email }}</p>
                </div>
              </td>
              <td class="px-6 py-4 text-sm text-gray-500">
                {{ new Date(referral.createdAt).toLocaleDateString() }}
              </td>
              <td class="px-6 py-4">
                <span :class="['px-2 py-1 rounded text-xs font-medium', statusStyles[referral.status]]">
                  {{ statusLabels[referral.status] }}
                </span>
              </td>
              <td class="px-6 py-4 text-sm text-gray-500">
                {{ referral.convertedAt ? new Date(referral.convertedAt).toLocaleDateString() : '-' }}
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="px-6 py-4 border-t flex items-center justify-between">
          <button
            @click="currentPage--"
            :disabled="currentPage === 1"
            class="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Anterior
          </button>
          <span class="text-sm text-gray-500">Página {{ currentPage }} de {{ totalPages }}</span>
          <button
            @click="currentPage++"
            :disabled="currentPage === totalPages"
            class="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
