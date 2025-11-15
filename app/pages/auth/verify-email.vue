<script setup lang="ts">
definePageMeta({
  layout: 'auth',
  middleware: 'guest'
})

const route = useRoute()
const router = useRouter()
const { verifyEmail, resendOtp } = useAuth()
const toast = useToast()

const email = ref((route.query.email as string) || '')
const otpCode = ref(['', '', '', '', '', ''])
const isLoading = ref(false)
const isResending = ref(false)
const canResend = ref(true)
const resendCountdown = ref(0)

const otpInputs = ref<HTMLInputElement[]>([])

// Manejar input de OTP
const handleInput = (index: number, event: Event) => {
  const target = event.target as HTMLInputElement
  const value = target.value

  // Solo permitir números
  if (value && !/^\d$/.test(value)) {
    target.value = ''
    return
  }

  otpCode.value[index] = value

  // Auto-focus en el siguiente input
  if (value && index < 5) {
    otpInputs.value[index + 1]?.focus()
  }
}

// Manejar backspace
const handleKeydown = (index: number, event: KeyboardEvent) => {
  if (event.key === 'Backspace' && !otpCode.value[index] && index > 0) {
    otpInputs.value[index - 1]?.focus()
  }
}

// Manejar paste
const handlePaste = (event: ClipboardEvent) => {
  event.preventDefault()
  const pasteData = event.clipboardData?.getData('text')
  if (!pasteData) return

  const digits = pasteData.replace(/\D/g, '').slice(0, 6).split('')
  digits.forEach((digit, index) => {
    if (index < 6) {
      otpCode.value[index] = digit
    }
  })

  // Focus en el último input lleno o el primero vacío
  const lastFilledIndex = digits.length - 1
  if (lastFilledIndex < 5) {
    otpInputs.value[lastFilledIndex + 1]?.focus()
  }
}

// Verificar email
const handleVerify = async () => {
  const code = otpCode.value.join('')

  if (code.length !== 6) {
    toast.error('Error', 'Por favor ingresa el código completo')
    return
  }

  if (!email.value) {
    toast.error('Error', 'Email no encontrado')
    return
  }

  isLoading.value = true

  try {
    const result = await verifyEmail({
      email: email.value,
      otpCode: code
    })

    if (result.success) {
      toast.success('¡Email verificado!', 'Ahora puedes iniciar sesión')
      router.push('/auth/login')
    } else {
      toast.error('Error', result.error || 'Código incorrecto')
      // Limpiar código
      otpCode.value = ['', '', '', '', '', '']
      otpInputs.value[0]?.focus()
    }
  } catch (error: any) {
    toast.error('Error', error.message || 'No se pudo verificar el código')
  } finally {
    isLoading.value = false
  }
}

// Reenviar OTP
const handleResend = async () => {
  if (!canResend.value || !email.value) return

  isResending.value = true

  try {
    const result = await resendOtp(email.value)

    if (result.success) {
      toast.success('Código reenviado', 'Revisa tu email')

      // Iniciar countdown de 60 segundos
      canResend.value = false
      resendCountdown.value = 60

      const interval = setInterval(() => {
        resendCountdown.value--
        if (resendCountdown.value <= 0) {
          clearInterval(interval)
          canResend.value = true
        }
      }, 1000)
    } else {
      toast.error('Error', result.error || 'No se pudo reenviar el código')
    }
  } catch (error: any) {
    toast.error('Error', error.message || 'Error al reenviar el código')
  } finally {
    isResending.value = false
  }
}

// Auto-submit cuando se complete el código
watch(otpCode, (newCode) => {
  const code = newCode.join('')
  if (code.length === 6) {
    handleVerify()
  }
}, { deep: true })
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
          Verifica tu Email
        </h2>
        <p class="text-gray-600 mb-2">
          Hemos enviado un código de 6 dígitos a
        </p>
        <p class="text-[#D4AF37] font-semibold">
          {{ email }}
        </p>
      </div>

      <!-- Formulario -->
      <div class="bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <!-- Info icon -->
        <div class="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <Icon name="lucide:mail" class="w-5 h-5 text-blue-600 shrink-0" />
          <p class="text-sm text-blue-800">
            Revisa tu bandeja de entrada y la carpeta de spam
          </p>
        </div>

        <!-- OTP Inputs -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-4 text-center">
            Código de Verificación
          </label>
          <div class="flex justify-center gap-2 sm:gap-3">
            <input
              v-for="(digit, index) in otpCode"
              :key="index"
              :ref="(el) => otpInputs[index] = el as HTMLInputElement"
              v-model="otpCode[index]"
              type="text"
              inputmode="numeric"
              maxlength="1"
              :class="[
                'w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-bold border-2 rounded-lg focus:outline-none focus:ring-2 transition-all',
                digit
                  ? 'border-[#D4AF37] bg-[#D4AF37]/5'
                  : 'border-gray-300 focus:border-[#D4AF37] focus:ring-[#D4AF37]'
              ]"
              @input="(e) => handleInput(index, e)"
              @keydown="(e) => handleKeydown(index, e)"
              @paste="handlePaste"
            />
          </div>
        </div>

        <!-- Verify button -->
        <button
          @click="handleVerify"
          :disabled="isLoading || otpCode.join('').length !== 6"
          class="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-md text-white font-bold bg-[#D4AF37] hover:bg-[#0A1F44] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D4AF37] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Icon v-if="isLoading" name="lucide:loader-2" class="w-5 h-5 animate-spin" />
          <span>{{ isLoading ? 'Verificando...' : 'Verificar Código' }}</span>
        </button>

        <!-- Resend code -->
        <div class="text-center pt-4">
          <p class="text-sm text-gray-600 mb-3">
            ¿No recibiste el código?
          </p>
          <button
            @click="handleResend"
            :disabled="!canResend || isResending"
            class="inline-flex items-center gap-2 text-sm font-semibold text-[#D4AF37] hover:text-[#0A1F44] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Icon v-if="isResending" name="lucide:loader-2" class="w-4 h-4 animate-spin" />
            <Icon v-else name="lucide:refresh-cw" class="w-4 h-4" />
            <span>
              {{ isResending ? 'Reenviando...' : canResend ? 'Reenviar código' : `Reenviar en ${resendCountdown}s` }}
            </span>
          </button>
        </div>

        <!-- Tips -->
        <div class="border-t border-gray-200 pt-4">
          <p class="text-xs text-gray-500 text-center">
            El código expira en 10 minutos. Tienes 3 intentos para ingresar el código correcto.
          </p>
        </div>
      </div>

      <!-- Back to register -->
      <div class="text-center">
        <NuxtLink to="/auth/register" class="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#0A1F44] transition-colors">
          <Icon name="lucide:arrow-left" class="w-4 h-4" />
          Volver al registro
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
