<script setup lang="ts">
definePageMeta({
  layout: 'default',
  middleware: 'auth',
})

useSeoMeta({
  title: 'Mi Suscripción - Emigrantes FT',
  description: 'Gestiona tu suscripción a Emigrantes FT',
})

const router = useRouter()
const toast = useToast()
const {
  currentSubscription,
  payments,
  fetchMySubscription,
  fetchPayments,
  cancelSubscription,
  getPlanText,
  getStatusText,
  formatPrice,
  loading,
  error,
} = useSubscription()

const subscriptionLoading = ref(true)
const paymentsLoading = ref(false)
const showCancelDialog = ref(false)
const cancelReason = ref('')
const cancelAtPeriodEnd = ref(true)
const cancelling = ref(false)

// Get status badge color
const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    active: 'bg-green-100 text-green-700',
    pending_payment: 'bg-yellow-100 text-yellow-700',
    pending_contract: 'bg-blue-100 text-blue-700',
    cancelled: 'bg-red-100 text-red-700',
    suspended: 'bg-orange-100 text-orange-700',
    expired: 'bg-gray-100 text-gray-700',
    past_due: 'bg-red-100 text-red-700',
  }
  return colors[status] || 'bg-gray-100 text-gray-700'
}

// Get payment status color
const getPaymentStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    completed: 'text-green-600',
    pending: 'text-yellow-600',
    processing: 'text-blue-600',
    failed: 'text-red-600',
    refunded: 'text-gray-600',
  }
  return colors[status] || 'text-gray-600'
}

// Format date
const formatDate = (date?: string) => {
  if (!date) return '-'
  return new Date(date).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// Load data
onMounted(async () => {
  try {
    subscriptionLoading.value = true
    await fetchMySubscription()

    if (!currentSubscription.value) {
      // No subscription, redirect to plans
      toast.info('Sin suscripción', 'Elige un plan para comenzar')
      router.push('/planes')
      return
    }

    // Load payments
    paymentsLoading.value = true
    await fetchPayments()
  } catch (e) {
    console.error('Error loading subscription:', e)
  } finally {
    subscriptionLoading.value = false
    paymentsLoading.value = false
  }
})

// Handle cancel
const handleCancel = async () => {
  if (!cancelReason.value.trim()) {
    toast.error('Error', 'Por favor indica la razón de cancelación')
    return
  }

  cancelling.value = true
  try {
    const success = await cancelSubscription(cancelReason.value, cancelAtPeriodEnd.value)
    if (success) {
      toast.success('Suscripción cancelada', cancelAtPeriodEnd.value
        ? 'Tu suscripción se cancelará al final del período actual'
        : 'Tu suscripción ha sido cancelada')
      showCancelDialog.value = false
    } else {
      toast.error('Error', error.value || 'No se pudo cancelar la suscripción')
    }
  } catch (e: any) {
    toast.error('Error', e.message || 'Error al cancelar')
  } finally {
    cancelling.value = false
  }
}

// Plan features
const planFeatures: Record<string, string[]> = {
  basic: [
    'Representación Financiera Básica',
    'Custodia Segura de Instrucciones',
    'Ejecución Limitada (hasta 3 por año)',
    'Reportes Trimestrales',
    'Soporte por Email',
    'Dashboard Personal',
  ],
  standard: [
    'Representación Financiera Completa',
    'Custodia Segura de Instrucciones',
    'Ejecución Ilimitada',
    'Reportes Mensuales Detallados',
    'Actualizaciones Ilimitadas',
    'Asistencia Legal Incluida',
    'Soporte Prioritario (24/7)',
    'Dashboard Personal Avanzado',
  ],
  premium: [
    'Representación Financiera Premium',
    'Ejecución Ilimitada con Prioridad',
    'Reportes Semanales Detallados',
    'Asistencia Legal Premium 24/7',
    'Soporte VIP Dedicado',
    'Dashboard Personal Premium',
    'Programa de Adelanto de Fondos',
    'Fondo de Emergencia FT',
    'Notarización Remota Incluida',
  ],
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="container mx-auto px-4 max-w-5xl">
      <!-- Header -->
      <div class="mb-8">
        <NuxtLink to="/dashboard" class="inline-flex items-center gap-2 text-gray-600 hover:text-[#0A1F44] mb-4">
          <Icon name="lucide:arrow-left" class="w-4 h-4" />
          Volver al Dashboard
        </NuxtLink>
        <h1 class="text-3xl font-bold text-[#0A1F44]">Mi Suscripción</h1>
      </div>

      <!-- Loading -->
      <div v-if="subscriptionLoading" class="space-y-6">
        <div class="bg-white rounded-2xl shadow-lg p-8 animate-pulse">
          <div class="h-6 bg-gray-200 rounded w-48 mb-4"></div>
          <div class="h-4 bg-gray-200 rounded w-32"></div>
        </div>
      </div>

      <!-- Content -->
      <div v-else-if="currentSubscription" class="space-y-6">
        <!-- Subscription Card -->
        <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
          <!-- Header -->
          <div class="bg-gradient-to-r from-[#0A1F44] to-blue-800 p-6 text-white">
            <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div class="flex items-center gap-3 mb-2">
                  <h2 class="text-2xl font-bold">{{ getPlanText(currentSubscription.planType) }}</h2>
                  <span :class="['px-3 py-1 text-sm font-semibold rounded-full', getStatusColor(currentSubscription.status)]">
                    {{ getStatusText(currentSubscription.status) }}
                  </span>
                </div>
                <p class="text-gray-300">
                  Miembro desde {{ formatDate(currentSubscription.createdAt) }}
                </p>
              </div>
              <div class="text-right">
                <p class="text-4xl font-bold text-[#D4AF37]">{{ formatPrice(currentSubscription.monthlyPrice) }}</p>
                <p class="text-gray-300">por mes</p>
              </div>
            </div>
          </div>

          <!-- Details -->
          <div class="p-6">
            <div class="grid md:grid-cols-2 gap-6">
              <!-- Left Column -->
              <div class="space-y-4">
                <h3 class="font-semibold text-[#0A1F44] mb-3">Detalles de la Suscripción</h3>

                <div class="flex justify-between py-2 border-b border-gray-100">
                  <span class="text-gray-600">Estado</span>
                  <span class="font-semibold">{{ getStatusText(currentSubscription.status) }}</span>
                </div>

                <div class="flex justify-between py-2 border-b border-gray-100">
                  <span class="text-gray-600">Pago inicial</span>
                  <span class="font-semibold">
                    {{ currentSubscription.initialPaymentType === 'installments' ? 'En cuotas' : 'Pago único' }}
                    ({{ currentSubscription.initialPaymentStatus === 'completed' ? 'Completado' : 'Pendiente' }})
                  </span>
                </div>

                <div v-if="currentSubscription.initialPaymentType === 'installments'" class="flex justify-between py-2 border-b border-gray-100">
                  <span class="text-gray-600">Cuotas pagadas</span>
                  <span class="font-semibold">{{ currentSubscription.installmentsPaid }} de {{ currentSubscription.totalInstallments }}</span>
                </div>

                <div v-if="currentSubscription.status === 'active'" class="flex justify-between py-2 border-b border-gray-100">
                  <span class="text-gray-600">Próximo cobro</span>
                  <span class="font-semibold">{{ formatDate(currentSubscription.nextBillingDate) }}</span>
                </div>

                <div class="flex justify-between py-2 border-b border-gray-100">
                  <span class="text-gray-600">Contrato</span>
                  <span class="font-semibold" :class="currentSubscription.contractSigned ? 'text-green-600' : 'text-yellow-600'">
                    {{ currentSubscription.contractSigned ? 'Firmado' : 'Pendiente' }}
                  </span>
                </div>
              </div>

              <!-- Right Column - Features -->
              <div>
                <h3 class="font-semibold text-[#0A1F44] mb-3">Incluido en tu plan</h3>
                <ul class="space-y-2">
                  <li v-for="(feature, idx) in planFeatures[currentSubscription.planType]" :key="idx" class="flex items-start gap-2">
                    <svg class="w-5 h-5 text-green-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span class="text-gray-700 text-sm">{{ feature }}</span>
                  </li>
                </ul>
              </div>
            </div>

            <!-- Actions -->
            <div class="mt-6 pt-6 border-t border-gray-200 flex flex-wrap gap-3">
              <NuxtLink
                v-if="currentSubscription.status === 'pending_payment'"
                :to="`/subscription/checkout?plan=${currentSubscription.planType}&payment=${currentSubscription.initialPaymentType}`"
                class="px-4 py-2 bg-[#D4AF37] text-[#0A1F44] font-semibold rounded-lg hover:bg-[#B8941F] transition-colors"
              >
                Completar Pago
              </NuxtLink>
              <button
                v-if="['active', 'pending_contract'].includes(currentSubscription.status)"
                @click="showCancelDialog = true"
                class="px-4 py-2 bg-red-100 text-red-700 font-semibold rounded-lg hover:bg-red-200 transition-colors"
              >
                Cancelar Suscripción
              </button>
              <NuxtLink
                to="/planes"
                class="px-4 py-2 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cambiar Plan
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- Payments History -->
        <div class="bg-white rounded-2xl shadow-lg p-6">
          <h3 class="text-xl font-bold text-[#0A1F44] mb-4">Historial de Pagos</h3>

          <div v-if="paymentsLoading" class="animate-pulse space-y-3">
            <div class="h-12 bg-gray-200 rounded"></div>
            <div class="h-12 bg-gray-200 rounded"></div>
          </div>

          <div v-else-if="payments.length === 0" class="text-center py-8">
            <Icon name="lucide:receipt" class="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p class="text-gray-500">No hay pagos registrados</p>
          </div>

          <div v-else class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="text-left border-b border-gray-200">
                  <th class="pb-3 font-semibold text-gray-600">Fecha</th>
                  <th class="pb-3 font-semibold text-gray-600">Descripción</th>
                  <th class="pb-3 font-semibold text-gray-600">Estado</th>
                  <th class="pb-3 font-semibold text-gray-600 text-right">Monto</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="payment in payments" :key="payment.id" class="border-b border-gray-100">
                  <td class="py-3 text-sm">{{ formatDate(payment.createdAt) }}</td>
                  <td class="py-3 text-sm">{{ payment.description }}</td>
                  <td class="py-3">
                    <span :class="['text-sm font-medium', getPaymentStatusColor(payment.status)]">
                      {{ payment.status === 'completed' ? 'Completado' : payment.status === 'pending' ? 'Pendiente' : payment.status }}
                    </span>
                  </td>
                  <td class="py-3 text-right font-semibold">{{ formatPrice(payment.amount) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Support -->
        <div class="bg-gradient-to-r from-[#0A1F44] to-blue-800 rounded-2xl p-6 text-white">
          <div class="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 class="text-xl font-bold mb-1">¿Necesitas ayuda?</h3>
              <p class="text-gray-300">Nuestro equipo está disponible para asistirte</p>
            </div>
            <button
              @click="openWhatsApp('Hola, tengo una consulta sobre mi suscripción')"
              class="px-6 py-3 bg-white text-[#0A1F44] font-bold rounded-xl hover:shadow-lg transition-all duration-300"
            >
              Contactar Soporte
            </button>
          </div>
        </div>
      </div>

      <!-- Cancel Dialog -->
      <Teleport to="body">
        <div v-if="showCancelDialog" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div class="bg-white rounded-2xl shadow-xl max-w-md w-full p-6" @click.stop>
            <h3 class="text-xl font-bold text-[#0A1F44] mb-2">Cancelar Suscripción</h3>
            <p class="text-gray-600 mb-4">Lamentamos que quieras irte. ¿Podrías decirnos por qué?</p>

            <div class="space-y-4">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Razón de cancelación *</label>
                <textarea
                  v-model="cancelReason"
                  rows="3"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                  placeholder="Cuéntanos por qué quieres cancelar..."
                ></textarea>
              </div>

              <div class="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="cancelAtPeriodEnd"
                  v-model="cancelAtPeriodEnd"
                  class="rounded border-gray-300 text-[#D4AF37] focus:ring-[#D4AF37]"
                />
                <label for="cancelAtPeriodEnd" class="text-sm text-gray-700">
                  Cancelar al final del período actual (seguirás teniendo acceso hasta entonces)
                </label>
              </div>

              <div class="flex gap-3 pt-4">
                <button
                  @click="showCancelDialog = false"
                  class="flex-1 px-4 py-2 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Mantener Suscripción
                </button>
                <button
                  @click="handleCancel"
                  :disabled="cancelling || !cancelReason.trim()"
                  class="flex-1 px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                  {{ cancelling ? 'Cancelando...' : 'Confirmar Cancelación' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </Teleport>
    </div>
  </div>
</template>
