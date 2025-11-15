/**
 * Composable para manejo de perfil de usuario
 * Gestiona actualización de perfil, foto, y verificación de teléfono
 */

import type {
  User,
  UpdateProfileRequest,
  SendPhoneOtpRequest,
  VerifyPhoneRequest,
} from '~/types/api'

export const useUser = () => {
  const api = useApi()

  /**
   * Obtener perfil del usuario
   */
  const getProfile = async () => {
    try {
      const response = await api.get<User>('/users/profile')
      return { success: true, data: response.data }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  /**
   * Actualizar perfil del usuario
   */
  const updateProfile = async (data: UpdateProfileRequest) => {
    try {
      const response = await api.patch<User>('/users/profile', data)
      return { success: true, data: response.data }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  /**
   * Subir foto de perfil
   */
  const uploadProfilePhoto = async (file: File) => {
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await api.post<User>('/users/profile/photo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      return { success: true, data: response.data }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  /**
   * Eliminar foto de perfil
   */
  const deleteProfilePhoto = async () => {
    try {
      const response = await api.delete<User>('/users/profile/photo')
      return { success: true, data: response.data }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  /**
   * Enviar OTP para verificación de teléfono
   */
  const sendPhoneOtp = async (data: SendPhoneOtpRequest) => {
    try {
      const response = await api.post('/users/verify-phone/send-otp', data)
      return { success: true, message: response.message }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  /**
   * Verificar teléfono con OTP
   */
  const verifyPhone = async (data: VerifyPhoneRequest) => {
    try {
      const response = await api.post<User>('/users/verify-phone', data)
      return { success: true, data: response.data }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  return {
    getProfile,
    updateProfile,
    uploadProfilePhoto,
    deleteProfilePhoto,
    sendPhoneOtp,
    verifyPhone,
  }
}
