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
  accessToken: string
  refreshToken: string
  user: User
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

// Tipos para el sistema de POA (Power of Attorney)
export type POAType = 'standard' | 'durable' | 'springing'

export type POAStatus =
  | 'draft'
  | 'pending'
  | 'in_review'
  | 'approved'
  | 'rejected'
  | 'notarized'
  | 'activated'
  | 'executed'
  | 'completed'
  | 'cancelled'

export interface POA {
  id: string
  clientId: string
  assignedAdminId?: string

  // Información del POA
  type: POAType
  status: POAStatus

  // Datos del cliente
  clientFullName: string
  clientAddress: string
  clientIdentification: string

  // Instrucciones confidenciales
  instructions: any
  beneficiaries: any[]
  activationTriggers: string[]

  // Seguimiento
  submittedAt?: string
  reviewedAt?: string
  approvedAt?: string
  notarizedAt?: string
  activatedAt?: string
  executedAt?: string

  // Notas
  clientNotes?: string
  adminNotes?: string
  rejectionReason?: string

  // Auditoría
  createdAt: string
  updatedAt: string
  deletedAt?: string
}

export interface CreatePOARequest {
  type: POAType
  clientFullName: string
  clientAddress: string
  clientIdentification: string
  instructions: any
  beneficiaries: any[]
  activationTriggers: string[]
  clientNotes?: string
}

export interface UpdatePOARequest {
  type?: POAType
  clientFullName?: string
  clientAddress?: string
  clientIdentification?: string
  instructions?: any
  beneficiaries?: any[]
  activationTriggers?: string[]
  clientNotes?: string
}

export type DocumentType =
  | 'identification'
  | 'proof_of_address'
  | 'bank_statement'
  | 'notarization'
  | 'activation_proof'
  | 'other'

export type DocumentStatus = 'pending' | 'approved' | 'rejected'

export interface POADocument {
  id: string
  poaId: string
  type: DocumentType
  fileName: string
  fileUrl: string
  fileSize: number
  mimeType: string
  status: DocumentStatus
  uploadedAt: string
  reviewedAt?: string
}

// Tipos para el sistema de usuarios y perfil
export interface UpdateProfileRequest {
  firstName?: string
  lastName?: string
  phone?: string
  address?: string
  city?: string
  state?: string
  zipCode?: string
  country?: string
  dateOfBirth?: string
  identificationNumber?: string
}

export interface SendPhoneOtpRequest {
  phone: string
}

export interface VerifyPhoneRequest {
  otpCode: string
}

// Tipos para el sistema de notificaciones
export type NotificationChannel = 'email' | 'sms' | 'whatsapp' | 'push' | 'in_app'

export type NotificationStatus =
  | 'pending'
  | 'queued'
  | 'sending'
  | 'sent'
  | 'delivered'
  | 'failed'
  | 'bounced'
  | 'cancelled'

export type NotificationCategory =
  | 'poa_updates'
  | 'account'
  | 'security'
  | 'payments'
  | 'marketing'
  | 'system'

export interface Notification {
  id: string
  userId: string
  channel: NotificationChannel
  category: NotificationCategory
  status: NotificationStatus
  subject?: string
  body: string
  metadata?: any
  scheduledFor?: string
  sentAt?: string
  deliveredAt?: string
  readAt?: string
  failedAt?: string
  errorMessage?: string
  createdAt: string
  updatedAt: string
}

export interface NotificationPreferences {
  id: string
  userId: string
  enabledChannels: NotificationChannel[]
  quietHoursStart?: string
  quietHoursEnd?: string
  categoryPreferences: Record<NotificationCategory, NotificationChannel[]>
  createdAt: string
  updatedAt: string
}

export interface UpdatePreferencesRequest {
  enabledChannels?: NotificationChannel[]
  quietHoursStart?: string
  quietHoursEnd?: string
  categoryPreferences?: Record<NotificationCategory, NotificationChannel[]>
}

export interface UpdateCategoryPreferenceRequest {
  category: NotificationCategory
  channel: NotificationChannel
  enabled: boolean
}

export interface NotificationFilterParams {
  page?: number
  limit?: number
  channel?: NotificationChannel
  status?: NotificationStatus
  category?: NotificationCategory
}

// Tipos para el sistema de suscripciones y planes
export type SubscriptionPlan = 'basic' | 'standard' | 'premium'
export type SubscriptionStatus = 'pending_payment' | 'pending_contract' | 'active' | 'cancelled' | 'suspended' | 'expired' | 'past_due'
export type InitialPaymentType = 'single' | 'installments'
export type InitialPaymentStatus = 'pending' | 'partial' | 'completed' | 'failed'
export type PaymentMethod = 'stripe' | 'paypal' | 'zelle' | 'other'

export interface Plan {
  id: string
  type: SubscriptionPlan
  name: string
  description: string
  monthlyPrice: number
  initialPayment: number
  installmentAmount: number
  installmentCount: number
  features: string[]
  isRecommended: boolean
  icon: string
  status: 'active' | 'inactive' | 'deprecated'
  displayOrder: number
  stripeProductId?: string
  stripeMonthlyPriceId?: string
  stripeInitialPriceId?: string
  stripeInstallmentPriceId?: string
  createdAt: string
  updatedAt: string
}

export interface Subscription {
  id: string
  userId: string
  planId?: string
  planType: SubscriptionPlan
  status: SubscriptionStatus

  // Precios
  monthlyPrice: number
  currency: string

  // Pago inicial
  initialPaymentType: InitialPaymentType
  initialPaymentAmount: number
  initialPaymentStatus: InitialPaymentStatus
  installmentsPaid: number
  totalInstallments: number
  installmentAmount: number
  nextInstallmentDate?: string

  // Stripe
  paymentMethod: PaymentMethod
  stripeSubscriptionId?: string
  stripeCustomerId?: string
  stripePaymentMethodId?: string
  stripeCheckoutSessionId?: string

  // Fechas
  startDate?: string
  nextBillingDate?: string
  cancelledAt?: string
  cancellationReason?: string
  expiresAt?: string

  // Contrato
  contractSigned: boolean
  contractSignedAt?: string
  docusignEnvelopeId?: string
  contractUrl?: string

  // Relaciones
  user?: User
  plan?: Plan

  // Auditoría
  notes?: string
  metadata?: Record<string, any>
  createdAt: string
  updatedAt: string
}

export interface CreateCheckoutSessionRequest {
  planType: SubscriptionPlan
  initialPaymentType: InitialPaymentType
  successUrl: string
  cancelUrl: string
}

export interface CheckoutSessionResponse {
  sessionId: string
  checkoutUrl: string
}

export interface Payment {
  id: string
  userId: string
  subscriptionId?: string
  amount: number
  currency: string
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded' | 'partially_refunded'
  provider: 'stripe' | 'paypal' | 'zelle' | 'other'
  transactionId?: string
  invoiceNumber: string
  invoicePdfUrl?: string
  description: string
  paidAt?: string
  refundedAt?: string
  refundedAmount: number
  refundReason?: string
  metadata?: Record<string, any>
  errorMessage?: string
  createdAt: string
  updatedAt: string
}
