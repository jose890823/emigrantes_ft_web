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
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 text-[#D4AF37]">
              <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"/>
              <circle cx="7.5" cy="7.5" r=".5" fill="currentColor"/>
            </svg>
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
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 text-green-400">
                <circle cx="12" cy="12" r="10"/>
                <path d="m9 12 2 2 4-4"/>
              </svg>
              <span class="text-sm">Sin costos ocultos</span>
            </div>
            <div class="flex items-center gap-2 text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 text-green-400">
                <circle cx="12" cy="12" r="10"/>
                <path d="m9 12 2 2 4-4"/>
              </svg>
              <span class="text-sm">Cancela cuando quieras</span>
            </div>
            <div class="flex items-center gap-2 text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 text-green-400">
                <circle cx="12" cy="12" r="10"/>
                <path d="m9 12 2 2 4-4"/>
              </svg>
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
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 group-hover:rotate-12 transition-transform">
                        <path d="M4.5 16.5c-1.5 1.5-2 5-2 5s3.5-.5 5-2c1.5-1.5 2.3-2.3 3-3"/>
                        <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22 22 0 0 1-4 2z"/>
                        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
                        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
                      </svg>
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
                      <svg v-if="feature.icon === 'lucide:shield-check'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 text-white">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
                        <path d="m9 12 2 2 4-4"/>
                      </svg>
                      <svg v-else-if="feature.icon === 'lucide:lock-keyhole'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 text-white">
                        <circle cx="12" cy="16" r="1"/>
                        <rect x="3" y="10" width="18" height="12" rx="2"/>
                        <path d="M7 10V7a5 5 0 0 1 10 0v3"/>
                      </svg>
                      <svg v-else-if="feature.icon === 'lucide:zap'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 text-white">
                        <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>
                      </svg>
                      <svg v-else-if="feature.icon === 'lucide:file-bar-chart'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 text-white">
                        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/>
                        <path d="M14 2v4a2 2 0 0 0 2 2h4"/>
                        <path d="M8 18v-2"/>
                        <path d="M12 18v-4"/>
                        <path d="M16 18v-6"/>
                      </svg>
                      <svg v-else-if="feature.icon === 'lucide:refresh-cw'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 text-white">
                        <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
                        <path d="M21 3v5h-5"/>
                        <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
                        <path d="M8 16H3v5"/>
                      </svg>
                      <svg v-else-if="feature.icon === 'lucide:scale'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 text-white">
                        <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
                        <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
                        <path d="M7 21h10"/>
                        <path d="M12 3v18"/>
                        <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>
                      </svg>
                      <svg v-else-if="feature.icon === 'lucide:headphones'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 text-white">
                        <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/>
                      </svg>
                      <svg v-else-if="feature.icon === 'lucide:smartphone'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 text-white">
                        <rect width="14" height="20" x="5" y="2" rx="2" ry="2"/>
                        <path d="M12 18h.01"/>
                      </svg>
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
                  <svg v-if="cost.icon === 'lucide:file-signature'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 text-white">
                    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/>
                    <path d="M14 2v4a2 2 0 0 0 2 2h4"/>
                    <path d="M8 12h8"/>
                    <path d="M10 17h2"/>
                  </svg>
                  <svg v-else-if="cost.icon === 'lucide:banknote'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6 text-white">
                    <rect width="20" height="12" x="2" y="6" rx="2"/>
                    <circle cx="12" cy="12" r="2"/>
                    <path d="M6 12h.01M18 12h.01"/>
                  </svg>
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
                <svg v-if="guarantee.icon === 'lucide:shield-check'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 text-white">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
                  <path d="m9 12 2 2 4-4"/>
                </svg>
                <svg v-else-if="guarantee.icon === 'lucide:eye-off'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 text-white">
                  <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/>
                  <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/>
                  <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/>
                  <line x1="2" x2="22" y1="2" y2="22"/>
                </svg>
                <svg v-else-if="guarantee.icon === 'lucide:lock'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 text-white">
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <svg v-else-if="guarantee.icon === 'lucide:clock'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 text-white">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
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
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 text-gray-400 shrink-0 transition-transform duration-300" :class="{ 'rotate-180': openFaqIndex === index }">
                  <path d="m6 9 6 6 6-6"/>
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
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5">
                <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>
              </svg>
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
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 group-hover:rotate-12 transition-transform">
                  <path d="M4.5 16.5c-1.5 1.5-2 5-2 5s3.5-.5 5-2c1.5-1.5 2.3-2.3 3-3"/>
                  <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22 22 0 0 1-4 2z"/>
                  <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
                  <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
                </svg>
                Comenzar Ahora - $29/mes
              </span>
            </button>

            <button
              @click="handleContactWhatsApp"
              class="px-10 py-6 text-lg font-bold text-white rounded-full border-2 border-white/30 hover:border-[#D4AF37] hover:bg-white/10 transition-all duration-300 backdrop-blur-sm flex items-center gap-2 group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 group-hover:rotate-12 transition-transform">
                <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>
              </svg>
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
