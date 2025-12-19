<script setup lang="ts">
/**
 * Landing page del programa de agentes
 * Información y registro para nuevos agentes
 */

definePageMeta({
  layout: 'default'
})

const { isAuthenticated } = useAuth()
const { isAgent, getPublicSettings } = useAgent()
const router = useRouter()

const settings = ref<{
  defaultCommissionRate: number
  cookieExpirationDays: number
  minimumPayout: number
  stripeConnectEnabled: boolean
} | null>(null)

// Cargar configuración pública
onMounted(async () => {
  const result = await getPublicSettings()
  if (result.success) {
    settings.value = result.data
  }
})

// Redirigir si ya es agente
watchEffect(() => {
  if (isAgent.value) {
    router.push('/agentes/dashboard')
  }
})

const features = [
  {
    icon: 'lucide:link',
    title: 'Enlace Único',
    description: 'Obtén tu enlace de referido personalizado para compartir con potenciales clientes'
  },
  {
    icon: 'lucide:chart-line',
    title: 'Seguimiento en Tiempo Real',
    description: 'Monitorea tus referidos, conversiones y ganancias desde tu panel de control'
  },
  {
    icon: 'lucide:wallet',
    title: 'Comisiones Competitivas',
    description: 'Gana comisiones por cada cliente que se suscriba usando tu enlace'
  },
  {
    icon: 'lucide:credit-card',
    title: 'Pagos con Stripe',
    description: 'Recibe tus pagos de forma segura y rápida a través de Stripe Connect'
  }
]

const steps = [
  {
    number: 1,
    title: 'Regístrate como Agente',
    description: 'Crea tu cuenta o inicia sesión y completa el registro de agente'
  },
  {
    number: 2,
    title: 'Obtén tu Enlace',
    description: 'Recibe tu enlace único de referido para compartir'
  },
  {
    number: 3,
    title: 'Comparte y Gana',
    description: 'Comparte tu enlace y gana comisiones por cada cliente referido'
  },
  {
    number: 4,
    title: 'Recibe tus Pagos',
    description: 'Conecta tu cuenta de Stripe y recibe tus ganancias'
  }
]
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="bg-gradient-to-br from-[#0A1F44] to-blue-900 text-white py-20">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto text-center">
          <span class="inline-block px-4 py-1 bg-[#D4AF37]/20 text-[#D4AF37] rounded-full text-sm font-medium mb-6">
            Programa de Agentes
          </span>
          <h1 class="text-4xl md:text-5xl font-bold mb-6">
            Gana Dinero Refiriendo Clientes
          </h1>
          <p class="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Únete a nuestro programa de agentes y gana comisiones por cada cliente que se suscriba a través de tu enlace de referido.
          </p>

          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <NuxtLink
              v-if="!isAuthenticated"
              to="/auth/register"
              class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#D4AF37] text-[#0A1F44] rounded-lg font-bold hover:bg-white transition-colors"
            >
              <Icon name="lucide:user-plus" class="w-5 h-5" />
              Registrarme como Agente
            </NuxtLink>
            <NuxtLink
              v-else
              to="/agentes/register"
              class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#D4AF37] text-[#0A1F44] rounded-lg font-bold hover:bg-white transition-colors"
            >
              <Icon name="lucide:rocket" class="w-5 h-5" />
              Convertirme en Agente
            </NuxtLink>
            <NuxtLink
              to="/auth/login"
              v-if="!isAuthenticated"
              class="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white text-white rounded-lg font-bold hover:bg-white hover:text-[#0A1F44] transition-colors"
            >
              <Icon name="lucide:log-in" class="w-5 h-5" />
              Ya soy Agente
            </NuxtLink>
          </div>

          <!-- Comisión destacada -->
          <div v-if="settings" class="mt-12 bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-md mx-auto">
            <p class="text-gray-300 text-sm mb-2">Comisión por referido</p>
            <p class="text-5xl font-bold text-[#D4AF37]">{{ settings.defaultCommissionRate }}%</p>
            <p class="text-gray-400 text-sm mt-2">de cada venta generada</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20 bg-gray-50">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-[#0A1F44] mb-4">
            Beneficios del Programa
          </h2>
          <p class="text-gray-600 max-w-2xl mx-auto">
            Todo lo que necesitas para empezar a generar ingresos como agente de Emigrantes FT
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div
            v-for="feature in features"
            :key="feature.title"
            class="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div class="w-12 h-12 bg-[#D4AF37]/10 rounded-lg flex items-center justify-center mb-4">
              <Icon :name="feature.icon" class="w-6 h-6 text-[#D4AF37]" />
            </div>
            <h3 class="text-lg font-bold text-[#0A1F44] mb-2">{{ feature.title }}</h3>
            <p class="text-gray-600 text-sm">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- How it Works -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-[#0A1F44] mb-4">
            ¿Cómo Funciona?
          </h2>
          <p class="text-gray-600 max-w-2xl mx-auto">
            Comenzar a ganar como agente es muy sencillo
          </p>
        </div>

        <div class="max-w-4xl mx-auto">
          <div class="grid md:grid-cols-2 gap-8">
            <div
              v-for="step in steps"
              :key="step.number"
              class="flex gap-4"
            >
              <div class="shrink-0 w-12 h-12 bg-[#0A1F44] text-white rounded-full flex items-center justify-center font-bold text-lg">
                {{ step.number }}
              </div>
              <div>
                <h3 class="text-lg font-bold text-[#0A1F44] mb-1">{{ step.title }}</h3>
                <p class="text-gray-600 text-sm">{{ step.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-[#0A1F44]">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl font-bold text-white mb-6">
          ¿Listo para Empezar?
        </h2>
        <p class="text-gray-300 mb-8 max-w-xl mx-auto">
          Únete hoy y comienza a generar ingresos compartiendo nuestros servicios con tu red de contactos.
        </p>
        <NuxtLink
          :to="isAuthenticated ? '/agentes/register' : '/auth/register'"
          class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#D4AF37] text-[#0A1F44] rounded-lg font-bold hover:bg-white transition-colors"
        >
          <Icon name="lucide:rocket" class="w-5 h-5" />
          Comenzar Ahora
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
