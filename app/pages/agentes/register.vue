<script setup lang="ts">
/**
 * Página de registro como agente
 * Permite a usuarios autenticados registrarse como agentes
 */

definePageMeta({
  layout: 'default',
  middleware: 'auth'
})

const { user } = useAuth()
const { registerAsAgent, isAgent, loading, error } = useAgent()
const toast = useToast()
const router = useRouter()

// Redirigir si ya es agente
watchEffect(() => {
  if (isAgent.value) {
    router.push('/agentes/dashboard')
  }
})

const form = reactive({
  paymentMethod: '',
  paymentDetails: '',
  acceptTerms: false
})

const formErrors = reactive({
  paymentMethod: '',
  paymentDetails: '',
  acceptTerms: ''
})

const paymentMethods = [
  { value: 'stripe', label: 'Stripe Connect (Recomendado)', description: 'Pagos automáticos y seguros' },
  { value: 'paypal', label: 'PayPal', description: 'Pagos manuales vía PayPal' },
  { value: 'zelle', label: 'Zelle', description: 'Pagos manuales vía Zelle' },
  { value: 'other', label: 'Otro', description: 'Coordinar método de pago' }
]

const validateForm = (): boolean => {
  formErrors.paymentMethod = ''
  formErrors.paymentDetails = ''
  formErrors.acceptTerms = ''

  let isValid = true

  if (!form.acceptTerms) {
    formErrors.acceptTerms = 'Debes aceptar los términos y condiciones'
    isValid = false
  }

  return isValid
}

const handleSubmit = async () => {
  if (!validateForm()) return

  const result = await registerAsAgent({
    paymentMethod: form.paymentMethod || undefined,
    paymentDetails: form.paymentDetails || undefined
  })

  if (result.success) {
    toast.success('Registro exitoso', 'Te has registrado como agente. Estamos revisando tu solicitud.')
    router.push('/agentes/dashboard')
  } else {
    toast.error('Error', result.error || 'No se pudo completar el registro')
  }
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-2xl mx-auto">
        <!-- Header -->
        <div class="text-center mb-8">
          <NuxtLink to="/agentes" class="inline-flex items-center gap-2 text-gray-600 hover:text-[#0A1F44] mb-4 transition-colors">
            <Icon name="lucide:arrow-left" class="w-4 h-4" />
            Volver
          </NuxtLink>
          <h1 class="text-3xl font-bold text-[#0A1F44] mb-2">
            Registro de Agente
          </h1>
          <p class="text-gray-600">
            Completa tu registro para convertirte en agente de Emigrantes FT
          </p>
        </div>

        <!-- Form Card -->
        <div class="bg-white rounded-2xl shadow-xl p-8">
          <!-- User Info -->
          <div v-if="user" class="bg-gray-50 rounded-lg p-4 mb-6">
            <p class="text-sm text-gray-500 mb-1">Registrándote como:</p>
            <p class="font-semibold text-[#0A1F44]">{{ user.firstName }} {{ user.lastName }}</p>
            <p class="text-gray-600 text-sm">{{ user.email }}</p>
          </div>

          <!-- Error Message -->
          <div v-if="error" class="bg-red-50 border-l-4 border-red-500 p-4 rounded-md mb-6">
            <div class="flex">
              <Icon name="lucide:alert-circle" class="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <p class="ml-3 text-sm text-red-700">{{ error }}</p>
            </div>
          </div>

          <form @submit.prevent="handleSubmit" class="space-y-6">
            <!-- Payment Method -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-3">
                Método de Pago Preferido (Opcional)
              </label>
              <div class="space-y-3">
                <label
                  v-for="method in paymentMethods"
                  :key="method.value"
                  class="flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition-colors"
                  :class="form.paymentMethod === method.value ? 'border-[#D4AF37] bg-[#D4AF37]/5' : 'border-gray-200 hover:border-gray-300'"
                >
                  <input
                    type="radio"
                    :value="method.value"
                    v-model="form.paymentMethod"
                    class="mt-1 text-[#D4AF37] focus:ring-[#D4AF37]"
                  />
                  <div>
                    <p class="font-medium text-[#0A1F44]">{{ method.label }}</p>
                    <p class="text-sm text-gray-500">{{ method.description }}</p>
                  </div>
                </label>
              </div>
            </div>

            <!-- Payment Details -->
            <div v-if="form.paymentMethod && form.paymentMethod !== 'stripe'">
              <label for="paymentDetails" class="block text-sm font-semibold text-gray-700 mb-2">
                Detalles de Pago
              </label>
              <input
                id="paymentDetails"
                v-model="form.paymentDetails"
                type="text"
                :placeholder="form.paymentMethod === 'paypal' ? 'Email de PayPal' : form.paymentMethod === 'zelle' ? 'Número de Zelle' : 'Detalles del método de pago'"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
              />
              <p class="mt-1 text-sm text-gray-500">
                Puedes completar esto más tarde desde tu perfil
              </p>
            </div>

            <!-- Stripe Connect Info -->
            <div v-if="form.paymentMethod === 'stripe'" class="bg-blue-50 rounded-lg p-4">
              <div class="flex gap-3">
                <Icon name="lucide:info" class="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <p class="font-medium text-blue-800">Stripe Connect</p>
                  <p class="text-sm text-blue-600 mt-1">
                    Después del registro, podrás conectar tu cuenta de Stripe desde tu panel de agente para recibir pagos automáticos.
                  </p>
                </div>
              </div>
            </div>

            <!-- Terms -->
            <div>
              <label class="flex items-start gap-3">
                <input
                  type="checkbox"
                  v-model="form.acceptTerms"
                  class="mt-1 h-4 w-4 text-[#D4AF37] focus:ring-[#D4AF37] border-gray-300 rounded"
                />
                <span class="text-sm text-gray-600">
                  Acepto los <NuxtLink to="/terminos" class="text-[#D4AF37] hover:underline">términos y condiciones</NuxtLink> del programa de agentes y la <NuxtLink to="/privacidad" class="text-[#D4AF37] hover:underline">política de privacidad</NuxtLink>.
                </span>
              </label>
              <p v-if="formErrors.acceptTerms" class="mt-2 text-sm text-red-600">{{ formErrors.acceptTerms }}</p>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              :disabled="loading"
              class="w-full flex justify-center items-center gap-2 py-4 px-6 bg-[#D4AF37] text-[#0A1F44] rounded-lg font-bold hover:bg-[#0A1F44] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Icon v-if="loading" name="lucide:loader-2" class="w-5 h-5 animate-spin" />
              <Icon v-else name="lucide:rocket" class="w-5 h-5" />
              <span>{{ loading ? 'Registrando...' : 'Registrarme como Agente' }}</span>
            </button>
          </form>

          <!-- Info Box -->
          <div class="mt-6 bg-gray-50 rounded-lg p-4">
            <h4 class="font-semibold text-[#0A1F44] mb-2">¿Qué pasa después?</h4>
            <ul class="text-sm text-gray-600 space-y-2">
              <li class="flex items-start gap-2">
                <Icon name="lucide:check" class="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                <span>Tu solicitud será revisada por nuestro equipo</span>
              </li>
              <li class="flex items-start gap-2">
                <Icon name="lucide:check" class="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                <span>Una vez aprobado, tendrás acceso a tu enlace de referido</span>
              </li>
              <li class="flex items-start gap-2">
                <Icon name="lucide:check" class="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                <span>Podrás monitorear tus referidos y comisiones desde tu panel</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
