/**
 * Composable para manejo de códigos de referido
 * Captura y almacena códigos de referido desde URL
 */

const REFERRAL_COOKIE_NAME = 'referral_code'
const REFERRAL_STORAGE_KEY = 'referralCode'
const COOKIE_MAX_AGE = 30 * 24 * 60 * 60 // 30 días en segundos

export const useReferral = () => {
  const route = useRoute()

  // Cookie para persistir el código de referido
  const referralCookie = useCookie(REFERRAL_COOKIE_NAME, {
    maxAge: COOKIE_MAX_AGE,
    path: '/',
  })

  /**
   * Captura el código de referido desde la URL
   * Se debe llamar en el app.vue o en un plugin
   */
  const captureReferralCode = () => {
    const refCode = route.query.ref as string | undefined

    if (refCode && refCode.trim()) {
      // Guardar en cookie
      referralCookie.value = refCode.trim()

      // También guardar en localStorage como respaldo
      if (typeof window !== 'undefined') {
        localStorage.setItem(REFERRAL_STORAGE_KEY, refCode.trim())
      }

      console.log(`[Referral] Código capturado: ${refCode}`)
    }
  }

  /**
   * Obtiene el código de referido almacenado
   */
  const getReferralCode = (): string | null => {
    // Primero intentar desde cookie
    if (referralCookie.value) {
      return referralCookie.value
    }

    // Fallback a localStorage
    if (typeof window !== 'undefined') {
      return localStorage.getItem(REFERRAL_STORAGE_KEY)
    }

    return null
  }

  /**
   * Limpia el código de referido almacenado
   * Se debe llamar después del registro exitoso
   */
  const clearReferralCode = () => {
    referralCookie.value = null

    if (typeof window !== 'undefined') {
      localStorage.removeItem(REFERRAL_STORAGE_KEY)
    }
  }

  /**
   * Verifica si hay un código de referido activo
   */
  const hasReferralCode = computed(() => !!getReferralCode())

  /**
   * Código de referido actual (reactivo)
   */
  const currentReferralCode = computed(() => getReferralCode())

  return {
    captureReferralCode,
    getReferralCode,
    clearReferralCode,
    hasReferralCode,
    currentReferralCode,
  }
}
