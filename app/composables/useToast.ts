/**
 * Composable para notificaciones toast
 * Sistema de notificaciones visual para feedback al usuario
 */

export interface Toast {
  id: string
  title: string
  description?: string
  type: 'success' | 'error' | 'warning' | 'info'
  duration?: number
}

export const useToast = () => {
  const toasts = useState<Toast[]>('toasts', () => [])

  /**
   * Agregar una notificación toast
   */
  const addToast = (toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substring(7)
    const duration = toast.duration || 5000

    const newToast: Toast = {
      ...toast,
      id,
    }

    toasts.value.push(newToast)

    // Auto-remover después del tiempo especificado
    setTimeout(() => {
      removeToast(id)
    }, duration)

    return id
  }

  /**
   * Remover una notificación específica
   */
  const removeToast = (id: string) => {
    toasts.value = toasts.value.filter(toast => toast.id !== id)
  }

  /**
   * Limpiar todas las notificaciones
   */
  const clearToasts = () => {
    toasts.value = []
  }

  /**
   * Métodos de conveniencia para tipos específicos
   */
  const success = (title: string, description?: string, duration?: number) => {
    return addToast({ title, description, type: 'success', duration })
  }

  const error = (title: string, description?: string, duration?: number) => {
    return addToast({ title, description, type: 'error', duration })
  }

  const warning = (title: string, description?: string, duration?: number) => {
    return addToast({ title, description, type: 'warning', duration })
  }

  const info = (title: string, description?: string, duration?: number) => {
    return addToast({ title, description, type: 'info', duration })
  }

  return {
    toasts: readonly(toasts),
    addToast,
    removeToast,
    clearToasts,
    success,
    error,
    warning,
    info,
  }
}
