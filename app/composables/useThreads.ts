import { ref, type Ref } from 'vue'
import type { POAThread, POAMessage } from '~/types/poa-messages'
import {
  ThreadType,
  ThreadStatus,
  ThreadCreatedBy,
  MessageSenderType,
} from '~/types/poa-messages'

export interface CreateThreadDto {
  type: ThreadType
  subject: string
}

export interface CreateMessageInThreadDto {
  message: string
}

export interface UseThreadsReturn {
  threads: Ref<POAThread[]>
  currentThread: Ref<POAThread | null>
  loading: Ref<boolean>
  error: Ref<Error | null>
  fetchThreads: (poaId: string) => Promise<void>
  fetchThread: (threadId: string) => Promise<void>
  createThread: (poaId: string, dto: CreateThreadDto) => Promise<void>
  sendMessage: (threadId: string, dto: CreateMessageInThreadDto) => Promise<void>
  markThreadAsRead: (threadId: string) => Promise<void>
  closeThread: (threadId: string) => Promise<void>
  reopenThread: (threadId: string) => Promise<void>
  refresh: (poaId: string) => Promise<void>
}

/**
 * Composable para manejar hilos de conversación del POA (Cliente)
 * Permite crear hilos, enviar mensajes, y gestionar el estado de los hilos
 */
export function useThreads(): UseThreadsReturn {
  const api = useApi()
  const threads = ref<POAThread[]>([])
  const currentThread = ref<POAThread | null>(null)
  const loading = ref(false)
  const error = ref<Error | null>(null)

  const fetchThreads = async (poaId: string) => {
    loading.value = true
    error.value = null

    try {
      const response = await api.get<POAThread[]>(`/poa/${poaId}/threads`)
      threads.value = response.data
    } catch (e: any) {
      error.value = e
      console.error('Error fetching threads:', e)
    } finally {
      loading.value = false
    }
  }

  const fetchThread = async (threadId: string) => {
    loading.value = true
    error.value = null

    try {
      const response = await api.get<POAThread>(`/poa/threads/${threadId}`)
      currentThread.value = response.data
    } catch (e: any) {
      error.value = e
      console.error('Error fetching thread:', e)
    } finally {
      loading.value = false
    }
  }

  const createThread = async (poaId: string, dto: CreateThreadDto) => {
    loading.value = true
    error.value = null

    try {
      const response = await api.post<POAThread>(`/poa/${poaId}/threads`, dto)
      threads.value.unshift(response.data)
      currentThread.value = response.data
    } catch (e: any) {
      error.value = e
      console.error('Error creating thread:', e)
      throw e
    } finally {
      loading.value = false
    }
  }

  const sendMessage = async (threadId: string, dto: CreateMessageInThreadDto) => {
    loading.value = true
    error.value = null

    try {
      const response = await api.post<POAMessage>(`/poa/threads/${threadId}/messages`, dto)

      // Update current thread if loaded
      if (currentThread.value && currentThread.value.id === threadId) {
        if (!currentThread.value.messages) {
          currentThread.value.messages = []
        }
        currentThread.value.messages.push(response.data)
        currentThread.value.messageCount++
        currentThread.value.lastMessageAt = response.data.createdAt
      }

      // Update thread in list
      const threadIndex = threads.value.findIndex((t) => t.id === threadId)
      if (threadIndex !== -1) {
        threads.value[threadIndex].messageCount++
        threads.value[threadIndex].lastMessageAt = response.data.createdAt
      }
    } catch (e: any) {
      error.value = e
      console.error('Error sending message:', e)
      throw e
    } finally {
      loading.value = false
    }
  }

  const markThreadAsRead = async (threadId: string) => {
    try {
      await api.patch(`/poa/threads/${threadId}/read`)

      // Update current thread
      if (currentThread.value && currentThread.value.id === threadId) {
        if (currentThread.value.messages) {
          currentThread.value.messages.forEach((msg) => {
            if (!msg.isRead && msg.senderType === MessageSenderType.ADMIN) {
              msg.isRead = true
              msg.readAt = new Date()
            }
          })
        }
        currentThread.value.unreadCount = 0
      }

      // Update thread in list
      const threadIndex = threads.value.findIndex((t) => t.id === threadId)
      if (threadIndex !== -1) {
        threads.value[threadIndex].unreadCount = 0
      }
    } catch (e: any) {
      error.value = e
      console.error('Error marking thread as read:', e)
    }
  }

  const closeThread = async (threadId: string) => {
    try {
      const response = await api.patch<POAThread>(`/poa/threads/${threadId}/close`)

      // Update current thread
      if (currentThread.value && currentThread.value.id === threadId) {
        currentThread.value.status = ThreadStatus.CLOSED
      }

      // Update thread in list
      const threadIndex = threads.value.findIndex((t) => t.id === threadId)
      if (threadIndex !== -1) {
        threads.value[threadIndex].status = ThreadStatus.CLOSED
      }
    } catch (e: any) {
      error.value = e
      console.error('Error closing thread:', e)
      throw e
    }
  }

  const reopenThread = async (threadId: string) => {
    try {
      const response = await api.patch<POAThread>(`/poa/threads/${threadId}/reopen`)

      // Update current thread
      if (currentThread.value && currentThread.value.id === threadId) {
        currentThread.value.status = ThreadStatus.OPEN
      }

      // Update thread in list
      const threadIndex = threads.value.findIndex((t) => t.id === threadId)
      if (threadIndex !== -1) {
        threads.value[threadIndex].status = ThreadStatus.OPEN
      }
    } catch (e: any) {
      error.value = e
      console.error('Error reopening thread:', e)
      throw e
    }
  }

  const refresh = async (poaId: string) => {
    await fetchThreads(poaId)
  }

  return {
    threads,
    currentThread,
    loading,
    error,
    fetchThreads,
    fetchThread,
    createThread,
    sendMessage,
    markThreadAsRead,
    closeThread,
    reopenThread,
    refresh,
  }
}
