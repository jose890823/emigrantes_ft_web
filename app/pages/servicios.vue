<script setup lang="ts">
definePageMeta({
  layout: 'default',
})

useSeoMeta({
  title: 'Nuestros Servicios - Emigrantes FT',
  description: 'Descubre cómo protegemos tu sacrificio con servicios de representación financiera, custodia de instrucciones y más.',
  ogTitle: 'Nuestros Servicios - Emigrantes FT',
  ogDescription: 'Descubre cómo protegemos tu sacrificio con servicios de representación financiera, custodia de instrucciones y más.',
})

const services = [
  {
    id: 'representacion',
    icon: 'lucide:shield-check',
    title: 'Representación Financiera',
    description: 'Actuamos como tu representante autorizado en EE.UU., gestionando tus cuentas bancarias y operaciones financieras bajo un Poder Notarial Duradero (POA).',
    features: [
      'Gestión segura de cuentas bancarias',
      'Operaciones autorizadas por ti',
      'Respaldo legal en Florida',
      'Control total desde cualquier lugar',
    ],
    color: 'from-blue-500 to-blue-700',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=600&fit=crop',
  },
  {
    id: 'custodia',
    icon: 'lucide:lock-keyhole',
    title: 'Custodia de Instrucciones',
    description: 'Custodiamos tus instrucciones financieras de forma segura y confidencial. Solo actuamos cuando tú lo autorices mediante verificación de identidad.',
    features: [
      'Almacenamiento seguro encriptado',
      'Verificación de identidad obligatoria',
      'Acceso 24/7 a tus instrucciones',
      'Confidencialidad garantizada',
    ],
    color: 'from-purple-500 to-purple-700',
    image: 'https://images.unsplash.com/photo-1553356084-58ef4a67b2a7?w=800&h=600&fit=crop',
  },
  {
    id: 'ejecucion',
    icon: 'lucide:zap',
    title: 'Ejecución de Instrucciones',
    description: 'Ejecutamos tus instrucciones de manera precisa y oportuna: transferencias, pagos, inversiones y cualquier operación que nos autorices.',
    features: [
      'Transferencias nacionales e internacionales',
      'Pago de obligaciones financieras',
      'Gestión de inversiones',
      'Confirmación de cada operación',
    ],
    color: 'from-amber-500 to-amber-700',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
  },
  {
    id: 'reportes',
    icon: 'lucide:file-bar-chart',
    title: 'Reportes y Auditoría',
    description: 'Recibe reportes detallados de todas las operaciones realizadas. Total transparencia con documentación completa de cada movimiento.',
    features: [
      'Reportes mensuales detallados',
      'Historial completo de operaciones',
      'Documentación de respaldo',
      'Auditoría permanente disponible',
    ],
    color: 'from-green-500 to-green-700',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
  },
  {
    id: 'actualizacion',
    icon: 'lucide:refresh-cw',
    title: 'Actualización de Instrucciones',
    description: 'Modifica o actualiza tus instrucciones cuando lo necesites. Proceso simple y seguro para adaptar el servicio a tus necesidades cambiantes.',
    features: [
      'Modificación de instrucciones en línea',
      'Proceso de verificación seguro',
      'Cambios aplicados inmediatamente',
      'Historial de actualizaciones',
    ],
    color: 'from-cyan-500 to-cyan-700',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop',
  },
  {
    id: 'asistencia',
    icon: 'lucide:scale',
    title: 'Asistencia Legal',
    description: 'Coordinamos con abogados especializados para asegurar que todas las operaciones cumplan con las leyes de Florida y regulaciones federales.',
    features: [
      'Asesoría legal especializada',
      'Cumplimiento normativo garantizado',
      'Red de abogados certificados',
      'Protección legal permanente',
    ],
    color: 'from-indigo-500 to-indigo-700',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=600&fit=crop',
  },
]

const whatsappMessage = 'Hola, me gustaría obtener más información sobre sus servicios.'

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
              <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
              <rect width="20" height="14" x="2" y="6" rx="2"/>
            </svg>
            <span class="text-[#D4AF37] font-semibold text-sm">Servicios Profesionales</span>
          </div>

          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Protegemos tu
            <span class="block bg-linear-to-r from-[#D4AF37] via-yellow-300 to-[#D4AF37] bg-clip-text text-transparent mt-2">
              patrimonio financiero
            </span>
          </h1>

          <p class="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Ofrecemos una gama completa de servicios diseñados para que mantengas control total sobre tus bienes desde cualquier parte del mundo.
          </p>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <button
              @click="handleContactWhatsApp"
              class="relative px-8 py-5 text-base font-bold rounded-full overflow-hidden transition-all duration-400 hover:scale-105 group shadow-2xl"
            >
              <div class="absolute inset-0 bg-linear-to-r from-[#D4AF37] via-[#fbbf24] to-[#D4AF37] bg-[length:200%_100%] animate-shimmer"></div>
              <span class="relative flex items-center justify-center text-[#0A1F44] gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 group-hover:rotate-12 transition-transform">
                  <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>
                </svg>
                Consulta Gratis por WhatsApp
              </span>
            </button>

            <NuxtLink to="/planes">
              <button class="px-8 py-5 text-base font-bold text-white rounded-full border-2 border-white/30 hover:border-[#D4AF37] hover:bg-white/10 transition-all duration-300 backdrop-blur-sm flex items-center gap-2 group">
                Ver Planes y Precios
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 group-hover:translate-x-1 transition-transform">
                  <path d="M5 12h14"/>
                  <path d="m12 5 7 7-7 7"/>
                </svg>
              </button>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Grid -->
    <section class="py-20 lg:py-32 bg-gradient-to-b from-gray-50 to-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="space-y-16">
          <div
            v-for="(service, index) in services"
            :key="service.id"
            :id="service.id"
            class="scroll-mt-24"
          >
            <div
              class="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center"
              :class="index % 2 === 1 ? 'lg:flex-row-reverse' : ''"
            >
              <!-- Image -->
              <div
                :class="index % 2 === 1 ? 'lg:order-2' : ''"
                class="relative"
              >
                <div class="relative rounded-2xl overflow-hidden shadow-2xl hover-lift transition-all duration-400 group">
                  <NuxtImg
                    :src="service.image"
                    :alt="service.title"
                    class="w-full h-[400px] object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div :class="`absolute inset-0 bg-linear-to-br ${service.color} opacity-20 group-hover:opacity-30 transition-opacity duration-400`"></div>

                  <!-- Floating Icon -->
                  <div class="absolute top-6 right-6 w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center transform group-hover:rotate-12 transition-all duration-400">
                    <svg v-if="service.icon === 'lucide:shield-check'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" :class="`w-8 h-8 bg-linear-to-br ${service.color} bg-clip-text text-transparent`">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
                      <path d="m9 12 2 2 4-4"/>
                    </svg>
                    <svg v-else-if="service.icon === 'lucide:lock-keyhole'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" :class="`w-8 h-8 bg-linear-to-br ${service.color} bg-clip-text text-transparent`">
                      <circle cx="12" cy="16" r="1"/>
                      <rect x="3" y="10" width="18" height="12" rx="2"/>
                      <path d="M7 10V7a5 5 0 0 1 10 0v3"/>
                    </svg>
                    <svg v-else-if="service.icon === 'lucide:zap'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" :class="`w-8 h-8 bg-linear-to-br ${service.color} bg-clip-text text-transparent`">
                      <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>
                    </svg>
                    <svg v-else-if="service.icon === 'lucide:file-bar-chart'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" :class="`w-8 h-8 bg-linear-to-br ${service.color} bg-clip-text text-transparent`">
                      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/>
                      <path d="M14 2v4a2 2 0 0 0 2 2h4"/>
                      <path d="M8 18v-2"/>
                      <path d="M12 18v-4"/>
                      <path d="M16 18v-6"/>
                    </svg>
                    <svg v-else-if="service.icon === 'lucide:refresh-cw'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" :class="`w-8 h-8 bg-linear-to-br ${service.color} bg-clip-text text-transparent`">
                      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
                      <path d="M21 3v5h-5"/>
                      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
                      <path d="M8 16H3v5"/>
                    </svg>
                    <svg v-else-if="service.icon === 'lucide:scale'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" :class="`w-8 h-8 bg-linear-to-br ${service.color} bg-clip-text text-transparent`">
                      <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
                      <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
                      <path d="M7 21h10"/>
                      <path d="M12 3v18"/>
                      <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>
                    </svg>
                  </div>
                </div>
              </div>

              <!-- Content -->
              <div
                :class="index % 2 === 1 ? 'lg:order-1' : ''"
                class="space-y-6"
              >
                <div class="space-y-4">
                  <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100">
                    <svg v-if="service.icon === 'lucide:shield-check'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 text-[#0A1F44]">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
                      <path d="m9 12 2 2 4-4"/>
                    </svg>
                    <svg v-else-if="service.icon === 'lucide:lock-keyhole'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 text-[#0A1F44]">
                      <circle cx="12" cy="16" r="1"/>
                      <rect x="3" y="10" width="18" height="12" rx="2"/>
                      <path d="M7 10V7a5 5 0 0 1 10 0v3"/>
                    </svg>
                    <svg v-else-if="service.icon === 'lucide:zap'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 text-[#0A1F44]">
                      <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>
                    </svg>
                    <svg v-else-if="service.icon === 'lucide:file-bar-chart'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 text-[#0A1F44]">
                      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/>
                      <path d="M14 2v4a2 2 0 0 0 2 2h4"/>
                      <path d="M8 18v-2"/>
                      <path d="M12 18v-4"/>
                      <path d="M16 18v-6"/>
                    </svg>
                    <svg v-else-if="service.icon === 'lucide:refresh-cw'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 text-[#0A1F44]">
                      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
                      <path d="M21 3v5h-5"/>
                      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
                      <path d="M8 16H3v5"/>
                    </svg>
                    <svg v-else-if="service.icon === 'lucide:scale'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 text-[#0A1F44]">
                      <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
                      <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
                      <path d="M7 21h10"/>
                      <path d="M12 3v18"/>
                      <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>
                    </svg>
                    <span class="text-[#0A1F44] font-semibold text-sm">Servicio {{ index + 1 }}</span>
                  </div>

                  <h2 class="text-3xl lg:text-4xl font-bold text-[#0A1F44]">
                    {{ service.title }}
                  </h2>

                  <p class="text-lg text-gray-600 leading-relaxed">
                    {{ service.description }}
                  </p>
                </div>

                <!-- Features List -->
                <ul class="space-y-3">
                  <li
                    v-for="(feature, featureIndex) in service.features"
                    :key="featureIndex"
                    class="flex items-start gap-3 group"
                  >
                    <div class="shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mt-0.5 group-hover:scale-110 transition-transform duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 text-white">
                        <path d="M20 6 9 17l-5-5"/>
                      </svg>
                    </div>
                    <span class="text-gray-700 leading-relaxed">{{ feature }}</span>
                  </li>
                </ul>

                <!-- CTA Button -->
                <div class="pt-2">
                  <button
                    @click="handleContactWhatsApp"
                    :class="`relative px-6 py-3 rounded-full overflow-hidden transition-all duration-400 hover:scale-105 group shadow-lg`"
                  >
                    <div :class="`absolute inset-0 bg-linear-to-r ${service.color} opacity-100`"></div>
                    <span class="relative flex items-center justify-center text-white font-semibold gap-2">
                      Consultar sobre este servicio
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 group-hover:translate-x-1 transition-transform">
                        <path d="M5 12h14"/>
                        <path d="m12 5 7 7-7 7"/>
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            </div>

            <!-- Divider (except for last service) -->
            <div
              v-if="index < services.length - 1"
              class="mt-16 border-t border-gray-200"
            ></div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-[#0A1F44] via-blue-900 to-[#0A1F44]">
      <!-- Floating shapes -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="floating-shape w-96 h-96 bg-[#D4AF37]/10 blur-3xl top-0 left-0" style="animation-delay: 1s"></div>
        <div class="floating-shape w-96 h-96 bg-[#D4AF37]/10 blur-3xl bottom-0 right-0" style="animation-delay: 3s"></div>
      </div>

      <div class="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto text-center space-y-8">
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            ¿Listo para proteger tu patrimonio?
          </h2>
          <p class="text-xl text-gray-300 leading-relaxed">
            Comienza hoy mismo con una consulta gratuita. Nuestro equipo está listo para ayudarte.
          </p>

          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <button
              @click="handleContactWhatsApp"
              class="relative px-10 py-6 text-lg font-bold rounded-full overflow-hidden transition-all duration-400 hover:scale-105 group shadow-2xl"
            >
              <div class="absolute inset-0 bg-linear-to-r from-[#D4AF37] via-[#fbbf24] to-[#D4AF37] bg-[length:200%_100%] animate-shimmer"></div>
              <span class="relative flex items-center justify-center text-[#0A1F44] gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 group-hover:rotate-12 transition-transform">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  <path d="M14.05 2a9 9 0 0 1 8 7.94"/>
                  <path d="M14.05 6A5 5 0 0 1 18 10"/>
                </svg>
                Consulta Gratis por WhatsApp
              </span>
            </button>

            <NuxtLink to="/como-funciona">
              <button class="px-10 py-6 text-lg font-bold text-white rounded-full border-2 border-white/30 hover:border-[#D4AF37] hover:bg-white/10 transition-all duration-300 backdrop-blur-sm flex items-center gap-2 group">
                ¿Cómo funciona?
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 group-hover:rotate-12 transition-transform">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                  <path d="M12 17h.01"/>
                </svg>
              </button>
            </NuxtLink>
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

.scroll-mt-24 {
  scroll-margin-top: 6rem;
}
</style>
