<script setup lang="ts">
/**
 * Perfil del agente
 * Configuración de cuenta y conexión con Stripe
 */

definePageMeta({
  layout: 'default',
  middleware: 'auth'
})

const {
  agent,
  updateMyProfile,
  getStripeStatus,
  connectStripeAccount,
  getStripeLoginLink,
  disconnectStripeAccount,
  loading
} = useAgent()
const toast = useToast()

const stripeStatus = ref<any>(null)
const isConnecting = ref(false)
const isDisconnecting = ref(false)

const form = reactive({
  paymentMethod: '',
  paymentDetails: ''
})

const paymentMethods = [
  { value: 'stripe', label: 'Stripe Connect' },
  { value: 'paypal', label: 'PayPal' },
  { value: 'zelle', label: 'Zelle' },
  { value: 'other', label: 'Otro' }
]

// Cargar datos
onMounted(async () => {
  if (agent.value) {
    form.paymentMethod = agent.value.paymentMethod || ''
    form.paymentDetails = agent.value.paymentDetails || ''
  }

  const result = await getStripeStatus()
  if (result.success) {
    stripeStatus.value = result.data
  }
})

// Actualizar perfil
const handleUpdateProfile = async () => {
  const result = await updateMyProfile({
    paymentMethod: form.paymentMethod || undefined,
    paymentDetails: form.paymentDetails || undefined
  })

  if (result.success) {
    toast.success('Perfil actualizado', 'Los cambios se han guardado correctamente')
  } else {
    toast.error('Error', result.error || 'No se pudo actualizar el perfil')
  }
}

// Conectar Stripe
const handleConnectStripe = async () => {
  isConnecting.value = true
  await connectStripeAccount()
}

// Abrir dashboard de Stripe
const handleOpenStripeDashboard = async () => {
  const result = await getStripeLoginLink()
  if (result.success && result.url) {
    window.open(result.url, '_blank')
  } else {
    toast.error('Error', 'No se pudo abrir el dashboard de Stripe')
  }
}

// Desconectar Stripe
const handleDisconnectStripe = async () => {
  if (!confirm('¿Estás seguro de que quieres desconectar tu cuenta de Stripe? No podrás recibir pagos automáticos.')) {
    return
  }

  isDisconnecting.value = true
  const result = await disconnectStripeAccount()

  if (result.success) {
    stripeStatus.value = null
    toast.success('Cuenta desconectada', 'Tu cuenta de Stripe ha sido desconectada')
  } else {
    toast.error('Error', result.error || 'No se pudo desconectar la cuenta')
  }
  isDisconnecting.value = false
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-2xl mx-auto">
        <!-- Header -->
        <div class="mb-8">
          <NuxtLink to="/agentes/dashboard" class="inline-flex items-center gap-2 text-gray-600 hover:text-[#0A1F44] mb-4 transition-colors">
            <Icon name="lucide:arrow-left" class="w-4 h-4" />
            Volver al Dashboard
          </NuxtLink>
          <h1 class="text-3xl font-bold text-[#0A1F44]">Mi Perfil de Agente</h1>
          <p class="text-gray-600 mt-1">Configura tu cuenta y método de pago</p>
        </div>

        <!-- Agent Info -->
        <div class="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 class="text-lg font-semibold text-[#0A1F44] mb-4">Información del Agente</h2>

          <div class="space-y-4">
            <div class="flex items-center justify-between py-2 border-b">
              <span class="text-gray-500">Código de Referido</span>
              <span class="font-mono font-semibold text-[#0A1F44]">{{ agent?.referralCode }}</span>
            </div>
            <div class="flex items-center justify-between py-2 border-b">
              <span class="text-gray-500">Tasa de Comisión</span>
              <span class="font-semibold text-[#0A1F44]">{{ agent?.commissionRate }}%</span>
            </div>
            <div class="flex items-center justify-between py-2 border-b">
              <span class="text-gray-500">Estado</span>
              <span
                class="px-2 py-1 rounded text-xs font-medium"
                :class="{
                  'bg-green-100 text-green-800': agent?.status === 'approved',
                  'bg-yellow-100 text-yellow-800': agent?.status === 'pending',
                  'bg-red-100 text-red-800': agent?.status === 'suspended'
                }"
              >
                {{ agent?.status === 'approved' ? 'Activo' : agent?.status === 'pending' ? 'Pendiente' : 'Suspendido' }}
              </span>
            </div>
            <div class="flex items-center justify-between py-2">
              <span class="text-gray-500">Miembro desde</span>
              <span class="text-gray-700">{{ agent?.createdAt ? new Date(agent.createdAt).toLocaleDateString() : '-' }}</span>
            </div>
          </div>
        </div>

        <!-- Stripe Connect -->
        <div class="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-semibold text-[#0A1F44]">Stripe Connect</h2>
            <Icon name="simple-icons:stripe" class="w-8 h-8 text-[#635BFF]" />
          </div>

          <p class="text-gray-600 text-sm mb-6">
            Conecta tu cuenta de Stripe para recibir pagos de comisiones de forma automática y segura.
          </p>

          <!-- Connected State -->
          <div v-if="stripeStatus?.isConnected">
            <div class="bg-gray-50 rounded-lg p-4 mb-4">
              <div class="flex items-center gap-3 mb-2">
                <Icon
                  :name="stripeStatus.isVerified ? 'lucide:check-circle' : 'lucide:alert-circle'"
                  :class="stripeStatus.isVerified ? 'text-green-500' : 'text-yellow-500'"
                  class="w-5 h-5"
                />
                <span class="font-medium text-[#0A1F44]">
                  {{ stripeStatus.isVerified ? 'Cuenta verificada' : 'Verificación pendiente' }}
                </span>
              </div>
              <p class="text-sm text-gray-500">
                ID de cuenta: {{ stripeStatus.accountId }}
              </p>
            </div>

            <!-- Requirements Warning -->
            <div v-if="stripeStatus.requiresAction" class="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg mb-4">
              <div class="flex">
                <Icon name="lucide:alert-triangle" class="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                <div class="ml-3">
                  <p class="text-sm font-medium text-yellow-800">Acción requerida</p>
                  <p class="text-sm text-yellow-700 mt-1">
                    Tu cuenta de Stripe requiere información adicional. Haz clic en "Abrir Dashboard" para completar la verificación.
                  </p>
                </div>
              </div>
            </div>

            <div class="flex gap-3">
              <button
                @click="handleOpenStripeDashboard"
                class="px-4 py-2 bg-[#635BFF] text-white rounded-lg hover:bg-[#4F46E5] transition-colors flex items-center gap-2"
              >
                <Icon name="lucide:external-link" class="w-4 h-4" />
                Abrir Dashboard
              </button>
              <button
                @click="handleDisconnectStripe"
                :disabled="isDisconnecting"
                class="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50"
              >
                {{ isDisconnecting ? 'Desconectando...' : 'Desconectar' }}
              </button>
            </div>
          </div>

          <!-- Not Connected State -->
          <div v-else>
            <button
              @click="handleConnectStripe"
              :disabled="isConnecting"
              class="w-full px-6 py-4 bg-[#635BFF] text-white rounded-lg hover:bg-[#4F46E5] transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Icon v-if="isConnecting" name="lucide:loader-2" class="w-5 h-5 animate-spin" />
              <Icon v-else name="lucide:link" class="w-5 h-5" />
              <span>{{ isConnecting ? 'Conectando...' : 'Conectar con Stripe' }}</span>
            </button>
          </div>
        </div>

        <!-- Payment Method (Alternative) -->
        <div class="bg-white rounded-xl shadow-sm p-6">
          <h2 class="text-lg font-semibold text-[#0A1F44] mb-4">Método de Pago Alternativo</h2>

          <form @submit.prevent="handleUpdateProfile" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Método preferido</label>
              <select
                v-model="form.paymentMethod"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
              >
                <option value="">Seleccionar...</option>
                <option v-for="method in paymentMethods" :key="method.value" :value="method.value">
                  {{ method.label }}
                </option>
              </select>
            </div>

            <div v-if="form.paymentMethod && form.paymentMethod !== 'stripe'">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                {{ form.paymentMethod === 'paypal' ? 'Email de PayPal' : form.paymentMethod === 'zelle' ? 'Número de Zelle' : 'Detalles de pago' }}
              </label>
              <input
                v-model="form.paymentDetails"
                type="text"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                placeholder="Ingresa los detalles de pago"
              />
            </div>

            <button
              type="submit"
              :disabled="loading"
              class="w-full py-3 bg-[#D4AF37] text-[#0A1F44] rounded-lg font-semibold hover:bg-[#0A1F44] hover:text-white transition-colors disabled:opacity-50"
            >
              {{ loading ? 'Guardando...' : 'Guardar Cambios' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
