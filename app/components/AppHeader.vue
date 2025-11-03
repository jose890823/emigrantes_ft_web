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
  window.addEventListener('scroll', handleScroll)
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })
})
</script>

<template>
  <header
    class="sticky top-0 z-50 w-full border-b transition-all duration-300"
    :class="isScrolled
      ? 'border-gray-200 bg-white/95 backdrop-blur-xl shadow-lg shadow-black/5'
      : 'border-transparent bg-white/80 backdrop-blur-sm'"
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
        <div class="hidden lg:flex lg:items-center lg:space-x-4">
          <template v-if="isAuthenticated">
            <NuxtLink to="/dashboard">
              <Button variant="ghost" size="sm">
                Mi Cuenta
              </Button>
            </NuxtLink>
            <Button variant="outline" size="sm" @click="handleLogout">
              Salir
            </Button>
          </template>
          <template v-else>
            <NuxtLink to="/auth/login">
              <Button variant="ghost" size="sm">
                Iniciar Sesión
              </Button>
            </NuxtLink>
            <NuxtLink to="/auth/register">
              <Button size="sm" class="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#0A1F44]">
                Comenzar
              </Button>
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

          <div class="pt-4 border-t border-gray-200 space-y-2">
            <template v-if="isAuthenticated">
              <NuxtLink to="/dashboard" @click="isMenuOpen = false">
                <Button variant="outline" class="w-full">
                  Mi Cuenta
                </Button>
              </NuxtLink>
              <Button variant="ghost" class="w-full" @click="handleLogout">
                Salir
              </Button>
            </template>
            <template v-else>
              <NuxtLink to="/auth/login" @click="isMenuOpen = false">
                <Button variant="outline" class="w-full">
                  Iniciar Sesión
                </Button>
              </NuxtLink>
              <NuxtLink to="/auth/register" @click="isMenuOpen = false">
                <Button class="w-full bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#0A1F44]">
                  Comenzar
                </Button>
              </NuxtLink>
            </template>
          </div>
        </div>
      </Transition>
    </nav>
  </header>
</template>
