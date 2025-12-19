<script setup lang="ts">
/**
 * Refresh de Stripe Connect
 * Página para reintentar la conexión con Stripe
 */

definePageMeta({
  layout: 'auth',
  middleware: 'auth'
})

const { connectStripeAccount } = useAgent()
const router = useRouter()

const isConnecting = ref(false)

const handleRetry = async () => {
  isConnecting.value = true
  await connectStripeAccount()
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
    <div class="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
      <div class="w-16 h-16 mx-auto mb-4 bg-yellow-100 rounded-full flex items-center justify-center">
        <Icon name="lucide:refresh-cw" class="w-8 h-8 text-yellow-600" />
      </div>

      <h2 class="text-xl font-bold text-[#0A1F44] mb-2">Sesión Expirada</h2>
      <p class="text-gray-600 mb-6">
        La sesión de conexión con Stripe ha expirado. Por favor, intenta conectar tu cuenta nuevamente.
      </p>

      <div class="space-y-3">
        <button
          @click="handleRetry"
          :disabled="isConnecting"
          class="w-full px-6 py-3 bg-[#635BFF] text-white rounded-lg font-semibold hover:bg-[#4F46E5] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <Icon v-if="isConnecting" name="lucide:loader-2" class="w-5 h-5 animate-spin" />
          <Icon v-else name="lucide:refresh-cw" class="w-5 h-5" />
          {{ isConnecting ? 'Conectando...' : 'Reintentar Conexión' }}
        </button>

        <NuxtLink
          to="/agentes/perfil"
          class="inline-flex items-center justify-center gap-2 w-full px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
        >
          <Icon name="lucide:arrow-left" class="w-4 h-4" />
          Volver al perfil
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
