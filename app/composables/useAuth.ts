/**
 * Composable para manejo de autenticación
 * Integra con el sistema de auth del backend
 */

import type {
  User,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  VerifyEmailRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  ChangePasswordRequest,
} from '~/types/api'

export const useAuth = () => {
  const api = useApi()
  const router = useRouter()

  // Estado global de autenticación
  const user = useState<User | null>('auth_user', () => null)
  const isAuthenticated = computed(() => !!user.value)
  const authToken = useCookie('auth_token', {
    maxAge: 60 * 15, // 15 minutos (igual que el backend)
  })
  const refreshToken = useCookie('refresh_token', {
    maxAge: 60 * 60 * 24 * 7, // 7 días (igual que el backend)
  })

  /**
   * Registro de usuario
   */
  const register = async (data: RegisterRequest) => {
    try {
      const response = await api.post('/auth/register', data)
      return { success: true, data: response.data }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  /**
   * Verificar email con OTP
   */
  const verifyEmail = async (data: VerifyEmailRequest) => {
    try {
      const response = await api.post('/auth/verify-email', data)
      return { success: true, message: response.message }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  /**
   * Reenviar código OTP
   */
  const resendOtp = async (email: string) => {
    try {
      const response = await api.post('/auth/resend-otp', { email })
      return { success: true, message: response.message }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  /**
   * Login de usuario
   */
  const login = async (credentials: LoginRequest) => {
    try {
      const response = await api.post<LoginResponse>('/auth/login', credentials)

      // Guardar tokens y usuario
      authToken.value = response.data.tokens.accessToken
      refreshToken.value = response.data.tokens.refreshToken
      user.value = response.data.user

      return { success: true, user: response.data.user }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  /**
   * Logout de usuario
   */
  const logout = async () => {
    try {
      await api.post('/auth/logout')
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    } finally {
      // Limpiar estado local
      authToken.value = null
      refreshToken.value = null
      user.value = null

      // Redireccionar a home
      router.push('/')
    }
  }

  /**
   * Refrescar token de acceso
   */
  const refresh = async () => {
    if (!refreshToken.value) {
      return { success: false, error: 'No refresh token available' }
    }

    try {
      const response = await api.post<AuthTokens>('/auth/refresh', {
        refreshToken: refreshToken.value
      })

      authToken.value = response.data.accessToken
      refreshToken.value = response.data.refreshToken

      return { success: true }
    } catch (error: any) {
      // Si falla el refresh, hacer logout
      await logout()
      return { success: false, error: error.message }
    }
  }

  /**
   * Obtener perfil del usuario autenticado
   */
  const getMe = async () => {
    try {
      const response = await api.get<User>('/auth/me')
      user.value = response.data
      return { success: true, user: response.data }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  /**
   * Solicitar reset de contraseña
   */
  const forgotPassword = async (data: ForgotPasswordRequest) => {
    try {
      const response = await api.post('/auth/forgot-password', data)
      return { success: true, message: response.message }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  /**
   * Resetear contraseña con token
   */
  const resetPassword = async (data: ResetPasswordRequest) => {
    try {
      const response = await api.post('/auth/reset-password', data)
      return { success: true, message: response.message }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  /**
   * Cambiar contraseña (usuario autenticado)
   */
  const changePassword = async (data: ChangePasswordRequest) => {
    try {
      const response = await api.post('/auth/change-password', data)
      return { success: true, message: response.message }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  /**
   * Verificar si el usuario está autenticado al cargar la app
   */
  const checkAuth = async () => {
    if (authToken.value && !user.value) {
      await getMe()
    }
  }

  return {
    // Estado
    user: readonly(user),
    isAuthenticated,

    // Métodos
    register,
    verifyEmail,
    resendOtp,
    login,
    logout,
    refresh,
    getMe,
    forgotPassword,
    resetPassword,
    changePassword,
    checkAuth,
  }
}
