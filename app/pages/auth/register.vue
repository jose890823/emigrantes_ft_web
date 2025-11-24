<script setup lang="ts">
import type { RegisterRequest, SubscriptionPlan, InitialPaymentType } from '~/types/api'

definePageMeta({
  layout: 'auth',
  middleware: 'guest'
})

const { register } = useAuth()
const toast = useToast()
const router = useRouter()
const route = useRoute()

// Obtener plan y tipo de pago de los query params
const selectedPlan = computed(() => route.query.plan as SubscriptionPlan | undefined)
const selectedPaymentType = computed(() => (route.query.payment as InitialPaymentType) || 'single')

// Información de planes
const planInfo: Record<SubscriptionPlan, { name: string; monthlyPrice: number; initialPayment: number; installmentAmount: number }> = {
  basic: { name: 'Plan Básico', monthlyPrice: 14, initialPayment: 129, installmentAmount: 43 },
  standard: { name: 'Plan Estándar', monthlyPrice: 24, initialPayment: 199, installmentAmount: 66.33 },
  premium: { name: 'Plan Premium', monthlyPrice: 39, initialPayment: 299, installmentAmount: 99.67 },
}

const currentPlanInfo = computed(() => selectedPlan.value ? planInfo[selectedPlan.value] : null)

const isLoading = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)

const form = reactive<RegisterRequest & { confirmPassword: string }>({
  email: '',
  password: '',
  confirmPassword: '',
  firstName: '',
  lastName: '',
  phone: '',
})

const errors = reactive({
  email: '',
  password: '',
  confirmPassword: '',
  firstName: '',
  lastName: '',
  phone: '',
  general: ''
})

const validateForm = (): boolean => {
  // Reset errors
  Object.keys(errors).forEach(key => errors[key as keyof typeof errors] = '')

  let isValid = true

  // Validar firstName
  if (!form.firstName.trim()) {
    errors.firstName = 'El nombre es requerido'
    isValid = false
  }

  // Validar lastName
  if (!form.lastName.trim()) {
    errors.lastName = 'El apellido es requerido'
    isValid = false
  }

  // Validar email
  if (!form.email) {
    errors.email = 'El email es requerido'
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'El email no es válido'
    isValid = false
  }

  // Validar teléfono
  if (!form.phone) {
    errors.phone = 'El teléfono es requerido'
    isValid = false
  } else if (!/^\+?[\d\s-()]+$/.test(form.phone)) {
    errors.phone = 'El teléfono no es válido'
    isValid = false
  }

  // Validar password
  if (!form.password) {
    errors.password = 'La contraseña es requerida'
    isValid = false
  } else if (form.password.length < 8) {
    errors.password = 'La contraseña debe tener al menos 8 caracteres'
    isValid = false
  } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])/.test(form.password)) {
    errors.password = 'Debe incluir mayúscula, minúscula, número y caracter especial'
    isValid = false
  }

  // Validar confirmación de password
  if (!form.confirmPassword) {
    errors.confirmPassword = 'Confirma tu contraseña'
    isValid = false
  } else if (form.password !== form.confirmPassword) {
    errors.confirmPassword = 'Las contraseñas no coinciden'
    isValid = false
  }

  return isValid
}

const handleRegister = async () => {
  if (!validateForm()) return

  isLoading.value = true
  errors.general = ''

  try {
    const { confirmPassword, ...registerData } = form
    const result = await register(registerData)

    if (result.success) {
      toast.success(
        '¡Registro exitoso!',
        'Revisa tu email para verificar tu cuenta'
      )
      // Redirigir a verificación de email con info del plan
      router.push({
        path: '/auth/verify-email',
        query: {
          email: form.email,
          ...(selectedPlan.value && { plan: selectedPlan.value }),
          ...(selectedPaymentType.value && { payment: selectedPaymentType.value }),
        }
      })
    } else {
      errors.general = result.error || 'Error al registrarse'
      toast.error('Error', result.error || 'No se pudo completar el registro')
    }
  } catch (error: any) {
    errors.general = error.message || 'Error al registrarse'
    toast.error('Error', 'Ocurrió un error inesperado')
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-2xl w-full space-y-8">
      <!-- Logo y header -->
      <div class="text-center">
        <NuxtLink to="/" class="inline-block">
          <div class="w-16 h-16 bg-gradient-to-br from-[#0A1F44] to-blue-800 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span class="text-[#D4AF37] font-bold text-2xl">EFT</span>
          </div>
        </NuxtLink>
        <h2 class="text-3xl font-extrabold text-[#0A1F44] mb-2">
          Crea tu Cuenta
        </h2>
        <p class="text-gray-600">
          Protege tu sacrificio con Emigrantes FT
        </p>
      </div>

      <!-- Plan seleccionado -->
      <div v-if="currentPlanInfo" class="bg-gradient-to-r from-[#0A1F44] to-blue-800 rounded-2xl shadow-xl p-6 text-white">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-300">Plan seleccionado:</p>
            <h3 class="text-xl font-bold">{{ currentPlanInfo.name }}</h3>
          </div>
          <div class="text-right">
            <p class="text-2xl font-bold text-[#D4AF37]">${{ currentPlanInfo.monthlyPrice }}<span class="text-sm font-normal">/mes</span></p>
            <p class="text-sm text-gray-300">
              + ${{ selectedPaymentType === 'installments' ? currentPlanInfo.installmentAmount.toFixed(2) + ' x 3 meses' : currentPlanInfo.initialPayment + ' inicial' }}
            </p>
          </div>
        </div>
        <div class="mt-3 pt-3 border-t border-white/20">
          <NuxtLink to="/planes" class="text-sm text-[#D4AF37] hover:text-yellow-300 flex items-center gap-1">
            <Icon name="lucide:arrow-left" class="w-4 h-4" />
            Cambiar plan
          </NuxtLink>
        </div>
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

        <form @submit.prevent="handleRegister" class="space-y-5">
          <!-- Nombre y Apellido -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label for="firstName" class="block text-sm font-semibold text-gray-700 mb-2">
                Nombre <span class="text-red-500">*</span>
              </label>
              <input
                id="firstName"
                v-model="form.firstName"
                type="text"
                autocomplete="given-name"
                :class="[
                  'block w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors',
                  errors.firstName
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:border-[#D4AF37] focus:ring-[#D4AF37]'
                ]"
                placeholder="Juan"
              />
              <p v-if="errors.firstName" class="mt-2 text-sm text-red-600">{{ errors.firstName }}</p>
            </div>

            <div>
              <label for="lastName" class="block text-sm font-semibold text-gray-700 mb-2">
                Apellido <span class="text-red-500">*</span>
              </label>
              <input
                id="lastName"
                v-model="form.lastName"
                type="text"
                autocomplete="family-name"
                :class="[
                  'block w-full px-3 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors',
                  errors.lastName
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:border-[#D4AF37] focus:ring-[#D4AF37]'
                ]"
                placeholder="Pérez"
              />
              <p v-if="errors.lastName" class="mt-2 text-sm text-red-600">{{ errors.lastName }}</p>
            </div>
          </div>

          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-semibold text-gray-700 mb-2">
              Correo electrónico <span class="text-red-500">*</span>
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

          <!-- Teléfono -->
          <div>
            <label for="phone" class="block text-sm font-semibold text-gray-700 mb-2">
              Teléfono <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon name="lucide:phone" class="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="phone"
                v-model="form.phone"
                type="tel"
                autocomplete="tel"
                :class="[
                  'block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors',
                  errors.phone
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:border-[#D4AF37] focus:ring-[#D4AF37]'
                ]"
                placeholder="+1 (786) 839-1882"
              />
            </div>
            <p v-if="errors.phone" class="mt-2 text-sm text-red-600">{{ errors.phone }}</p>
          </div>

          <!-- Password -->
          <div>
            <label for="password" class="block text-sm font-semibold text-gray-700 mb-2">
              Contraseña <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon name="lucide:lock" class="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                autocomplete="new-password"
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
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <Icon
                  :name="showPassword ? 'lucide:eye-off' : 'lucide:eye'"
                  class="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors"
                />
              </button>
            </div>
            <p v-if="errors.password" class="mt-2 text-sm text-red-600">{{ errors.password }}</p>
            <p class="mt-2 text-xs text-gray-500">
              Mínimo 8 caracteres, incluyendo mayúscula, minúscula, número y símbolo
            </p>
          </div>

          <!-- Confirm Password -->
          <div>
            <label for="confirmPassword" class="block text-sm font-semibold text-gray-700 mb-2">
              Confirmar Contraseña <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon name="lucide:lock" class="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="confirmPassword"
                v-model="form.confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                autocomplete="new-password"
                :class="[
                  'block w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors',
                  errors.confirmPassword
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:border-[#D4AF37] focus:ring-[#D4AF37]'
                ]"
                placeholder="••••••••"
              />
              <button
                type="button"
                @click="showConfirmPassword = !showConfirmPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <Icon
                  :name="showConfirmPassword ? 'lucide:eye-off' : 'lucide:eye'"
                  class="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors"
                />
              </button>
            </div>
            <p v-if="errors.confirmPassword" class="mt-2 text-sm text-red-600">{{ errors.confirmPassword }}</p>
          </div>

          <!-- Terms and conditions -->
          <div class="flex items-start">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              class="h-4 w-4 text-[#D4AF37] focus:ring-[#D4AF37] border-gray-300 rounded mt-1"
            />
            <label for="terms" class="ml-2 block text-sm text-gray-700">
              Acepto los
              <NuxtLink to="/terminos" class="text-[#D4AF37] hover:text-[#0A1F44] font-semibold">
                Términos y Condiciones
              </NuxtLink>
              y la
              <NuxtLink to="/privacidad" class="text-[#D4AF37] hover:text-[#0A1F44] font-semibold">
                Política de Privacidad
              </NuxtLink>
            </label>
          </div>

          <!-- Submit button -->
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-md text-white font-bold bg-[#D4AF37] hover:bg-[#0A1F44] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D4AF37] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Icon v-if="isLoading" name="lucide:loader-2" class="w-5 h-5 animate-spin" />
            <span>{{ isLoading ? 'Creando cuenta...' : 'Crear Cuenta' }}</span>
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

        <!-- Login link -->
        <div class="text-center">
          <p class="text-sm text-gray-600">
            ¿Ya tienes una cuenta?
            <NuxtLink to="/auth/login" class="font-semibold text-[#D4AF37] hover:text-[#0A1F44] transition-colors">
              Inicia sesión
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
