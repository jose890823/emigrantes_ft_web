/**
 * Tipos para las respuestas estándar del API
 * Basado en el formato del backend NestJS
 */

export interface ApiSuccessResponse<T = any> {
  success: true
  data: T
  message: string
  timestamp: string
  path: string
}

export interface ApiErrorResponse {
  success: false
  error: {
    code: string
    message: string
    details?: any
  }
  timestamp: string
  path: string
}

export type ApiResponse<T = any> = ApiSuccessResponse<T> | ApiErrorResponse

// Tipos para el sistema de autenticación
export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  phone: string
  role: 'client' | 'admin' | 'super_admin'
  emailVerified: boolean
  phoneVerified: boolean
  isActive: boolean
  lastLoginAt: string | null
  createdAt: string
  updatedAt: string
}

export interface AuthTokens {
  accessToken: string
  refreshToken: string
}

export interface LoginResponse {
  user: User
  tokens: AuthTokens
}

export interface RegisterRequest {
  email: string
  password: string
  firstName: string
  lastName: string
  phone: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface VerifyEmailRequest {
  email: string
  otpCode: string
}

export interface ForgotPasswordRequest {
  email: string
}

export interface ResetPasswordRequest {
  token: string
  newPassword: string
}

export interface ChangePasswordRequest {
  currentPassword: string
  newPassword: string
}
