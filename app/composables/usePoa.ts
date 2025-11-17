/**
 * Composable para manejo de POAs (Power of Attorney)
 * Gestiona toda la interacción con el sistema de poderes notariales
 */

import type {
  POA,
  CreatePOARequest,
  UpdatePOARequest,
  POADocument,
  DocumentType,
} from '~/types/api'

export const usePoa = () => {
  const api = useApi()

  /**
   * Listar todos mis POAs
   */
  const getMyPoas = async (filters?: {
    status?: string
    type?: string
    page?: number
    limit?: number
  }) => {
    try {
      const response = await api.get<POA[]>('/poa', { query: filters })
      return { success: true, data: response.data }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  /**
   * Obtener un POA específico
   */
  const getPoa = async (id: string) => {
    try {
      const response = await api.get<POA>(`/poa/${id}`)
      return { success: true, data: response.data }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  /**
   * Crear un nuevo POA
   */
  const createPoa = async (data: CreatePOARequest) => {
    try {
      const response = await api.post<POA>('/poa', data)
      return { success: true, data: response.data }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  /**
   * Actualizar un POA (solo en estado draft)
   */
  const updatePoa = async (id: string, data: UpdatePOARequest) => {
    try {
      const response = await api.put<POA>(`/poa/${id}`, data)
      return { success: true, data: response.data }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  /**
   * Enviar POA a revisión (draft → pending)
   */
  const submitPoa = async (id: string) => {
    try {
      const response = await api.post<POA>(`/poa/${id}/submit`)
      return { success: true, data: response.data }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  /**
   * Cancelar un POA
   */
  const cancelPoa = async (id: string) => {
    try {
      const response = await api.post<POA>(`/poa/${id}/cancel`)
      return { success: true, data: response.data }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  /**
   * Obtener historial de un POA
   */
  const getPoaHistory = async (id: string) => {
    try {
      const response = await api.get(`/poa/${id}/history`)
      return { success: true, data: response.data }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  /**
   * Descargar PDF del POA
   */
  const downloadPoaPdf = async (id: string) => {
    try {
      const response = await api.get(`/poa/${id}/download`)
      return { success: true, data: response.data }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  /**
   * Convertir File a base64
   */
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = (error) => reject(error)
    })
  }

  /**
   * Subir documento para un POA
   */
  const uploadDocument = async (
    poaId: string,
    file: File,
    type: DocumentType
  ) => {
    try {
      // Convertir archivo a base64
      const fileBase64 = await fileToBase64(file)

      const response = await api.post<POADocument>(
        `/poa/${poaId}/documents`,
        {
          type,
          fileBase64,
          fileName: file.name,
          description: '',
        }
      )
      return { success: true, data: response.data }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  /**
   * Listar documentos de un POA
   */
  const getPoaDocuments = async (poaId: string) => {
    try {
      const response = await api.get<POADocument[]>(`/poa/${poaId}/documents`)
      return { success: true, data: response.data }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  /**
   * Eliminar un documento
   */
  const deleteDocument = async (poaId: string, documentId: string) => {
    try {
      const response = await api.delete(`/poa/${poaId}/documents/${documentId}`)
      return { success: true, message: response.message }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  /**
   * Obtener URL de descarga de documento
   */
  const getDocumentDownloadUrl = async (poaId: string, documentId: string) => {
    try {
      const response = await api.get<{ url: string; fileName: string; mimeType: string }>(
        `/poa/${poaId}/documents/${documentId}/download`
      )
      return { success: true, data: response.data }
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  /**
   * Abrir documento en nueva pestaña
   */
  const openDocument = async (poaId: string, documentId: string) => {
    const result = await getDocumentDownloadUrl(poaId, documentId)
    if (result.success && result.data) {
      const config = useRuntimeConfig()
      const baseUrl = config.public.apiBaseUrl.replace('/api', '')
      const fullUrl = `${baseUrl}${result.data.url}`
      window.open(fullUrl, '_blank')
      return { success: true }
    }
    return { success: false, error: result.error }
  }

  /**
   * Descargar documento
   */
  const downloadDocument = async (poaId: string, documentId: string) => {
    const result = await getDocumentDownloadUrl(poaId, documentId)
    if (result.success && result.data) {
      const config = useRuntimeConfig()
      const baseUrl = config.public.apiBaseUrl.replace('/api', '')
      const fullUrl = `${baseUrl}${result.data.url}`

      // Crear un elemento <a> temporal para forzar la descarga
      const link = document.createElement('a')
      link.href = fullUrl
      link.download = result.data.fileName
      link.target = '_blank'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      return { success: true }
    }
    return { success: false, error: result.error }
  }

  /**
   * Utilidades para estados de POA
   */
  const getStatusLabel = (status: string): string => {
    if (!status) return 'Sin estado'

    // Normalizar el status (convertir guiones a underscores y lowercase)
    const normalizedStatus = status.toLowerCase().replace(/-/g, '_')

    const labels: Record<string, string> = {
      draft: 'Borrador',
      pending: 'Pendiente',
      in_review: 'En Revisión',
      approved: 'Aprobado',
      rejected: 'Rechazado',
      notarized: 'Notariado',
      activated: 'Activado',
      executed: 'Ejecutado',
      completed: 'Completado',
      cancelled: 'Cancelado',
      // Alias adicionales por si acaso
      'in-review': 'En Revisión',
      'in review': 'En Revisión',
      reviewing: 'En Revisión',
      review: 'En Revisión',
      canceled: 'Cancelado',
      active: 'Activado',
      complete: 'Completado',
    }

    return labels[normalizedStatus] || formatStatusFallback(status)
  }

  /**
   * Formatear estado como fallback si no está mapeado
   */
  const formatStatusFallback = (status: string): string => {
    // Convertir de snake_case o kebab-case a título
    return status
      .replace(/_/g, ' ')
      .replace(/-/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ')
  }

  const getStatusColor = (status: string): string => {
    const colors: Record<string, string> = {
      draft: 'gray',
      pending: 'yellow',
      in_review: 'blue',
      approved: 'green',
      rejected: 'red',
      notarized: 'purple',
      activated: 'indigo',
      executed: 'cyan',
      completed: 'emerald',
      cancelled: 'slate',
    }
    return colors[status] || 'gray'
  }

  const getTypeLabel = (type: string): string => {
    const labels: Record<string, string> = {
      standard: 'Estándar',
      durable: 'Duradero',
      springing: 'Condicional',
    }
    return labels[type] || type
  }

  /**
   * Obtener etiqueta en español para acciones del historial
   */
  const getActionLabel = (action: string): string => {
    if (!action) return 'Acción desconocida'

    const normalizedAction = action.toLowerCase().trim()

    const labels: Record<string, string> = {
      // Acciones de creación
      created: 'POA creado',
      create: 'POA creado',
      creation: 'POA creado',

      // Acciones de actualización
      updated: 'POA actualizado',
      update: 'POA actualizado',
      modified: 'POA modificado',
      edited: 'POA editado',

      // Acciones de envío
      submitted: 'POA enviado a revisión',
      submit: 'POA enviado a revisión',
      sent: 'POA enviado',

      // Acciones de revisión
      reviewed: 'POA revisado',
      review: 'POA en revisión',
      in_review: 'POA en revisión',
      'in-review': 'POA en revisión',

      // Acciones de aprobación
      approved: 'POA aprobado',
      approve: 'POA aprobado',

      // Acciones de rechazo
      rejected: 'POA rechazado',
      reject: 'POA rechazado',

      // Acciones de notarización
      notarized: 'POA notariado',
      notarize: 'POA notariado',
      notarization: 'POA notariado',

      // Acciones de activación
      activated: 'POA activado',
      activate: 'POA activado',
      activation: 'POA activado',

      // Acciones de ejecución
      executed: 'POA ejecutado',
      execute: 'POA ejecutado',
      execution: 'POA ejecutado',

      // Acciones de completado
      completed: 'POA completado',
      complete: 'POA completado',

      // Acciones de cancelación
      cancelled: 'POA cancelado',
      canceled: 'POA cancelado',
      cancel: 'POA cancelado',

      // Acciones de documentos
      document_uploaded: 'Documento subido',
      document_deleted: 'Documento eliminado',
      upload_document: 'Documento subido',
      delete_document: 'Documento eliminado',

      // Acciones de cambio de estado
      status_changed: 'Estado cambiado',
      state_changed: 'Estado cambiado',
    }

    return labels[normalizedAction] || formatActionFallback(action)
  }

  /**
   * Formatear acción como fallback si no está mapeada
   */
  const formatActionFallback = (action: string): string => {
    // Convertir de snake_case o kebab-case a título
    const formatted = action
      .replace(/_/g, ' ')
      .replace(/-/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ')

    return `POA ${formatted}`
  }

  return {
    // Métodos de POA
    getMyPoas,
    getPoa,
    createPoa,
    updatePoa,
    submitPoa,
    cancelPoa,
    getPoaHistory,
    downloadPoaPdf,

    // Métodos de documentos
    uploadDocument,
    getPoaDocuments,
    deleteDocument,
    getDocumentDownloadUrl,
    openDocument,
    downloadDocument,

    // Utilidades
    getStatusLabel,
    getStatusColor,
    getTypeLabel,
    getActionLabel,
  }
}
