<script setup lang="ts">
definePageMeta({
  layout: 'auth',
  middleware: 'guest'
})

const { forgotPassword } = useAuth()
const toast = useToast()
const router = useRouter()

const email = ref('')
const isLoading = ref(false)
const emailSent = ref(false)
const errorMessage = ref('')

const validateEmail = (): boolean => {
  errorMessage.value = ''

  if (!email.value) {
    errorMessage.value = 'El email es requerido'
    return false
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    errorMessage.value = 'El email no es válido'
    return false
  }

  return true
}

const handleSubmit = async () => {
  if (!validateEmail()) return

  isLoading.value = true
  errorMessage.value = ''

  try {
    const result = await forgotPassword({ email: email.value })

    if (result.success) {
      emailSent.value = true
      toast.success(
        'Email enviado',
        'Revisa tu correo para restablecer tu contraseña'
      )
    } else {
      errorMessage.value = result.error || 'Error al enviar el email'
      toast.error('Error', result.error || 'No se pudo enviar el email')
    }
  } catch (error: any) {
    errorMessage.value = error.message || 'Error al enviar el email'
    toast.error('Error', 'Ocurrió un error inesperado')
  } finally {
    isLoading.value = false
  }
}

const handleResend = () => {
  emailSent.value = false
  handleSubmit()
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
          ¿Olvidaste tu Contraseña?
        </h2>
        <p class="text-gray-600">
          No te preocupes, te ayudaremos a recuperarla
        </p>
      </div>

      <!-- Content -->
      <div class="bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <!-- Email no enviado aún -->
        <div v-if="!emailSent">
          <!-- Info message -->
          <div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-md mb-6">
            <div class="flex">
              <Icon name="lucide:info" class="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
              <p class="ml-3 text-sm text-blue-700">
                Ingresa tu email y te enviaremos un enlace para restablecer tu contraseña
              </p>
            </div>
          </div>

          <!-- Error general -->
          <div v-if="errorMessage" class="bg-red-50 border-l-4 border-red-500 p-4 rounded-md mb-6">
            <div class="flex">
              <Icon name="lucide:alert-circle" class="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <p class="ml-3 text-sm text-red-700">{{ errorMessage }}</p>
            </div>
          </div>

          <!-- Form -->
          <form @submit.prevent="handleSubmit" class="space-y-5">
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
                  v-model="email"
                  type="email"
                  autocomplete="email"
                  :class="[
                    'block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors',
                    errorMessage
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:border-[#D4AF37] focus:ring-[#D4AF37]'
                  ]"
                  placeholder="tu@email.com"
                  :disabled="isLoading"
                />
              </div>
            </div>

            <!-- Submit button -->
            <button
              type="submit"
              :disabled="isLoading"
              class="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-md text-white font-bold bg-[#D4AF37] hover:bg-[#0A1F44] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D4AF37] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Icon v-if="isLoading" name="lucide:loader-2" class="w-5 h-5 animate-spin" />
              <span>{{ isLoading ? 'Enviando...' : 'Enviar Enlace de Recuperación' }}</span>
            </button>
          </form>
        </div>

        <!-- Email enviado con éxito -->
        <div v-else class="text-center space-y-6">
          <!-- Success icon -->
          <div class="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <Icon name="lucide:mail-check" class="w-8 h-8 text-green-600" />
          </div>

          <!-- Success message -->
          <div>
            <h3 class="text-xl font-bold text-[#0A1F44] mb-2">
              ¡Email Enviado!
            </h3>
            <p class="text-gray-600 mb-4">
              Hemos enviado un enlace de recuperación a
            </p>
            <p class="text-[#D4AF37] font-semibold break-all">
              {{ email }}
            </p>
          </div>

          <!-- Instructions -->
          <div class="bg-gray-50 rounded-lg p-4 text-left space-y-2">
            <p class="text-sm text-gray-700 font-semibold">Próximos pasos:</p>
            <ol class="text-sm text-gray-600 space-y-2 list-decimal list-inside">
              <li>Revisa tu bandeja de entrada y la carpeta de spam</li>
              <li>Haz clic en el enlace del email (válido por 1 hora)</li>
              <li>Crea tu nueva contraseña</li>
            </ol>
          </div>

          <!-- Resend button -->
          <button
            @click="handleResend"
            class="inline-flex items-center gap-2 text-sm font-semibold text-[#D4AF37] hover:text-[#0A1F44] transition-colors"
          >
            <Icon name="lucide:refresh-cw" class="w-4 h-4" />
            <span>Reenviar email</span>
          </button>
        </div>

        <!-- Divider -->
        <div class="relative my-6">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-4 bg-white text-gray-500">o</span>
          </div>
        </div>

        <!-- Links -->
        <div class="text-center space-y-2">
          <p class="text-sm text-gray-600">
            ¿Ya tienes una cuenta?
            <NuxtLink to="/auth/login" class="font-semibold text-[#D4AF37] hover:text-[#0A1F44] transition-colors">
              Inicia sesión
            </NuxtLink>
          </p>
          <p class="text-sm text-gray-600">
            ¿No tienes cuenta?
            <NuxtLink to="/auth/register" class="font-semibold text-[#D4AF37] hover:text-[#0A1F44] transition-colors">
              Regístrate
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
