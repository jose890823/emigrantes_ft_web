<script setup lang="ts">
const config = useRuntimeConfig()
const { isAuthenticated, logout } = useAuth()
const isMenuOpen = ref(false)
const isScrolled = ref(false)

const navigation = [
  { name: 'Inicio', href: '/' },
  { name: 'Servicios', href: '/servicios' },
  { name: 'Cómo funciona', href: '/como-funciona' },
  { name: 'Planes', href: '/planes' },
  { name: 'Contacto', href: '/contacto' },
]

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const handleLogout = async () => {
  await logout()
}

// Detectar scroll para efecto backdrop
onMounted(() => {
  const handleScroll = () => {
    isScrolled.value = window.scrollY > 10
  }

  // Verificar posición inicial al cargar
  handleScroll()

  window.addEventListener('scroll', handleScroll)
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })
})
</script>

<template>
  <header
    class="sticky top-0 z-50 w-full transition-all duration-500"
    :class="isScrolled
      ? 'border-b border-gray-200 bg-white backdrop-blur-xl shadow-lg shadow-black/5'
      : 'border-b border-transparent bg-transparent'"
  >
    <nav class="container mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
      <div class="flex items-center justify-between h-16 lg:h-20">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center space-x-3 group">
          <div class="w-10 h-10 bg-linear-to-br from-[#0A1F44] to-blue-800 rounded-lg flex items-center justify-center transform transition-transform group-hover:scale-110">
            <span class="text-[#D4AF37] font-bold text-xl">EFT</span>
          </div>
          <div class="hidden sm:block">
            <span class="text-[#0A1F44] font-bold text-lg">{{ config.public.brandName }}</span>
            <p class="text-xs text-gray-600">Protegemos tu sacrificio</p>
          </div>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <div class="hidden lg:flex lg:items-center lg:space-x-8">
          <NuxtLink
            v-for="item in navigation"
            :key="item.name"
            :to="item.href"
            class="text-gray-700 hover:text-[#0A1F44] font-medium transition-colors relative group"
          >
            {{ item.name }}
            <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#D4AF37] transition-all duration-300 group-hover:w-full"></span>
          </NuxtLink>
        </div>

        <!-- CTA Buttons -->
        <div class="hidden lg:flex lg:items-center lg:space-x-3">
          <template v-if="isAuthenticated">
            <NuxtLink to="/poa">
              <button class="px-5 py-2.5 text-[#0A1F44] font-semibold hover:text-[#D4AF37] transition-colors duration-300">
                Mis POAs
              </button>
            </NuxtLink>
            <NuxtLink to="/dashboard">
              <button class="px-5 py-2.5 text-[#0A1F44] font-semibold hover:text-[#D4AF37] transition-colors duration-300">
                Dashboard
              </button>
            </NuxtLink>
            <button
              @click="handleLogout"
              class="px-5 py-2.5 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-[#0A1F44] hover:text-[#0A1F44] transition-all duration-300"
            >
              Salir
            </button>
          </template>
          <template v-else>
            <NuxtLink to="/auth/login">
              <button class="px-5 py-2.5 text-[#0A1F44] font-semibold hover:text-[#D4AF37] transition-colors duration-300">
                Iniciar Sesión
              </button>
            </NuxtLink>
            <NuxtLink to="/auth/register">
              <button class="px-6 py-2.5 bg-[#D4AF37] text-[#0A1F44] font-bold rounded-lg hover:bg-[#0A1F44] hover:text-white transition-all duration-300 hover:shadow-lg">
                Comenzar Ahora
              </button>
            </NuxtLink>
          </template>
        </div>

        <!-- Mobile menu button -->
        <button
          @click="toggleMenu"
          class="lg:hidden p-2 rounded-md text-gray-700 hover:text-[#0A1F44] hover:bg-gray-100 transition-colors"
        >
          <Icon :name="isMenuOpen ? 'lucide:x' : 'lucide:menu'" class="w-6 h-6" />
        </button>
      </div>

      <!-- Mobile Navigation -->
      <Transition
        enter-active-class="transition ease-out duration-200"
        enter-from-class="opacity-0 -translate-y-1"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition ease-in duration-150"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-1"
      >
        <div v-show="isMenuOpen" class="lg:hidden py-4 space-y-2 border-t border-gray-200">
          <NuxtLink
            v-for="item in navigation"
            :key="item.name"
            :to="item.href"
            @click="isMenuOpen = false"
            class="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-[#0A1F44] rounded-md transition-colors"
          >
            {{ item.name }}
          </NuxtLink>

          <div class="pt-4 border-t border-gray-200 space-y-3 px-4">
            <template v-if="isAuthenticated">
              <NuxtLink to="/poa" @click="isMenuOpen = false" class="block">
                <button class="w-full px-6 py-3 bg-[#D4AF37] text-[#0A1F44] font-semibold rounded-lg hover:bg-[#0A1F44] hover:text-white transition-all duration-300">
                  Mis POAs
                </button>
              </NuxtLink>
              <NuxtLink to="/dashboard" @click="isMenuOpen = false" class="block">
                <button class="w-full px-6 py-3 border-2 border-[#0A1F44] text-[#0A1F44] font-semibold rounded-lg hover:bg-[#0A1F44] hover:text-white transition-all duration-300">
                  Dashboard
                </button>
              </NuxtLink>
              <button
                @click="handleLogout"
                class="w-full px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-red-500 hover:text-red-500 transition-all duration-300"
              >
                Salir
              </button>
            </template>
            <template v-else>
              <NuxtLink to="/auth/login" @click="isMenuOpen = false" class="block">
                <button class="w-full px-6 py-3 border-2 border-[#0A1F44] text-[#0A1F44] font-semibold rounded-lg hover:bg-[#0A1F44] hover:text-white transition-all duration-300">
                  Iniciar Sesión
                </button>
              </NuxtLink>
              <NuxtLink to="/auth/register" @click="isMenuOpen = false" class="block">
                <button class="w-full px-6 py-3 bg-[#D4AF37] text-[#0A1F44] font-bold rounded-lg hover:bg-[#0A1F44] hover:text-white transition-all duration-300 shadow-md hover:shadow-xl">
                  Comenzar Ahora
                </button>
              </NuxtLink>
            </template>
          </div>
        </div>
      </Transition>
    </nav>
  </header>
</template>
