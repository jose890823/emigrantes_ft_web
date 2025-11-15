<script setup lang="ts">
import type { LoginRequest } from '~/types/api'

definePageMeta({
  layout: 'auth',
  middleware: 'guest'
})

const { login } = useAuth()
const toast = useToast()
const router = useRouter()

const isLoading = ref(false)
const showPassword = ref(false)

const form = reactive<LoginRequest>({
  email: '',
  password: '',
})

const errors = reactive({
  email: '',
  password: '',
  general: ''
})

const validateForm = (): boolean => {
  errors.email = ''
  errors.password = ''
  errors.general = ''

  if (!form.email) {
    errors.email = 'El email es requerido'
    return false
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'El email no es válido'
    return false
  }

  if (!form.password) {
    errors.password = 'La contraseña es requerida'
    return false
  }

  if (form.password.length < 8) {
    errors.password = 'La contraseña debe tener al menos 8 caracteres'
    return false
  }

  return true
}

const handleLogin = async () => {
  if (!validateForm()) return

  isLoading.value = true
  errors.general = ''

  try {
    const result = await login(form)

    if (result.success) {
      toast.success('¡Bienvenido!', 'Has iniciado sesión correctamente')
      router.push('/dashboard')
    } else {
      errors.general = result.error || 'Error al iniciar sesión'
      toast.error('Error', result.error || 'Credenciales incorrectas')
    }
  } catch (error: any) {
    errors.general = error.message || 'Error al iniciar sesión'
    toast.error('Error', 'Ocurrió un error inesperado')
  } finally {
    isLoading.value = false
  }
}

const togglePassword = () => {
  showPassword.value = !showPassword.value
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <!-- Logo y header -->
      <div class="text-center">
        <NuxtLink to="/" class="inline-block">
          <div class="w-16 h-16 bg-gradient-to-br from-[#0A1F44] to-blue-800 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span class="text-[#D4AF37] font-bold text-2xl">EFT</span>
          </div>
        </NuxtLink>
        <h2 class="text-3xl font-extrabold text-[#0A1F44] mb-2">
          Inicia Sesión
        </h2>
        <p class="text-gray-600">
          Accede a tu cuenta de Emigrantes FT
        </p>
      </div>

      <!-- Formulario -->
      <div class="bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <!-- Error general -->
        <div v-if="errors.general" class="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
          <div class="flex">
            <Icon name="lucide:alert-circle" class="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <p class="ml-3 text-sm text-red-700">{{ errors.general }}</p>
          </div>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-5">
          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-semibold text-gray-700 mb-2">
              Correo electrónico
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon name="lucide:mail" class="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                v-model="form.email"
                type="email"
                autocomplete="email"
                :class="[
                  'block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors',
                  errors.email
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:border-[#D4AF37] focus:ring-[#D4AF37]'
                ]"
                placeholder="tu@email.com"
              />
            </div>
            <p v-if="errors.email" class="mt-2 text-sm text-red-600">{{ errors.email }}</p>
          </div>

          <!-- Password -->
          <div>
            <label for="password" class="block text-sm font-semibold text-gray-700 mb-2">
              Contraseña
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon name="lucide:lock" class="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                autocomplete="current-password"
                :class="[
                  'block w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors',
                  errors.password
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:border-[#D4AF37] focus:ring-[#D4AF37]'
                ]"
                placeholder="••••••••"
              />
              <button
                type="button"
                @click="togglePassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <Icon
                  :name="showPassword ? 'lucide:eye-off' : 'lucide:eye'"
                  class="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors"
                />
              </button>
            </div>
            <p v-if="errors.password" class="mt-2 text-sm text-red-600">{{ errors.password }}</p>
          </div>

          <!-- Forgot password link -->
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                class="h-4 w-4 text-[#D4AF37] focus:ring-[#D4AF37] border-gray-300 rounded"
              />
              <label for="remember-me" class="ml-2 block text-sm text-gray-700">
                Recordarme
              </label>
            </div>

            <NuxtLink to="/auth/forgot-password" class="text-sm font-medium text-[#D4AF37] hover:text-[#0A1F44] transition-colors">
              ¿Olvidaste tu contraseña?
            </NuxtLink>
          </div>

          <!-- Submit button -->
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-md text-white font-bold bg-[#D4AF37] hover:bg-[#0A1F44] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D4AF37] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Icon v-if="isLoading" name="lucide:loader-2" class="w-5 h-5 animate-spin" />
            <span>{{ isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión' }}</span>
          </button>
        </form>

        <!-- Divider -->
        <div class="relative my-6">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-4 bg-white text-gray-500">o</span>
          </div>
        </div>

        <!-- Sign up link -->
        <div class="text-center">
          <p class="text-sm text-gray-600">
            ¿No tienes una cuenta?
            <NuxtLink to="/auth/register" class="font-semibold text-[#D4AF37] hover:text-[#0A1F44] transition-colors">
              Regístrate gratis
            </NuxtLink>
          </p>
        </div>
      </div>

      <!-- Back to home -->
      <div class="text-center">
        <NuxtLink to="/" class="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#0A1F44] transition-colors">
          <Icon name="lucide:arrow-left" class="w-4 h-4" />
          Volver al inicio
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
