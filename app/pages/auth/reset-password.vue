<script setup lang="ts">
definePageMeta({
  layout: 'auth',
  middleware: 'guest'
})

const route = useRoute()
const router = useRouter()
const { resetPassword } = useAuth()
const toast = useToast()

const token = ref((route.query.token as string) || '')
const newPassword = ref('')
const confirmPassword = ref('')
const isLoading = ref(false)
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)

const errors = reactive({
  newPassword: '',
  confirmPassword: '',
  general: ''
})

// Validar que el token exista
onMounted(() => {
  if (!token.value) {
    toast.error('Token inválido', 'El enlace de recuperación no es válido')
    router.push('/auth/forgot-password')
  }
})

const validateForm = (): boolean => {
  errors.newPassword = ''
  errors.confirmPassword = ''
  errors.general = ''

  let isValid = true

  if (!newPassword.value) {
    errors.newPassword = 'La nueva contraseña es requerida'
    isValid = false
  } else if (newPassword.value.length < 8) {
    errors.newPassword = 'Debe tener al menos 8 caracteres'
    isValid = false
  } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])/.test(newPassword.value)) {
    errors.newPassword = 'Debe incluir mayúscula, minúscula, número y símbolo'
    isValid = false
  }

  if (!confirmPassword.value) {
    errors.confirmPassword = 'Confirma tu nueva contraseña'
    isValid = false
  } else if (newPassword.value !== confirmPassword.value) {
    errors.confirmPassword = 'Las contraseñas no coinciden'
    isValid = false
  }

  return isValid
}

const handleResetPassword = async () => {
  if (!validateForm()) return

  isLoading.value = true
  errors.general = ''

  try {
    const result = await resetPassword({
      token: token.value,
      newPassword: newPassword.value
    })

    if (result.success) {
      toast.success(
        '¡Contraseña actualizada!',
        'Ya puedes iniciar sesión con tu nueva contraseña'
      )
      router.push('/auth/login')
    } else {
      errors.general = result.error || 'Error al restablecer la contraseña'
      toast.error('Error', result.error || 'No se pudo restablecer la contraseña')
    }
  } catch (error: any) {
    errors.general = error.message || 'Error al restablecer la contraseña'
    toast.error('Error', 'Ocurrió un error inesperado')
  } finally {
    isLoading.value = false
  }
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
          Restablecer Contraseña
        </h2>
        <p class="text-gray-600">
          Crea una nueva contraseña segura
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

        <!-- Info message -->
        <div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-md">
          <div class="flex">
            <Icon name="lucide:shield-check" class="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
            <p class="ml-3 text-sm text-blue-700">
              Asegúrate de elegir una contraseña fuerte que no uses en otros sitios
            </p>
          </div>
        </div>

        <form @submit.prevent="handleResetPassword" class="space-y-5">
          <!-- New Password -->
          <div>
            <label for="newPassword" class="block text-sm font-semibold text-gray-700 mb-2">
              Nueva Contraseña <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon name="lucide:lock" class="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="newPassword"
                v-model="newPassword"
                :type="showNewPassword ? 'text' : 'password'"
                autocomplete="new-password"
                :class="[
                  'block w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors',
                  errors.newPassword
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:border-[#D4AF37] focus:ring-[#D4AF37]'
                ]"
                placeholder="••••••••"
              />
              <button
                type="button"
                @click="showNewPassword = !showNewPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <Icon
                  :name="showNewPassword ? 'lucide:eye-off' : 'lucide:eye'"
                  class="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors"
                />
              </button>
            </div>
            <p v-if="errors.newPassword" class="mt-2 text-sm text-red-600">{{ errors.newPassword }}</p>
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
                v-model="confirmPassword"
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

          <!-- Password strength indicator -->
          <div v-if="newPassword" class="space-y-2">
            <p class="text-xs text-gray-600 font-medium">Seguridad de la contraseña:</p>
            <div class="flex gap-1">
              <div
                :class="[
                  'h-1 flex-1 rounded-full transition-colors',
                  newPassword.length >= 8 ? 'bg-green-500' : 'bg-gray-200'
                ]"
              ></div>
              <div
                :class="[
                  'h-1 flex-1 rounded-full transition-colors',
                  /[A-Z]/.test(newPassword) && /[a-z]/.test(newPassword) ? 'bg-green-500' : 'bg-gray-200'
                ]"
              ></div>
              <div
                :class="[
                  'h-1 flex-1 rounded-full transition-colors',
                  /\d/.test(newPassword) ? 'bg-green-500' : 'bg-gray-200'
                ]"
              ></div>
              <div
                :class="[
                  'h-1 flex-1 rounded-full transition-colors',
                  /[@$!%*?&#]/.test(newPassword) ? 'bg-green-500' : 'bg-gray-200'
                ]"
              ></div>
            </div>
          </div>

          <!-- Submit button -->
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-md text-white font-bold bg-[#D4AF37] hover:bg-[#0A1F44] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D4AF37] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Icon v-if="isLoading" name="lucide:loader-2" class="w-5 h-5 animate-spin" />
            <span>{{ isLoading ? 'Restableciendo...' : 'Restablecer Contraseña' }}</span>
          </button>
        </form>

        <!-- Security tips -->
        <div class="border-t border-gray-200 pt-4">
          <p class="text-xs text-gray-500 font-semibold mb-2">Consejos de seguridad:</p>
          <ul class="text-xs text-gray-500 space-y-1 list-disc list-inside">
            <li>No uses la misma contraseña en múltiples sitios</li>
            <li>Evita información personal fácil de adivinar</li>
            <li>Usa un gestor de contraseñas si es posible</li>
          </ul>
        </div>
      </div>

      <!-- Back to login -->
      <div class="text-center">
        <NuxtLink to="/auth/login" class="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#0A1F44] transition-colors">
          <Icon name="lucide:arrow-left" class="w-4 h-4" />
          Volver al inicio de sesión
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
