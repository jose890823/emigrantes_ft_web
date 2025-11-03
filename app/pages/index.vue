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
    <!-- Hero Section con imagen de fondo -->
    <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
      <!-- Background Image con overlay -->
      <div class="absolute inset-0">
        <NuxtImg
          src="https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1920&h=1080&fit=crop"
          alt="Familia protegida"
          class="w-full h-full object-cover"
          loading="eager"
          quality="80"
        />
        <!-- Overlay degradado más oscuro para mejor legibilidad -->
        <div class="absolute inset-0 bg-linear-to-br from-[#0A1F44]/97 via-blue-900/93 to-[#0A1F44]/97"></div>
      </div>

      <!-- Animated background elements - Formas flotantes mejoradas -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="floating-shape w-96 h-96 bg-[#D4AF37]/10 blur-3xl -top-48 -left-48"></div>
        <div class="floating-shape w-80 h-80 bg-blue-500/10 blur-3xl top-1/4 right-1/4"></div>
        <div class="floating-shape w-64 h-64 bg-[#D4AF37]/15 blur-2xl -bottom-32 -right-32"></div>

        <!-- Círculos decorativos adicionales -->
        <div class="absolute w-2 h-2 bg-[#D4AF37] rounded-full top-20 left-20 animate-pulse"></div>
        <div class="absolute w-3 h-3 bg-[#D4AF37]/50 rounded-full top-40 right-40 animate-pulse delay-300"></div>
        <div class="absolute w-2 h-2 bg-white rounded-full bottom-40 left-1/3 animate-pulse delay-500"></div>
      </div>

      <div class="container relative mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div class="max-w-5xl mx-auto">
          <!-- Contenido centrado -->
          <div class="text-center space-y-10">
            <!-- Badge superior -->
            <div class="animate-fade-in-up inline-block">
              <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 backdrop-blur-sm">
                <Icon name="lucide:shield-check" class="w-4 h-4 text-[#D4AF37]" />
                <span class="text-[#D4AF37] font-semibold text-sm">Respaldado por la Ley de Florida</span>
              </div>
            </div>

            <!-- Título principal -->
            <div class="space-y-6 animate-fade-in-up delay-200">
              <h1 class="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight">
                Protegemos tu
                <span class="block bg-linear-to-r from-[#D4AF37] via-yellow-300 to-[#D4AF37] bg-clip-text text-transparent mt-2">
                  sacrificio
                </span>
              </h1>
              <p class="text-xl sm:text-2xl lg:text-3xl text-gray-200 font-light max-w-3xl mx-auto leading-relaxed">
                Mantén poder y control total sobre tus bienes desde cualquier parte del mundo
              </p>
            </div>

            <!-- Descripción -->
            <p class="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto animate-fade-in-up delay-300 leading-relaxed">
              Servicio innovador con Poder Notarial Duradero (POA) que te permite conservar el control
              sobre tus cuentas y bienes, incluso ante deportación, detención o incapacidad.
            </p>

            <!-- CTA Buttons centrados con gradientes modernos -->
            <div class="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-400 pt-4">
              <NuxtLink to="/auth/register">
                <button class="relative px-10 py-7 text-lg font-bold rounded-full overflow-hidden transition-all duration-400 hover:scale-105 w-full sm:w-auto group shadow-2xl">
                  <!-- Fondo con gradiente animado -->
                  <div class="absolute inset-0 bg-linear-to-r from-[#D4AF37] via-[#fbbf24] to-[#D4AF37] bg-[length:200%_100%] animate-shimmer"></div>
                  <!-- Brillo en hover -->
                  <div class="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <!-- Contenido -->
                  <span class="relative flex items-center justify-center text-[#0A1F44] gap-2">
                    <Icon name="lucide:rocket" class="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    Comenzar Ahora Gratis
                  </span>
                </button>
              </NuxtLink>
              <button
                @click="handleWhatsAppClick"
                class="relative px-10 py-7 text-lg font-bold rounded-full overflow-hidden transition-all duration-400 hover:scale-105 w-full sm:w-auto group"
              >
                <!-- Borde gradiente -->
                <div class="absolute inset-0 bg-linear-to-r from-[#3b82f6] via-[#60a5fa] to-[#3b82f6] rounded-full p-[2px] bg-[length:200%_100%] animate-shimmer">
                  <div class="absolute inset-[2px] bg-[#0A1F44]/50 backdrop-blur-xl rounded-full"></div>
                </div>
                <!-- Contenido -->
                <span class="relative flex items-center justify-center text-white gap-2">
                  <Icon name="lucide:message-circle" class="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Contactar por WhatsApp
                </span>
              </button>
            </div>

            <!-- Trust indicators en grid horizontal -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 mt-16 animate-fade-in-up delay-500 max-w-4xl mx-auto">
              <div class="glass-effect rounded-2xl p-6 hover-lift text-center group">
                <div class="w-12 h-12 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-[#D4AF37]/20 transition-all duration-300">
                  <Icon name="lucide:shield-check" class="w-6 h-6 text-[#D4AF37] group-hover:scale-110 transition-transform" />
                </div>
                <p class="text-white font-bold text-lg">100% Legal</p>
                <p class="text-gray-400 text-xs mt-1">Estado de Florida</p>
              </div>
              <div class="glass-effect rounded-2xl p-6 hover-lift text-center group">
                <div class="w-12 h-12 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-[#D4AF37]/20 transition-all duration-300">
                  <Icon name="lucide:lock" class="w-6 h-6 text-[#D4AF37] group-hover:scale-110 transition-transform" />
                </div>
                <p class="text-white font-bold text-lg">Seguro</p>
                <p class="text-gray-400 text-xs mt-1">Encriptado AES-256</p>
              </div>
              <div class="glass-effect rounded-2xl p-6 hover-lift text-center group">
                <div class="w-12 h-12 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-[#D4AF37]/20 transition-all duration-300">
                  <Icon name="lucide:headphones" class="w-6 h-6 text-[#D4AF37] group-hover:scale-110 transition-transform" />
                </div>
                <p class="text-white font-bold text-lg">Soporte 24/7</p>
                <p class="text-gray-400 text-xs mt-1">Siempre disponible</p>
              </div>
              <div class="glass-effect rounded-2xl p-6 hover-lift text-center group">
                <div class="w-12 h-12 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-[#D4AF37]/20 transition-all duration-300">
                  <Icon name="lucide:users" class="w-6 h-6 text-[#D4AF37] group-hover:scale-110 transition-transform" />
                </div>
                <p class="text-white font-bold text-lg">500+ Clientes</p>
                <p class="text-gray-400 text-xs mt-1">Familias protegidas</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <Icon name="lucide:chevron-down" class="w-8 h-8 text-[#D4AF37]" />
      </div>
    </section>

    <!-- Services Section con imágenes -->
    <section class="py-20 lg:py-32 bg-gray-50">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0A1F44] mb-4">
            Nuestros Servicios
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Protección completa y control total sobre tus bienes, sin importar dónde estés
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="(service, index) in services"
            :key="index"
            class="group bg-white rounded-2xl overflow-hidden hover-lift border border-gray-100 hover:border-[#D4AF37]/50"
          >
            <!-- Imagen del servicio con efecto shimmer -->
            <div class="relative h-48 overflow-hidden">
              <NuxtImg
                :src="service.image"
                :alt="service.title"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-linear-to-t from-black/70 to-transparent"></div>
              <div class="absolute inset-0 animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div class="absolute bottom-4 left-4 w-12 h-12 bg-[#D4AF37] rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Icon :name="service.icon" class="w-6 h-6 text-[#0A1F44]" />
              </div>
            </div>

            <!-- Contenido -->
            <div class="p-6">
              <h3 class="text-lg font-bold text-[#0A1F44] mb-3 group-hover:text-[#D4AF37] transition-colors">
                {{ service.title }}
              </h3>
              <p class="text-gray-600 mb-4 leading-relaxed text-sm">
                {{ service.description }}
              </p>
              <div class="pt-4 border-t border-gray-100">
                <p class="text-sm font-semibold text-[#D4AF37]">
                  <Icon name="lucide:check-circle" class="w-4 h-4 inline mr-1" />
                  {{ service.benefits }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="text-center mt-12">
          <NuxtLink to="/servicios">
            <button class="relative px-8 py-4 text-lg font-semibold rounded-full overflow-hidden transition-all duration-400 hover:scale-105 group">
              <!-- Borde gradiente azul -->
              <div class="absolute inset-0 bg-linear-to-r from-[#0A1F44] via-[#1e3a8a] to-[#0A1F44] rounded-full p-[2px] bg-[length:200%_100%] animate-shimmer">
                <div class="absolute inset-[2px] bg-white rounded-full group-hover:bg-[#0A1F44] transition-colors duration-400"></div>
              </div>
              <!-- Contenido -->
              <span class="relative flex items-center justify-center text-[#0A1F44] group-hover:text-white transition-colors duration-400 gap-2">
                Ver Todos los Servicios
                <Icon name="lucide:arrow-right" class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Statistics Section con efectos mejorados -->
    <section class="py-20 bg-[#0A1F44] text-white relative overflow-hidden">
      <!-- Formas decorativas de fondo -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="floating-shape w-64 h-64 bg-[#D4AF37]/5 blur-3xl top-10 left-10"></div>
        <div class="floating-shape w-80 h-80 bg-blue-500/5 blur-3xl bottom-10 right-10"></div>
      </div>

      <div class="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div class="space-y-2 group">
            <div class="w-16 h-16 mx-auto bg-[#D4AF37]/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#D4AF37]/20 transition-all duration-300">
              <Icon name="lucide:users" class="w-8 h-8 text-[#D4AF37] group-hover:scale-110 transition-transform duration-300" />
            </div>
            <p class="text-5xl font-bold text-[#D4AF37] tabular-nums">500+</p>
            <p class="text-gray-300">Familias Protegidas</p>
          </div>
          <div class="space-y-2 group">
            <div class="w-16 h-16 mx-auto bg-[#D4AF37]/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#D4AF37]/20 transition-all duration-300">
              <Icon name="lucide:shield-check" class="w-8 h-8 text-[#D4AF37] group-hover:scale-110 transition-transform duration-300" />
            </div>
            <p class="text-5xl font-bold text-[#D4AF37]">100%</p>
            <p class="text-gray-300">Seguridad Legal</p>
          </div>
          <div class="space-y-2 group">
            <div class="w-16 h-16 mx-auto bg-[#D4AF37]/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#D4AF37]/20 transition-all duration-300">
              <Icon name="lucide:clock" class="w-8 h-8 text-[#D4AF37] group-hover:scale-110 transition-transform duration-300" />
            </div>
            <p class="text-5xl font-bold text-[#D4AF37]">24/7</p>
            <p class="text-gray-300">Soporte Disponible</p>
          </div>
          <div class="space-y-2 group">
            <div class="w-16 h-16 mx-auto bg-[#D4AF37]/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#D4AF37]/20 transition-all duration-300">
              <Icon name="lucide:star" class="w-8 h-8 text-[#D4AF37] group-hover:scale-110 transition-transform duration-300" />
            </div>
            <p class="text-5xl font-bold text-[#D4AF37]">4.9/5</p>
            <p class="text-gray-300">Calificación Promedio</p>
          </div>
        </div>
      </div>
    </section>

    <!-- How it Works Section -->
    <section class="py-20 lg:py-32 bg-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0A1F44] mb-4">
            ¿Cómo Funciona?
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Proceso simple y transparente en 5 pasos
          </p>
        </div>

        <div class="max-w-4xl mx-auto">
          <div class="space-y-8">
            <div
              v-for="(step, index) in steps"
              :key="index"
              class="flex items-start gap-6 group"
            >
              <div class="flex-shrink-0">
                <div class="w-16 h-16 bg-linear-to-br from-[#D4AF37] to-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  {{ step.number }}
                </div>
              </div>
              <div class="flex-1 bg-gray-50 rounded-xl p-6 group-hover:bg-[#0A1F44] group-hover:text-white transition-all duration-300">
                <div class="flex items-center gap-3 mb-2">
                  <Icon :name="step.icon" class="w-6 h-6 text-[#D4AF37]" />
                  <h3 class="text-xl font-bold">{{ step.title }}</h3>
                </div>
                <p class="text-gray-600 group-hover:text-gray-200 leading-relaxed">
                  {{ step.description }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="text-center mt-12">
          <NuxtLink to="/como-funciona">
            <button class="relative px-8 py-4 text-lg font-semibold rounded-full overflow-hidden transition-all duration-400 hover:scale-105 group shadow-lg">
              <!-- Fondo gradiente dorado -->
              <div class="absolute inset-0 bg-linear-to-r from-[#D4AF37] via-[#fbbf24] to-[#D4AF37] bg-[length:200%_100%] animate-shimmer"></div>
              <!-- Contenido -->
              <span class="relative flex items-center justify-center text-[#0A1F44] gap-2 font-bold">
                Ver Proceso Detallado
                <Icon name="lucide:arrow-right" class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Testimonials Section con avatares -->
    <section class="py-20 lg:py-32 bg-linear-to-br from-[#0A1F44] to-blue-900">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Lo Que Dicen Nuestros Clientes
          </h2>
          <p class="text-lg text-gray-300 max-w-2xl mx-auto">
            Historias reales de personas que protegieron su sacrificio
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div
            v-for="(testimonial, index) in testimonials"
            :key="index"
            class="glass-effect rounded-2xl p-8 hover:border-[#D4AF37] transition-all duration-400 hover:scale-105 hover-lift"
          >
            <!-- Avatar -->
            <div class="flex items-center gap-4 mb-6">
              <NuxtImg
                :src="testimonial.avatar"
                :alt="testimonial.name"
                class="w-16 h-16 rounded-full border-2 border-[#D4AF37] object-cover"
                loading="lazy"
              />
              <div>
                <p class="text-white font-semibold">{{ testimonial.name }}</p>
                <p class="text-gray-400 text-sm">{{ testimonial.role }}</p>
              </div>
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
            <p class="text-white leading-relaxed italic">
              "{{ testimonial.content }}"
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 lg:py-32 bg-[#D4AF37]">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0A1F44] mb-6">
            ¿Listo para Proteger tu Sacrificio?
          </h2>
          <p class="text-lg text-[#0A1F44]/80 mb-8 max-w-2xl mx-auto">
            Comienza hoy y obtén la tranquilidad de saber que tus bienes están protegidos, sin importar lo que suceda.
          </p>
          <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
            <NuxtLink to="/auth/register">
              <button class="relative px-10 py-6 text-lg font-bold rounded-full overflow-hidden transition-all duration-400 hover:scale-105 w-full sm:w-auto group shadow-xl">
                <!-- Fondo gradiente azul oscuro -->
                <div class="absolute inset-0 bg-linear-to-r from-[#0A1F44] via-[#1e3a8a] to-[#0A1F44] bg-[length:200%_100%] animate-shimmer"></div>
                <!-- Contenido -->
                <span class="relative flex items-center justify-center text-white gap-2">
                  <Icon name="lucide:user-plus" class="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Crear Cuenta Gratis
                </span>
              </button>
            </NuxtLink>
            <NuxtLink to="/planes">
              <button class="relative px-10 py-6 text-lg font-bold rounded-full overflow-hidden transition-all duration-400 hover:scale-105 w-full sm:w-auto group">
                <!-- Borde gradiente -->
                <div class="absolute inset-0 bg-linear-to-r from-[#0A1F44] via-[#3b82f6] to-[#0A1F44] rounded-full p-[2px] bg-[length:200%_100%] animate-shimmer">
                  <div class="absolute inset-[2px] bg-[#D4AF37] rounded-full"></div>
                </div>
                <!-- Contenido -->
                <span class="relative flex items-center justify-center text-[#0A1F44] gap-2">
                  <Icon name="lucide:credit-card" class="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  Ver Planes - $29/mes
                </span>
              </button>
            </NuxtLink>
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
