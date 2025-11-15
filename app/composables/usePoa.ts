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
   * Subir documento para un POA
   */
  const uploadDocument = async (
    poaId: string,
    file: File,
    type: DocumentType
  ) => {
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('type', type)

      const response = await api.post<POADocument>(
        `/poa/${poaId}/documents`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
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
   * Utilidades para estados de POA
   */
  const getStatusLabel = (status: string): string => {
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
    }
    return labels[status] || status
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

    // Utilidades
    getStatusLabel,
    getStatusColor,
    getTypeLabel,
  }
}
