<script setup lang="ts">
import type { ChangePasswordRequest, UpdateProfileRequest, SendPhoneOtpRequest, VerifyPhoneRequest } from '~/types/api'

definePageMeta({
  middleware: 'auth'
})

const { user, getMe, changePassword, logout } = useAuth()
const { updateProfile, uploadProfilePhoto, deleteProfilePhoto, sendPhoneOtp, verifyPhone } = useUser()
const toast = useToast()

const activeTab = ref('personal')
const isLoadingProfile = ref(false)
const isLoadingPassword = ref(false)
const isLoadingPhoto = ref(false)
const isEditing = ref(false)
const isVerifyingPhone = ref(false)
const showOtpModal = ref(false)

// Formulario de información personal
const profileForm = reactive<UpdateProfileRequest>({
  firstName: '',
  lastName: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
  country: '',
  dateOfBirth: '',
  identificationNumber: ''
})

// Formulario de cambio de contraseña
const passwordForm = reactive<ChangePasswordRequest & { confirmPassword: string }>({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// Formulario de verificación de teléfono
const phoneVerificationForm = reactive({
  phone: '',
  otpCode: ''
})

const passwordErrors = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
  general: ''
})

const showCurrentPassword = ref(false)
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)

// Cargar datos del usuario
const loadUserData = async () => {
  isLoadingProfile.value = true
  try {
    const result = await getMe()
    if (result.success && result.user) {
      profileForm.firstName = result.user.firstName
      profileForm.lastName = result.user.lastName
      profileForm.phone = result.user.phone
      profileForm.address = result.user.address || ''
      profileForm.city = result.user.city || ''
      profileForm.state = result.user.state || ''
      profileForm.zipCode = result.user.zipCode || ''
      profileForm.country = result.user.country || ''
      profileForm.dateOfBirth = result.user.dateOfBirth || ''
      profileForm.identificationNumber = result.user.identificationNumber || ''
    }
  } catch (error) {
    toast.error('Error', 'No se pudo cargar tu perfil')
  } finally {
    isLoadingProfile.value = false
  }
}

// Guardar cambios en el perfil
const handleUpdateProfile = async () => {
  isLoadingProfile.value = true
  try {
    const result = await updateProfile(profileForm)
    if (result.success) {
      toast.success('Perfil actualizado', 'Tu información ha sido actualizada correctamente')
      isEditing.value = false
      await getMe() // Recargar datos del usuario
    } else {
      toast.error('Error', result.error || 'No se pudo actualizar el perfil')
    }
  } catch (error: any) {
    toast.error('Error', 'Ocurrió un error inesperado')
  } finally {
    isLoadingProfile.value = false
  }
}

// Subir foto de perfil
const handlePhotoUpload = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (!file) return

  // Validar tamaño (max 5MB)
  if (file.size > 5 * 1024 * 1024) {
    toast.error('Error', 'La foto debe pesar menos de 5MB')
    return
  }

  // Validar tipo
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
    toast.error('Error', 'Solo se permiten archivos JPG, PNG o WebP')
    return
  }

  isLoadingPhoto.value = true
  try {
    const result = await uploadProfilePhoto(file)
    if (result.success) {
      toast.success('Foto actualizada', 'Tu foto de perfil ha sido actualizada')
      await getMe() // Recargar datos del usuario
    } else {
      toast.error('Error', result.error || 'No se pudo subir la foto')
    }
  } catch (error) {
    toast.error('Error', 'Ocurrió un error al subir la foto')
  } finally {
    isLoadingPhoto.value = false
    target.value = '' // Limpiar input
  }
}

// Eliminar foto de perfil
const handleDeletePhoto = async () => {
  if (!confirm('¿Estás seguro de eliminar tu foto de perfil?')) return

  isLoadingPhoto.value = true
  try {
    const result = await deleteProfilePhoto()
    if (result.success) {
      toast.success('Foto eliminada', 'Tu foto de perfil ha sido eliminada')
      await getMe()
    } else {
      toast.error('Error', result.error || 'No se pudo eliminar la foto')
    }
  } catch (error) {
    toast.error('Error', 'Ocurrió un error al eliminar la foto')
  } finally {
    isLoadingPhoto.value = false
  }
}

// Enviar OTP para verificar teléfono
const handleSendPhoneOtp = async () => {
  if (!profileForm.phone) {
    toast.error('Error', 'Debes ingresar un número de teléfono')
    return
  }

  isVerifyingPhone.value = true
  try {
    const result = await sendPhoneOtp({ phone: profileForm.phone })
    if (result.success) {
      phoneVerificationForm.phone = profileForm.phone
      showOtpModal.value = true
      toast.success('OTP enviado', 'Revisa tu teléfono para el código de verificación')
    } else {
      toast.error('Error', result.error || 'No se pudo enviar el código')
    }
  } catch (error) {
    toast.error('Error', 'Ocurrió un error al enviar el OTP')
  } finally {
    isVerifyingPhone.value = false
  }
}

// Verificar teléfono con OTP
const handleVerifyPhone = async () => {
  if (!phoneVerificationForm.otpCode) {
    toast.error('Error', 'Debes ingresar el código OTP')
    return
  }

  isVerifyingPhone.value = true
  try {
    const result = await verifyPhone({
      otpCode: phoneVerificationForm.otpCode
    })
    if (result.success) {
      toast.success('Teléfono verificado', 'Tu número de teléfono ha sido verificado')
      showOtpModal.value = false
      phoneVerificationForm.otpCode = ''
      await getMe()
    } else {
      toast.error('Error', result.error || 'Código OTP incorrecto')
    }
  } catch (error) {
    toast.error('Error', 'Ocurrió un error al verificar el teléfono')
  } finally {
    isVerifyingPhone.value = false
  }
}

// Validar formulario de contraseña
const validatePasswordForm = (): boolean => {
  Object.keys(passwordErrors).forEach(key => passwordErrors[key as keyof typeof passwordErrors] = '')

  let isValid = true

  if (!passwordForm.currentPassword) {
    passwordErrors.currentPassword = 'La contraseña actual es requerida'
    isValid = false
  }

  if (!passwordForm.newPassword) {
    passwordErrors.newPassword = 'La nueva contraseña es requerida'
    isValid = false
  } else if (passwordForm.newPassword.length < 8) {
    passwordErrors.newPassword = 'Debe tener al menos 8 caracteres'
    isValid = false
  } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])/.test(passwordForm.newPassword)) {
    passwordErrors.newPassword = 'Debe incluir mayúscula, minúscula, número y símbolo'
    isValid = false
  }

  if (!passwordForm.confirmPassword) {
    passwordErrors.confirmPassword = 'Confirma tu nueva contraseña'
    isValid = false
  } else if (passwordForm.newPassword !== passwordForm.confirmPassword) {
    passwordErrors.confirmPassword = 'Las contraseñas no coinciden'
    isValid = false
  }

  if (passwordForm.currentPassword === passwordForm.newPassword) {
    passwordErrors.newPassword = 'La nueva contraseña debe ser diferente a la actual'
    isValid = false
  }

  return isValid
}

// Cambiar contraseña
const handleChangePassword = async () => {
  if (!validatePasswordForm()) return

  isLoadingPassword.value = true
  passwordErrors.general = ''

  try {
    const { confirmPassword, ...data } = passwordForm
    const result = await changePassword(data)

    if (result.success) {
      toast.success('Contraseña actualizada', 'Tu contraseña ha sido cambiada correctamente')

      // Limpiar formulario
      passwordForm.currentPassword = ''
      passwordForm.newPassword = ''
      passwordForm.confirmPassword = ''

      // Cerrar sesión por seguridad
      setTimeout(async () => {
        toast.info('Cerrando sesión', 'Por seguridad, debes iniciar sesión nuevamente')
        await logout()
      }, 2000)
    } else {
      passwordErrors.general = result.error || 'Error al cambiar la contraseña'
      toast.error('Error', result.error || 'No se pudo cambiar la contraseña')
    }
  } catch (error: any) {
    passwordErrors.general = error.message || 'Error al cambiar la contraseña'
    toast.error('Error', 'Ocurrió un error inesperado')
  } finally {
    isLoadingPassword.value = false
  }
}

// Cancelar edición
const cancelEdit = () => {
  isEditing.value = false
  loadUserData() // Recargar datos originales
}

// Cargar datos al montar
onMounted(() => {
  loadUserData()
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-[#0A1F44]">Mi Perfil</h1>
        <p class="text-gray-600 mt-2">Gestiona tu información personal y configuración</p>
      </div>

      <!-- Profile Card -->
      <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
        <!-- User Info Header -->
        <div class="bg-gradient-to-r from-[#0A1F44] to-blue-800 px-6 py-8">
          <div class="flex items-center gap-4">
            <!-- Profile Photo -->
            <div class="relative">
              <div v-if="user?.profilePhoto" class="w-20 h-20 rounded-full overflow-hidden shadow-lg">
                <img :src="user.profilePhoto" :alt="`${user.firstName} ${user.lastName}`" class="w-full h-full object-cover" />
              </div>
              <div v-else class="w-20 h-20 bg-[#D4AF37] rounded-full flex items-center justify-center text-[#0A1F44] text-2xl font-bold shadow-lg">
                {{ user?.firstName?.charAt(0) }}{{ user?.lastName?.charAt(0) }}
              </div>

              <!-- Photo actions -->
              <div class="absolute -bottom-2 -right-2 flex gap-1">
                <label for="photoUpload" class="cursor-pointer bg-[#D4AF37] p-2 rounded-full shadow-lg hover:bg-[#0A1F44] transition-colors">
                  <Icon name="lucide:camera" class="w-4 h-4 text-white" />
                  <input
                    id="photoUpload"
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    class="hidden"
                    @change="handlePhotoUpload"
                    :disabled="isLoadingPhoto"
                  />
                </label>
                <button
                  v-if="user?.profilePhoto"
                  @click="handleDeletePhoto"
                  :disabled="isLoadingPhoto"
                  class="bg-red-500 p-2 rounded-full shadow-lg hover:bg-red-600 transition-colors disabled:opacity-50"
                >
                  <Icon name="lucide:trash-2" class="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            <div class="text-white flex-1">
              <h2 class="text-2xl font-bold">{{ user?.firstName }} {{ user?.lastName }}</h2>
              <p class="text-blue-200">{{ user?.email }}</p>
              <div class="flex flex-wrap items-center gap-2 mt-2">
                <span
                  :class="[
                    'inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold',
                    user?.emailVerified ? 'bg-green-500/20 text-green-100' : 'bg-yellow-500/20 text-yellow-100'
                  ]"
                >
                  <Icon :name="user?.emailVerified ? 'lucide:check-circle' : 'lucide:alert-circle'" class="w-3 h-3" />
                  {{ user?.emailVerified ? 'Email verificado' : 'Email no verificado' }}
                </span>
                <span
                  :class="[
                    'inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold',
                    user?.phoneVerified ? 'bg-green-500/20 text-green-100' : 'bg-yellow-500/20 text-yellow-100'
                  ]"
                >
                  <Icon :name="user?.phoneVerified ? 'lucide:check-circle' : 'lucide:alert-circle'" class="w-3 h-3" />
                  {{ user?.phoneVerified ? 'Teléfono verificado' : 'Teléfono no verificado' }}
                </span>
                <span class="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-100">
                  <Icon name="lucide:crown" class="w-3 h-3" />
                  {{ user?.role === 'client' ? 'Cliente' : user?.role === 'admin' ? 'Administrador' : 'Super Admin' }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Tabs -->
        <div class="border-b border-gray-200">
          <nav class="flex -mb-px">
            <button
              @click="activeTab = 'personal'"
              :class="[
                'flex-1 py-4 px-6 text-center border-b-2 font-semibold transition-colors',
                activeTab === 'personal'
                  ? 'border-[#D4AF37] text-[#D4AF37]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              ]"
            >
              <Icon name="lucide:user" class="w-5 h-5 inline-block mr-2" />
              Información Personal
            </button>
            <button
              @click="activeTab = 'password'"
              :class="[
                'flex-1 py-4 px-6 text-center border-b-2 font-semibold transition-colors',
                activeTab === 'password'
                  ? 'border-[#D4AF37] text-[#D4AF37]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              ]"
            >
              <Icon name="lucide:lock" class="w-5 h-5 inline-block mr-2" />
              Seguridad
            </button>
          </nav>
        </div>

        <!-- Tab Content -->
        <div class="p-6">
          <!-- Personal Info Tab -->
          <div v-if="activeTab === 'personal'" class="space-y-6">
            <div v-if="isLoadingProfile" class="flex justify-center py-8">
              <Icon name="lucide:loader-2" class="w-8 h-8 text-[#D4AF37] animate-spin" />
            </div>

            <div v-else>
              <!-- Edit/Save buttons -->
              <div class="flex justify-end gap-3 mb-6">
                <button
                  v-if="!isEditing"
                  @click="isEditing = true"
                  class="flex items-center gap-2 px-4 py-2 bg-[#D4AF37] text-[#0A1F44] font-semibold rounded-lg hover:bg-[#0A1F44] hover:text-white transition-all"
                >
                  <Icon name="lucide:edit" class="w-4 h-4" />
                  Editar Perfil
                </button>
                <template v-else>
                  <button
                    @click="cancelEdit"
                    class="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-all"
                  >
                    <Icon name="lucide:x" class="w-4 h-4" />
                    Cancelar
                  </button>
                  <button
                    @click="handleUpdateProfile"
                    :disabled="isLoadingProfile"
                    class="flex items-center gap-2 px-4 py-2 bg-[#D4AF37] text-[#0A1F44] font-semibold rounded-lg hover:bg-[#0A1F44] hover:text-white transition-all disabled:opacity-50"
                  >
                    <Icon name="lucide:save" class="w-4 h-4" />
                    Guardar Cambios
                  </button>
                </template>
              </div>

              <form class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- First Name -->
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">
                    Nombre <span v-if="isEditing" class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="profileForm.firstName"
                    type="text"
                    :disabled="!isEditing"
                    class="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] disabled:bg-gray-50 disabled:cursor-not-allowed"
                  />
                </div>

                <!-- Last Name -->
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">
                    Apellido <span v-if="isEditing" class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="profileForm.lastName"
                    type="text"
                    :disabled="!isEditing"
                    class="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] disabled:bg-gray-50 disabled:cursor-not-allowed"
                  />
                </div>

                <!-- Email (read-only) -->
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    :value="user?.email"
                    type="email"
                    disabled
                    class="block w-full px-3 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 cursor-not-allowed"
                  />
                  <p class="mt-1 text-xs text-gray-500">El email no puede modificarse</p>
                </div>

                <!-- Phone -->
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">
                    Teléfono
                  </label>
                  <div class="flex gap-2">
                    <input
                      v-model="profileForm.phone"
                      type="tel"
                      :disabled="!isEditing"
                      placeholder="+1234567890"
                      class="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] disabled:bg-gray-50 disabled:cursor-not-allowed"
                    />
                    <button
                      v-if="!user?.phoneVerified && profileForm.phone"
                      @click.prevent="handleSendPhoneOtp"
                      :disabled="isVerifyingPhone"
                      type="button"
                      class="px-3 py-2 bg-blue-500 text-white text-sm font-semibold rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 whitespace-nowrap"
                    >
                      Verificar
                    </button>
                  </div>
                </div>

                <!-- Identification Number -->
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">
                    Número de Identificación
                  </label>
                  <input
                    v-model="profileForm.identificationNumber"
                    type="text"
                    :disabled="!isEditing"
                    class="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] disabled:bg-gray-50 disabled:cursor-not-allowed"
                  />
                </div>

                <!-- Date of Birth -->
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">
                    Fecha de Nacimiento
                  </label>
                  <input
                    v-model="profileForm.dateOfBirth"
                    type="date"
                    :disabled="!isEditing"
                    class="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] disabled:bg-gray-50 disabled:cursor-not-allowed"
                  />
                </div>

                <!-- Address -->
                <div class="md:col-span-2">
                  <label class="block text-sm font-semibold text-gray-700 mb-2">
                    Dirección
                  </label>
                  <input
                    v-model="profileForm.address"
                    type="text"
                    :disabled="!isEditing"
                    class="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] disabled:bg-gray-50 disabled:cursor-not-allowed"
                  />
                </div>

                <!-- City -->
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">
                    Ciudad
                  </label>
                  <input
                    v-model="profileForm.city"
                    type="text"
                    :disabled="!isEditing"
                    class="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] disabled:bg-gray-50 disabled:cursor-not-allowed"
                  />
                </div>

                <!-- State -->
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">
                    Estado/Provincia
                  </label>
                  <input
                    v-model="profileForm.state"
                    type="text"
                    :disabled="!isEditing"
                    class="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] disabled:bg-gray-50 disabled:cursor-not-allowed"
                  />
                </div>

                <!-- Zip Code -->
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">
                    Código Postal
                  </label>
                  <input
                    v-model="profileForm.zipCode"
                    type="text"
                    :disabled="!isEditing"
                    class="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] disabled:bg-gray-50 disabled:cursor-not-allowed"
                  />
                </div>

                <!-- Country -->
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">
                    País
                  </label>
                  <input
                    v-model="profileForm.country"
                    type="text"
                    :disabled="!isEditing"
                    class="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] disabled:bg-gray-50 disabled:cursor-not-allowed"
                  />
                </div>
              </form>
            </div>
          </div>

          <!-- Password Tab -->
          <div v-if="activeTab === 'password'" class="space-y-6">
            <!-- Error general -->
            <div v-if="passwordErrors.general" class="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
              <div class="flex">
                <Icon name="lucide:alert-circle" class="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <p class="ml-3 text-sm text-red-700">{{ passwordErrors.general }}</p>
              </div>
            </div>

            <form @submit.prevent="handleChangePassword" class="space-y-5 max-w-xl">
              <!-- Current Password -->
              <div>
                <label for="currentPassword" class="block text-sm font-semibold text-gray-700 mb-2">
                  Contraseña Actual <span class="text-red-500">*</span>
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Icon name="lucide:lock" class="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="currentPassword"
                    v-model="passwordForm.currentPassword"
                    :type="showCurrentPassword ? 'text' : 'password'"
                    autocomplete="current-password"
                    :class="[
                      'block w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors',
                      passwordErrors.currentPassword
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:border-[#D4AF37] focus:ring-[#D4AF37]'
                    ]"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    @click="showCurrentPassword = !showCurrentPassword"
                    class="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <Icon
                      :name="showCurrentPassword ? 'lucide:eye-off' : 'lucide:eye'"
                      class="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors"
                    />
                  </button>
                </div>
                <p v-if="passwordErrors.currentPassword" class="mt-2 text-sm text-red-600">{{ passwordErrors.currentPassword }}</p>
              </div>

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
                    v-model="passwordForm.newPassword"
                    :type="showNewPassword ? 'text' : 'password'"
                    autocomplete="new-password"
                    :class="[
                      'block w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors',
                      passwordErrors.newPassword
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
                <p v-if="passwordErrors.newPassword" class="mt-2 text-sm text-red-600">{{ passwordErrors.newPassword }}</p>
                <p class="mt-2 text-xs text-gray-500">
                  Mínimo 8 caracteres, incluyendo mayúscula, minúscula, número y símbolo
                </p>
              </div>

              <!-- Confirm New Password -->
              <div>
                <label for="confirmPassword" class="block text-sm font-semibold text-gray-700 mb-2">
                  Confirmar Nueva Contraseña <span class="text-red-500">*</span>
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Icon name="lucide:lock" class="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    v-model="passwordForm.confirmPassword"
                    :type="showConfirmPassword ? 'text' : 'password'"
                    autocomplete="new-password"
                    :class="[
                      'block w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors',
                      passwordErrors.confirmPassword
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
                <p v-if="passwordErrors.confirmPassword" class="mt-2 text-sm text-red-600">{{ passwordErrors.confirmPassword }}</p>
              </div>

              <!-- Submit button -->
              <button
                type="submit"
                :disabled="isLoadingPassword"
                class="flex justify-center items-center gap-2 py-3 px-6 border border-transparent rounded-lg shadow-md text-white font-bold bg-[#D4AF37] hover:bg-[#0A1F44] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D4AF37] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Icon v-if="isLoadingPassword" name="lucide:loader-2" class="w-5 h-5 animate-spin" />
                <span>{{ isLoadingPassword ? 'Actualizando...' : 'Actualizar Contraseña' }}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Phone OTP Modal -->
    <Teleport to="body">
      <div v-if="showOtpModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
          <h3 class="text-xl font-bold text-[#0A1F44] mb-4">Verificar Teléfono</h3>
          <p class="text-gray-600 mb-6">Ingresa el código de 6 dígitos que enviamos a {{ phoneVerificationForm.phone }}</p>

          <div class="space-y-4">
            <input
              v-model="phoneVerificationForm.otpCode"
              type="text"
              maxlength="6"
              placeholder="000000"
              class="block w-full px-4 py-3 text-center text-2xl tracking-widest border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
            />

            <div class="flex gap-3">
              <button
                @click="showOtpModal = false"
                class="flex-1 py-3 px-4 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancelar
              </button>
              <button
                @click="handleVerifyPhone"
                :disabled="isVerifyingPhone || phoneVerificationForm.otpCode.length !== 6"
                class="flex-1 py-3 px-4 bg-[#D4AF37] text-[#0A1F44] font-semibold rounded-lg hover:bg-[#0A1F44] hover:text-white transition-colors disabled:opacity-50"
              >
                {{ isVerifyingPhone ? 'Verificando...' : 'Verificar' }}
              </button>
            </div>

            <button
              @click="handleSendPhoneOtp"
              :disabled="isVerifyingPhone"
              class="w-full text-sm text-[#D4AF37] hover:text-[#0A1F44] font-semibold transition-colors"
            >
              Reenviar código
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>
