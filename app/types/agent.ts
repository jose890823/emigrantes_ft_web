/**
 * Tipos para el sistema de agentes y referidos
 */

// Estado del agente
export type AgentStatus = 'pending' | 'approved' | 'suspended'

// Estado del referido
export type ReferralStatus = 'registered' | 'converted' | 'expired'

// Estado de la comisión
export type CommissionStatus = 'pending' | 'approved' | 'paid' | 'rejected'

// Entidad del agente
export interface Agent {
  id: string
  userId: string
  referralCode: string
  status: AgentStatus
  commissionRate: number
  paymentMethod: string | null
  paymentDetails: string | null

  // Stripe Connect
  stripeAccountId: string | null
  stripeAccountVerified: boolean
  stripeConnectedAt: string | null

  // Estadísticas
  totalReferrals: number
  totalEarnings: number
  pendingBalance: number
  paidBalance: number

  // Información adicional
  notes: string | null
  createdAt: string
  updatedAt: string

  // Relaciones
  user?: AgentUser
}

// Usuario del agente (simplificado)
export interface AgentUser {
  id: string
  email: string
  firstName: string
  lastName: string
  phone: string
}

// Referido
export interface Referral {
  id: string
  agentId: string
  referredUserId: string
  status: ReferralStatus
  ipAddress: string | null
  userAgent: string | null
  convertedAt: string | null
  createdAt: string

  // Relaciones
  referredUser?: AgentUser
}

// Comisión
export interface Commission {
  id: string
  agentId: string
  referralId: string
  paymentId: string
  subscriptionId: string | null
  saleAmount: number
  commissionRate: number
  commissionAmount: number
  status: CommissionStatus
  description: string | null
  notes: string | null
  paidAt: string | null
  paymentReference: string | null
  createdAt: string
}

// Dashboard del agente
export interface AgentDashboard {
  agent: Agent
  stats: {
    totalReferrals: number
    convertedReferrals: number
    conversionRate: number
    totalEarnings: number
    pendingBalance: number
    paidBalance: number
    recentReferrals: Referral[]
    recentCommissions: Commission[]
  }
  referralLink: string
}

// Estado de Stripe Connect
export interface StripeAccountStatus {
  isConnected: boolean
  isVerified: boolean
  accountId: string | null
  chargesEnabled: boolean
  payoutsEnabled: boolean
  detailsSubmitted: boolean
  requiresAction: boolean
  requirements?: {
    currentlyDue: string[]
    eventuallyDue: string[]
    pastDue: string[]
  }
}

// Enlace de cuenta de Stripe
export interface StripeAccountLink {
  url: string
  expiresAt: string
}

// Balance de Stripe
export interface StripeBalance {
  available: number
  pending: number
  currency: string
}

// Configuración pública del programa de referidos
export interface ReferralPublicSettings {
  defaultCommissionRate: number
  cookieExpirationDays: number
  minimumPayout: number
  stripeConnectEnabled: boolean
}

// Request para registro de agente
export interface RegisterAgentRequest {
  paymentMethod?: string
  paymentDetails?: string
}

// Request para actualizar perfil de agente
export interface UpdateAgentRequest {
  paymentMethod?: string
  paymentDetails?: string
}

// Filtros para referidos
export interface ReferralFilters {
  status?: ReferralStatus
  page?: number
  limit?: number
}

// Filtros para comisiones
export interface CommissionFilters {
  status?: CommissionStatus
  page?: number
  limit?: number
}

// Respuesta paginada
export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}
