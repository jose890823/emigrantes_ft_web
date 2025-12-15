<script setup lang="ts">
definePageMeta({
  layout: 'default',
})

useSeoMeta({
  title: 'Cómo Funciona - Emigrantes FT',
  description: 'Descubre cómo funciona nuestro servicio de representación financiera paso a paso. Simple, seguro y legal.',
  ogTitle: 'Cómo Funciona - Emigrantes FT',
  ogDescription: 'Descubre cómo funciona nuestro servicio de representación financiera paso a paso. Simple, seguro y legal.',
})

const steps = [
  {
    number: '01',
    icon: 'lucide:user-plus',
    title: 'Registro',
    description: 'Cliente crea su cuenta y comparte sus datos básicos de contacto.',
    details: [
      'Registro gratuito sin compromiso',
      'Datos básicos de contacto',
      'Proceso completamente digital',
      'Atención personalizada disponible',
    ],
    color: 'from-blue-500 to-blue-700',
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=600&fit=crop',
  },
  {
    number: '02',
    icon: 'lucide:file-signature',
    title: 'Firma de contrato marco y registro de instrucciones y bienes',
    description: 'Firmamos el contrato marco de representación y dejamos registradas tus instrucciones y declaraciones de bienes y cuentas.',
    details: [
      'Contrato marco de representación',
      'Registro de instrucciones',
      'Declaración de bienes y cuentas',
      'Proceso seguro y confidencial',
    ],
    color: 'from-purple-500 to-purple-700',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=600&fit=crop',
  },
  {
    number: '03',
    icon: 'lucide:shield-check',
    title: 'Firma del Poder Notarial Duradero',
    description: 'Preparamos contigo un Poder Notarial Duradero bajo la ley de Florida, donde designas a Emigrantes FT como tu representante para ejecutar tus instrucciones en caso de deportación, detención prolongada o incapacidad. Lo firmas una sola vez, 100% online, y queda custodiado para activarse únicamente si se presenta la situación que definiste.',
    details: [
      'POA duradero bajo ley de Florida',
      'Firma 100% online',
      'Se activa solo en la situación definida',
      'Custodia segura del documento',
    ],
    color: 'from-amber-500 to-amber-700',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop',
  },
  {
    number: '04',
    icon: 'lucide:zap',
    title: 'Ejecución autorizada',
    description: 'Si ocurre la contingencia prevista, ejecutamos ante bancos e instituciones las gestiones que hayas autorizado por contrato y POA, siempre sobre tus propias cuentas y bienes.',
    details: [
      'Ejecución solo ante contingencia prevista',
      'Gestiones autorizadas por contrato y POA',
      'Operaciones sobre tus propias cuentas',
      'Soporte durante todo el proceso',
    ],
    color: 'from-green-500 to-green-700',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&h=600&fit=crop',
  },
  {
    number: '05',
    icon: 'lucide:file-bar-chart',
    title: 'Reportes y seguimiento',
    description: 'Te entregamos reportes documentados de cada gestión y mantenemos seguimiento administrativo para que tus instrucciones se cumplan de la forma más ordenada posible.',
    details: [
      'Reportes documentados de cada gestión',
      'Seguimiento administrativo continuo',
      'Documentación de respaldo',
      'Cumplimiento ordenado de instrucciones',
    ],
    color: 'from-cyan-500 to-cyan-700',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
  },
]

const legalBasis = [
  {
    icon: 'lucide:scale',
    title: 'Base Legal en Florida',
    description: 'Nuestro servicio está sustentado por la legislación del Estado de Florida (Florida Statutes Chapter 709) sobre Poder Notarial Duradero.',
  },
  {
    icon: 'lucide:shield',
    title: 'No somos una entidad financiera',
    description: 'Actuamos como representantes autorizados bajo POA. No somos un transmisor de dinero ni manejamos fondos directamente.',
  },
  {
    icon: 'lucide:check-circle',
    title: 'Verificación Obligatoria',
    description: 'Cada operación requiere verificación de identidad del cliente. Sin autorización verificada, no realizamos ninguna acción.',
  },
  {
    icon: 'lucide:file-text',
    title: 'Documentación Completa',
    description: 'Todas las operaciones quedan documentadas y respaldadas con evidencia legal para tu protección y tranquilidad.',
  },
]

const whatsappMessage = 'Hola, me gustaría saber más sobre cómo funciona el servicio de Emigrantes FT.'

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
            <Icon name="lucide:lightbulb" class="w-4 h-4 text-[#D4AF37]" />
            <span class="text-[#D4AF37] font-semibold text-sm">Proceso Simple y Seguro</span>
          </div>

          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
            ¿Cómo funciona
            <span class="block bg-linear-to-r from-[#D4AF37] via-yellow-300 to-[#D4AF37] bg-clip-text text-transparent mt-2">
              Emigrantes FT?
            </span>
          </h1>

          <p class="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Un proceso simple en 5 pasos para proteger tu patrimonio. Todo basado en un marco legal sólido y con total transparencia.
          </p>
        </div>
      </div>
    </section>

    <!-- Steps Section -->
    <section class="py-20 lg:py-32 bg-gradient-to-b from-gray-50 to-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Header -->
        <div class="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <h2 class="text-3xl lg:text-4xl font-bold text-[#0A1F44]">
            El proceso paso a paso
          </h2>
          <p class="text-lg text-gray-600">
            Desde el registro hasta los reportes continuos, cada paso está diseñado para tu seguridad y control total.
          </p>
        </div>

        <!-- Steps -->
        <div class="space-y-24">
          <div
            v-for="(step, index) in steps"
            :key="step.number"
            class="relative"
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
                    :src="step.image"
                    :alt="step.title"
                    class="w-full h-[400px] object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div :class="`absolute inset-0 bg-linear-to-br ${step.color} opacity-20 group-hover:opacity-30 transition-opacity duration-400`"></div>

                  <!-- Floating Step Number -->
                  <div class="absolute top-6 left-6 w-20 h-20 bg-white rounded-2xl shadow-xl flex items-center justify-center transform group-hover:rotate-12 transition-all duration-400">
                    <span :class="`text-3xl font-bold bg-linear-to-br ${step.color} bg-clip-text text-transparent`">
                      {{ step.number }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Content -->
              <div
                :class="index % 2 === 1 ? 'lg:order-1' : ''"
                class="space-y-6"
              >
                <div class="space-y-4">
                  <div :class="`inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-linear-to-r ${step.color} shadow-lg`">
                    <Icon :name="step.icon" class="w-6 h-6 text-white" />
                    <span class="text-white font-bold">Paso {{ step.number }}</span>
                  </div>

                  <h3 class="text-3xl lg:text-4xl font-bold text-[#0A1F44]">
                    {{ step.title }}
                  </h3>

                  <p class="text-lg text-gray-600 leading-relaxed">
                    {{ step.description }}
                  </p>
                </div>

                <!-- Details List -->
                <ul class="space-y-3">
                  <li
                    v-for="(detail, detailIndex) in step.details"
                    :key="detailIndex"
                    class="flex items-start gap-3 group"
                  >
                    <div :class="`shrink-0 w-6 h-6 rounded-full bg-linear-to-br ${step.color} flex items-center justify-center mt-0.5 group-hover:scale-110 transition-transform duration-300`">
                      <Icon name="lucide:check" class="w-4 h-4 text-white" />
                    </div>
                    <span class="text-gray-700 leading-relaxed">{{ detail }}</span>
                  </li>
                </ul>
              </div>
            </div>

            <!-- Connector Line (except for last step) -->
            <div
              v-if="index < steps.length - 1"
              class="hidden lg:block absolute left-1/2 -translate-x-1/2 w-1 h-24 bg-gradient-to-b from-gray-300 to-transparent mt-8"
            ></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Legal Basis Section -->
    <section class="py-20 lg:py-32 bg-gradient-to-br from-[#0A1F44] to-blue-900">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-6xl mx-auto">
          <!-- Section Header -->
          <div class="text-center mb-16 space-y-4">
            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 backdrop-blur-sm">
              <Icon name="lucide:scale" class="w-4 h-4 text-[#D4AF37]" />
              <span class="text-[#D4AF37] font-semibold text-sm">Marco Legal</span>
            </div>
            <h2 class="text-3xl lg:text-4xl font-bold text-white">
              Respaldo legal sólido
            </h2>
            <p class="text-lg text-gray-300 max-w-3xl mx-auto">
              Nuestro servicio está completamente respaldado por las leyes del Estado de Florida
            </p>
          </div>

          <!-- Legal Cards -->
          <div class="grid md:grid-cols-2 gap-6">
            <div
              v-for="(item, index) in legalBasis"
              :key="index"
              class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 hover-lift group"
            >
              <div class="flex items-start gap-4">
                <div class="shrink-0 w-14 h-14 rounded-xl bg-[#D4AF37]/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Icon :name="item.icon" class="w-7 h-7 text-[#D4AF37]" />
                </div>
                <div class="space-y-2">
                  <h3 class="text-xl font-bold text-white">
                    {{ item.title }}
                  </h3>
                  <p class="text-gray-300 leading-relaxed">
                    {{ item.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Legal Reference -->
          <div class="mt-12 p-6 rounded-2xl bg-amber-500/10 border border-amber-500/20">
            <div class="flex items-start gap-4">
              <Icon name="lucide:alert-circle" class="w-6 h-6 text-amber-300 shrink-0 mt-1" />
              <div class="space-y-2">
                <p class="text-sm text-amber-200 leading-relaxed">
                  <strong>Referencia Legal:</strong> Nuestro servicio de representación está sustentado por el Florida Statutes Chapter 709 - Power of Attorney.
                  Actuamos exclusivamente bajo instrucciones verificadas del cliente, respaldados por un Poder Notarial Duradero certificado.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Timeline Visual Section -->
    <section class="py-20 lg:py-32 bg-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-5xl mx-auto">
          <div class="text-center mb-16 space-y-4">
            <h2 class="text-3xl lg:text-4xl font-bold text-[#0A1F44]">
              De principio a fin
            </h2>
            <p class="text-lg text-gray-600">
              Un proceso continuo de protección para tu patrimonio
            </p>
          </div>

          <!-- Timeline -->
          <div class="relative">
            <!-- Vertical Line -->
            <div class="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-[#D4AF37] via-blue-500 to-[#D4AF37]"></div>

            <!-- Timeline Items -->
            <div class="space-y-8">
              <div
                v-for="(step, index) in steps"
                :key="index"
                class="relative pl-24"
              >
                <!-- Circle Marker -->
                <div :class="`absolute left-4 top-0 w-9 h-9 rounded-full bg-linear-to-br ${step.color} flex items-center justify-center shadow-lg ring-4 ring-white`">
                  <Icon :name="step.icon" class="w-5 h-5 text-white" />
                </div>

                <!-- Content Card -->
                <div class="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover-lift">
                  <div class="flex items-start justify-between gap-4">
                    <div class="space-y-2">
                      <div class="flex items-center gap-3">
                        <span :class="`text-sm font-bold bg-linear-to-br ${step.color} bg-clip-text text-transparent`">
                          PASO {{ step.number }}
                        </span>
                        <span class="text-gray-400">•</span>
                        <span class="text-sm text-gray-500">{{ index === 0 ? 'Inicio' : index === steps.length - 1 ? 'Continuo' : `~${index} semana${index > 1 ? 's' : ''}` }}</span>
                      </div>
                      <h4 class="text-xl font-bold text-[#0A1F44]">
                        {{ step.title }}
                      </h4>
                      <p class="text-gray-600">
                        {{ step.description }}
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
            ¿Listo para empezar?
          </h2>
          <p class="text-xl text-gray-300 leading-relaxed">
            Agenda una consulta gratuita y descubre cómo podemos ayudarte a proteger tu patrimonio.
          </p>

          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <button
              @click="handleContactWhatsApp"
              class="relative px-10 py-6 text-lg font-bold rounded-full overflow-hidden transition-all duration-400 hover:scale-105 group shadow-2xl"
            >
              <div class="absolute inset-0 bg-linear-to-r from-[#D4AF37] via-[#fbbf24] to-[#D4AF37] bg-[length:200%_100%] animate-shimmer"></div>
              <span class="relative flex items-center justify-center text-[#0A1F44] gap-2">
                <Icon name="lucide:message-circle" class="w-5 h-5 group-hover:rotate-12 transition-transform" />
                Consulta Gratis por WhatsApp
              </span>
            </button>

            <NuxtLink to="/planes">
              <button class="px-10 py-6 text-lg font-bold text-white rounded-full border-2 border-white/30 hover:border-[#D4AF37] hover:bg-white/10 transition-all duration-300 backdrop-blur-sm flex items-center gap-2 group">
                Ver Planes y Precios
                <Icon name="lucide:arrow-right" class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
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
</style>
