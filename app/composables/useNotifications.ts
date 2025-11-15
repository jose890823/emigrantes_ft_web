/**
 * Composable para manejo de notificaciones
 * Gestiona notificaciones del usuario y preferencias
 */

import type {
  Notification,
  NotificationPreferences,
  NotificationFilterParams,
  UpdatePreferencesRequest,
  UpdateCategoryPreferenceRequest,
  NotificationChannel,
  NotificationCategory,
} from '~/types/api'

export const useNotifications = () => {
  const api = useApi()

  /**
   * Obtener mis notificaciones con filtros
   */
  const getMyNotifications = async (filters?: NotificationFilterParams) => {
    try {
      const response = await api.get<Notification[]>('/notifications', {
        query: filters,
      })
      return { success: true, data: response.data }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  /**
   * Obtener contador de notificaciones no leídas
   */
  const getUnreadCount = async () => {
    try {
      const response = await api.get<{ count: number }>('/notifications/unread-count')
      return { success: true, count: response.data.count }
    } catch (error: any) {
      return { success: false, error: error.message, count: 0 }
    }
  }

  /**
   * Obtener una notificación específica
   */
  const getNotification = async (id: string) => {
    try {
      const response = await api.get<Notification>(`/notifications/${id}`)
      return { success: true, data: response.data }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  /**
   * Marcar notificación como leída
   */
  const markAsRead = async (id: string) => {
    try {
      const response = await api.patch<Notification>(`/notifications/${id}/read`)
      return { success: true, data: response.data }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  /**
   * Marcar todas las notificaciones como leídas
   */
  const markAllAsRead = async () => {
    try {
      const response = await api.post('/notifications/mark-all-read')
      return { success: true, message: response.message }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  /**
   * Obtener preferencias de notificaciones
   */
  const getPreferences = async () => {
    try {
      const response = await api.get<NotificationPreferences>('/notifications/preferences/me')
      return { success: true, data: response.data }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  /**
   * Actualizar preferencias de notificaciones
   */
  const updatePreferences = async (data: UpdatePreferencesRequest) => {
    try {
      const response = await api.patch<NotificationPreferences>(
        '/notifications/preferences/me',
        data
      )
      return { success: true, data: response.data }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  /**
   * Actualizar preferencia de una categoría específica
   */
  const updateCategoryPreference = async (data: UpdateCategoryPreferenceRequest) => {
    try {
      const response = await api.post('/notifications/preferences/category', data)
      return { success: true, message: response.message }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  /**
   * Resetear preferencias a valores por defecto
   */
  const resetPreferences = async () => {
    try {
      const response = await api.post<NotificationPreferences>(
        '/notifications/preferences/reset'
      )
      return { success: true, data: response.data }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  /**
   * Obtener estadísticas de notificaciones
   */
  const getMyStats = async () => {
    try {
      const response = await api.get('/notifications/stats/me')
      return { success: true, data: response.data }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  /**
   * Utilidades para labels de canales
   */
  const getChannelLabel = (channel: NotificationChannel): string => {
    const labels: Record<NotificationChannel, string> = {
      email: 'Email',
      sms: 'SMS',
      whatsapp: 'WhatsApp',
      push: 'Push',
      in_app: 'En la App',
    }
    return labels[channel] || channel
  }

  /**
   * Utilidades para labels de categorías
   */
  const getCategoryLabel = (category: NotificationCategory): string => {
    const labels: Record<NotificationCategory, string> = {
      poa_updates: 'Actualizaciones de POA',
      account: 'Cuenta',
      security: 'Seguridad',
      payments: 'Pagos',
      marketing: 'Marketing',
      system: 'Sistema',
    }
    return labels[category] || category
  }

  /**
   * Utilidades para iconos de canales
   */
  const getChannelIcon = (channel: NotificationChannel): string => {
    const icons: Record<NotificationChannel, string> = {
      email: 'lucide:mail',
      sms: 'lucide:message-square',
      whatsapp: 'lucide:message-circle',
      push: 'lucide:bell',
      in_app: 'lucide:app-window',
    }
    return icons[channel] || 'lucide:bell'
  }

  return {
    // Métodos de notificaciones
    getMyNotifications,
    getUnreadCount,
    getNotification,
    markAsRead,
    markAllAsRead,

    // Métodos de preferencias
    getPreferences,
    updatePreferences,
    updateCategoryPreference,
    resetPreferences,

    // Estadísticas
    getMyStats,

    // Utilidades
    getChannelLabel,
    getCategoryLabel,
    getChannelIcon,
  }
}
