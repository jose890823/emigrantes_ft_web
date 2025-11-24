<script setup lang="ts">
definePageMeta({
  layout: 'default',
  middleware: 'auth',
})

useSeoMeta({
  title: 'Pago Exitoso - Emigrantes FT',
  description: 'Tu pago ha sido procesado exitosamente',
})

const route = useRoute()
const router = useRouter()
const { fetchMySubscription, currentSubscription, loading } = useSubscription()

const sessionId = computed(() => route.query.session_id as string | undefined)

// Cargar suscripción actualizada
onMounted(async () => {
  await fetchMySubscription()
})

const handleContinue = () => {
  router.push('/dashboard')
}

const getStatusInfo = computed(() => {
  if (!currentSubscription.value) {
    return {
      title: 'Procesando tu Pago',
      description: 'Estamos verificando tu pago. Esto puede tomar unos segundos.',
      icon: 'lucide:loader-2',
      iconClass: 'animate-spin text-blue-500',
      showButton: false,
    }
  }

  switch (currentSubscription.value.status) {
    case 'pending_contract':
      return {
        title: '¡Pago Exitoso!',
        description: 'Tu pago ha sido procesado correctamente. El siguiente paso es firmar el contrato de servicio.',
        icon: 'lucide:check-circle-2',
        iconClass: 'text-green-500',
        showButton: true,
        buttonText: 'Ir al Dashboard',
        nextStep: 'Pronto recibirás un email con el contrato para firmar digitalmente.',
      }
    case 'active':
      return {
        title: '¡Suscripción Activa!',
        description: 'Tu suscripción está activa. Ya puedes comenzar a utilizar todos los servicios.',
        icon: 'lucide:check-circle-2',
        iconClass: 'text-green-500',
        showButton: true,
        buttonText: 'Ir al Dashboard',
      }
    case 'pending_payment':
      return {
        title: 'Pago Pendiente',
        description: 'Tu pago aún está siendo procesado. Te notificaremos cuando se confirme.',
        icon: 'lucide:clock',
        iconClass: 'text-yellow-500',
        showButton: true,
        buttonText: 'Ir al Dashboard',
      }
    default:
      return {
        title: 'Procesando',
        description: 'Estamos procesando tu solicitud.',
        icon: 'lucide:loader-2',
        iconClass: 'animate-spin text-blue-500',
        showButton: true,
        buttonText: 'Ir al Dashboard',
      }
  }
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-12 flex items-center">
    <div class="container mx-auto px-4 max-w-xl">
      <div class="bg-white rounded-3xl shadow-xl p-8 text-center">
        <!-- Icon -->
        <div class="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
          <Icon :name="getStatusInfo.icon" :class="['w-10 h-10', getStatusInfo.iconClass]" />
        </div>

        <!-- Title -->
        <h1 class="text-3xl font-bold text-[#0A1F44] mb-4">
          {{ getStatusInfo.title }}
        </h1>

        <!-- Description -->
        <p class="text-gray-600 text-lg mb-6">
          {{ getStatusInfo.description }}
        </p>

        <!-- Subscription Info -->
        <div v-if="currentSubscription" class="bg-gray-50 rounded-xl p-4 mb-6">
          <div class="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p class="text-gray-500">Plan</p>
              <p class="font-semibold text-[#0A1F44]">
                {{ currentSubscription.planType === 'basic' ? 'Básico' : currentSubscription.planType === 'standard' ? 'Estándar' : 'Premium' }}
              </p>
            </div>
            <div>
              <p class="text-gray-500">Mensualidad</p>
              <p class="font-semibold text-[#0A1F44]">${{ currentSubscription.monthlyPrice }}/mes</p>
            </div>
            <div>
              <p class="text-gray-500">Pago Inicial</p>
              <p class="font-semibold text-[#0A1F44]">
                {{ currentSubscription.initialPaymentStatus === 'completed' ? 'Completado' : 'En proceso' }}
              </p>
            </div>
            <div>
              <p class="text-gray-500">Estado</p>
              <p class="font-semibold text-green-600">
                {{ currentSubscription.status === 'pending_contract' ? 'Pendiente Contrato' : currentSubscription.status === 'active' ? 'Activa' : 'Procesando' }}
              </p>
            </div>
          </div>
        </div>

        <!-- Loading -->
        <div v-if="loading" class="mb-6">
          <div class="animate-pulse flex space-x-4 items-center justify-center">
            <div class="h-4 bg-gray-200 rounded w-48"></div>
          </div>
        </div>

        <!-- Next Step -->
        <div v-if="getStatusInfo.nextStep" class="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <div class="flex items-start gap-3">
            <Icon name="lucide:info" class="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
            <p class="text-sm text-blue-700 text-left">{{ getStatusInfo.nextStep }}</p>
          </div>
        </div>

        <!-- Action Button -->
        <button
          v-if="getStatusInfo.showButton"
          @click="handleContinue"
          class="w-full py-4 px-6 bg-gradient-to-r from-[#D4AF37] to-amber-500 text-[#0A1F44] font-bold text-lg rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
        >
          <span>{{ getStatusInfo.buttonText }}</span>
          <Icon name="lucide:arrow-right" class="w-5 h-5" />
        </button>

        <!-- Support -->
        <p class="text-sm text-gray-500 mt-6">
          ¿Necesitas ayuda?
          <button @click="openWhatsApp('Hola, acabo de realizar un pago y tengo una consulta')" class="text-[#D4AF37] font-semibold hover:underline">
            Contáctanos
          </button>
        </p>
      </div>

      <!-- Confetti animation -->
      <div v-if="currentSubscription && ['active', 'pending_contract'].includes(currentSubscription.status)" class="fixed inset-0 pointer-events-none overflow-hidden">
        <div v-for="i in 20" :key="i" class="confetti" :style="{ left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 3}s` }"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes confetti-fall {
  0% {
    transform: translateY(-100vh) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(100vh) rotate(720deg);
    opacity: 0;
  }
}

.confetti {
  position: absolute;
  width: 10px;
  height: 10px;
  background: linear-gradient(135deg, #D4AF37, #FFD700);
  animation: confetti-fall 4s ease-out forwards;
}

.confetti:nth-child(even) {
  background: linear-gradient(135deg, #0A1F44, #1E3A5F);
  width: 8px;
  height: 8px;
}

.confetti:nth-child(3n) {
  background: linear-gradient(135deg, #22C55E, #16A34A);
  border-radius: 50%;
}
</style>
