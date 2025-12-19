<script setup lang="ts">
/**
 * Callback de Stripe Connect
 * Página de retorno después de conectar cuenta de Stripe
 */

definePageMeta({
  layout: 'auth',
  middleware: 'auth'
})

const { getStripeStatus, getMyProfile } = useAgent()
const router = useRouter()
const toast = useToast()

const status = ref<'loading' | 'success' | 'error'>('loading')
const message = ref('')

onMounted(async () => {
  try {
    // Actualizar perfil del agente
    await getMyProfile()

    // Verificar estado de Stripe
    const result = await getStripeStatus()

    if (result.success && result.data?.isConnected) {
      status.value = 'success'
      message.value = result.data.isVerified
        ? 'Tu cuenta de Stripe ha sido conectada y verificada correctamente.'
        : 'Tu cuenta de Stripe ha sido conectada. Es posible que necesites completar la verificación.'

      toast.success('Cuenta conectada', message.value)
    } else {
      status.value = 'error'
      message.value = 'No se pudo verificar la conexión con Stripe. Por favor, intenta de nuevo.'
    }
  } catch (error) {
    status.value = 'error'
    message.value = 'Ocurrió un error al procesar la conexión. Por favor, intenta de nuevo.'
  }

  // Redirigir después de unos segundos
  setTimeout(() => {
    router.push('/agentes/perfil')
  }, 3000)
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
    <div class="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
      <!-- Loading -->
      <div v-if="status === 'loading'" class="py-8">
        <Icon name="lucide:loader-2" class="w-16 h-16 mx-auto mb-4 text-[#635BFF] animate-spin" />
        <h2 class="text-xl font-bold text-[#0A1F44] mb-2">Verificando conexión...</h2>
        <p class="text-gray-600">Por favor espera mientras verificamos tu cuenta de Stripe.</p>
      </div>

      <!-- Success -->
      <div v-else-if="status === 'success'" class="py-8">
        <div class="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
          <Icon name="lucide:check" class="w-8 h-8 text-green-600" />
        </div>
        <h2 class="text-xl font-bold text-[#0A1F44] mb-2">Cuenta Conectada</h2>
        <p class="text-gray-600 mb-6">{{ message }}</p>
        <p class="text-sm text-gray-500">Redirigiendo a tu perfil...</p>
      </div>

      <!-- Error -->
      <div v-else class="py-8">
        <div class="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
          <Icon name="lucide:x" class="w-8 h-8 text-red-600" />
        </div>
        <h2 class="text-xl font-bold text-[#0A1F44] mb-2">Error de Conexión</h2>
        <p class="text-gray-600 mb-6">{{ message }}</p>
        <NuxtLink
          to="/agentes/perfil"
          class="inline-flex items-center gap-2 px-6 py-3 bg-[#D4AF37] text-[#0A1F44] rounded-lg font-semibold hover:bg-[#0A1F44] hover:text-white transition-colors"
        >
          <Icon name="lucide:arrow-left" class="w-4 h-4" />
          Volver al perfil
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
