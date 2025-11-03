<script setup lang="ts">
const config = useRuntimeConfig()
const currentYear = new Date().getFullYear()

const footerLinks = {
  servicios: [
    { name: 'Representación Financiera', href: '/servicios#representacion' },
    { name: 'Custodia de Instrucciones', href: '/servicios#custodia' },
    { name: 'Gestión Bancaria', href: '/servicios#gestion' },
    { name: 'Reportes y Auditoría', href: '/servicios#reportes' },
  ],
  legal: [
    { name: 'Legalidad y Respaldo', href: '/legalidad' },
    { name: 'Términos y Condiciones', href: '/terminos' },
    { name: 'Política de Privacidad', href: '/privacidad' },
    { name: 'Preguntas Frecuentes', href: '/faq' },
  ],
  contacto: [
    { name: 'Agendar Cita', href: '/contacto#cita' },
    { name: 'WhatsApp', href: `https://wa.me/${config.public.whatsappNumber.replace(/\D/g, '')}` },
    { name: 'Email', href: `mailto:${config.public.brandEmail}` },
    { name: 'Teléfono', href: `tel:${config.public.brandPhone}` },
  ],
}

const socialLinks = [
  { name: 'Instagram', icon: 'lucide:instagram', href: 'https://instagram.com/emigrantes_ft' },
  { name: 'TikTok', icon: 'ic:baseline-tiktok', href: 'https://tiktok.com/@emigrantesft' },
]
</script>

<template>
  <footer class="bg-[#0A1F44] text-white">
    <!-- Main Footer -->
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
        <!-- Brand Column -->
        <div class="space-y-4">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-[#D4AF37] rounded-lg flex items-center justify-center">
              <span class="text-[#0A1F44] font-bold text-xl">EFT</span>
            </div>
            <span class="font-bold text-lg">{{ config.public.brandName }}</span>
          </div>
          <p class="text-gray-300 text-sm leading-relaxed">
            Protegemos tu sacrificio. Mantén poder y control total sobre tus bienes desde cualquier parte del mundo.
          </p>
          <div class="flex space-x-4">
            <a
              v-for="social in socialLinks"
              :key="social.name"
              :href="social.href"
              target="_blank"
              rel="noopener noreferrer"
              class="w-10 h-10 rounded-full bg-white/10 hover:bg-[#D4AF37] flex items-center justify-center transition-all duration-300 hover:scale-110"
            >
              <Icon :name="social.icon" class="w-5 h-5" />
            </a>
          </div>
        </div>

        <!-- Services Column -->
        <div>
          <h3 class="font-semibold text-[#D4AF37] mb-4">Servicios</h3>
          <ul class="space-y-2">
            <li v-for="link in footerLinks.servicios" :key="link.name">
              <NuxtLink
                :to="link.href"
                class="text-gray-300 hover:text-[#D4AF37] transition-colors text-sm"
              >
                {{ link.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Legal Column -->
        <div>
          <h3 class="font-semibold text-[#D4AF37] mb-4">Legal</h3>
          <ul class="space-y-2">
            <li v-for="link in footerLinks.legal" :key="link.name">
              <NuxtLink
                :to="link.href"
                class="text-gray-300 hover:text-[#D4AF37] transition-colors text-sm"
              >
                {{ link.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Contact Column -->
        <div>
          <h3 class="font-semibold text-[#D4AF37] mb-4">Contacto</h3>
          <ul class="space-y-3">
            <li class="flex items-start space-x-2 text-sm">
              <Icon name="lucide:map-pin" class="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
              <span class="text-gray-300">{{ config.public.brandAddress }}</span>
            </li>
            <li class="flex items-center space-x-2 text-sm">
              <Icon name="lucide:phone" class="w-5 h-5 text-[#D4AF37] shrink-0" />
              <a :href="`tel:${config.public.brandPhone}`" class="text-gray-300 hover:text-[#D4AF37] transition-colors">
                {{ config.public.brandPhone }}
              </a>
            </li>
            <li class="flex items-center space-x-2 text-sm">
              <Icon name="lucide:mail" class="w-5 h-5 text-[#D4AF37] shrink-0" />
              <a :href="`mailto:${config.public.brandEmail}`" class="text-gray-300 hover:text-[#D4AF37] transition-colors">
                {{ config.public.brandEmail }}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Disclaimer -->
    <div class="border-t border-white/10">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 mb-6">
          <p class="text-xs text-amber-200 leading-relaxed">
            <strong>Aviso importante:</strong> Emigrantes FT presta un servicio de representación por instrucciones del cliente, respaldado por un POA duradero. No somos un transmisor de dinero ni una entidad financiera. Actuamos únicamente bajo instrucciones verificadas del cliente. Nuestro servicio está sustentado por la legislación del Estado de Florida y los lineamientos del Poder Notarial Duradero.
          </p>
        </div>

        <div class="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400 space-y-2 md:space-y-0">
          <p>© {{ currentYear }} {{ config.public.brandName }} LLC. Todos los derechos reservados.</p>
          <p class="text-xs">Miami Springs, Florida</p>
        </div>
      </div>
    </div>
  </footer>
</template>
