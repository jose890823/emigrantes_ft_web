import { ref, type Ref } from 'vue'

export interface POAExecution {
  id: string
  poaId: string
  executedBy: string
  executedByUser?: {
    id: string
    email: string
    firstName: string
    lastName: string
  }
  executionType: 'bank_transaction' | 'document_delivery' | 'property_management' | 'other'
  description: string
  amount: number | null
  recipient: string | null
  proofDocuments: string[]
  status: 'pending' | 'in_progress' | 'completed' | 'failed'
  executedAt: string
  completedAt: string | null
  notes: string | null
  updatedAt: string
}

export interface UseExecutionsReturn {
  executions: Ref<POAExecution[]>
  loading: Ref<boolean>
  error: Ref<Error | null>
  fetchExecutions: (poaId: string) => Promise<void>
  getExecutionTypeLabel: (type: string) => string
  getExecutionStatusLabel: (status: string) => string
  getExecutionStatusColor: (status: string) => string
}

/**
 * Composable para manejar ejecuciones del POA (solo lectura para cliente)
 */
export function useExecutions(): UseExecutionsReturn {
  const executions = ref<POAExecution[]>([])
  const loading = ref(false)
  const error = ref<Error | null>(null)
  const api = useApi()

  const fetchExecutions = async (poaId: string) => {
    loading.value = true
    error.value = null

    try {
      const response = await api.get<POAExecution[]>(`/poa/${poaId}/executions`)

      if (response && response.data) {
        executions.value = response.data
      } else {
        executions.value = []
      }
    } catch (e: any) {
      error.value = e
      console.error('Error fetching executions:', e)
      executions.value = []
    } finally {
      loading.value = false
    }
  }

  const getExecutionTypeLabel = (type: string): string => {
    const labels: Record<string, string> = {
      bank_transaction: 'Transacción Bancaria',
      document_delivery: 'Entrega de Documentos',
      property_management: 'Gestión de Propiedades',
      other: 'Otro',
    }
    return labels[type] || type
  }

  const getExecutionStatusLabel = (status: string): string => {
    const labels: Record<string, string> = {
      pending: 'Pendiente',
      in_progress: 'En Progreso',
      completed: 'Completado',
      failed: 'Fallido',
    }
    return labels[status] || status
  }

  const getExecutionStatusColor = (status: string): string => {
    const colors: Record<string, string> = {
      pending: 'text-yellow-600 bg-yellow-50 border-yellow-200',
      in_progress: 'text-blue-600 bg-blue-50 border-blue-200',
      completed: 'text-green-600 bg-green-50 border-green-200',
      failed: 'text-red-600 bg-red-50 border-red-200',
    }
    return colors[status] || 'text-gray-600 bg-gray-50 border-gray-200'
  }

  return {
    executions,
    loading,
    error,
    fetchExecutions,
    getExecutionTypeLabel,
    getExecutionStatusLabel,
    getExecutionStatusColor,
  }
}
