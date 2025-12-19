/**
 * Composable para manejo del panel de agentes
 * Integra con el sistema de referidos del backend
 */

import type {
  Agent,
  AgentDashboard,
  Referral,
  Commission,
  StripeAccountStatus,
  StripeAccountLink,
  StripeBalance,
  ReferralPublicSettings,
  RegisterAgentRequest,
  UpdateAgentRequest,
  ReferralFilters,
  CommissionFilters,
  PaginatedResponse,
} from '~/types/agent'

export const useAgent = () => {
  const api = useApi()
  const config = useRuntimeConfig()

  // Estado del agente
  const agent = useState<Agent | null>('agent_profile', () => null)
  const isAgent = computed(() => !!agent.value)
  const isApproved = computed(() => agent.value?.status === 'approved')

  // Estado de carga
  const loading = ref(false)
  const error = ref<string | null>(null)

  // ============================================
  // REGISTRO Y PERFIL
  // ============================================

  /**
   * Registrarse como agente
   */
  const registerAsAgent = async (data: RegisterAgentRequest = {}) => {
    loading.value = true
    error.value = null

    try {
      const response = await api.post<Agent>('/referrals/agents/register', data)
      agent.value = response.data
      return { success: true, agent: response.data }
    } catch (err: any) {
      error.value = err.message
      return { success: false, error: err.message }
    } finally {
      loading.value = false
    }
  }

  /**
   * Obtener mi perfil de agente
   */
  const getMyProfile = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await api.get<Agent>('/referrals/agents/me')
      agent.value = response.data
      return { success: true, agent: response.data }
    } catch (err: any) {
      error.value = err.message
      return { success: false, error: err.message }
    } finally {
      loading.value = false
    }
  }

  /**
   * Actualizar mi perfil de agente
   */
  const updateMyProfile = async (data: UpdateAgentRequest) => {
    loading.value = true
    error.value = null

    try {
      const response = await api.put<Agent>('/referrals/agents/me', data)
      agent.value = response.data
      return { success: true, agent: response.data }
    } catch (err: any) {
      error.value = err.message
      return { success: false, error: err.message }
    } finally {
      loading.value = false
    }
  }

  // ============================================
  // DASHBOARD Y ESTADÍSTICAS
  // ============================================

  /**
   * Obtener dashboard del agente
   */
  const getDashboard = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await api.get<AgentDashboard>('/referrals/agents/me/dashboard')
      return { success: true, data: response.data }
    } catch (err: any) {
      error.value = err.message
      return { success: false, error: err.message }
    } finally {
      loading.value = false
    }
  }

  /**
   * Obtener enlace de referido
   */
  const getReferralLink = async () => {
    try {
      const response = await api.get<{ referralCode: string; referralLink: string }>(
        '/referrals/agents/me/link'
      )
      return { success: true, data: response.data }
    } catch (err: any) {
      return { success: false, error: err.message }
    }
  }

  // ============================================
  // REFERIDOS
  // ============================================

  /**
   * Obtener mis referidos
   */
  const getMyReferrals = async (filters: ReferralFilters = {}) => {
    loading.value = true
    error.value = null

    try {
      const params = new URLSearchParams()
      if (filters.status) params.append('status', filters.status)
      if (filters.page) params.append('page', filters.page.toString())
      if (filters.limit) params.append('limit', filters.limit.toString())

      const queryString = params.toString()
      const url = `/referrals/agents/me/referrals${queryString ? `?${queryString}` : ''}`

      const response = await api.get<PaginatedResponse<Referral>>(url)
      return { success: true, data: response.data }
    } catch (err: any) {
      error.value = err.message
      return { success: false, error: err.message }
    } finally {
      loading.value = false
    }
  }

  // ============================================
  // COMISIONES
  // ============================================

  /**
   * Obtener mis comisiones
   */
  const getMyCommissions = async (filters: CommissionFilters = {}) => {
    loading.value = true
    error.value = null

    try {
      const params = new URLSearchParams()
      if (filters.status) params.append('status', filters.status)
      if (filters.page) params.append('page', filters.page.toString())
      if (filters.limit) params.append('limit', filters.limit.toString())

      const queryString = params.toString()
      const url = `/referrals/agents/me/commissions${queryString ? `?${queryString}` : ''}`

      const response = await api.get<PaginatedResponse<Commission>>(url)
      return { success: true, data: response.data }
    } catch (err: any) {
      error.value = err.message
      return { success: false, error: err.message }
    } finally {
      loading.value = false
    }
  }

  // ============================================
  // STRIPE CONNECT
  // ============================================

  /**
   * Obtener estado de cuenta de Stripe
   */
  const getStripeStatus = async () => {
    try {
      const response = await api.get<StripeAccountStatus>('/referrals/agents/me/stripe/status')
      return { success: true, data: response.data }
    } catch (err: any) {
      return { success: false, error: err.message }
    }
  }

  /**
   * Conectar cuenta de Stripe
   */
  const connectStripeAccount = async () => {
    loading.value = true
    error.value = null

    try {
      const baseUrl = window.location.origin
      const response = await api.post<StripeAccountLink>('/referrals/agents/me/stripe/connect', {
        returnUrl: `${baseUrl}/agentes/stripe/callback`,
        refreshUrl: `${baseUrl}/agentes/stripe/refresh`,
      })

      // Redirigir a Stripe
      window.location.href = response.data.url
      return { success: true, data: response.data }
    } catch (err: any) {
      error.value = err.message
      return { success: false, error: err.message }
    } finally {
      loading.value = false
    }
  }

  /**
   * Obtener enlace de login a Stripe Dashboard
   */
  const getStripeLoginLink = async () => {
    try {
      const response = await api.get<{ url: string }>('/referrals/agents/me/stripe/login')
      return { success: true, url: response.data.url }
    } catch (err: any) {
      return { success: false, error: err.message }
    }
  }

  /**
   * Obtener balance de Stripe
   */
  const getStripeBalance = async () => {
    try {
      const response = await api.get<StripeBalance>('/referrals/agents/me/stripe/balance')
      return { success: true, data: response.data }
    } catch (err: any) {
      return { success: false, error: err.message }
    }
  }

  /**
   * Desconectar cuenta de Stripe
   */
  const disconnectStripeAccount = async () => {
    loading.value = true
    error.value = null

    try {
      await api.post('/referrals/agents/me/stripe/disconnect')
      // Actualizar perfil para reflejar cambio
      await getMyProfile()
      return { success: true }
    } catch (err: any) {
      error.value = err.message
      return { success: false, error: err.message }
    } finally {
      loading.value = false
    }
  }

  // ============================================
  // CONFIGURACIÓN PÚBLICA
  // ============================================

  /**
   * Obtener configuración pública del programa
   */
  const getPublicSettings = async () => {
    try {
      const response = await api.get<ReferralPublicSettings>('/referrals/agents/settings/public')
      return { success: true, data: response.data }
    } catch (err: any) {
      return { success: false, error: err.message }
    }
  }

  // ============================================
  // UTILIDADES
  // ============================================

  /**
   * Verificar si el usuario autenticado es agente
   */
  const checkAgentStatus = async () => {
    try {
      await getMyProfile()
      return isAgent.value
    } catch {
      return false
    }
  }

  /**
   * Generar enlace de referido
   */
  const generateReferralUrl = (code: string) => {
    const baseUrl = config.public.siteUrl || window.location.origin
    return `${baseUrl}/?ref=${code}`
  }

  /**
   * Copiar enlace al portapapeles
   */
  const copyReferralLink = async (link: string) => {
    try {
      await navigator.clipboard.writeText(link)
      return { success: true }
    } catch (err) {
      return { success: false, error: 'No se pudo copiar al portapapeles' }
    }
  }

  return {
    // Estado
    agent: readonly(agent),
    isAgent,
    isApproved,
    loading: readonly(loading),
    error: readonly(error),

    // Registro y perfil
    registerAsAgent,
    getMyProfile,
    updateMyProfile,

    // Dashboard
    getDashboard,
    getReferralLink,

    // Referidos
    getMyReferrals,

    // Comisiones
    getMyCommissions,

    // Stripe Connect
    getStripeStatus,
    connectStripeAccount,
    getStripeLoginLink,
    getStripeBalance,
    disconnectStripeAccount,

    // Configuración
    getPublicSettings,

    // Utilidades
    checkAgentStatus,
    generateReferralUrl,
    copyReferralLink,
  }
}
