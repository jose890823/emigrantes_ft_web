<script setup lang="ts">
import { openWhatsApp, getWhatsAppContactMessage } from '~/utils/whatsapp'

// Servicios destacados (basados en los PDFs)
const services = [
  {
    icon: 'lucide:shield-check',
    title: 'Representación de Continuidad Financiera',
    description: 'Garantizamos que tus decisiones financieras se respeten incluso si no puedes ejecutarlas personalmente.',
    benefits: 'Mantienes el control de tus cuentas y propiedades desde cualquier parte del mundo.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop',
  },
  {
    icon: 'lucide:lock',
    title: 'Activación y Custodia de Instrucciones',
    description: 'Tus instrucciones permanecen seguras y selladas hasta que se cumpla una condición de activación previamente definida.',
    benefits: 'Tu voluntad solo se activa en el momento justo y bajo verificación.',
    image: 'https://images.unsplash.com/photo-1633265486064-086b219458ec?w=800&h=600&fit=crop',
  },
  {
    icon: 'lucide:send',
    title: 'Ejecución de Instrucciones Financieras',
    description: 'Hacemos llegar tu dinero, recursos o beneficios al lugar o persona que decidas, de forma segura y documentada.',
    benefits: 'Tu poder y decisiones se mantienen intactos, incluso en ausencia.',
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&h=600&fit=crop',
  },
  {
    icon: 'lucide:file-text',
    title: 'Reportes y Auditoría Documental',
    description: 'Cada gestión ejecutada queda registrada con fecha, evidencia y resultado, accesible en tu área privada.',
    benefits: 'Trazabilidad total y confianza verificable.',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&h=600&fit=crop',
  },
  {
    icon: 'lucide:refresh-cw',
    title: 'Actualización y Soporte Personalizado',
    description: 'Tus circunstancias pueden cambiar, y tu plan también. Ofrecemos soporte continuo para actualizar instrucciones.',
    benefits: 'Tu plan evoluciona contigo, sin pérdida de validez ni control.',
    image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&h=600&fit=crop',
  },
  {
    icon: 'lucide:building-2',
    title: 'Asistencia de Legalidad y Reconocimiento Bancario',
    description: 'Brindamos acompañamiento para facilitar la aceptación del POA duradero por parte de bancos y entidades financieras.',
    benefits: 'Mayor probabilidad de aceptación y ejecución fluida.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
  },
]

// Proceso en 5 pasos
const steps = [
  {
    number: 1,
    title: 'Consulta Inicial',
    description: 'Agenda una llamada o cita para conocer tu situación y necesidades específicas.',
    icon: 'lucide:phone-call',
  },
  {
    number: 2,
    title: 'Preparación del POA',
    description: 'Preparamos y registramos tu Poder Notarial Duradero con validación de identidad.',
    icon: 'lucide:file-signature',
  },
  {
    number: 3,
    title: 'Plan de Instrucciones',
    description: 'Transformamos tus instrucciones en un plan de acción confidencial y seguro.',
    icon: 'lucide:clipboard-list',
  },
  {
    number: 4,
    title: 'Custodia Segura',
    description: 'Tus instrucciones se almacenan de forma segura hasta su activación.',
    icon: 'lucide:shield',
  },
  {
    number: 5,
    title: 'Ejecución y Seguimiento',
    description: 'Cuando se activa, ejecutamos según tus órdenes con reportes completos.',
    icon: 'lucide:check-circle',
  },
]

// Testimonios con fotos
const testimonials = [
  {
    name: 'María González',
    role: 'Cliente desde 2023',
    content: 'Gracias a Emigrantes FT, tengo la tranquilidad de saber que mi familia tendrá acceso a mis cuentas si algo me sucede. El servicio es profesional y transparente.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
  },
  {
    name: 'Carlos Ramírez',
    role: 'Cliente desde 2024',
    content: 'La paz mental que me da tener todo organizado y documentado no tiene precio. Recomiendo sus servicios a todos los emigrantes.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
  },
  {
    name: 'Ana Martínez',
    role: 'Cliente desde 2023',
    content: 'El equipo de Emigrantes FT me ayudó a proteger el fruto de años de trabajo. Excelente atención y seguimiento.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
  },
]

const handleWhatsAppClick = () => {
  openWhatsApp(getWhatsAppContactMessage())
}
</script>

<template>
  <div>
    <!-- Hero Section - Rediseñado con composición dual moderna -->
    <section class="relative min-h-[90vh] lg:min-h-screen flex items-center overflow-hidden">
      <!-- Imagen de fondo -->
      <div class="absolute inset-0">
        <NuxtImg
          src="https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1920&h=1080&fit=crop"
          alt="Familia protegida"
          class="w-full h-full object-cover object-right lg:object-center-right"
          style="object-position: 65% center;"
          loading="eager"
          quality="80"
        />
        <!-- Overlay con gradiente para mejor legibilidad -->
        <div class="absolute inset-0 bg-gradient-to-r from-white/98 via-white/90 to-transparent lg:from-white/98 lg:via-white/85 lg:to-transparent"></div>
      </div>

      <!-- Elementos decorativos geométricos -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <!-- Formas geométricas grandes -->
        <div class="absolute -top-32 -right-32 w-96 h-96 bg-[#0A1F44] opacity-5 rounded-full blur-3xl"></div>
        <div class="absolute top-1/4 -left-24 w-64 h-64 bg-[#D4AF37] opacity-10 rounded-full blur-2xl"></div>
        <div class="absolute bottom-20 right-1/4 w-80 h-80 bg-[#0A1F44] opacity-5 rotate-45 blur-3xl"></div>

        <!-- Elementos decorativos pequeños -->
        <div class="absolute top-20 right-20 w-16 h-16 border-4 border-[#D4AF37]/20 rotate-45"></div>
        <div class="absolute bottom-32 left-20 w-20 h-20 border-4 border-[#0A1F44]/10 rounded-full"></div>
        <div class="absolute top-1/3 right-1/3 w-12 h-12 bg-[#D4AF37]/10 rotate-12"></div>
      </div>

      <div class="container relative mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div class="max-w-5xl mx-auto">
          <!-- Contenido de texto - Centrado -->
          <div class="space-y-8 text-center">
            <!-- Badge superior -->
            <div class="animate-fade-in-up flex justify-center">
              <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0A1F44]/5 border border-[#0A1F44]/10">
                <Icon name="lucide:shield-check" class="w-4 h-4 text-[#0A1F44]" />
                <span class="text-[#0A1F44] font-semibold text-sm">100% Respaldado por la Ley de Florida</span>
              </div>
            </div>

            <!-- Título principal con estilo moderno -->
            <div class="space-y-6 animate-fade-in-up delay-200">
              <h1 class="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-[#0A1F44] leading-[1.1]">
                Protegemos tu
                <span class="relative inline-block mt-2">
                  <span class="relative z-10 text-[#0A1F44]">sacrificio</span>
                  <span class="absolute -bottom-2 left-0 w-full h-4 bg-[#D4AF37]/30 -rotate-1"></span>
                </span>
              </h1>
              <p class="text-xl sm:text-2xl text-gray-700 font-normal leading-relaxed max-w-3xl mx-auto">
                Mantén <strong class="text-[#0A1F44] font-bold">poder y control total</strong> sobre tus bienes desde cualquier parte del mundo
              </p>
            </div>

            <!-- Descripción con iconos de beneficios -->
            <div class="space-y-4 animate-fade-in-up delay-300 max-w-3xl mx-auto">
              <div class="flex items-start gap-3 text-left">
                <div class="flex-shrink-0 w-6 h-6 rounded-full bg-[#D4AF37]/20 flex items-center justify-center mt-1">
                  <Icon name="lucide:check" class="w-4 h-4 text-[#0A1F44]" />
                </div>
                <p class="text-gray-600 leading-relaxed">
                  <strong class="text-[#0A1F44]">Poder Notarial Duradero (POA)</strong> que te protege ante deportación, detención o incapacidad
                </p>
              </div>
              <div class="flex items-start gap-3 text-left">
                <div class="flex-shrink-0 w-6 h-6 rounded-full bg-[#D4AF37]/20 flex items-center justify-center mt-1">
                  <Icon name="lucide:check" class="w-4 h-4 text-[#0A1F44]" />
                </div>
                <p class="text-gray-600 leading-relaxed">
                  <strong class="text-[#0A1F44]">Control total garantizado:</strong> Tus instrucciones se ejecutan solo cuando tú lo ordenes
                </p>
              </div>
              <div class="flex items-start gap-3 text-left">
                <div class="flex-shrink-0 w-6 h-6 rounded-full bg-[#D4AF37]/20 flex items-center justify-center mt-1">
                  <Icon name="lucide:check" class="w-4 h-4 text-[#0A1F44]" />
                </div>
                <p class="text-gray-600 leading-relaxed">
                  <strong class="text-[#0A1F44]">Transparencia total:</strong> Reportes documentados y auditoría completa de cada gestión
                </p>
              </div>
            </div>

            <!-- CTA Buttons con mejor diseño -->
            <div class="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-400 pt-4">
              <NuxtLink to="/auth/register">
                <button class="group relative px-8 py-4 bg-[#D4AF37] text-[#0A1F44] font-bold text-lg rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl w-full sm:w-auto">
                  <div class="absolute inset-0 bg-gradient-to-r from-[#fbbf24]/0 via-[#fbbf24]/20 to-[#fbbf24]/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
                  <span class="relative flex items-center justify-center gap-2">
                    <Icon name="lucide:rocket" class="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    Comenzar Ahora Gratis
                  </span>
                </button>
              </NuxtLink>
              <button
                @click="handleWhatsAppClick"
                class="group px-8 py-4 bg-white border-2 border-[#0A1F44] text-[#0A1F44] font-bold text-lg rounded-xl transition-all duration-300 hover:bg-[#0A1F44] hover:text-white hover:scale-105 hover:shadow-xl w-full sm:w-auto"
              >
                <span class="flex items-center justify-center gap-2">
                  <Icon name="lucide:message-circle" class="w-5 h-5" />
                  Hablar con un Asesor
                </span>
              </button>
            </div>

            <!-- Trust indicators compactos -->
            <div class="flex flex-wrap items-center justify-center gap-6 pt-6 animate-fade-in-up delay-500">
              <div class="flex items-center gap-2">
                <Icon name="lucide:shield-check" class="w-5 h-5 text-[#D4AF37]" />
                <span class="text-sm text-gray-600 font-medium">100% Legal</span>
              </div>
              <div class="flex items-center gap-2">
                <Icon name="lucide:lock" class="w-5 h-5 text-[#D4AF37]" />
                <span class="text-sm text-gray-600 font-medium">Seguro & Encriptado</span>
              </div>
              <div class="flex items-center gap-2">
                <Icon name="lucide:users" class="w-5 h-5 text-[#D4AF37]" />
                <span class="text-sm text-gray-600 font-medium">+500 Familias</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Por Qué Elegirnos Section - Inspirado en Handyman -->
    <section class="py-20 lg:py-28 bg-[#0A1F44] relative overflow-hidden">
      <!-- Elementos decorativos -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
        <div class="absolute top-0 left-0 w-96 h-96 bg-[#D4AF37] rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 right-0 w-96 h-96 bg-[#D4AF37] rounded-full blur-3xl"></div>
      </div>

      <div class="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header de sección -->
        <div class="text-center mb-16">
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 mb-6">
            <Icon name="lucide:award" class="w-4 h-4 text-[#D4AF37]" />
            <span class="text-[#D4AF37] font-semibold text-sm uppercase tracking-wide">Por Qué Elegirnos</span>
          </div>
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Razones para Confiar en
            <span class="text-[#D4AF37]">Emigrantes FT</span>
          </h2>
          <p class="text-lg text-gray-300 max-w-2xl mx-auto">
            Más que un servicio, somos tu aliado para proteger el fruto de años de sacrificio
          </p>
        </div>

        <!-- Grid de beneficios -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <!-- Beneficio 1 -->
          <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-[#D4AF37]/50 transition-all duration-300 group">
            <div class="w-16 h-16 bg-[#D4AF37] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Icon name="lucide:scale" class="w-8 h-8 text-[#0A1F44]" />
            </div>
            <h3 class="text-xl font-bold text-white mb-3">100% Legal y Regulado</h3>
            <p class="text-gray-300 leading-relaxed">
              Nuestro servicio está respaldado por la legislación del Estado de Florida y los lineamientos del Poder Notarial Duradero.
            </p>
          </div>

          <!-- Beneficio 2 -->
          <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-[#D4AF37]/50 transition-all duration-300 group">
            <div class="w-16 h-16 bg-[#D4AF37] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Icon name="lucide:shield-check" class="w-8 h-8 text-[#0A1F44]" />
            </div>
            <h3 class="text-xl font-bold text-white mb-3">Control Total Garantizado</h3>
            <p class="text-gray-300 leading-relaxed">
              Actuamos únicamente bajo tus instrucciones verificadas. Tú mantienes el 100% del control sobre tus bienes.
            </p>
          </div>

          <!-- Beneficio 3 -->
          <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-[#D4AF37]/50 transition-all duration-300 group">
            <div class="w-16 h-16 bg-[#D4AF37] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Icon name="lucide:file-check" class="w-8 h-8 text-[#0A1F44]" />
            </div>
            <h3 class="text-xl font-bold text-white mb-3">Transparencia Total</h3>
            <p class="text-gray-300 leading-relaxed">
              Cada acción queda documentada con fecha, evidencia y resultado. Trazabilidad completa y verificable.
            </p>
          </div>

          <!-- Beneficio 4 -->
          <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-[#D4AF37]/50 transition-all duration-300 group">
            <div class="w-16 h-16 bg-[#D4AF37] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Icon name="lucide:lock-keyhole" class="w-8 h-8 text-[#0A1F44]" />
            </div>
            <h3 class="text-xl font-bold text-white mb-3">Seguridad Bancaria</h3>
            <p class="text-gray-300 leading-relaxed">
              No recibimos ni mezclamos fondos. Facilitamos que los bancos reconozcan y ejecuten tu POA duradero.
            </p>
          </div>

          <!-- Beneficio 5 -->
          <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-[#D4AF37]/50 transition-all duration-300 group">
            <div class="w-16 h-16 bg-[#D4AF37] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Icon name="lucide:headphones" class="w-8 h-8 text-[#0A1F44]" />
            </div>
            <h3 class="text-xl font-bold text-white mb-3">Soporte Personalizado</h3>
            <p class="text-gray-300 leading-relaxed">
              Tu plan evoluciona contigo. Actualización de instrucciones, modificación de beneficiarios sin complicaciones.
            </p>
          </div>

          <!-- Beneficio 6 -->
          <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-[#D4AF37]/50 transition-all duration-300 group">
            <div class="w-16 h-16 bg-[#D4AF37] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Icon name="lucide:globe" class="w-8 h-8 text-[#0A1F44]" />
            </div>
            <h3 class="text-xl font-bold text-white mb-3">Acceso Global</h3>
            <p class="text-gray-300 leading-relaxed">
              Mantén el control de tus bienes desde cualquier parte del mundo, sin importar tu situación migratoria.
            </p>
          </div>
        </div>

        <!-- Stats destacados -->
        <div class="bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-2xl p-8 lg:p-12">
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div class="text-center">
              <p class="text-4xl lg:text-5xl font-bold text-[#D4AF37] mb-2">5+</p>
              <p class="text-white font-medium">Años de Experiencia</p>
            </div>
            <div class="text-center">
              <p class="text-4xl lg:text-5xl font-bold text-[#D4AF37] mb-2">500+</p>
              <p class="text-white font-medium">Familias Protegidas</p>
            </div>
            <div class="text-center">
              <p class="text-4xl lg:text-5xl font-bold text-[#D4AF37] mb-2">100%</p>
              <p class="text-white font-medium">Seguridad Legal</p>
            </div>
            <div class="text-center">
              <p class="text-4xl lg:text-5xl font-bold text-[#D4AF37] mb-2">4.9/5</p>
              <p class="text-white font-medium">Satisfacción</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Section - Rediseñada con layout más limpio -->
    <section class="py-20 lg:py-32 bg-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header de sección -->
        <div class="text-center mb-16">
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0A1F44]/5 border border-[#0A1F44]/10 mb-6">
            <Icon name="lucide:briefcase" class="w-4 h-4 text-[#0A1F44]" />
            <span class="text-[#0A1F44] font-semibold text-sm uppercase tracking-wide">Nuestros Servicios</span>
          </div>
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0A1F44] mb-6">
            Soluciones Completas para
            <span class="text-[#D4AF37]">Proteger tus Bienes</span>
          </h2>
          <p class="text-lg text-gray-600 max-w-3xl mx-auto">
            Ofrecemos un servicio integral que combina protección legal, transparencia y control total sobre tus bienes y decisiones financieras
          </p>
        </div>

        <!-- Grid de servicios mejorado -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          <div
            v-for="(service, index) in services"
            :key="index"
            class="group bg-white border-2 border-gray-100 rounded-2xl overflow-hidden hover:border-[#D4AF37] hover:shadow-2xl transition-all duration-300"
          >
            <!-- Icono y número -->
            <div class="p-8 pb-6">
              <div class="flex items-start justify-between mb-6">
                <div class="w-16 h-16 bg-[#0A1F44] rounded-xl flex items-center justify-center group-hover:bg-[#D4AF37] transition-colors duration-300">
                  <Icon :name="service.icon" class="w-8 h-8 text-white" />
                </div>
                <span class="text-[#D4AF37] font-bold text-5xl opacity-20">0{{ index + 1 }}</span>
              </div>

              <!-- Título y descripción -->
              <h3 class="text-xl font-bold text-[#0A1F44] mb-3 group-hover:text-[#D4AF37] transition-colors">
                {{ service.title }}
              </h3>
              <p class="text-gray-600 mb-6 leading-relaxed">
                {{ service.description }}
              </p>

              <!-- Beneficio clave -->
              <div class="pt-6 border-t border-gray-100">
                <div class="flex items-start gap-2">
                  <Icon name="lucide:check-circle-2" class="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                  <p class="text-sm font-semibold text-[#0A1F44]">
                    {{ service.benefits }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Footer con hover effect -->
            <div class="h-2 bg-gradient-to-r from-[#0A1F44] to-[#D4AF37] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          </div>
        </div>

        <!-- CTA para ver más servicios -->
        <div class="text-center mt-16">
          <NuxtLink to="/servicios">
            <button class="group px-8 py-4 bg-[#0A1F44] text-white font-bold text-lg rounded-xl hover:bg-[#D4AF37] hover:text-[#0A1F44] transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <span class="flex items-center justify-center gap-2">
                Ver Detalles de Todos los Servicios
                <Icon name="lucide:arrow-right" class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- How it Works Section - Timeline visual mejorado -->
    <section class="py-20 lg:py-32 bg-gray-50 relative overflow-hidden">
      <!-- Elementos decorativos -->
      <div class="absolute inset-0 pointer-events-none opacity-5">
        <div class="absolute top-20 right-10 w-64 h-64 bg-[#0A1F44] rounded-full blur-3xl"></div>
        <div class="absolute bottom-20 left-10 w-64 h-64 bg-[#D4AF37] rounded-full blur-3xl"></div>
      </div>

      <div class="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header de sección -->
        <div class="text-center mb-20">
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0A1F44]/5 border border-[#0A1F44]/10 mb-6">
            <Icon name="lucide:workflow" class="w-4 h-4 text-[#0A1F44]" />
            <span class="text-[#0A1F44] font-semibold text-sm uppercase tracking-wide">Cómo Funciona</span>
          </div>
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0A1F44] mb-6">
            Proceso Simple y
            <span class="text-[#D4AF37]">Transparente</span>
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            En solo 5 pasos protegemos tu sacrificio y garantizamos tu tranquilidad
          </p>
        </div>

        <!-- Timeline con diseño moderno mejorado -->
        <div class="max-w-6xl mx-auto">
          <!-- Mobile/Tablet: Diseño vertical -->
          <div class="lg:hidden space-y-8">
            <div
              v-for="(step, index) in steps"
              :key="index"
              class="relative flex gap-6"
            >
              <!-- Línea vertical conectora -->
              <div class="absolute left-10 top-20 bottom-0 w-0.5 bg-gradient-to-b from-[#D4AF37] to-gray-200" v-if="index < steps.length - 1"></div>

              <!-- Círculo del paso -->
              <div class="flex-shrink-0 relative z-10">
                <div class="w-20 h-20 bg-gradient-to-br from-[#D4AF37] to-[#c99d2e] rounded-full flex items-center justify-center shadow-xl ring-4 ring-white">
                  <span class="text-white font-bold text-2xl">{{ step.number }}</span>
                </div>
              </div>

              <!-- Contenido del paso -->
              <div class="flex-1 pt-2">
                <div class="bg-white border-2 border-gray-100 rounded-2xl p-6 hover:border-[#D4AF37] hover:shadow-xl transition-all duration-300 group">
                  <div class="flex items-center gap-3 mb-3">
                    <div class="w-10 h-10 bg-[#0A1F44] rounded-lg flex items-center justify-center group-hover:bg-[#D4AF37] transition-colors duration-300">
                      <Icon :name="step.icon" class="w-5 h-5 text-white" />
                    </div>
                    <h3 class="text-xl font-bold text-[#0A1F44] group-hover:text-[#D4AF37] transition-colors">
                      {{ step.title }}
                    </h3>
                  </div>
                  <p class="text-gray-600 leading-relaxed">
                    {{ step.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Desktop: Diseño alternado con línea central -->
          <div class="hidden lg:block relative">
            <!-- Línea vertical central -->
            <div class="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#0A1F44] via-[#D4AF37] to-[#0A1F44] -translate-x-1/2"></div>

            <div class="space-y-0">
              <div
                v-for="(step, index) in steps"
                :key="index"
                class="relative"
                :style="{ paddingTop: index === 0 ? '0' : '6rem', paddingBottom: index === steps.length - 1 ? '0' : '6rem' }"
              >
                <!-- Contenido alternado -->
                <div class="grid grid-cols-2 gap-16 items-center">
                  <!-- Lado izquierdo -->
                  <div class="flex justify-end">
                    <div v-if="index % 2 === 0" class="text-right w-full">
                      <div class="bg-white border-2 border-gray-100 rounded-2xl p-8 hover:border-[#D4AF37] hover:shadow-2xl transition-all duration-300 group">
                        <div class="flex items-center gap-4 mb-4 justify-end">
                          <h3 class="text-2xl font-bold text-[#0A1F44] group-hover:text-[#D4AF37] transition-colors">
                            {{ step.title }}
                          </h3>
                          <div class="w-12 h-12 bg-[#0A1F44] rounded-xl flex items-center justify-center group-hover:bg-[#D4AF37] transition-colors duration-300 flex-shrink-0">
                            <Icon :name="step.icon" class="w-6 h-6 text-white" />
                          </div>
                        </div>
                        <p class="text-gray-600 leading-relaxed text-lg">
                          {{ step.description }}
                        </p>
                      </div>
                    </div>
                  </div>

                  <!-- Lado derecho -->
                  <div class="flex justify-start">
                    <div v-if="index % 2 !== 0" class="text-left w-full">
                      <div class="bg-white border-2 border-gray-100 rounded-2xl p-8 hover:border-[#D4AF37] hover:shadow-2xl transition-all duration-300 group">
                        <div class="flex items-center gap-4 mb-4">
                          <div class="w-12 h-12 bg-[#0A1F44] rounded-xl flex items-center justify-center group-hover:bg-[#D4AF37] transition-colors duration-300 flex-shrink-0">
                            <Icon :name="step.icon" class="w-6 h-6 text-white" />
                          </div>
                          <h3 class="text-2xl font-bold text-[#0A1F44] group-hover:text-[#D4AF37] transition-colors">
                            {{ step.title }}
                          </h3>
                        </div>
                        <p class="text-gray-600 leading-relaxed text-lg">
                          {{ step.description }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Círculo central (siempre visible) -->
                <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                  <div class="w-24 h-24 bg-gradient-to-br from-[#D4AF37] to-[#c99d2e] rounded-full flex items-center justify-center shadow-2xl ring-8 ring-gray-50 border-4 border-white">
                    <span class="text-white font-bold text-3xl">{{ step.number }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- CTA para ver más detalles -->
        <div class="text-center mt-20">
          <NuxtLink to="/como-funciona">
            <button class="group px-10 py-5 bg-[#D4AF37] text-[#0A1F44] font-bold text-lg rounded-xl hover:bg-[#0A1F44] hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <span class="flex items-center justify-center gap-2">
                Ver Proceso Completo y Detallado
                <Icon name="lucide:arrow-right" class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Casos de Uso / Escenarios Reales Section -->
    <section class="py-20 lg:py-32 bg-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header -->
        <div class="text-center mb-16">
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0A1F44]/5 border border-[#0A1F44]/10 mb-6">
            <Icon name="lucide:users-round" class="w-4 h-4 text-[#0A1F44]" />
            <span class="text-[#0A1F44] font-semibold text-sm uppercase tracking-wide">Casos de Uso</span>
          </div>
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0A1F44] mb-6">
            ¿Cuándo Necesitas
            <span class="text-[#D4AF37]">Emigrantes FT?</span>
          </h2>
          <p class="text-lg text-gray-600 max-w-3xl mx-auto">
            Situaciones reales donde protegemos tu sacrificio y garantizamos tu tranquilidad
          </p>
        </div>

        <!-- Grid de casos de uso -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Caso 1 -->
          <div class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 group border-2 border-transparent hover:border-[#D4AF37]">
            <div class="w-14 h-14 bg-[#0A1F44] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#D4AF37] transition-colors duration-300">
              <Icon name="lucide:plane-takeoff" class="w-7 h-7 text-white" />
            </div>
            <h3 class="text-xl font-bold text-[#0A1F44] mb-4">Deportación Inesperada</h3>
            <p class="text-gray-600 leading-relaxed mb-4">
              Si eres deportado, tus instrucciones previas se activan automáticamente para que tu familia pueda acceder a tus cuentas y bienes sin complicaciones.
            </p>
            <div class="flex items-center gap-2 text-[#D4AF37] font-semibold text-sm">
              <Icon name="lucide:shield-check" class="w-4 h-4" />
              <span>Protección inmediata</span>
            </div>
          </div>

          <!-- Caso 2 -->
          <div class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 group border-2 border-transparent hover:border-[#D4AF37]">
            <div class="w-14 h-14 bg-[#0A1F44] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#D4AF37] transition-colors duration-300">
              <Icon name="lucide:hospital" class="w-7 h-7 text-white" />
            </div>
            <h3 class="text-xl font-bold text-[#0A1F44] mb-4">Emergencia Médica</h3>
            <p class="text-gray-600 leading-relaxed mb-4">
              En caso de incapacidad temporal o permanente, tu POA duradero garantiza que tus decisiones financieras se respeten y ejecuten correctamente.
            </p>
            <div class="flex items-center gap-2 text-[#D4AF37] font-semibold text-sm">
              <Icon name="lucide:shield-check" class="w-4 h-4" />
              <span>Continuidad garantizada</span>
            </div>
          </div>

          <!-- Caso 3 -->
          <div class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 group border-2 border-transparent hover:border-[#D4AF37]">
            <div class="w-14 h-14 bg-[#0A1F44] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#D4AF37] transition-colors duration-300">
              <Icon name="lucide:lock-keyhole" class="w-7 h-7 text-white" />
            </div>
            <h3 class="text-xl font-bold text-[#0A1F44] mb-4">Detención Migratoria</h3>
            <p class="text-gray-600 leading-relaxed mb-4">
              Si enfrentas detención, tu representante autorizado puede gestionar tus cuentas bancarias, pagar facturas y proteger tus bienes según tus instrucciones.
            </p>
            <div class="flex items-center gap-2 text-[#D4AF37] font-semibold text-sm">
              <Icon name="lucide:shield-check" class="w-4 h-4" />
              <span>Control desde cualquier lugar</span>
            </div>
          </div>

          <!-- Caso 4 -->
          <div class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 group border-2 border-transparent hover:border-[#D4AF37]">
            <div class="w-14 h-14 bg-[#0A1F44] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#D4AF37] transition-colors duration-300">
              <Icon name="lucide:globe" class="w-7 h-7 text-white" />
            </div>
            <h3 class="text-xl font-bold text-[#0A1F44] mb-4">Viaje al Extranjero</h3>
            <p class="text-gray-600 leading-relaxed mb-4">
              Cuando viajas fuera del país por tiempo prolongado, mantienes el control total de tus finanzas sin necesidad de estar físicamente presente.
            </p>
            <div class="flex items-center gap-2 text-[#D4AF37] font-semibold text-sm">
              <Icon name="lucide:shield-check" class="w-4 h-4" />
              <span>Gestión remota</span>
            </div>
          </div>

          <!-- Caso 5 -->
          <div class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 group border-2 border-transparent hover:border-[#D4AF37]">
            <div class="w-14 h-14 bg-[#0A1F44] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#D4AF37] transition-colors duration-300">
              <Icon name="lucide:home" class="w-7 h-7 text-white" />
            </div>
            <h3 class="text-xl font-bold text-[#0A1F44] mb-4">Protección de Propiedades</h3>
            <p class="text-gray-600 leading-relaxed mb-4">
              Gestiona la venta, renta o mantenimiento de propiedades inmobiliarias desde cualquier parte del mundo con total seguridad jurídica.
            </p>
            <div class="flex items-center gap-2 text-[#D4AF37] font-semibold text-sm">
              <Icon name="lucide:shield-check" class="w-4 h-4" />
              <span>Bienes protegidos</span>
            </div>
          </div>

          <!-- Caso 6 -->
          <div class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 group border-2 border-transparent hover:border-[#D4AF37]">
            <div class="w-14 h-14 bg-[#0A1F44] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#D4AF37] transition-colors duration-300">
              <Icon name="lucide:heart-handshake" class="w-7 h-7 text-white" />
            </div>
            <h3 class="text-xl font-bold text-[#0A1F44] mb-4">Protección Familiar</h3>
            <p class="text-gray-600 leading-relaxed mb-4">
              Asegura que tu familia tenga acceso a los recursos necesarios en caso de que no puedas proveerlos directamente por cualquier circunstancia.
            </p>
            <div class="flex items-center gap-2 text-[#D4AF37] font-semibold text-sm">
              <Icon name="lucide:shield-check" class="w-4 h-4" />
              <span>Familia protegida</span>
            </div>
          </div>
        </div>

        <!-- CTA -->
        <div class="text-center mt-16">
          <p class="text-gray-600 mb-6 text-lg">¿Identificas tu situación? Comienza a proteger tu sacrificio hoy mismo</p>
          <NuxtLink to="/auth/register">
            <button class="group px-10 py-5 bg-[#0A1F44] text-white font-bold text-lg rounded-xl hover:bg-[#D4AF37] hover:text-[#0A1F44] transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <span class="flex items-center justify-center gap-2">
                Crear Mi Plan de Protección
                <Icon name="lucide:arrow-right" class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Testimonials Section - Rediseñada -->
    <section class="py-20 lg:py-32 bg-white relative overflow-hidden">
      <!-- Elementos decorativos -->
      <div class="absolute inset-0 pointer-events-none opacity-5">
        <div class="absolute top-0 left-0 w-96 h-96 bg-[#D4AF37] rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 right-0 w-96 h-96 bg-[#0A1F44] rounded-full blur-3xl"></div>
      </div>

      <div class="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header -->
        <div class="text-center mb-16">
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0A1F44]/5 border border-[#0A1F44]/10 mb-6">
            <Icon name="lucide:quote" class="w-4 h-4 text-[#0A1F44]" />
            <span class="text-[#0A1F44] font-semibold text-sm uppercase tracking-wide">Testimonios</span>
          </div>
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0A1F44] mb-6">
            Historias de
            <span class="text-[#D4AF37]">Éxito y Confianza</span>
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Personas reales que protegieron su sacrificio con Emigrantes FT
          </p>
        </div>

        <!-- Grid de testimonios -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div
            v-for="(testimonial, index) in testimonials"
            :key="index"
            class="bg-white border-2 border-gray-100 rounded-2xl p-8 hover:border-[#D4AF37] hover:shadow-2xl transition-all duration-300 group"
          >
            <!-- Quote Icon -->
            <div class="w-12 h-12 bg-[#D4AF37]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#D4AF37]/20 transition-colors duration-300">
              <Icon name="lucide:quote" class="w-6 h-6 text-[#D4AF37]" />
            </div>

            <!-- Rating -->
            <div class="flex gap-1 mb-4">
              <Icon
                v-for="star in testimonial.rating"
                :key="star"
                name="lucide:star"
                class="w-5 h-5 text-[#D4AF37] fill-current"
              />
            </div>

            <!-- Testimonial -->
            <p class="text-gray-700 leading-relaxed mb-6 text-lg">
              "{{ testimonial.content }}"
            </p>

            <!-- Avatar y nombre -->
            <div class="flex items-center gap-4 pt-6 border-t border-gray-100">
              <NuxtImg
                :src="testimonial.avatar"
                :alt="testimonial.name"
                class="w-14 h-14 rounded-full border-2 border-[#D4AF37] object-cover"
                loading="lazy"
              />
              <div>
                <p class="text-[#0A1F44] font-bold">{{ testimonial.name }}</p>
                <p class="text-gray-500 text-sm">{{ testimonial.role }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Trust badges -->
        <div class="mt-16 pt-16 border-t border-gray-200">
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div class="text-center">
              <div class="w-16 h-16 bg-[#0A1F44]/5 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="lucide:shield-check" class="w-8 h-8 text-[#0A1F44]" />
              </div>
              <p class="text-2xl font-bold text-[#0A1F44] mb-1">100%</p>
              <p class="text-sm text-gray-600">Clientes Satisfechos</p>
            </div>
            <div class="text-center">
              <div class="w-16 h-16 bg-[#0A1F44]/5 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="lucide:users" class="w-8 h-8 text-[#0A1F44]" />
              </div>
              <p class="text-2xl font-bold text-[#0A1F44] mb-1">500+</p>
              <p class="text-sm text-gray-600">Familias Protegidas</p>
            </div>
            <div class="text-center">
              <div class="w-16 h-16 bg-[#0A1F44]/5 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="lucide:star" class="w-8 h-8 text-[#0A1F44]" />
              </div>
              <p class="text-2xl font-bold text-[#0A1F44] mb-1">4.9/5</p>
              <p class="text-sm text-gray-600">Calificación</p>
            </div>
            <div class="text-center">
              <div class="w-16 h-16 bg-[#0A1F44]/5 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="lucide:award" class="w-8 h-8 text-[#0A1F44]" />
              </div>
              <p class="text-2xl font-bold text-[#0A1F44] mb-1">5+</p>
              <p class="text-sm text-gray-600">Años Experiencia</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Garantías y Compromiso Legal Section -->
    <section class="py-20 lg:py-32 bg-[#0A1F44] relative overflow-hidden">
      <!-- Elementos decorativos -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
        <div class="absolute top-10 right-10 w-96 h-96 bg-[#D4AF37] rounded-full blur-3xl"></div>
        <div class="absolute bottom-10 left-10 w-96 h-96 bg-[#D4AF37] rounded-full blur-3xl"></div>
      </div>

      <div class="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header -->
        <div class="text-center mb-16">
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 mb-6">
            <Icon name="lucide:shield" class="w-4 h-4 text-[#D4AF37]" />
            <span class="text-[#D4AF37] font-semibold text-sm uppercase tracking-wide">Garantías</span>
          </div>
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Nuestro Compromiso
            <span class="text-[#D4AF37]">Contigo</span>
          </h2>
          <p class="text-lg text-gray-300 max-w-3xl mx-auto">
            Tu tranquilidad es nuestra prioridad. Por eso trabajamos bajo los más altos estándares legales y éticos
          </p>
        </div>

        <!-- Grid de garantías -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 hover:border-[#D4AF37]/50 transition-all duration-300 group">
            <div class="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <Icon name="lucide:check-circle-2" class="w-8 h-8 text-[#0A1F44]" />
            </div>
            <h3 class="text-xl font-bold text-white mb-3">Solo Tus Instrucciones</h3>
            <p class="text-gray-300 text-sm">
              Actuamos únicamente bajo tus órdenes verificadas. Sin excepciones.
            </p>
          </div>

          <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 hover:border-[#D4AF37]/50 transition-all duration-300 group">
            <div class="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <Icon name="lucide:ban" class="w-8 h-8 text-[#0A1F44]" />
            </div>
            <h3 class="text-xl font-bold text-white mb-3">Sin Manejo de Fondos</h3>
            <p class="text-gray-300 text-sm">
              No recibimos ni mezclamos fondos en cuentas propias. Total transparencia.
            </p>
          </div>

          <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 hover:border-[#D4AF37]/50 transition-all duration-300 group">
            <div class="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <Icon name="lucide:file-text" class="w-8 h-8 text-[#0A1F44]" />
            </div>
            <h3 class="text-xl font-bold text-white mb-3">Todo Documentado</h3>
            <p class="text-gray-300 text-sm">
              Cada acción respaldada y disponible en tu historial personal.
            </p>
          </div>

          <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 hover:border-[#D4AF37]/50 transition-all duration-300 group">
            <div class="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <Icon name="lucide:scale" class="w-8 h-8 text-[#0A1F44]" />
            </div>
            <h3 class="text-xl font-bold text-white mb-3">Respaldo Legal</h3>
            <p class="text-gray-300 text-sm">
              Sustentado por la legislación de Florida y el POA duradero.
            </p>
          </div>
        </div>

        <!-- Disclaimer importante -->
        <div class="bg-amber-500/10 border-2 border-amber-500/30 rounded-2xl p-8 lg:p-10 max-w-5xl mx-auto">
          <div class="flex items-start gap-4">
            <div class="flex-shrink-0 w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center">
              <Icon name="lucide:info" class="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <h3 class="text-xl font-bold text-amber-200 mb-3">Aviso Legal Importante</h3>
              <p class="text-amber-100 leading-relaxed">
                <strong>Emigrantes FT LLC</strong> presta un servicio de representación por instrucciones del cliente, respaldado por un Poder Notarial Duradero (POA).
                <strong class="block mt-2">No somos un transmisor de dinero ni una entidad financiera.</strong>
                Actuamos únicamente bajo instrucciones verificadas del cliente. Nuestro servicio está sustentado por la legislación del Estado de Florida y los lineamientos del Poder Notarial Duradero.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Final Section - Rediseñada -->
    <section class="py-20 lg:py-32 bg-gradient-to-br from-[#0A1F44] to-[#1e3a8a] relative overflow-hidden">
      <!-- Elementos decorativos -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        <div class="absolute -top-40 -left-40 w-96 h-96 bg-[#D4AF37] rounded-full blur-3xl"></div>
        <div class="absolute -bottom-40 -right-40 w-96 h-96 bg-[#D4AF37] rounded-full blur-3xl"></div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37] rounded-full blur-3xl"></div>
      </div>

      <div class="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-5xl mx-auto">
          <!-- Contenido principal -->
          <div class="text-center mb-12">
            <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 mb-8">
              <Icon name="lucide:sparkles" class="w-4 h-4 text-[#D4AF37]" />
              <span class="text-[#D4AF37] font-semibold text-sm uppercase tracking-wide">Comienza Hoy</span>
            </div>

            <h2 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              ¿Listo para Proteger
              <span class="text-[#D4AF37]">tu Sacrificio?</span>
            </h2>

            <p class="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Únete a más de <strong class="text-[#D4AF37]">500 familias</strong> que ya protegieron su patrimonio.
              Comienza hoy y obtén la <strong class="text-white">tranquilidad</strong> de saber que tus bienes están seguros.
            </p>

            <!-- CTAs principales -->
            <div class="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
              <NuxtLink to="/auth/register" class="w-full sm:w-auto">
                <button class="group w-full sm:w-auto px-10 py-6 bg-[#D4AF37] text-[#0A1F44] font-bold text-lg rounded-xl hover:bg-white transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                  <span class="flex items-center justify-center gap-2">
                    <Icon name="lucide:rocket" class="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    Crear Cuenta Gratis
                  </span>
                </button>
              </NuxtLink>

              <button
                @click="handleWhatsAppClick"
                class="group w-full sm:w-auto px-10 py-6 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-bold text-lg rounded-xl hover:bg-white hover:text-[#0A1F44] transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <span class="flex items-center justify-center gap-2">
                  <Icon name="lucide:message-circle" class="w-5 h-5" />
                  Hablar con un Asesor
                </span>
              </button>
            </div>

            <!-- Features rápidos -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
                <div class="w-12 h-12 bg-[#D4AF37] rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Icon name="lucide:zap" class="w-6 h-6 text-[#0A1F44]" />
                </div>
                <h3 class="text-white font-bold mb-2">Activación Inmediata</h3>
                <p class="text-gray-300 text-sm">Protección desde el primer día</p>
              </div>

              <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
                <div class="w-12 h-12 bg-[#D4AF37] rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Icon name="lucide:shield-check" class="w-6 h-6 text-[#0A1F44]" />
                </div>
                <h3 class="text-white font-bold mb-2">100% Legal</h3>
                <p class="text-gray-300 text-sm">Respaldado por ley de Florida</p>
              </div>

              <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
                <div class="w-12 h-12 bg-[#D4AF37] rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Icon name="lucide:dollar-sign" class="w-6 h-6 text-[#0A1F44]" />
                </div>
                <h3 class="text-white font-bold mb-2">Desde $29/mes</h3>
                <p class="text-gray-300 text-sm">Plan básico accesible</p>
              </div>
            </div>
          </div>

          <!-- Trust footer -->
          <div class="text-center pt-12 border-t border-white/10">
            <div class="flex flex-wrap items-center justify-center gap-8 text-gray-400">
              <div class="flex items-center gap-2">
                <Icon name="lucide:shield-check" class="w-5 h-5 text-[#D4AF37]" />
                <span class="text-sm">Sin permanencia</span>
              </div>
              <div class="flex items-center gap-2">
                <Icon name="lucide:lock" class="w-5 h-5 text-[#D4AF37]" />
                <span class="text-sm">Datos encriptados</span>
              </div>
              <div class="flex items-center gap-2">
                <Icon name="lucide:headphones" class="w-5 h-5 text-[#D4AF37]" />
                <span class="text-sm">Soporte 24/7</span>
              </div>
              <div class="flex items-center gap-2">
                <Icon name="lucide:star" class="w-5 h-5 text-[#D4AF37]" />
                <span class="text-sm">Calificación 4.9/5</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* Animación fade-in-up */
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Animación float - elementos flotantes suaves */
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

/* Animación shimmer - efecto brillo */
@keyframes shimmer {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}

/* Animación pulse-glow - pulso con brillo */
@keyframes pulse-glow {
  0%, 100% {
    box-shadow: 0 0 20px rgba(212, 175, 55, 0.4);
    transform: scale(1);
  }
  50% {
    box-shadow: 0 0 40px rgba(212, 175, 55, 0.6);
    transform: scale(1.05);
  }
}

/* Animación rotate-slow - rotación lenta */
@keyframes rotate-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-shimmer {
  animation: shimmer 3s linear infinite;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(212, 175, 55, 0.1) 50%,
    transparent 100%
  );
  background-size: 200% 100%;
}

.animate-pulse-glow {
  animation: pulse-glow 2s ease-in-out infinite;
}

.delay-200 {
  animation-delay: 0.2s;
  opacity: 0;
}

.delay-300 {
  animation-delay: 0.3s;
  opacity: 0;
}

.delay-400 {
  animation-delay: 0.4s;
  opacity: 0;
}

.delay-500 {
  animation-delay: 0.5s;
  opacity: 0;
}

/* Efecto glassmorphism mejorado */
.glass-effect {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Hover con múltiples sombras */
.hover-lift {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.hover-lift:hover {
  transform: translateY(-8px);
  box-shadow:
    0 20px 25px -5px rgba(10, 31, 68, 0.1),
    0 10px 10px -5px rgba(10, 31, 68, 0.04),
    0 0 0 1px rgba(212, 175, 55, 0.2);
}

/* Badge animado */
.badge-animated {
  position: relative;
  overflow: hidden;
}

.badge-animated::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.3),
    transparent
  );
  animation: shimmer 3s infinite;
}

/* Formas decorativas flotantes */
.floating-shape {
  position: absolute;
  border-radius: 50%;
  opacity: 0.15;
  animation: float 15s ease-in-out infinite;
}

.floating-shape:nth-child(2) {
  animation-delay: -5s;
  animation-duration: 20s;
}

.floating-shape:nth-child(3) {
  animation-delay: -10s;
  animation-duration: 25s;
}
</style>
