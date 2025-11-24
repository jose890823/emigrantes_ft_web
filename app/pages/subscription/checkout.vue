<script setup lang="ts">
import type { SubscriptionPlan, InitialPaymentType } from '~/types/api'

definePageMeta({
  layout: 'default',
  middleware: 'auth',
})

useSeoMeta({
  title: 'Checkout - Emigrantes FT',
  description: 'Completa tu suscripción a Emigrantes FT',
})

const route = useRoute()
const router = useRouter()
const toast = useToast()
const { redirectToCheckout, loading, error, fetchMySubscription, currentSubscription } = useSubscription()

// Obtener plan y tipo de pago de los query params
const planType = computed(() => (route.query.plan as SubscriptionPlan) || 'standard')
const paymentType = computed(() => (route.query.payment as InitialPaymentType) || 'single')

// Información de planes
const planInfo: Record<SubscriptionPlan, { name: string; monthlyPrice: number; initialPayment: number; installmentAmount: number; features: string[] }> = {
  basic: {
    name: 'Plan Básico',
    monthlyPrice: 14,
    initialPayment: 129,
    installmentAmount: 43,
    features: [
      'Representación Financiera Básica',
      'Custodia Segura de Instrucciones',
      'Ejecución Limitada (hasta 3 por año)',
      'Reportes Trimestrales',
      'Soporte por Email',
    ],
  },
  standard: {
    name: 'Plan Estándar',
    monthlyPrice: 24,
    initialPayment: 199,
    installmentAmount: 66.33,
    features: [
      'Representación Financiera Completa',
      'Custodia Segura de Instrucciones',
      'Ejecución Ilimitada',
      'Reportes Mensuales Detallados',
      'Soporte Prioritario (24/7)',
    ],
  },
  premium: {
    name: 'Plan Premium',
    monthlyPrice: 39,
    initialPayment: 299,
    installmentAmount: 99.67,
    features: [
      'Representación Financiera Premium',
      'Ejecución Ilimitada con Prioridad',
      'Asistencia Legal Premium 24/7',
      'Programa de Adelanto de Fondos',
      'Notarización Remota Incluida',
    ],
  },
}

const currentPlanInfo = computed(() => planInfo[planType.value])

const totalInitial = computed(() => {
  if (paymentType.value === 'installments') {
    return currentPlanInfo.value.installmentAmount
  }
  return currentPlanInfo.value.initialPayment
})

const isProcessing = ref(false)

// Verificar si ya tiene suscripción
onMounted(async () => {
  await fetchMySubscription()
  if (currentSubscription.value && ['active', 'pending_contract'].includes(currentSubscription.value.status)) {
    toast.info('Ya tienes una suscripción', 'Serás redirigido a tu dashboard')
    setTimeout(() => router.push('/dashboard'), 2000)
  }
})

const handleCheckout = async () => {
  isProcessing.value = true

  try {
    const success = await redirectToCheckout(planType.value, paymentType.value)

    if (!success) {
      toast.error('Error', error.value || 'No se pudo iniciar el proceso de pago')
    }
  } catch (e: any) {
    toast.error('Error', e.message || 'Error inesperado')
  } finally {
    isProcessing.value = false
  }
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(price)
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="container mx-auto px-4 max-w-4xl">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-[#0A1F44]">Completa tu Suscripción</h1>
        <p class="text-gray-600 mt-2">Solo un paso más para proteger tu patrimonio</p>
      </div>

      <div class="grid md:grid-cols-2 gap-8">
        <!-- Plan Summary -->
        <div class="bg-white rounded-2xl shadow-lg p-6 h-fit">
          <h2 class="text-xl font-bold text-[#0A1F44] mb-4">Resumen del Pedido</h2>

          <div class="space-y-4">
            <!-- Plan Info -->
            <div class="border-b border-gray-200 pb-4">
              <div class="flex items-center justify-between">
                <span class="font-semibold text-lg">{{ currentPlanInfo.name }}</span>
                <NuxtLink to="/planes" class="text-sm text-[#D4AF37] hover:underline">
                  Cambiar
                </NuxtLink>
              </div>
              <p class="text-gray-600 text-sm mt-1">{{ formatPrice(currentPlanInfo.monthlyPrice) }}/mes después del pago inicial</p>
            </div>

            <!-- Features -->
            <div class="pb-4">
              <p class="font-medium text-gray-700 mb-2">Incluye:</p>
              <ul class="space-y-2">
                <li v-for="(feature, idx) in currentPlanInfo.features" :key="idx" class="flex items-start gap-2 text-sm text-gray-600">
                  <svg class="w-5 h-5 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  {{ feature }}
                </li>
              </ul>
            </div>

            <!-- Payment Type -->
            <div class="border-t border-gray-200 pt-4">
              <p class="text-sm text-gray-600 mb-2">Tipo de pago inicial:</p>
              <div class="flex gap-2">
                <NuxtLink
                  :to="{ query: { ...route.query, payment: 'single' } }"
                  :class="[
                    'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                    paymentType === 'single'
                      ? 'bg-[#0A1F44] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  ]"
                >
                  Pago Único
                </NuxtLink>
                <NuxtLink
                  :to="{ query: { ...route.query, payment: 'installments' } }"
                  :class="[
                    'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                    paymentType === 'installments'
                      ? 'bg-[#0A1F44] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  ]"
                >
                  3 Cuotas
                </NuxtLink>
              </div>
            </div>

            <!-- Price Breakdown -->
            <div class="border-t border-gray-200 pt-4 space-y-2">
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">
                  {{ paymentType === 'installments' ? 'Primera cuota (1 de 3)' : 'Pago inicial' }}
                </span>
                <span class="font-medium">{{ formatPrice(totalInitial) }}</span>
              </div>
              <div v-if="paymentType === 'installments'" class="flex justify-between text-sm text-gray-500">
                <span>Próximas 2 cuotas</span>
                <span>{{ formatPrice(currentPlanInfo.installmentAmount) }} c/u</span>
              </div>
            </div>

            <!-- Total -->
            <div class="border-t border-gray-200 pt-4">
              <div class="flex justify-between items-center">
                <span class="font-bold text-lg">Total a pagar hoy</span>
                <span class="text-2xl font-bold text-[#D4AF37]">{{ formatPrice(totalInitial) }}</span>
              </div>
              <p class="text-xs text-gray-500 mt-1">
                + {{ formatPrice(currentPlanInfo.monthlyPrice) }}/mes a partir del siguiente ciclo
              </p>
            </div>
          </div>
        </div>

        <!-- Checkout Action -->
        <div class="space-y-6">
          <div class="bg-white rounded-2xl shadow-lg p-6">
            <h2 class="text-xl font-bold text-[#0A1F44] mb-4">Método de Pago</h2>

            <div class="bg-gray-50 rounded-xl p-4 mb-6">
              <div class="flex items-center gap-3">
                <div class="w-12 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded flex items-center justify-center">
                  <span class="text-white text-xs font-bold">STRIPE</span>
                </div>
                <div>
                  <p class="font-medium text-gray-900">Pago Seguro con Stripe</p>
                  <p class="text-xs text-gray-500">Aceptamos todas las tarjetas principales</p>
                </div>
              </div>
            </div>

            <!-- Cards accepted -->
            <div class="flex items-center gap-3 mb-6">
              <span class="text-sm text-gray-500">Aceptamos:</span>
              <div class="flex gap-2">
                <div class="w-10 h-6 bg-blue-900 rounded flex items-center justify-center text-white text-xs font-bold">VISA</div>
                <div class="w-10 h-6 bg-red-500 rounded flex items-center justify-center text-white text-xs font-bold">MC</div>
                <div class="w-10 h-6 bg-blue-500 rounded flex items-center justify-center text-white text-xs font-bold">AMEX</div>
              </div>
            </div>

            <!-- Error -->
            <div v-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <p class="text-sm text-red-700">{{ error }}</p>
            </div>

            <!-- Checkout Button -->
            <button
              @click="handleCheckout"
              :disabled="isProcessing || loading"
              class="w-full py-4 px-6 bg-gradient-to-r from-[#D4AF37] to-amber-500 text-[#0A1F44] font-bold text-lg rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Icon v-if="isProcessing || loading" name="lucide:loader-2" class="w-5 h-5 animate-spin" />
              <span>{{ isProcessing || loading ? 'Procesando...' : 'Proceder al Pago' }}</span>
              <Icon v-if="!isProcessing && !loading" name="lucide:arrow-right" class="w-5 h-5" />
            </button>

            <p class="text-xs text-gray-500 text-center mt-4">
              Serás redirigido a Stripe para completar el pago de forma segura
            </p>
          </div>

          <!-- Security badges -->
          <div class="bg-white rounded-2xl shadow-lg p-6">
            <h3 class="font-semibold text-gray-900 mb-4">Pago 100% Seguro</h3>
            <div class="space-y-3">
              <div class="flex items-center gap-3">
                <Icon name="lucide:shield-check" class="w-5 h-5 text-green-500" />
                <span class="text-sm text-gray-600">Encriptación SSL de 256 bits</span>
              </div>
              <div class="flex items-center gap-3">
                <Icon name="lucide:lock" class="w-5 h-5 text-green-500" />
                <span class="text-sm text-gray-600">Procesado por Stripe (PCI Compliant)</span>
              </div>
              <div class="flex items-center gap-3">
                <Icon name="lucide:credit-card" class="w-5 h-5 text-green-500" />
                <span class="text-sm text-gray-600">No almacenamos datos de tu tarjeta</span>
              </div>
            </div>
          </div>

          <!-- Help -->
          <div class="text-center">
            <p class="text-sm text-gray-600">
              ¿Tienes preguntas?
              <button @click="openWhatsApp('Hola, tengo una consulta sobre el proceso de pago')" class="text-[#D4AF37] font-semibold hover:underline">
                Contáctanos
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
