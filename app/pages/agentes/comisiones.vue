<script setup lang="ts">
/**
 * Lista de comisiones del agente
 */
import type { Commission, CommissionStatus } from '~/types/agent'

definePageMeta({
  layout: 'default',
  middleware: 'auth'
})

const { getMyCommissions, loading } = useAgent()

const commissions = ref<Commission[]>([])
const totalPages = ref(1)
const currentPage = ref(1)
const selectedStatus = ref<CommissionStatus | ''>('')

const statusOptions = [
  { value: '', label: 'Todas' },
  { value: 'pending', label: 'Pendientes' },
  { value: 'approved', label: 'Aprobadas' },
  { value: 'paid', label: 'Pagadas' },
  { value: 'rejected', label: 'Rechazadas' }
]

const loadCommissions = async () => {
  const result = await getMyCommissions({
    status: selectedStatus.value || undefined,
    page: currentPage.value,
    limit: 10
  })

  if (result.success && result.data) {
    commissions.value = result.data.items
    totalPages.value = result.data.totalPages
  }
}

onMounted(loadCommissions)

watch([selectedStatus, currentPage], loadCommissions)

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount)
}

const statusStyles: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  approved: 'bg-blue-100 text-blue-800',
  paid: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800'
}

const statusLabels: Record<string, string> = {
  pending: 'Pendiente',
  approved: 'Aprobada',
  paid: 'Pagada',
  rejected: 'Rechazada'
}

// Resumen de comisiones
const summary = computed(() => {
  const pending = commissions.value
    .filter(c => c.status === 'pending' || c.status === 'approved')
    .reduce((sum, c) => sum + Number(c.commissionAmount), 0)

  const paid = commissions.value
    .filter(c => c.status === 'paid')
    .reduce((sum, c) => sum + Number(c.commissionAmount), 0)

  return { pending, paid }
})
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
        <h1 class="text-3xl font-bold text-[#0A1F44]">Mis Comisiones</h1>
        <p class="text-gray-600 mt-1">Historial de comisiones generadas por tus referidos</p>
      </div>

      <!-- Summary Cards -->
      <div class="grid sm:grid-cols-2 gap-4 mb-6">
        <div class="bg-white rounded-xl shadow-sm p-6">
          <div class="flex items-center gap-3 mb-2">
            <div class="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Icon name="lucide:clock" class="w-5 h-5 text-yellow-600" />
            </div>
            <span class="text-sm text-gray-500">Pendiente de Pago</span>
          </div>
          <p class="text-2xl font-bold text-[#0A1F44]">{{ formatCurrency(summary.pending) }}</p>
        </div>

        <div class="bg-white rounded-xl shadow-sm p-6">
          <div class="flex items-center gap-3 mb-2">
            <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Icon name="lucide:check-circle" class="w-5 h-5 text-green-600" />
            </div>
            <span class="text-sm text-gray-500">Total Pagado</span>
          </div>
          <p class="text-2xl font-bold text-[#0A1F44]">{{ formatCurrency(summary.paid) }}</p>
        </div>
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

        <div v-else-if="commissions.length === 0" class="text-center py-20 text-gray-500">
          <Icon name="lucide:dollar-sign" class="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p class="text-lg">No tienes comisiones aún</p>
          <p class="text-sm mt-1">Las comisiones se generan cuando tus referidos realizan compras</p>
        </div>

        <table v-else class="w-full">
          <thead class="bg-gray-50 border-b">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descripción</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Venta</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comisión</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-for="commission in commissions" :key="commission.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 text-sm text-gray-500">
                {{ new Date(commission.createdAt).toLocaleDateString() }}
              </td>
              <td class="px-6 py-4 text-sm text-gray-700">
                {{ commission.description || 'Comisión por referido' }}
              </td>
              <td class="px-6 py-4 text-sm text-gray-500">
                {{ formatCurrency(commission.saleAmount) }}
              </td>
              <td class="px-6 py-4">
                <span class="font-semibold text-[#0A1F44]">
                  {{ formatCurrency(commission.commissionAmount) }}
                </span>
                <span class="text-xs text-gray-500 ml-1">({{ commission.commissionRate }}%)</span>
              </td>
              <td class="px-6 py-4">
                <span :class="['px-2 py-1 rounded text-xs font-medium', statusStyles[commission.status]]">
                  {{ statusLabels[commission.status] }}
                </span>
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
