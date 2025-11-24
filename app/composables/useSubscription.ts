/**
 * Composable para manejo de suscripciones y checkout
 * Integra con el sistema de pagos del backend
 */

import type {
  Plan,
  Subscription,
  Payment,
  SubscriptionPlan,
  InitialPaymentType,
  CreateCheckoutSessionRequest,
  CheckoutSessionResponse,
} from '~/types/api'

export const useSubscription = () => {
  const api = useApi()

  // Estado global
  const plans = useState<Plan[]>('subscription_plans', () => [])
  const currentSubscription = useState<Subscription | null>('current_subscription', () => null)
  const payments = useState<Payment[]>('subscription_payments', () => [])
  const loading = ref(false)
  const error = ref<string | null>(null)

  /**
   * Obtener planes públicos disponibles
   */
  const fetchPlans = async (): Promise<Plan[]> => {
    loading.value = true
    error.value = null

    try {
      const response = await api.get<Plan[]>('/plans/public')
      plans.value = response.data
      return response.data
    } catch (e: any) {
      error.value = e.message || 'Error al obtener planes'
      console.error('Error fetching plans:', e)
      return []
    } finally {
      loading.value = false
    }
  }

  /**
   * Obtener un plan por tipo
   */
  const getPlanByType = (type: SubscriptionPlan): Plan | undefined => {
    return plans.value.find(p => p.type === type)
  }

  /**
   * Obtener la suscripción activa del usuario
   */
  const fetchMySubscription = async (): Promise<Subscription | null> => {
    loading.value = true
    error.value = null

    try {
      const response = await api.get<Subscription>('/payments/subscriptions/my')
      currentSubscription.value = response.data
      return response.data
    } catch (e: any) {
      // 404 significa que no tiene suscripción, no es un error
      if (e.statusCode === 404) {
        currentSubscription.value = null
        return null
      }
      error.value = e.message || 'Error al obtener suscripción'
      console.error('Error fetching subscription:', e)
      return null
    } finally {
      loading.value = false
    }
  }

  /**
   * Crear sesión de checkout de Stripe
   */
  const createCheckoutSession = async (
    planType: SubscriptionPlan,
    initialPaymentType: InitialPaymentType,
    successUrl?: string,
    cancelUrl?: string
  ): Promise<CheckoutSessionResponse | null> => {
    loading.value = true
    error.value = null

    const baseUrl = window.location.origin

    try {
      const payload: CreateCheckoutSessionRequest = {
        planType,
        initialPaymentType,
        successUrl: successUrl || `${baseUrl}/subscription/success`,
        cancelUrl: cancelUrl || `${baseUrl}/subscription/cancel`,
      }

      const response = await api.post<CheckoutSessionResponse>('/payments/checkout', payload)
      return response.data
    } catch (e: any) {
      error.value = e.message || 'Error al crear sesión de pago'
      console.error('Error creating checkout session:', e)
      return null
    } finally {
      loading.value = false
    }
  }

  /**
   * Redirigir a Stripe Checkout
   */
  const redirectToCheckout = async (
    planType: SubscriptionPlan,
    initialPaymentType: InitialPaymentType
  ): Promise<boolean> => {
    const session = await createCheckoutSession(planType, initialPaymentType)

    if (session?.checkoutUrl) {
      window.location.href = session.checkoutUrl
      return true
    }

    return false
  }

  /**
   * Obtener historial de pagos de la suscripción
   */
  const fetchPayments = async (): Promise<Payment[]> => {
    if (!currentSubscription.value) {
      return []
    }

    loading.value = true
    error.value = null

    try {
      const response = await api.get<Payment[]>(`/payments/subscriptions/${currentSubscription.value.id}/payments`)
      payments.value = response.data
      return response.data
    } catch (e: any) {
      error.value = e.message || 'Error al obtener pagos'
      console.error('Error fetching payments:', e)
      return []
    } finally {
      loading.value = false
    }
  }

  /**
   * Cancelar suscripción
   */
  const cancelSubscription = async (reason: string, cancelAtPeriodEnd: boolean = true): Promise<boolean> => {
    if (!currentSubscription.value) {
      return false
    }

    loading.value = true
    error.value = null

    try {
      const response = await api.post<Subscription>(`/payments/subscriptions/${currentSubscription.value.id}/cancel`, {
        reason,
        cancelAtPeriodEnd,
      })
      currentSubscription.value = response.data
      return true
    } catch (e: any) {
      error.value = e.message || 'Error al cancelar suscripción'
      console.error('Error canceling subscription:', e)
      return false
    } finally {
      loading.value = false
    }
  }

  /**
   * Formatear precio
   */
  const formatPrice = (price: number, currency: string = 'USD'): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(price)
  }

  /**
   * Obtener texto del estado de suscripción
   */
  const getStatusText = (status: string): string => {
    const statusMap: Record<string, string> = {
      pending_payment: 'Pago Pendiente',
      pending_contract: 'Contrato Pendiente',
      active: 'Activa',
      cancelled: 'Cancelada',
      suspended: 'Suspendida',
      expired: 'Expirada',
      past_due: 'Pago Atrasado',
    }
    return statusMap[status] || status
  }

  /**
   * Obtener texto del plan
   */
  const getPlanText = (planType: SubscriptionPlan): string => {
    const planMap: Record<string, string> = {
      basic: 'Plan Básico',
      standard: 'Plan Estándar',
      premium: 'Plan Premium',
    }
    return planMap[planType] || planType
  }

  /**
   * Verificar si tiene suscripción activa
   */
  const hasActiveSubscription = computed(() => {
    return currentSubscription.value?.status === 'active'
  })

  /**
   * Limpiar errores
   */
  const clearError = () => {
    error.value = null
  }

  /**
   * Resetear estado
   */
  const resetState = () => {
    currentSubscription.value = null
    payments.value = []
    error.value = null
  }

  return {
    // Estado
    plans: readonly(plans),
    currentSubscription: readonly(currentSubscription),
    payments: readonly(payments),
    loading: readonly(loading),
    error: readonly(error),
    hasActiveSubscription,

    // Métodos
    fetchPlans,
    getPlanByType,
    fetchMySubscription,
    createCheckoutSession,
    redirectToCheckout,
    fetchPayments,
    cancelSubscription,
    formatPrice,
    getStatusText,
    getPlanText,
    clearError,
    resetState,
  }
}
