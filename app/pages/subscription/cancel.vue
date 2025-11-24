<script setup lang="ts">
definePageMeta({
  layout: 'default',
  middleware: 'auth',
})

useSeoMeta({
  title: 'Pago Cancelado - Emigrantes FT',
  description: 'El proceso de pago fue cancelado',
})

const router = useRouter()

const handleRetry = () => {
  router.push('/planes')
}

const handleContact = () => {
  openWhatsApp('Hola, intenté realizar un pago pero tuve problemas. ¿Pueden ayudarme?')
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 flex items-center">
    <div class="container mx-auto px-4 max-w-xl">
      <div class="bg-white rounded-3xl shadow-xl p-8 text-center">
        <!-- Icon -->
        <div class="w-20 h-20 mx-auto mb-6 rounded-full bg-yellow-100 flex items-center justify-center">
          <Icon name="lucide:x-circle" class="w-10 h-10 text-yellow-500" />
        </div>

        <!-- Title -->
        <h1 class="text-3xl font-bold text-[#0A1F44] mb-4">
          Pago Cancelado
        </h1>

        <!-- Description -->
        <p class="text-gray-600 text-lg mb-8">
          El proceso de pago fue cancelado. No te preocupes, no se realizó ningún cargo a tu tarjeta.
        </p>

        <!-- Options -->
        <div class="space-y-4">
          <button
            @click="handleRetry"
            class="w-full py-4 px-6 bg-gradient-to-r from-[#D4AF37] to-amber-500 text-[#0A1F44] font-bold text-lg rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Icon name="lucide:refresh-cw" class="w-5 h-5" />
            <span>Intentar de Nuevo</span>
          </button>

          <button
            @click="router.push('/dashboard')"
            class="w-full py-4 px-6 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all duration-300"
          >
            Ir al Dashboard
          </button>
        </div>

        <!-- Help Section -->
        <div class="mt-8 pt-6 border-t border-gray-200">
          <p class="text-gray-600 mb-4">
            ¿Tuviste algún problema con el pago?
          </p>

          <div class="space-y-3">
            <div class="flex items-center gap-3 text-sm text-gray-600">
              <Icon name="lucide:help-circle" class="w-5 h-5 text-gray-400" />
              <span>Verifica que tu tarjeta esté habilitada para compras internacionales</span>
            </div>
            <div class="flex items-center gap-3 text-sm text-gray-600">
              <Icon name="lucide:shield" class="w-5 h-5 text-gray-400" />
              <span>Asegúrate de tener fondos suficientes</span>
            </div>
            <div class="flex items-center gap-3 text-sm text-gray-600">
              <Icon name="lucide:credit-card" class="w-5 h-5 text-gray-400" />
              <span>Intenta con otra tarjeta si el problema persiste</span>
            </div>
          </div>
        </div>

        <!-- Contact Support -->
        <div class="mt-6">
          <button
            @click="handleContact"
            class="inline-flex items-center gap-2 text-[#D4AF37] font-semibold hover:underline"
          >
            <Icon name="lucide:message-circle" class="w-5 h-5" />
            Contactar Soporte
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
