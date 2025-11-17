<script setup lang="ts">
import type { POA } from '~/types/api'
import { useMessages, MessageType, type CreateMessageDto } from '~/composables/useMessages'

definePageMeta({
  middleware: 'auth'
})

const route = useRoute()
const router = useRouter()
const { getPoa, submitPoa, cancelPoa, getPoaHistory, uploadDocument, getPoaDocuments, deleteDocument, openDocument, downloadDocument, getStatusLabel, getStatusColor, getTypeLabel, getActionLabel } = usePoa()
const { messages, loading: loadingMessages, fetchMessages, sendMessage, markAsRead, deleteMessage } = useMessages()
const toast = useToast()

const poaId = route.params.id as string
const poa = ref<POA | null>(null)
const history = ref<any[]>([])
const documents = ref<any[]>([])
const isLoading = ref(false)
const isSubmitting = ref(false)
const isUploadingDocument = ref(false)
const showCancelModal = ref(false)
const showSubmitModal = ref(false)
const showHistoryModal = ref(false)
const showUploadModal = ref(false)
const showDeleteDocumentModal = ref(false)
const activeTab = ref('info')
const selectedFile = ref<File | null>(null)
const documentType = ref('identification')
const documentToDelete = ref<string | null>(null)
const openMenuId = ref<string | null>(null)
const menuPosition = ref({ top: 0, left: 0 })

// Messages
const showMessageModal = ref(false)
const messageForm = ref<CreateMessageDto>({
  type: MessageType.GENERAL,
  subject: '',
  message: '',
})

// Toggle menu dropdown
const toggleMenu = (docId: string, event: MouseEvent) => {
  if (openMenuId.value === docId) {
    openMenuId.value = null
  } else {
    openMenuId.value = docId
    const button = event.currentTarget as HTMLElement
    const rect = button.getBoundingClientRect()
    menuPosition.value = {
      top: rect.bottom + window.scrollY + 8,
      left: rect.right + window.scrollX - 192 // 192px = w-48
    }
  }
}

// Cerrar menu al hacer click fuera
const closeMenu = () => {
  openMenuId.value = null
}

// Cargar POA
const loadPoa = async () => {
  isLoading.value = true
  try {
    const result = await getPoa(poaId)
    if (result.success && result.data) {
      poa.value = result.data
    } else {
      toast.error('Error', 'POA no encontrado')
      router.push('/poa')
    }
  } catch (error) {
    toast.error('Error', 'No se pudo cargar el POA')
    router.push('/poa')
  } finally {
    isLoading.value = false
  }
}

// Cargar historial
const loadHistory = async () => {
  try {
    const result = await getPoaHistory(poaId)
    if (result.success && result.data) {
      history.value = result.data
    }
  } catch (error) {
    console.error('Error loading history:', error)
  }
}

// Cargar documentos
const loadDocuments = async () => {
  try {
    const result = await getPoaDocuments(poaId)
    if (result.success && result.data) {
      documents.value = result.data
    }
  } catch (error) {
    console.error('Error loading documents:', error)
    toast.error('Error', 'No se pudieron cargar los documentos')
  }
}

// Manejar selección de archivo
const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    selectedFile.value = target.files[0]
  }
}

// Subir documento
const handleUploadDocument = async () => {
  if (!selectedFile.value) {
    toast.error('Error', 'Por favor selecciona un archivo')
    return
  }

  isUploadingDocument.value = true
  try {
    const result = await uploadDocument(poaId, selectedFile.value, documentType.value as any)
    if (result.success) {
      toast.success('Documento subido', 'El documento se ha subido correctamente')
      selectedFile.value = null
      documentType.value = 'identification'
      showUploadModal.value = false
      await loadDocuments()
    } else {
      toast.error('Error', result.error || 'No se pudo subir el documento')
    }
  } catch (error) {
    toast.error('Error', 'Ocurrió un error al subir el documento')
  } finally {
    isUploadingDocument.value = false
  }
}

// Ver documento
const handleOpenDocument = async (documentId: string) => {
  try {
    const result = await openDocument(poaId, documentId)
    if (!result.success) {
      toast.error('Error', result.error || 'No se pudo abrir el documento')
    }
  } catch (error) {
    toast.error('Error', 'Ocurrió un error al abrir el documento')
  }
}

// Descargar documento
const handleDownloadDocument = async (documentId: string) => {
  try {
    const result = await downloadDocument(poaId, documentId)
    if (result.success) {
      toast.success('Descarga iniciada', 'El documento se está descargando')
    } else {
      toast.error('Error', result.error || 'No se pudo descargar el documento')
    }
  } catch (error) {
    toast.error('Error', 'Ocurrió un error al descargar el documento')
  }
}

// Confirmar eliminación de documento
const confirmDeleteDocument = (documentId: string) => {
  documentToDelete.value = documentId
  showDeleteDocumentModal.value = true
}

// Eliminar documento
const handleDeleteDocument = async () => {
  if (!documentToDelete.value) return

  showDeleteDocumentModal.value = false

  try {
    const result = await deleteDocument(poaId, documentToDelete.value)
    if (result.success) {
      toast.success('Documento eliminado', 'El documento se ha eliminado correctamente')
      await loadDocuments()
    } else {
      toast.error('Error', result.error || 'No se pudo eliminar el documento')
    }
  } catch (error) {
    toast.error('Error', 'Ocurrió un error al eliminar el documento')
  } finally {
    documentToDelete.value = null
  }
}

// Mostrar modal de confirmación para enviar
const confirmSubmit = () => {
  showSubmitModal.value = true
}

// Enviar a revisión
const handleSubmit = async () => {
  showSubmitModal.value = false
  isSubmitting.value = true
  try {
    const result = await submitPoa(poaId, {})
    if (result.success) {
      toast.success('POA enviado', 'Tu POA ha sido enviado a revisión')
      await loadPoa()
    } else {
      toast.error('Error', result.error || 'No se pudo enviar el POA')
    }
  } catch (error) {
    toast.error('Error', 'Ocurrió un error al enviar el POA')
  } finally {
    isSubmitting.value = false
  }
}

// Cancelar POA
const handleCancel = async () => {
  showCancelModal.value = false
  isLoading.value = true
  try {
    const result = await cancelPoa(poaId)
    if (result.success) {
      toast.success('POA cancelado', 'El POA ha sido cancelado')
      await loadPoa()
    } else {
      toast.error('Error', result.error || 'No se pudo cancelar el POA')
    }
  } catch (error) {
    toast.error('Error', 'Ocurrió un error al cancelar el POA')
  } finally {
    isLoading.value = false
  }
}

// Ver historial
const viewHistory = async () => {
  await loadHistory()
  showHistoryModal.value = true
}

// Cargar mensajes
const loadMessages = async () => {
  try {
    await fetchMessages(poaId)
  } catch (error) {
    console.error('Error loading messages:', error)
  }
}

// Manejar envío de mensaje
const handleSendMessage = async () => {
  if (!messageForm.value.subject.trim() || !messageForm.value.message.trim()) {
    toast.error('Error', 'El asunto y el mensaje son obligatorios')
    return
  }

  try {
    await sendMessage(poaId, messageForm.value)
    toast.success('Mensaje enviado', 'Tu mensaje ha sido enviado al administrador')
    showMessageModal.value = false
    messageForm.value = {
      type: MessageType.GENERAL,
      subject: '',
      message: '',
    }
  } catch (error: any) {
    toast.error('Error', error.message || 'No se pudo enviar el mensaje')
  }
}

// Marcar mensaje como leído
const handleMarkAsRead = async (messageId: string) => {
  try {
    await markAsRead(messageId)
  } catch (error) {
    console.error('Error marking message as read:', error)
  }
}

// Eliminar mensaje
const handleDeleteMessage = async (messageId: string) => {
  if (confirm('¿Estás seguro de eliminar este mensaje? Esta acción no se puede deshacer.')) {
    try {
      await deleteMessage(messageId)
      toast.success('Mensaje eliminado correctamente')
    } catch (error: any) {
      console.error('Error deleting message:', error)
      toast.error(error.message || 'Error al eliminar el mensaje')
    }
  }
}

// Puede editar
const canEdit = computed(() => poa.value?.status === 'draft')

// Puede enviar
const canSubmit = computed(() => poa.value?.status === 'draft')

// Puede cancelar
const canCancel = computed(() => {
  const status = poa.value?.status
  return status && !['completed', 'executed', 'cancelled'].includes(status)
})

// Función para obtener las clases de badge según el estado
const getStatusBadgeClasses = (status: string) => {
  const classes: Record<string, string> = {
    draft: 'bg-gray-100 text-gray-800',
    pending: 'bg-yellow-100 text-yellow-800',
    in_review: 'bg-blue-100 text-blue-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
    notarized: 'bg-purple-100 text-purple-800',
    activated: 'bg-indigo-100 text-indigo-800',
    executed: 'bg-cyan-100 text-cyan-800',
    completed: 'bg-emerald-100 text-emerald-800',
    cancelled: 'bg-slate-100 text-slate-800',
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

onMounted(() => {
  loadPoa()
  loadDocuments()
  loadMessages()
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
      <!-- Loading -->
      <div v-if="isLoading" class="flex justify-center py-16">
        <div class="flex flex-col items-center gap-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 text-[#D4AF37] animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
          </svg>
          <p class="text-gray-600 font-medium">Cargando detalles del POA...</p>
        </div>
      </div>

      <!-- Content -->
      <div v-else-if="poa">
        <!-- Header -->
        <div class="mb-8">
          <div class="flex items-center gap-4 mb-6">
            <button @click="router.push('/poa')" class="text-gray-600 hover:text-[#0A1F44] transition-colors p-2 hover:bg-gray-100 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m12 19-7-7 7-7"/>
                <path d="M19 12H5"/>
              </svg>
            </button>
            <div class="w-14 h-14 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
                <path d="m9 12 2 2 4-4"/>
              </svg>
            </div>
            <div class="flex-1">
              <h1 class="text-3xl font-bold bg-gradient-to-r from-[#0A1F44] to-[#1e3a6b] bg-clip-text text-transparent">
                {{ poa.clientFullName }}
              </h1>
              <p class="text-gray-600 mt-1 font-medium">{{ getTypeLabel(poa.type) }} POA</p>
            </div>
            <span
              :class="['px-4 py-2 rounded-xl text-sm font-bold shadow-sm', getStatusBadgeClasses(poa.status)]"
            >
              {{ getStatusLabel(poa.status) }}
            </span>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-wrap gap-3 mb-6">
          <NuxtLink v-if="canEdit" :to="`/poa/${poaId}/edit`" class="flex items-center gap-2 px-6 py-3 bg-white text-[#0A1F44] font-semibold rounded-xl shadow-md hover:shadow-lg border-2 border-[#D4AF37] hover:bg-[#D4AF37] transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/>
              <path d="m15 5 4 4"/>
            </svg>
            Editar
          </NuxtLink>
          <button
            v-if="canSubmit"
            @click="confirmSubmit"
            :disabled="isSubmitting"
            class="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white font-semibold rounded-xl shadow-md hover:shadow-lg hover:from-[#0A1F44] hover:to-[#1e3a6b] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
          >
            <svg v-if="isSubmitting" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="m22 2-7 20-4-9-9-4Z"/>
              <path d="M22 2 11 13"/>
            </svg>
            {{ isSubmitting ? 'Enviando...' : 'Enviar a Revisión' }}
          </button>
          <button
            @click="viewHistory"
            class="flex items-center gap-2 px-6 py-3 bg-white text-gray-700 font-semibold rounded-xl shadow-md hover:shadow-lg border-2 border-gray-200 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-300 transform hover:scale-105"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
              <path d="M3 3v5h5"/>
              <path d="M12 7v5l4 2"/>
            </svg>
            Ver Historial
          </button>
          <button
            v-if="canCancel"
            @click="showCancelModal = true"
            class="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-xl shadow-md hover:shadow-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <path d="m15 9-6 6"/>
              <path d="m9 9 6 6"/>
            </svg>
            Cancelar POA
          </button>
        </div>

        <!-- Main Card -->
        <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
          <!-- Tabs -->
          <div class="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
            <nav class="flex -mb-px">
              <button
                @click="activeTab = 'info'"
                :class="[
                  'group flex-1 py-4 px-6 text-center border-b-3 font-semibold transition-all duration-300 relative',
                  activeTab === 'info'
                    ? 'border-[#D4AF37] text-[#D4AF37] bg-white shadow-sm'
                    : 'border-transparent text-gray-500 hover:text-[#0A1F44] hover:bg-white/50'
                ]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" :class="['w-5 h-5 inline-block mr-2', activeTab === 'info' ? '' : 'group-hover:scale-110 transition-transform']" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/>
                  <path d="M14 2v4a2 2 0 0 0 2 2h4"/>
                  <path d="M10 9H8"/>
                  <path d="M16 13H8"/>
                  <path d="M16 17H8"/>
                </svg>
                Información
              </button>
              <button
                @click="activeTab = 'instructions'"
                :class="[
                  'group flex-1 py-4 px-6 text-center border-b-3 font-semibold transition-all duration-300',
                  activeTab === 'instructions'
                    ? 'border-[#D4AF37] text-[#D4AF37] bg-white shadow-sm'
                    : 'border-transparent text-gray-500 hover:text-[#0A1F44] hover:bg-white/50'
                ]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" :class="['w-5 h-5 inline-block mr-2', activeTab === 'instructions' ? '' : 'group-hover:scale-110 transition-transform']" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
                  <path d="m9 12 2 2 4-4"/>
                </svg>
                Instrucciones
              </button>
              <button
                @click="activeTab = 'timeline'"
                :class="[
                  'group flex-1 py-4 px-6 text-center border-b-3 font-semibold transition-all duration-300',
                  activeTab === 'timeline'
                    ? 'border-[#D4AF37] text-[#D4AF37] bg-white shadow-sm'
                    : 'border-transparent text-gray-500 hover:text-[#0A1F44] hover:bg-white/50'
                ]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" :class="['w-5 h-5 inline-block mr-2', activeTab === 'timeline' ? '' : 'group-hover:scale-110 transition-transform']" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M8 2v4"/>
                  <path d="M16 2v4"/>
                  <rect width="18" height="18" x="3" y="4" rx="2"/>
                  <path d="M3 10h18"/>
                </svg>
                Timeline
              </button>
              <button
                @click="activeTab = 'documents'"
                :class="[
                  'group flex-1 py-4 px-6 text-center border-b-3 font-semibold transition-all duration-300',
                  activeTab === 'documents'
                    ? 'border-[#D4AF37] text-[#D4AF37] bg-white shadow-sm'
                    : 'border-transparent text-gray-500 hover:text-[#0A1F44] hover:bg-white/50'
                ]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" :class="['w-5 h-5 inline-block mr-2', activeTab === 'documents' ? '' : 'group-hover:scale-110 transition-transform']" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
                </svg>
                Documentos
                <span v-if="documents.length > 0" class="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-gradient-to-r from-[#D4AF37] to-[#B8941F] rounded-full shadow-sm">
                  {{ documents.length }}
                </span>
              </button>
              <button
                @click="activeTab = 'messages'"
                :class="[
                  'group flex-1 py-4 px-6 text-center border-b-3 font-semibold transition-all duration-300',
                  activeTab === 'messages'
                    ? 'border-[#D4AF37] text-[#D4AF37] bg-white shadow-sm'
                    : 'border-transparent text-gray-500 hover:text-[#0A1F44] hover:bg-white/50'
                ]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" :class="['w-5 h-5 inline-block mr-2', activeTab === 'messages' ? '' : 'group-hover:scale-110 transition-transform']" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
                Mensajes
                <span v-if="messages.filter(m => !m.isRead && m.senderType === 'admin').length > 0" class="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-gradient-to-r from-red-500 to-red-600 rounded-full shadow-sm animate-pulse">
                  {{ messages.filter(m => !m.isRead && m.senderType === 'admin').length }}
                </span>
              </button>
            </nav>
          </div>

          <!-- Tab Content -->
          <div class="p-6">
            <!-- Info Tab -->
            <div v-if="activeTab === 'info'" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="bg-white p-5 rounded-xl border border-gray-200 border-l-4 border-l-blue-500 hover:shadow-md transition-all duration-300">
                  <h3 class="text-xs font-bold text-blue-600 uppercase tracking-wide mb-2">Tipo de POA</h3>
                  <p class="text-lg font-bold text-gray-900">{{ getTypeLabel(poa.type) }}</p>
                </div>
                <div class="bg-white p-5 rounded-xl border border-gray-200 border-l-4 border-l-green-500 hover:shadow-md transition-all duration-300">
                  <h3 class="text-xs font-bold text-green-600 uppercase tracking-wide mb-2">Estado</h3>
                  <p class="text-lg font-bold text-gray-900">{{ getStatusLabel(poa.status) }}</p>
                </div>
                <div class="bg-white p-5 rounded-xl border border-gray-200 border-l-4 border-l-purple-500 hover:shadow-md transition-all duration-300">
                  <h3 class="text-xs font-bold text-purple-600 uppercase tracking-wide mb-2">Dirección</h3>
                  <p class="text-gray-900 font-medium">{{ poa.clientAddress }}</p>
                </div>
                <div class="bg-white p-5 rounded-xl border border-gray-200 border-l-4 border-l-amber-500 hover:shadow-md transition-all duration-300">
                  <h3 class="text-xs font-bold text-amber-600 uppercase tracking-wide mb-2">Identificación</h3>
                  <p class="text-gray-900 font-medium">{{ poa.clientIdentification }}</p>
                </div>
              </div>

              <div v-if="poa.activationTriggers && poa.activationTriggers.length > 0" class="bg-white p-5 rounded-xl border border-gray-200 border-l-4 border-l-indigo-500 shadow-sm">
                <h3 class="text-sm font-bold text-indigo-600 mb-3 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>
                  </svg>
                  Eventos de Activación
                </h3>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="trigger in poa.activationTriggers"
                    :key="trigger"
                    class="px-4 py-2 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-xl text-sm font-bold shadow-md hover:shadow-lg hover:from-indigo-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105"
                  >
                    {{ trigger }}
                  </span>
                </div>
              </div>

              <div v-if="poa.clientNotes" class="bg-white p-5 rounded-xl border border-gray-200 border-l-4 border-l-gray-500 shadow-sm">
                <h3 class="text-sm font-bold text-gray-600 mb-3 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 20h9"/>
                    <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>
                  </svg>
                  Notas del Cliente
                </h3>
                <p class="text-gray-900 font-medium leading-relaxed">{{ poa.clientNotes }}</p>
              </div>

              <div v-if="poa.adminNotes" class="bg-white p-5 rounded-xl border border-gray-200 border-l-4 border-l-yellow-500 shadow-sm">
                <h3 class="text-sm font-bold text-yellow-600 mb-3 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-yellow-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
                    <path d="M12 9v4"/>
                    <path d="M12 17h.01"/>
                  </svg>
                  Notas del Administrador
                </h3>
                <p class="text-gray-900 font-medium leading-relaxed">{{ poa.adminNotes }}</p>
              </div>

              <div v-if="poa.rejectionReason" class="bg-white p-5 rounded-xl border border-gray-200 border-l-4 border-l-red-500 shadow-sm">
                <h3 class="text-sm font-bold text-red-600 mb-3 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-red-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="m15 9-6 6"/>
                    <path d="m9 9 6 6"/>
                  </svg>
                  Razón de Rechazo
                </h3>
                <p class="text-gray-900 font-medium leading-relaxed">{{ poa.rejectionReason }}</p>
              </div>
            </div>

            <!-- Instructions Tab -->
            <div v-if="activeTab === 'instructions'" class="space-y-6">
              <div class="bg-gradient-to-r from-yellow-50 to-amber-50 border-l-4 border-yellow-500 p-4 rounded-lg mb-6 shadow-sm">
                <div class="flex">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                  <div class="ml-3 text-sm text-yellow-700">
                    <p class="font-semibold">Información Encriptada</p>
                    <p class="mt-1">Esta información está encriptada y solo será accesible cuando el POA sea activado.</p>
                  </div>
                </div>
              </div>

              <!-- Cuentas -->
              <div v-if="poa.instructions?.accounts && poa.instructions.accounts.length > 0">
                <h3 class="text-lg font-bold bg-gradient-to-r from-[#0A1F44] to-[#1e3a6b] bg-clip-text text-transparent mb-3">Cuentas Bancarias</h3>
                <div class="space-y-2">
                  <div
                    v-for="(account, index) in poa.instructions.accounts"
                    :key="index"
                    class="flex items-center gap-3 bg-gradient-to-r from-gray-50 to-blue-50 p-4 rounded-xl border border-gray-200 hover:border-[#D4AF37] hover:shadow-md transition-all duration-300"
                  >
                    <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-sm flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M3 21h18"/>
                        <path d="m5 21 .14-5.27A2 2 0 0 1 7.12 14h9.76a2 2 0 0 1 1.98 1.73L19 21"/>
                        <path d="M9 21v-9"/>
                        <path d="M12 21v-9"/>
                        <path d="M15 21v-9"/>
                        <path d="M3 10h18"/>
                        <path d="M3 6 12 2l9 4"/>
                      </svg>
                    </div>
                    <span class="text-gray-900 font-medium">{{ account }}</span>
                  </div>
                </div>
              </div>

              <!-- Acciones -->
              <div v-if="poa.instructions?.actions && poa.instructions.actions.length > 0">
                <h3 class="text-lg font-bold bg-gradient-to-r from-[#0A1F44] to-[#1e3a6b] bg-clip-text text-transparent mb-3">Acciones a Ejecutar</h3>
                <div class="space-y-2">
                  <div
                    v-for="(action, index) in poa.instructions.actions"
                    :key="index"
                    class="flex items-center gap-3 bg-gradient-to-r from-gray-50 to-green-50 p-4 rounded-xl border border-gray-200 hover:border-[#D4AF37] hover:shadow-md transition-all duration-300"
                  >
                    <div class="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center shadow-sm flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
                        <path d="m9 12 2 2 4-4"/>
                      </svg>
                    </div>
                    <span class="text-gray-900 font-medium">{{ action }}</span>
                  </div>
                </div>
              </div>

              <!-- Beneficiarios -->
              <div v-if="poa.beneficiaries && poa.beneficiaries.length > 0">
                <h3 class="text-lg font-bold text-gray-900 mb-3">Beneficiarios</h3>
                <div class="space-y-3">
                  <div
                    v-for="(ben, index) in poa.beneficiaries"
                    :key="index"
                    class="bg-gray-50 p-4 rounded-lg"
                  >
                    <div class="flex items-start justify-between">
                      <div>
                        <p class="font-semibold text-gray-900">{{ ben.name }}</p>
                        <p class="text-sm text-gray-600">{{ ben.relationship }}</p>
                      </div>
                      <span class="px-3 py-1 bg-[#D4AF37] text-[#0A1F44] rounded-full text-sm font-bold">
                        {{ ben.percentage }}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Timeline Tab -->
            <div v-if="activeTab === 'timeline'" class="space-y-6">
              <div class="space-y-3">
                <div v-if="poa.createdAt" class="flex gap-4">
                  <div class="flex flex-col items-center">
                    <div class="w-4 h-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full shadow-md border-2 border-white ring-2 ring-blue-200"></div>
                    <div class="w-0.5 h-full bg-gradient-to-b from-blue-300 to-gray-200"></div>
                  </div>
                  <div class="pb-6 flex-1 bg-white border border-gray-200 p-4 rounded-xl hover:shadow-md transition-all duration-300">
                    <div class="flex items-center gap-2 mb-1">
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M12 5v14"/>
                        <path d="M5 12h14"/>
                      </svg>
                      <p class="font-bold text-gray-900">POA Creado</p>
                    </div>
                    <p class="text-sm text-gray-600 font-medium ml-7">{{ new Date(poa.createdAt).toLocaleString('es-ES', { dateStyle: 'long', timeStyle: 'short' }) }}</p>
                  </div>
                </div>

                <div v-if="poa.submittedAt" class="flex gap-4">
                  <div class="flex flex-col items-center">
                    <div class="w-4 h-4 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full shadow-md border-2 border-white ring-2 ring-yellow-200"></div>
                    <div class="w-0.5 h-full bg-gradient-to-b from-yellow-300 to-gray-200"></div>
                  </div>
                  <div class="pb-6 flex-1 bg-white border border-gray-200 p-4 rounded-xl hover:shadow-md transition-all duration-300">
                    <div class="flex items-center gap-2 mb-1">
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-yellow-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="m22 2-7 20-4-9-9-4Z"/>
                        <path d="M22 2 11 13"/>
                      </svg>
                      <p class="font-bold text-gray-900">Enviado a Revisión</p>
                    </div>
                    <p class="text-sm text-gray-600 font-medium ml-7">{{ new Date(poa.submittedAt).toLocaleString('es-ES', { dateStyle: 'long', timeStyle: 'short' }) }}</p>
                  </div>
                </div>

                <div v-if="poa.approvedAt" class="flex gap-4">
                  <div class="flex flex-col items-center">
                    <div class="w-4 h-4 bg-gradient-to-br from-green-500 to-green-600 rounded-full shadow-md border-2 border-white ring-2 ring-green-200"></div>
                    <div class="w-0.5 h-full bg-gradient-to-b from-green-300 to-gray-200"></div>
                  </div>
                  <div class="pb-6 flex-1 bg-white border border-gray-200 p-4 rounded-xl hover:shadow-md transition-all duration-300">
                    <div class="flex items-center gap-2 mb-1">
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
                        <path d="m9 12 2 2 4-4"/>
                      </svg>
                      <p class="font-bold text-gray-900">Aprobado</p>
                    </div>
                    <p class="text-sm text-gray-600 font-medium ml-7">{{ new Date(poa.approvedAt).toLocaleString('es-ES', { dateStyle: 'long', timeStyle: 'short' }) }}</p>
                  </div>
                </div>

                <div v-if="poa.notarizedAt" class="flex gap-4">
                  <div class="flex flex-col items-center">
                    <div class="w-4 h-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full shadow-md border-2 border-white ring-2 ring-purple-200"></div>
                    <div class="w-0.5 h-full bg-gradient-to-b from-purple-300 to-gray-200"></div>
                  </div>
                  <div class="pb-6 flex-1 bg-white border border-gray-200 p-4 rounded-xl hover:shadow-md transition-all duration-300">
                    <div class="flex items-center gap-2 mb-1">
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
                        <path d="m9 12 2 2 4-4"/>
                      </svg>
                      <p class="font-bold text-gray-900">Notariado</p>
                    </div>
                    <p class="text-sm text-gray-600 font-medium ml-7">{{ new Date(poa.notarizedAt).toLocaleString('es-ES', { dateStyle: 'long', timeStyle: 'short' }) }}</p>
                  </div>
                </div>

                <div v-if="poa.activatedAt" class="flex gap-4">
                  <div class="flex flex-col items-center">
                    <div class="w-4 h-4 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full shadow-md border-2 border-white ring-2 ring-indigo-200"></div>
                    <div class="w-0.5 h-full bg-gradient-to-b from-indigo-300 to-gray-200"></div>
                  </div>
                  <div class="pb-6 flex-1 bg-white border border-gray-200 p-4 rounded-xl hover:shadow-md transition-all duration-300">
                    <div class="flex items-center gap-2 mb-1">
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>
                      </svg>
                      <p class="font-bold text-gray-900">Activado</p>
                    </div>
                    <p class="text-sm text-gray-600 font-medium ml-7">{{ new Date(poa.activatedAt).toLocaleString('es-ES', { dateStyle: 'long', timeStyle: 'short' }) }}</p>
                  </div>
                </div>

                <div v-if="poa.executedAt" class="flex gap-4">
                  <div class="flex flex-col items-center">
                    <div class="w-4 h-4 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-full shadow-md border-2 border-white ring-2 ring-cyan-200"></div>
                  </div>
                  <div class="flex-1 bg-white border border-gray-200 p-4 rounded-xl hover:shadow-md transition-all duration-300">
                    <div class="flex items-center gap-2 mb-1">
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-cyan-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                        <polyline points="22 4 12 14.01 9 11.01"/>
                      </svg>
                      <p class="font-bold text-gray-900">Ejecutado</p>
                    </div>
                    <p class="text-sm text-gray-600 font-medium ml-7">{{ new Date(poa.executedAt).toLocaleString('es-ES', { dateStyle: 'long', timeStyle: 'short' }) }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Documents Tab -->
            <div v-if="activeTab === 'documents'" class="space-y-6">
              <!-- Header con botón para subir -->
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-bold bg-gradient-to-r from-[#0A1F44] to-[#1e3a6b] bg-clip-text text-transparent">Documentos del POA</h3>
                <button
                  v-if="canEdit"
                  @click="showUploadModal = true"
                  class="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white font-semibold rounded-xl shadow-md hover:shadow-lg hover:from-[#0A1F44] hover:to-[#1e3a6b] transition-all duration-300 transform hover:scale-105"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="17 8 12 3 7 8"/>
                    <line x1="12" x2="12" y1="3" y2="15"/>
                  </svg>
                  Subir Documento
                </button>
              </div>

              <!-- Lista de documentos -->
              <div v-if="documents.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-4" style="overflow: visible;">
                <div
                  v-for="doc in documents"
                  :key="doc.id"
                  class="group border-2 border-gray-200 rounded-xl p-4 hover:border-[#D4AF37] hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-gray-50"
                  style="overflow: visible;"
                >
                  <div class="flex items-center gap-3">
                    <!-- Icono del archivo -->
                    <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/>
                        <path d="M14 2v4a2 2 0 0 0 2 2h4"/>
                        <path d="M10 9H8"/>
                        <path d="M16 13H8"/>
                        <path d="M16 17H8"/>
                      </svg>
                    </div>

                    <!-- Información del archivo - con ancho fijo y truncate -->
                    <div class="flex-1 min-w-0">
                      <p class="font-bold text-gray-900 truncate group-hover:text-[#D4AF37] transition-colors" :title="doc.fileName || doc.name">
                        {{ doc.fileName || doc.name }}
                      </p>
                      <div class="flex items-center gap-3 mt-1">
                        <p class="text-sm text-gray-600 capitalize font-medium">{{ doc.type }}</p>
                        <p class="text-xs text-gray-500 flex items-center gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                            <path d="M3 3v5h5"/>
                            <path d="M12 7v5l4 2"/>
                          </svg>
                          {{ new Date(doc.uploadedAt || doc.createdAt).toLocaleDateString() }}
                        </p>
                      </div>
                    </div>

                    <!-- Menu dropdown -->
                    <button
                      @click="toggleMenu(doc.id, $event)"
                      class="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Opciones"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="1"/>
                        <circle cx="12" cy="5" r="1"/>
                        <circle cx="12" cy="19" r="1"/>
                      </svg>
                    </button>

                    <!-- Dropdown menu usando Teleport -->
                    <Teleport to="body">
                      <Transition
                        enter-active-class="transition ease-out duration-100"
                        enter-from-class="transform opacity-0 scale-95"
                        enter-to-class="transform opacity-100 scale-100"
                        leave-active-class="transition ease-in duration-75"
                        leave-from-class="transform opacity-100 scale-100"
                        leave-to-class="transform opacity-0 scale-95"
                      >
                        <div
                          v-if="openMenuId === doc.id"
                          class="fixed w-48 bg-white rounded-xl shadow-xl border border-gray-200 py-1"
                          :style="{ top: menuPosition.top + 'px', left: menuPosition.left + 'px', zIndex: 9999 }"
                          @click="closeMenu"
                        >
                          <button
                            @click="handleOpenDocument(doc.id)"
                            class="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
                              <circle cx="12" cy="12" r="3"/>
                            </svg>
                            Ver documento
                          </button>
                          <button
                            @click="handleDownloadDocument(doc.id)"
                            class="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                              <polyline points="7 10 12 15 17 10"/>
                              <line x1="12" x2="12" y1="15" y2="3"/>
                            </svg>
                            Descargar
                          </button>
                          <button
                            v-if="canEdit"
                            @click="confirmDeleteDocument(doc.id)"
                            class="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors border-t border-gray-100"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                              <path d="M3 6h18"/>
                              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
                              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                              <line x1="10" x2="10" y1="11" y2="17"/>
                              <line x1="14" x2="14" y1="11" y2="17"/>
                            </svg>
                            Eliminar
                          </button>
                        </div>
                      </Transition>
                    </Teleport>
                  </div>
                </div>
              </div>

              <!-- Estado vacío -->
              <div v-else class="text-center py-16 bg-gradient-to-br from-gray-50 to-white rounded-xl border-2 border-dashed border-gray-300">
                <div class="w-20 h-20 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/>
                    <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>
                  </svg>
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-2">No hay documentos</h3>
                <p class="text-gray-600 mb-6 font-medium">Aún no has subido ningún documento para este POA.</p>
                <button
                  v-if="canEdit"
                  @click="showUploadModal = true"
                  class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white font-semibold rounded-xl shadow-md hover:shadow-lg hover:from-[#0A1F44] hover:to-[#1e3a6b] transition-all duration-300 transform hover:scale-105"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="17 8 12 3 7 8"/>
                    <line x1="12" x2="12" y1="3" y2="15"/>
                  </svg>
                  Subir Primer Documento
                </button>
              </div>
            </div>

            <!-- Messages Tab -->
            <div v-if="activeTab === 'messages'" class="space-y-6">
              <!-- Header con botón para enviar mensaje -->
              <div class="flex items-center justify-between">
                <h2 class="text-2xl font-bold text-[#0A1F44]">Mensajes</h2>
                <button
                  @click="showMessageModal = true"
                  class="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white rounded-xl font-semibold shadow-md hover:shadow-lg hover:from-[#B8941F] hover:to-[#D4AF37] transition-all duration-300 transform hover:scale-105"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                  Nuevo Mensaje
                </button>
              </div>

              <!-- Loading state -->
              <div v-if="loadingMessages" class="text-center py-12">
                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D4AF37] mx-auto mb-4"></div>
                <p class="text-gray-600">Cargando mensajes...</p>
              </div>

              <!-- Empty state -->
              <div v-else-if="messages.length === 0" class="text-center py-16">
                <div class="mx-auto w-24 h-24 mb-6 rounded-full bg-gray-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-2">No hay mensajes</h3>
                <p class="text-gray-600 max-w-md mx-auto">
                  Aún no tienes mensajes. Puedes enviar una consulta o pregunta al administrador haciendo clic en "Nuevo Mensaje".
                </p>
              </div>

              <!-- Messages list -->
              <div v-else class="space-y-2 max-h-[600px] overflow-y-auto">
                <div
                  v-for="msg in messages"
                  :key="msg.id"
                  class="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
                  :class="{
                    'border-l-4 border-l-blue-500': msg.senderType === 'admin',
                    'border-l-4 border-l-gray-300': msg.senderType === 'client',
                    'ring-2 ring-blue-200': !msg.isRead && msg.senderType === 'admin'
                  }"
                >
                  <div class="p-3">
                    <!-- Header compacto en una línea -->
                    <div class="flex items-center justify-between mb-2">
                      <!-- Lado izquierdo: Emisor, estado y asunto -->
                      <div class="flex items-center gap-2 flex-1 min-w-0">
                        <span
                          class="px-2 py-0.5 rounded-full text-[10px] font-bold flex-shrink-0"
                          :class="{
                            'bg-blue-100 text-blue-800': msg.senderType === 'admin',
                            'bg-gray-100 text-gray-800': msg.senderType === 'client'
                          }"
                        >
                          {{ msg.senderType === 'admin' ? 'Admin' : 'Yo' }}
                        </span>
                        <span v-if="!msg.isRead && msg.senderType === 'admin'" class="px-2 py-0.5 bg-red-100 text-red-800 rounded-full text-[10px] font-bold animate-pulse flex-shrink-0">
                          Nuevo
                        </span>
                        <span
                          class="font-bold text-sm truncate"
                          :class="{ 'text-blue-700': !msg.isRead && msg.senderType === 'admin' }"
                          :title="msg.subject"
                        >
                          {{ msg.subject }}
                        </span>
                      </div>

                      <!-- Lado derecho: Tipo y fecha -->
                      <div class="flex items-center gap-1.5 flex-shrink-0 ml-2">
                        <span class="px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full text-[10px] font-medium hidden sm:inline-flex">
                          {{
                            msg.type === 'request_document' ? 'Doc' :
                            msg.type === 'status_update' ? 'Estado' :
                            msg.type === 'question' ? 'Pregunta' : 'General'
                          }}
                        </span>
                        <span class="text-[11px] text-gray-500 whitespace-nowrap">
                          {{ new Date(msg.createdAt).toLocaleDateString('es-ES', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) }}
                        </span>
                      </div>
                    </div>

                    <!-- Mensaje con límite de líneas -->
                    <p class="text-xs text-gray-700 whitespace-pre-wrap leading-relaxed mb-2 line-clamp-3">{{ msg.message }}</p>

                    <!-- Footer compacto -->
                    <div class="flex items-center justify-between pt-2 border-t border-gray-100">
                      <div v-if="msg.sender" class="text-[10px] text-gray-600 truncate flex-1 min-w-0">
                        <span class="font-medium">De:</span>
                        {{ msg.sender.firstName }} {{ msg.sender.lastName }}
                      </div>

                      <div class="flex items-center gap-1 flex-shrink-0 ml-2">
                        <!-- Botón marcar como leído (solo mensajes del admin) -->
                        <button
                          v-if="!msg.isRead && msg.senderType === 'admin'"
                          @click="handleMarkAsRead(msg.id)"
                          class="flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors font-medium text-[10px]"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="20 6 9 17 4 12"/>
                          </svg>
                          Leído
                        </button>
                        <!-- Botón eliminar (solo mensajes del cliente no leídos) -->
                        <button
                          v-if="!msg.isRead && msg.senderType === 'client'"
                          @click="handleDeleteMessage(msg.id)"
                          class="flex items-center gap-1 px-2 py-1 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors font-medium text-[10px]"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                          </svg>
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Submit Confirmation Modal -->
    <ConfirmModal
      :show="showSubmitModal"
      title="Enviar POA a Revisión"
      message="¿Estás seguro de enviar este POA a revisión? Una vez enviado, no podrás editarlo hasta que sea aprobado o rechazado."
      confirm-text="Sí, enviar"
      cancel-text="No, esperar"
      type="warning"
      :is-loading="isSubmitting"
      @confirm="handleSubmit"
      @cancel="showSubmitModal = false"
    />

    <!-- Cancel Confirmation Modal -->
    <ConfirmModal
      :show="showCancelModal"
      title="Cancelar POA"
      message="¿Estás seguro de que deseas cancelar este POA? Esta acción no se puede deshacer y perderás todo el progreso."
      confirm-text="Sí, cancelar POA"
      cancel-text="No, mantener"
      type="danger"
      :is-loading="isLoading"
      @confirm="handleCancel"
      @cancel="showCancelModal = false"
    />

    <!-- History Modal -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition ease-out duration-200"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition ease-in duration-150"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="showHistoryModal"
          class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          @click.self="showHistoryModal = false"
        >
          <Transition
            enter-active-class="transition ease-out duration-200"
            enter-from-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100"
            leave-active-class="transition ease-in duration-150"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-95"
          >
            <div
              v-if="showHistoryModal"
              class="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col"
              @click.stop
            >
              <!-- Header -->
              <div class="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-[#0A1F44] to-blue-900 shadow-lg">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <div class="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-full flex items-center justify-center shadow-md">
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                        <path d="M3 3v5h5"/>
                        <path d="M12 7v5l4 2"/>
                      </svg>
                    </div>
                    <h3 class="text-xl font-bold text-white">Historial del POA</h3>
                  </div>
                  <button
                    @click="showHistoryModal = false"
                    class="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M18 6 6 18"/>
                      <path d="m6 6 12 12"/>
                    </svg>
                  </button>
                </div>
              </div>

              <!-- Content -->
              <div class="p-6 overflow-y-auto flex-1">
                <!-- Empty state -->
                <div v-if="history.length === 0" class="flex flex-col items-center justify-center py-12">
                  <div class="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-4 shadow-md">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/>
                      <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>
                    </svg>
                  </div>
                  <p class="text-gray-500 font-bold text-lg">No hay historial disponible</p>
                  <p class="text-sm text-gray-400 mt-1">Las acciones realizadas aparecerán aquí</p>
                </div>

                <!-- History items -->
                <div v-else class="space-y-3">
                  <div
                    v-for="(item, index) in history"
                    :key="index"
                    class="relative pl-8 pb-6 last:pb-0"
                  >
                    <!-- Timeline line -->
                    <div
                      v-if="index < history.length - 1"
                      class="absolute left-2 top-2 bottom-0 w-0.5 bg-gradient-to-b from-[#D4AF37] to-gray-200"
                    ></div>

                    <!-- Timeline dot -->
                    <div class="absolute left-0 top-0 w-5 h-5 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-full border-2 border-white shadow-md"></div>

                    <!-- Content - Sin card, solo texto -->
                    <div>
                      <!-- Acción y fecha en la misma línea -->
                      <div class="flex items-center justify-between gap-4">
                        <p class="font-bold text-gray-900">{{ getActionLabel(item.action) }}</p>
                        <p class="text-sm text-gray-600 flex items-center gap-1.5 flex-shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="10"/>
                            <polyline points="12 6 12 12 16 14"/>
                          </svg>
                          {{ new Date(item.createdAt).toLocaleString('es-ES', {
                            dateStyle: 'medium',
                            timeStyle: 'short'
                          }) }}
                        </p>
                      </div>
                      <!-- Notas si existen -->
                      <p v-if="item.notes" class="text-sm text-gray-700 mt-2 italic">
                        {{ item.notes }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Footer -->
              <div class="px-6 py-4 border-t border-gray-200 bg-gray-50">
                <button
                  @click="showHistoryModal = false"
                  class="w-full py-2.5 px-4 bg-[#0A1F44] text-white font-semibold rounded-lg hover:bg-blue-900 transition-colors"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </Transition>
        </div>
      </Transition>
    </Teleport>

    <!-- Upload Document Modal -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition ease-out duration-200"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition ease-in duration-150"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="showUploadModal"
          class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          @click.self="showUploadModal = false"
        >
          <Transition
            enter-active-class="transition ease-out duration-200"
            enter-from-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100"
            leave-active-class="transition ease-in duration-150"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-95"
          >
            <div
              v-if="showUploadModal"
              class="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
              @click.stop
            >
              <!-- Header -->
              <div class="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-[#0A1F44] to-blue-900 shadow-lg">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <div class="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-full flex items-center justify-center shadow-md">
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                        <polyline points="17 8 12 3 7 8"/>
                        <line x1="12" x2="12" y1="3" y2="15"/>
                      </svg>
                    </div>
                    <h3 class="text-xl font-bold text-white">Subir Documento</h3>
                  </div>
                  <button
                    @click="showUploadModal = false"
                    class="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M18 6 6 18"/>
                      <path d="m6 6 12 12"/>
                    </svg>
                  </button>
                </div>
              </div>

              <!-- Content -->
              <div class="p-6 space-y-5">
                <!-- File Input -->
                <div>
                  <label class="block text-sm font-bold text-gray-700 mb-2">
                    Seleccionar Archivo
                  </label>
                  <div class="relative">
                    <input
                      type="file"
                      @change="handleFileSelect"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      class="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2.5 file:px-5
                        file:rounded-xl file:border-0
                        file:text-sm file:font-bold
                        file:bg-gradient-to-r file:from-[#D4AF37] file:to-[#B8941F] file:text-white
                        file:shadow-md
                        hover:file:from-[#0A1F44] hover:file:to-[#1e3a6b]
                        file:cursor-pointer file:transition-all file:duration-300
                        cursor-pointer"
                    />
                  </div>
                  <p v-if="selectedFile" class="mt-3 text-sm text-gray-700 bg-gradient-to-r from-blue-50 to-cyan-50 p-3 rounded-lg border-l-4 border-blue-500 font-medium flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-blue-600 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/>
                      <path d="M14 2v4a2 2 0 0 0 2 2h4"/>
                    </svg>
                    <span class="truncate">{{ selectedFile.name }}</span>
                  </p>
                </div>

                <!-- Document Type -->
                <div>
                  <label class="block text-sm font-bold text-gray-700 mb-2">
                    Tipo de Documento
                  </label>
                  <select
                    v-model="documentType"
                    class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] transition-all duration-300 font-medium text-gray-700 bg-white hover:border-[#D4AF37] cursor-pointer"
                  >
                    <option value="identification">Identificación</option>
                    <option value="proof_of_address">Comprobante de Domicilio</option>
                    <option value="bank_statement">Estado Bancario</option>
                    <option value="notarization">Documento Notariado</option>
                    <option value="activation_proof">Prueba de Activación</option>
                    <option value="other">Otro</option>
                  </select>
                </div>
              </div>

              <!-- Footer -->
              <div class="px-6 py-4 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-white flex gap-3">
                <button
                  @click="showUploadModal = false"
                  :disabled="isUploadingDocument"
                  class="flex-1 py-3 px-4 bg-white border-2 border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 disabled:opacity-50 shadow-sm"
                >
                  Cancelar
                </button>
                <button
                  @click="handleUploadDocument"
                  :disabled="!selectedFile || isUploadingDocument"
                  class="flex-1 py-3 px-4 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white font-bold rounded-xl hover:from-[#0A1F44] hover:to-[#1e3a6b] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  <svg v-if="isUploadingDocument" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                  </svg>
                  <span>{{ isUploadingDocument ? 'Subiendo...' : 'Subir' }}</span>
                </button>
              </div>
            </div>
          </Transition>
        </div>
      </Transition>
    </Teleport>

    <!-- Delete Document Confirmation Modal -->
    <ConfirmModal
      :show="showDeleteDocumentModal"
      title="Eliminar Documento"
      message="¿Estás seguro de que deseas eliminar este documento? Esta acción no se puede deshacer."
      confirm-text="Sí, eliminar"
      cancel-text="No, cancelar"
      type="danger"
      @confirm="handleDeleteDocument"
      @cancel="showDeleteDocumentModal = false"
    />

    <!-- Message Modal -->
    <div v-if="showMessageModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6 border-b border-gray-200">
          <h3 class="text-2xl font-bold text-[#0A1F44]">Enviar Mensaje al Administrador</h3>
          <p class="text-gray-600 mt-1">Envía una consulta o pregunta sobre tu POA</p>
        </div>

        <div class="p-6 space-y-4">
          <!-- Tipo de mensaje -->
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-2">Tipo de Mensaje *</label>
            <select
              v-model="messageForm.type"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] transition-all"
            >
              <option :value="MessageType.GENERAL">General</option>
              <option :value="MessageType.QUESTION">Pregunta</option>
              <option :value="MessageType.REQUEST_DOCUMENT">Solicitud de Documento</option>
              <option :value="MessageType.STATUS_UPDATE">Actualización de Estado</option>
            </select>
          </div>

          <!-- Asunto -->
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-2">Asunto *</label>
            <input
              v-model="messageForm.subject"
              type="text"
              placeholder="Ej: Consulta sobre documentos requeridos"
              maxlength="255"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] transition-all"
            />
          </div>

          <!-- Mensaje -->
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-2">Mensaje *</label>
            <textarea
              v-model="messageForm.message"
              rows="6"
              placeholder="Escribe tu mensaje aquí..."
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] transition-all resize-none"
            ></textarea>
          </div>
        </div>

        <div class="p-6 border-t border-gray-200 flex justify-end gap-3">
          <button
            @click="showMessageModal = false"
            class="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all"
          >
            Cancelar
          </button>
          <button
            @click="handleSendMessage"
            class="px-6 py-3 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white rounded-lg font-semibold shadow-md hover:shadow-lg hover:from-[#B8941F] hover:to-[#D4AF37] transition-all duration-300 transform hover:scale-105"
          >
            Enviar Mensaje
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
