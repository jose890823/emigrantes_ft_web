<script setup lang="ts">
definePageMeta({
  layout: 'default',
})

useSeoMeta({
  title: 'Planes y Precios - Emigrantes FT',
  description: 'Plan mensual desde $29/mes. Protege tu patrimonio con total transparencia y sin costos ocultos.',
  ogTitle: 'Planes y Precios - Emigrantes FT',
  ogDescription: 'Plan mensual desde $29/mes. Protege tu patrimonio con total transparencia y sin costos ocultos.',
})

const mainPlan = {
  name: 'Plan Estándar',
  price: 29,
  currency: 'USD',
  period: 'mes',
  description: 'Todo lo que necesitas para proteger tu patrimonio desde cualquier parte del mundo.',
  features: [
    {
      icon: 'lucide:shield-check',
      title: 'Representación Financiera Completa',
      description: 'Gestión autorizada de tus cuentas bancarias en EE.UU.',
    },
    {
      icon: 'lucide:lock-keyhole',
      title: 'Custodia Segura de Instrucciones',
      description: 'Almacenamiento encriptado con acceso 24/7.',
    },
    {
      icon: 'lucide:zap',
      title: 'Ejecución Ilimitada',
      description: 'Sin límite en cantidad de operaciones autorizadas.',
    },
    {
      icon: 'lucide:file-bar-chart',
      title: 'Reportes Mensuales Detallados',
      description: 'Documentación completa de todas las operaciones.',
    },
    {
      icon: 'lucide:refresh-cw',
      title: 'Actualizaciones Ilimitadas',
      description: 'Modifica tus instrucciones cuando lo necesites.',
    },
    {
      icon: 'lucide:scale',
      title: 'Asistencia Legal Incluida',
      description: 'Coordinación con abogados especializados.',
    },
    {
      icon: 'lucide:headphones',
      title: 'Soporte Prioritario',
      description: 'Atención personalizada vía WhatsApp, email y teléfono.',
    },
    {
      icon: 'lucide:smartphone',
      title: 'Dashboard Personal',
      description: 'Acceso completo a tu panel de control en línea.',
    },
  ],
  highlight: true,
}

const additionalCosts = [
  {
    icon: 'lucide:file-signature',
    title: 'Firma del POA',
    price: 'Variable',
    description: 'Costo único del proceso notarial (según estado/país). Te asesoramos sobre las mejores opciones.',
    note: 'Pago único al inicio',
  },
  {
    icon: 'lucide:banknote',
    title: 'Comisiones Bancarias',
    price: 'Variable',
    description: 'Comisiones de los bancos por transferencias internacionales (no controladas por nosotros).',
    note: 'Según operación',
  },
]

const guarantees = [
  {
    icon: 'lucide:shield-check',
    title: 'Sin Contratos Largos',
    description: 'Cancela cuando quieras, sin penalizaciones ni compromisos a largo plazo.',
  },
  {
    icon: 'lucide:eye-off',
    title: 'Sin Costos Ocultos',
    description: 'El precio que ves es el precio que pagas. Total transparencia.',
  },
  {
    icon: 'lucide:lock',
    title: 'Pago Seguro',
    description: 'Procesamiento seguro a través de Stripe y PayPal.',
  },
  {
    icon: 'lucide:clock',
    title: 'Servicio 24/7',
    description: 'Acceso a tu dashboard y documentos en cualquier momento.',
  },
]

const faqs = [
  {
    question: '¿Hay algún costo de instalación o setup?',
    answer: 'No, no hay costo de instalación. Solo pagas la mensualidad de $29/mes más el costo único del proceso notarial del POA.',
  },
  {
    question: '¿Cuándo se cobra la mensualidad?',
    answer: 'Se cobra automáticamente el mismo día de cada mes. Puedes elegir pago con tarjeta, ACH o PayPal.',
  },
  {
    question: '¿Puedo cancelar en cualquier momento?',
    answer: 'Sí, puedes cancelar cuando quieras desde tu dashboard. No hay penalizaciones ni contratos a largo plazo.',
  },
  {
    question: '¿Hay límite en la cantidad de operaciones?',
    answer: 'No, el plan incluye operaciones ilimitadas. Pagas lo mismo sin importar cuántas instrucciones ejecutemos.',
  },
  {
    question: '¿Qué incluye la asistencia legal?',
    answer: 'Incluye la coordinación con nuestra red de abogados certificados para asegurar que todas las operaciones cumplan con las leyes aplicables.',
  },
  {
    question: '¿Aceptan pagos desde fuera de EE.UU.?',
    answer: 'Sí, aceptamos tarjetas internacionales y PayPal. El precio es en USD pero puedes pagar desde cualquier país.',
  },
]

const isAnnualBilling = ref(false)
const openFaqIndex = ref<number | null>(null)

const toggleFaq = (index: number) => {
  openFaqIndex.value = openFaqIndex.value === index ? null : index
}

const handleSignUp = () => {
  navigateTo('/auth/register')
}

const whatsappMessage = 'Hola, me gustaría obtener más información sobre los planes y precios.'

const handleContactWhatsApp = () => {
  openWhatsApp(whatsappMessage)
}
</script>

<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-[#0A1F44] via-blue-900 to-[#0A1F44]">
      <!-- Floating shapes -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="floating-shape w-96 h-96 bg-[#D4AF37]/10 blur-3xl -top-48 -left-48" style="animation-delay: 0s"></div>
        <div class="floating-shape w-80 h-80 bg-blue-500/10 blur-3xl top-1/4 right-1/4" style="animation-delay: 2s"></div>
        <div class="floating-shape w-64 h-64 bg-[#D4AF37]/15 blur-2xl -bottom-32 -right-32" style="animation-delay: 4s"></div>
      </div>

      <div class="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto text-center space-y-6">
          <!-- Badge -->
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 backdrop-blur-sm">
            <Icon name="lucide:tag" class="w-4 h-4 text-[#D4AF37]" />
            <span class="text-[#D4AF37] font-semibold text-sm">Planes Transparentes</span>
          </div>

          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Un precio simple,
            <span class="block bg-linear-to-r from-[#D4AF37] via-yellow-300 to-[#D4AF37] bg-clip-text text-transparent mt-2">
              sin sorpresas
            </span>
          </h1>

          <p class="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Todo lo que necesitas para proteger tu patrimonio por solo <span class="text-[#D4AF37] font-bold">$29/mes</span>. Sin costos ocultos, sin contratos largos.
          </p>

          <!-- Trust Badges -->
          <div class="flex flex-wrap justify-center gap-6 pt-4">
            <div class="flex items-center gap-2 text-gray-300">
              <Icon name="lucide:check-circle" class="w-5 h-5 text-green-400" />
              <span class="text-sm">Sin costos ocultos</span>
            </div>
            <div class="flex items-center gap-2 text-gray-300">
              <Icon name="lucide:check-circle" class="w-5 h-5 text-green-400" />
              <span class="text-sm">Cancela cuando quieras</span>
            </div>
            <div class="flex items-center gap-2 text-gray-300">
              <Icon name="lucide:check-circle" class="w-5 h-5 text-green-400" />
              <span class="text-sm">Pago seguro</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Plan Section -->
    <section class="py-20 lg:py-32 bg-gradient-to-b from-gray-50 to-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-5xl mx-auto">
          <!-- Main Plan Card -->
          <div class="relative">
            <!-- Popular Badge -->
            <div class="absolute -top-5 left-1/2 -translate-x-1/2 z-10">
              <div class="px-6 py-2 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 shadow-lg">
                <span class="text-white font-bold text-sm">⭐ Plan Recomendado</span>
              </div>
            </div>

            <div class="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-[#D4AF37]">
              <!-- Gradient Background -->
              <div class="absolute inset-0 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30"></div>

              <div class="relative p-8 lg:p-12">
                <!-- Header -->
                <div class="text-center mb-10">
                  <h2 class="text-3xl lg:text-4xl font-bold text-[#0A1F44] mb-4">
                    {{ mainPlan.name }}
                  </h2>
                  <p class="text-lg text-gray-600 max-w-2xl mx-auto">
                    {{ mainPlan.description }}
                  </p>
                </div>

                <!-- Price -->
                <div class="text-center mb-10">
                  <div class="flex items-baseline justify-center gap-2">
                    <span class="text-2xl font-semibold text-gray-600">$</span>
                    <span class="text-6xl lg:text-7xl font-bold text-[#0A1F44]">{{ mainPlan.price }}</span>
                    <span class="text-2xl font-semibold text-gray-600">USD/{{ mainPlan.period }}</span>
                  </div>
                  <p class="text-sm text-gray-500 mt-3">
                    Facturación mensual • Cancela cuando quieras
                  </p>
                </div>

                <!-- CTA Button -->
                <div class="flex justify-center mb-12">
                  <button
                    @click="handleSignUp"
                    class="relative px-12 py-6 text-lg font-bold rounded-full overflow-hidden transition-all duration-400 hover:scale-105 group shadow-2xl"
                  >
                    <div class="absolute inset-0 bg-linear-to-r from-[#D4AF37] via-[#fbbf24] to-[#D4AF37] bg-[length:200%_100%] animate-shimmer"></div>
                    <span class="relative flex items-center justify-center text-[#0A1F44] gap-2">
                      <Icon name="lucide:rocket" class="w-6 h-6 group-hover:rotate-12 transition-transform" />
                      Comenzar Ahora
                    </span>
                  </button>
                </div>

                <!-- Divider -->
                <div class="border-t border-gray-200 mb-10"></div>

                <!-- Features Grid -->
                <div class="grid md:grid-cols-2 gap-6">
                  <div
                    v-for="(feature, index) in mainPlan.features"
                    :key="index"
                    class="flex items-start gap-4 group"
                  >
                    <div class="shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <Icon :name="feature.icon" class="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 class="font-bold text-[#0A1F44] mb-1">
                        {{ feature.title }}
                      </h4>
                      <p class="text-sm text-gray-600">
                        {{ feature.description }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Additional Costs Section -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto">
          <div class="text-center mb-12">
            <h2 class="text-3xl lg:text-4xl font-bold text-[#0A1F44] mb-4">
              Otros costos a considerar
            </h2>
            <p class="text-lg text-gray-600">
              Total transparencia sobre todos los costos asociados
            </p>
          </div>

          <div class="grid md:grid-cols-2 gap-6">
            <div
              v-for="(cost, index) in additionalCosts"
              :key="index"
              class="bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover-lift"
            >
              <div class="flex items-start gap-4 mb-4">
                <div class="shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-md">
                  <Icon :name="cost.icon" class="w-6 h-6 text-white" />
                </div>
                <div class="flex-1">
                  <h3 class="font-bold text-[#0A1F44] text-lg mb-1">
                    {{ cost.title }}
                  </h3>
                  <span class="inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold">
                    {{ cost.note }}
                  </span>
                </div>
              </div>
              <p class="text-gray-600 leading-relaxed">
                {{ cost.description }}
              </p>
              <div class="mt-4 pt-4 border-t border-gray-200">
                <span class="text-sm text-gray-500">Costo estimado: </span>
                <span class="text-lg font-bold text-[#0A1F44]">{{ cost.price }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Guarantees Section -->
    <section class="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-5xl mx-auto">
          <div class="text-center mb-12">
            <h2 class="text-3xl lg:text-4xl font-bold text-[#0A1F44] mb-4">
              Nuestras garantías
            </h2>
            <p class="text-lg text-gray-600">
              Tu tranquilidad es nuestra prioridad
            </p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div
              v-for="(guarantee, index) in guarantees"
              :key="index"
              class="text-center space-y-4 p-6 rounded-2xl bg-white border border-gray-200 hover:shadow-xl transition-all duration-300 hover-lift group"
            >
              <div class="inline-flex w-16 h-16 rounded-2xl bg-gradient-to-br from-green-400 to-green-600 items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Icon :name="guarantee.icon" class="w-8 h-8 text-white" />
              </div>
              <h3 class="font-bold text-[#0A1F44]">
                {{ guarantee.title }}
              </h3>
              <p class="text-sm text-gray-600">
                {{ guarantee.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="py-20 bg-white">
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
                <Icon
                  name="lucide:chevron-down"
                  class="w-5 h-5 text-gray-400 shrink-0 transition-transform duration-300"
                  :class="{ 'rotate-180': openFaqIndex === index }"
                />
              </button>
              <Transition
                enter-active-class="transition-all duration-300 ease-out"
                enter-from-class="max-h-0 opacity-0"
                enter-to-class="max-h-96 opacity-100"
                leave-active-class="transition-all duration-200 ease-in"
                leave-from-class="max-h-96 opacity-100"
                leave-to-class="max-h-0 opacity-0"
              >
                <div
                  v-show="openFaqIndex === index"
                  class="px-6 pb-5 bg-gray-50"
                >
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
              <Icon name="lucide:message-circle" class="w-5 h-5" />
              Contáctanos por WhatsApp
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Final CTA Section -->
    <section class="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-[#0A1F44] via-blue-900 to-[#0A1F44]">
      <!-- Floating shapes -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="floating-shape w-96 h-96 bg-[#D4AF37]/10 blur-3xl top-0 left-0" style="animation-delay: 1s"></div>
        <div class="floating-shape w-96 h-96 bg-[#D4AF37]/10 blur-3xl bottom-0 right-0" style="animation-delay: 3s"></div>
      </div>

      <div class="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto text-center space-y-8">
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Comienza a proteger tu patrimonio hoy
          </h2>
          <p class="text-xl text-gray-300 leading-relaxed">
            Únete a cientos de emigrantes que confían en nosotros para gestionar sus finanzas en EE.UU.
          </p>

          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <button
              @click="handleSignUp"
              class="relative px-10 py-6 text-lg font-bold rounded-full overflow-hidden transition-all duration-400 hover:scale-105 group shadow-2xl"
            >
              <div class="absolute inset-0 bg-linear-to-r from-[#D4AF37] via-[#fbbf24] to-[#D4AF37] bg-[length:200%_100%] animate-shimmer"></div>
              <span class="relative flex items-center justify-center text-[#0A1F44] gap-2">
                <Icon name="lucide:rocket" class="w-5 h-5 group-hover:rotate-12 transition-transform" />
                Comenzar Ahora - $29/mes
              </span>
            </button>

            <button
              @click="handleContactWhatsApp"
              class="px-10 py-6 text-lg font-bold text-white rounded-full border-2 border-white/30 hover:border-[#D4AF37] hover:bg-white/10 transition-all duration-300 backdrop-blur-sm flex items-center gap-2 group"
            >
              <Icon name="lucide:message-circle" class="w-5 h-5 group-hover:rotate-12 transition-transform" />
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
  0%, 100% {
    transform: translateY(0px) translateX(0px);
  }
  33% {
    transform: translateY(-20px) translateX(10px);
  }
  66% {
    transform: translateY(-10px) translateX(-10px);
  }
}

@keyframes shimmer {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
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
  box-shadow:
    0 25px 50px -12px rgba(10, 31, 68, 0.25),
    0 0 0 1px rgba(212, 175, 55, 0.1);
}

.animate-shimmer {
  animation: shimmer 3s linear infinite;
}
</style>
