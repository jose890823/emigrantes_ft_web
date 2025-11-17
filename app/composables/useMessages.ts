import { ref, type Ref } from 'vue'

export enum MessageType {
  REQUEST_DOCUMENT = 'request_document',
  GENERAL = 'general',
  STATUS_UPDATE = 'status_update',
  QUESTION = 'question',
}

export enum MessageSenderType {
  ADMIN = 'admin',
  CLIENT = 'client',
}

export interface POAMessage {
  id: string
  poaId: string
  senderId: string
  senderType: MessageSenderType
  type: MessageType
  subject: string
  message: string
  isRead: boolean
  readAt: Date | null
  createdAt: Date
  updatedAt: Date
  sender?: {
    id: string
    firstName: string
    lastName: string
    email: string
  }
}

export interface CreateMessageDto {
  type: MessageType
  subject: string
  message: string
}

export interface UseMessagesReturn {
  messages: Ref<POAMessage[]>
  unreadCount: Ref<number>
  loading: Ref<boolean>
  error: Ref<Error | null>
  fetchMessages: (poaId: string) => Promise<void>
  sendMessage: (poaId: string, dto: CreateMessageDto) => Promise<void>
  markAsRead: (messageId: string) => Promise<void>
  deleteMessage: (messageId: string) => Promise<void>
  getUnreadCount: () => Promise<void>
  refresh: (poaId: string) => Promise<void>
}

/**
 * Composable para manejar la mensajería del POA (Cliente)
 * Permite enviar mensajes al admin, listar mensajes y marcar como leídos
 */
export function useMessages(): UseMessagesReturn {
  const api = useApi()
  const messages = ref<POAMessage[]>([])
  const unreadCount = ref<number>(0)
  const loading = ref(false)
  const error = ref<Error | null>(null)

  const fetchMessages = async (poaId: string) => {
    loading.value = true
    error.value = null

    try {
      const response = await api.get<POAMessage[]>(`/poa/${poaId}/messages`)
      messages.value = response.data
    } catch (e: any) {
      error.value = e
      console.error('Error fetching messages:', e)
    } finally {
      loading.value = false
    }
  }

  const sendMessage = async (poaId: string, dto: CreateMessageDto) => {
    loading.value = true
    error.value = null

    try {
      const response = await api.post<POAMessage>(`/poa/${poaId}/messages`, dto)
      // Add the new message to the list
      messages.value.unshift(response.data)
    } catch (e: any) {
      error.value = e
      console.error('Error sending message:', e)
      throw e
    } finally {
      loading.value = false
    }
  }

  const markAsRead = async (messageId: string) => {
    try {
      await api.patch<POAMessage>(`/poa/messages/${messageId}/read`)
      // Update the message in the list
      const messageIndex = messages.value.findIndex((m) => m.id === messageId)
      if (messageIndex !== -1) {
        messages.value[messageIndex].isRead = true
        messages.value[messageIndex].readAt = new Date()
      }
      // Decrease unread count
      if (unreadCount.value > 0) {
        unreadCount.value--
      }
    } catch (e: any) {
      error.value = e
      console.error('Error marking message as read:', e)
    }
  }

  const deleteMessage = async (messageId: string) => {
    try {
      await api.delete(`/poa/messages/${messageId}`)
      // Remove the message from the list
      messages.value = messages.value.filter((m) => m.id !== messageId)
    } catch (e: any) {
      error.value = e
      console.error('Error deleting message:', e)
      throw e
    }
  }

  const getUnreadCount = async () => {
    try {
      const response = await api.get<{ unreadCount: number }>('/poa/messages/unread-count')
      unreadCount.value = response.data.unreadCount
    } catch (e: any) {
      error.value = e
      console.error('Error fetching unread count:', e)
    }
  }

  const refresh = async (poaId: string) => {
    await Promise.all([fetchMessages(poaId), getUnreadCount()])
  }

  return {
    messages,
    unreadCount,
    loading,
    error,
    fetchMessages,
    sendMessage,
    markAsRead,
    deleteMessage,
    getUnreadCount,
    refresh,
  }
}
