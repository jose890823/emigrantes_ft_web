<script setup lang="ts">
definePageMeta({
  layout: 'default',
})

useSeoMeta({
  title: 'Planes y Precios - Emigrantes FT',
  description: 'Elige el plan perfecto para proteger tu patrimonio. Planes desde $14/mes con pago inicial flexible.',
  ogTitle: 'Planes y Precios - Emigrantes FT',
  ogDescription: 'Elige el plan perfecto para proteger tu patrimonio. Planes desde $14/mes con pago inicial flexible.',
})

interface Plan {
  type: 'basic' | 'standard' | 'premium'
  name: string
  description: string
  monthlyPrice: number
  initialPayment: number
  installmentAmount: number
  installmentCount: number
  features: string[]
  isRecommended: boolean
  badgeColor: string
  icon: string
}

const plans: Plan[] = [
  {
    type: 'basic',
    name: 'Plan Básico',
    description: 'Protección esencial para emigrantes que buscan proteger sus activos.',
    monthlyPrice: 14,
    initialPayment: 129,
    installmentAmount: 43,
    installmentCount: 3,
    features: [
      'Representación Financiera Básica',
      'Custodia Segura de Instrucciones',
      'Ejecución Limitada (hasta 3 por año)',
      'Reportes Trimestrales',
      'Soporte por Email',
      'Dashboard Personal',
    ],
    isRecommended: false,
    badgeColor: '#6B7280',
    icon: 'shield',
  },
  {
    type: 'standard',
    name: 'Plan Estándar',
    description: 'Plan ideal para familias que buscan protección completa y tranquilidad.',
    monthlyPrice: 24,
    initialPayment: 199,
    installmentAmount: 66.33,
    installmentCount: 3,
    features: [
      'Representación Financiera Completa',
      'Custodia Segura de Instrucciones',
      'Ejecución Ilimitada',
      'Reportes Mensuales Detallados',
      'Actualizaciones Ilimitadas',
      'Asistencia Legal Incluida',
      'Soporte Prioritario (24/7)',
      'Dashboard Personal Avanzado',
    ],
    isRecommended: true,
    badgeColor: '#3B82F6',
    icon: 'shield-check',
  },
  {
    type: 'premium',
    name: 'Plan Premium',
    description: 'Máxima protección y servicios exclusivos para tranquilidad absoluta.',
    monthlyPrice: 39,
    initialPayment: 299,
    installmentAmount: 99.67,
    installmentCount: 3,
    features: [
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
    isRecommended: false,
    badgeColor: '#8B5CF6',
    icon: 'crown',
  },
]

const selectedPaymentType = ref<'single' | 'installments'>('single')
const openFaqIndex = ref<number | null>(null)

const faqs = [
  {
    question: '¿Qué incluye el pago inicial?',
    answer: 'El pago inicial cubre la configuración de tu cuenta, verificación de identidad, preparación del POA y acceso inmediato a tu dashboard personal.',
  },
  {
    question: '¿Puedo pagar el inicial en cuotas?',
    answer: 'Sí, ofrecemos la opción de dividir el pago inicial en 3 cuotas mensuales sin intereses adicionales.',
  },
  {
    question: '¿Cuándo se cobra la mensualidad?',
    answer: 'La mensualidad comienza a cobrarse después de completar el pago inicial y la firma del contrato.',
  },
  {
    question: '¿Puedo cambiar de plan?',
    answer: 'Sí, puedes actualizar tu plan en cualquier momento. La diferencia se prorrateará automáticamente.',
  },
  {
    question: '¿Puedo cancelar en cualquier momento?',
    answer: 'Sí, puedes cancelar cuando quieras desde tu dashboard. No hay penalizaciones ni contratos largos.',
  },
  {
    question: '¿Qué pasa si necesito más ejecuciones en el plan básico?',
    answer: 'Puedes actualizar al plan Estándar o Premium en cualquier momento para obtener ejecuciones ilimitadas.',
  },
]

const toggleFaq = (index: number) => {
  openFaqIndex.value = openFaqIndex.value === index ? null : index
}

const handleSelectPlan = (plan: Plan) => {
  // Navegar a registro con el plan seleccionado
  navigateTo({
    path: '/auth/register',
    query: {
      plan: plan.type,
      payment: selectedPaymentType.value,
    },
  })
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(price)
}

const whatsappMessage = 'Hola, me gustaría obtener más información sobre los planes de Emigrantes FT.'

const handleContactWhatsApp = () => {
  openWhatsApp(whatsappMessage)
}
</script>

<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="relative py-16 lg:py-24 overflow-hidden bg-gradient-to-br from-[#0A1F44] via-blue-900 to-[#0A1F44]">
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="floating-shape w-96 h-96 bg-[#D4AF37]/10 blur-3xl -top-48 -left-48"></div>
        <div class="floating-shape w-80 h-80 bg-blue-500/10 blur-3xl top-1/4 right-1/4" style="animation-delay: 2s"></div>
      </div>

      <div class="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto text-center space-y-6">
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 backdrop-blur-sm">
            <span class="text-[#D4AF37] font-semibold text-sm">3 Planes Disponibles</span>
          </div>

          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Elige el plan
            <span class="block bg-linear-to-r from-[#D4AF37] via-yellow-300 to-[#D4AF37] bg-clip-text text-transparent mt-2">
              perfecto para ti
            </span>
          </h1>

          <p class="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Protege tu patrimonio con el nivel de servicio que necesitas. Todos los planes incluyen pago inicial flexible.
          </p>
        </div>
      </div>
    </section>

    <!-- Payment Type Toggle -->
    <section class="py-8 bg-gray-50 sticky top-0 z-40 shadow-sm">
      <div class="container mx-auto px-4">
        <div class="flex justify-center items-center gap-4">
          <span class="text-sm text-gray-600">Tipo de pago inicial:</span>
          <div class="inline-flex rounded-full bg-white border-2 border-gray-200 p-1">
            <button
              @click="selectedPaymentType = 'single'"
              :class="[
                'px-6 py-2 rounded-full text-sm font-semibold transition-all',
                selectedPaymentType === 'single'
                  ? 'bg-[#0A1F44] text-white'
                  : 'text-gray-600 hover:text-gray-900'
              ]"
            >
              Pago Único
            </button>
            <button
              @click="selectedPaymentType = 'installments'"
              :class="[
                'px-6 py-2 rounded-full text-sm font-semibold transition-all',
                selectedPaymentType === 'installments'
                  ? 'bg-[#0A1F44] text-white'
                  : 'text-gray-600 hover:text-gray-900'
              ]"
            >
              3 Cuotas
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Plans Grid -->
    <section class="py-16 lg:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <div
            v-for="plan in plans"
            :key="plan.type"
            :class="[
              'relative rounded-3xl overflow-hidden transition-all duration-300 hover-lift',
              plan.isRecommended
                ? 'border-2 border-[#D4AF37] shadow-2xl scale-105 z-10'
                : 'border-2 border-gray-200 shadow-lg'
            ]"
          >
            <!-- Recommended Badge -->
            <div v-if="plan.isRecommended" class="absolute -top-0 left-0 right-0">
              <div class="bg-gradient-to-r from-amber-400 to-amber-600 text-center py-2">
                <span class="text-white font-bold text-sm">Recomendado</span>
              </div>
            </div>

            <div :class="['bg-white p-8', plan.isRecommended ? 'pt-12' : '']">
              <!-- Plan Header -->
              <div class="text-center mb-6">
                <div class="inline-flex w-16 h-16 rounded-2xl items-center justify-center mb-4" :style="{ backgroundColor: plan.badgeColor + '20' }">
                  <span class="text-3xl">
                    {{ plan.icon === 'shield' ? '🛡️' : plan.icon === 'shield-check' ? '✅' : '👑' }}
                  </span>
                </div>
                <h3 class="text-2xl font-bold text-[#0A1F44]">{{ plan.name }}</h3>
                <p class="text-gray-600 mt-2 text-sm">{{ plan.description }}</p>
              </div>

              <!-- Pricing -->
              <div class="text-center mb-6 pb-6 border-b border-gray-200">
                <!-- Monthly Price -->
                <div class="mb-4">
                  <div class="flex items-baseline justify-center gap-1">
                    <span class="text-lg text-gray-500">$</span>
                    <span class="text-5xl font-bold text-[#0A1F44]">{{ plan.monthlyPrice }}</span>
                    <span class="text-lg text-gray-500">/mes</span>
                  </div>
                  <p class="text-sm text-gray-500 mt-1">Facturación mensual</p>
                </div>

                <!-- Initial Payment -->
                <div class="bg-gray-50 rounded-xl p-4">
                  <p class="text-sm text-gray-600 mb-1">Pago inicial:</p>
                  <p v-if="selectedPaymentType === 'single'" class="text-xl font-bold text-[#0A1F44]">
                    {{ formatPrice(plan.initialPayment) }}
                    <span class="text-sm font-normal text-gray-500">único</span>
                  </p>
                  <p v-else class="text-xl font-bold text-[#0A1F44]">
                    {{ formatPrice(plan.installmentAmount) }}
                    <span class="text-sm font-normal text-gray-500">x {{ plan.installmentCount }} meses</span>
                  </p>
                </div>
              </div>

              <!-- Features -->
              <ul class="space-y-3 mb-8">
                <li v-for="(feature, idx) in plan.features" :key="idx" class="flex items-start gap-3">
                  <svg class="w-5 h-5 text-green-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span class="text-sm text-gray-700">{{ feature }}</span>
                </li>
              </ul>

              <!-- CTA Button -->
              <button
                @click="handleSelectPlan(plan)"
                :class="[
                  'w-full py-4 rounded-xl font-bold text-lg transition-all duration-300',
                  plan.isRecommended
                    ? 'bg-gradient-to-r from-[#D4AF37] to-amber-500 text-[#0A1F44] hover:shadow-lg hover:scale-105'
                    : 'bg-[#0A1F44] text-white hover:bg-blue-900'
                ]"
              >
                Comenzar Ahora
              </button>
            </div>
          </div>
        </div>

        <!-- Comparison Note -->
        <div class="text-center mt-12">
          <p class="text-gray-600">
            Todos los planes incluyen: Dashboard personal, soporte técnico y actualizaciones de seguridad.
          </p>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl mx-auto">
          <div class="text-center mb-12">
            <h2 class="text-3xl lg:text-4xl font-bold text-[#0A1F44] mb-4">
              Preguntas frecuentes
            </h2>
            <p class="text-lg text-gray-600">
              Respuestas a las dudas más comunes sobre nuestros planes
            </p>
          </div>

          <div class="space-y-4">
            <div
              v-for="(faq, index) in faqs"
              :key="index"
              class="border-2 border-gray-200 rounded-2xl overflow-hidden hover:border-[#D4AF37] transition-colors duration-300"
            >
              <button
                @click="toggleFaq(index)"
                class="w-full px-6 py-5 flex items-center justify-between gap-4 text-left bg-white hover:bg-gray-50 transition-colors duration-200"
              >
                <span class="font-semibold text-[#0A1F44] pr-4">
                  {{ faq.question }}
                </span>
                <svg class="w-5 h-5 text-gray-400 shrink-0 transition-transform duration-300" :class="{ 'rotate-180': openFaqIndex === index }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <Transition
                enter-active-class="transition-all duration-300 ease-out"
                enter-from-class="max-h-0 opacity-0"
                enter-to-class="max-h-96 opacity-100"
                leave-active-class="transition-all duration-200 ease-in"
                leave-from-class="max-h-96 opacity-100"
                leave-to-class="max-h-0 opacity-0"
              >
                <div v-show="openFaqIndex === index" class="px-6 pb-5 bg-gray-50">
                  <p class="text-gray-600 leading-relaxed">
                    {{ faq.answer }}
                  </p>
                </div>
              </Transition>
            </div>
          </div>

          <div class="mt-12 text-center">
            <p class="text-gray-600 mb-4">¿Tienes más preguntas?</p>
            <button
              @click="handleContactWhatsApp"
              class="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Contáctanos por WhatsApp
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Final CTA -->
    <section class="relative py-16 lg:py-24 overflow-hidden bg-gradient-to-br from-[#0A1F44] via-blue-900 to-[#0A1F44]">
      <div class="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto text-center space-y-8">
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Comienza a proteger tu patrimonio hoy
          </h2>
          <p class="text-xl text-gray-300 leading-relaxed">
            Únete a cientos de emigrantes que confían en nosotros
          </p>

          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <button
              @click="navigateTo('/auth/register')"
              class="px-10 py-5 text-lg font-bold rounded-full bg-gradient-to-r from-[#D4AF37] to-amber-500 text-[#0A1F44] hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              Comenzar Ahora
            </button>

            <button
              @click="handleContactWhatsApp"
              class="px-10 py-5 text-lg font-bold text-white rounded-full border-2 border-white/30 hover:border-[#D4AF37] hover:bg-white/10 transition-all duration-300"
            >
              Consulta Gratis
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
@keyframes float {
  0%, 100% { transform: translateY(0px) translateX(0px); }
  33% { transform: translateY(-20px) translateX(10px); }
  66% { transform: translateY(-10px) translateX(-10px); }
}

.floating-shape {
  position: absolute;
  border-radius: 50%;
  opacity: 0.15;
  animation: float 20s ease-in-out infinite;
}

.hover-lift {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.hover-lift:hover {
  transform: translateY(-8px);
}
</style>
