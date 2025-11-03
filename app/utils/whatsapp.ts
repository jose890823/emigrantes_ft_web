/**
 * Utilidades para WhatsApp
 */

/**
 * Abre WhatsApp con un mensaje predefinido
 */
export const openWhatsApp = (message?: string) => {
  const config = useRuntimeConfig()
  const phone = config.public.whatsappNumber
  const encodedMessage = message ? encodeURIComponent(message) : ''
  const url = `https://wa.me/${phone.replace(/\D/g, '')}${encodedMessage ? `?text=${encodedMessage}` : ''}`

  window.open(url, '_blank')
}

/**
 * Genera un mensaje de WhatsApp predefinido para contacto
 */
export const getWhatsAppContactMessage = () => {
  return 'Hola, me gustaría obtener más información sobre los servicios de Emigrantes FT.'
}

/**
 * Genera un mensaje de WhatsApp para una consulta específica de servicio
 */
export const getWhatsAppServiceMessage = (serviceName: string) => {
  return `Hola, me interesa conocer más sobre el servicio de ${serviceName}.`
}

/**
 * Genera un mensaje de WhatsApp para agendar una cita
 */
export const getWhatsAppAppointmentMessage = () => {
  return 'Hola, me gustaría agendar una cita para consultar sobre sus servicios.'
}
