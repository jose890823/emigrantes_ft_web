<script setup lang="ts">
import type { POA } from '~/types/api'

definePageMeta({
  middleware: 'auth'
})

const route = useRoute()
const router = useRouter()
const { getPoa, submitPoa, cancelPoa, getPoaHistory, uploadDocument, getPoaDocuments, deleteDocument, openDocument, downloadDocument, getStatusLabel, getStatusColor, getTypeLabel } = usePoa()
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
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
      <!-- Loading -->
      <div v-if="isLoading" class="flex justify-center py-12">
        <Icon name="lucide:loader-2" class="w-8 h-8 text-[#D4AF37] animate-spin" />
      </div>

      <!-- Content -->
      <div v-else-if="poa">
        <!-- Header -->
        <div class="mb-8">
          <div class="flex items-center gap-4 mb-4">
            <button @click="router.push('/poa')" class="text-gray-600 hover:text-[#0A1F44] transition-colors">
              <Icon name="lucide:arrow-left" class="w-6 h-6" />
            </button>
            <div class="flex-1">
              <h1 class="text-3xl font-bold text-[#0A1F44]">{{ poa.clientFullName }}</h1>
              <p class="text-gray-600 mt-1">{{ getTypeLabel(poa.type) }} POA</p>
            </div>
            <span
              :class="['px-4 py-2 rounded-full text-sm font-semibold', getStatusBadgeClasses(poa.status)]"
            >
              {{ getStatusLabel(poa.status) }}
            </span>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-wrap gap-3 mb-6">
          <NuxtLink v-if="canEdit" :to="`/poa/${poaId}/edit`" class="btn-secondary">
            <Icon name="lucide:edit" class="w-5 h-5" />
            Editar
          </NuxtLink>
          <button
            v-if="canSubmit"
            @click="confirmSubmit"
            :disabled="isSubmitting"
            class="flex items-center gap-2 px-6 py-3 bg-[#D4AF37] text-[#0A1F44] font-semibold rounded-lg hover:bg-[#0A1F44] hover:text-white transition-colors disabled:opacity-50"
          >
            <Icon v-if="isSubmitting" name="lucide:loader-2" class="w-5 h-5 animate-spin" />
            <Icon v-else name="lucide:send" class="w-5 h-5" />
            {{ isSubmitting ? 'Enviando...' : 'Enviar a Revisión' }}
          </button>
          <button
            @click="viewHistory"
            class="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
          >
            <Icon name="lucide:history" class="w-5 h-5" />
            Ver Historial
          </button>
          <button
            v-if="canCancel"
            @click="showCancelModal = true"
            class="flex items-center gap-2 px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors"
          >
            <Icon name="lucide:x-circle" class="w-5 h-5" />
            Cancelar POA
          </button>
        </div>

        <!-- Main Card -->
        <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
          <!-- Tabs -->
          <div class="border-b border-gray-200">
            <nav class="flex -mb-px">
              <button
                @click="activeTab = 'info'"
                :class="[
                  'flex-1 py-4 px-6 text-center border-b-2 font-semibold transition-colors',
                  activeTab === 'info'
                    ? 'border-[#D4AF37] text-[#D4AF37]'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                ]"
              >
                <Icon name="lucide:file-text" class="w-5 h-5 inline-block mr-2" />
                Información
              </button>
              <button
                @click="activeTab = 'instructions'"
                :class="[
                  'flex-1 py-4 px-6 text-center border-b-2 font-semibold transition-colors',
                  activeTab === 'instructions'
                    ? 'border-[#D4AF37] text-[#D4AF37]'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                ]"
              >
                <Icon name="lucide:shield" class="w-5 h-5 inline-block mr-2" />
                Instrucciones
              </button>
              <button
                @click="activeTab = 'timeline'"
                :class="[
                  'flex-1 py-4 px-6 text-center border-b-2 font-semibold transition-colors',
                  activeTab === 'timeline'
                    ? 'border-[#D4AF37] text-[#D4AF37]'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                ]"
              >
                <Icon name="lucide:calendar" class="w-5 h-5 inline-block mr-2" />
                Timeline
              </button>
              <button
                @click="activeTab = 'documents'"
                :class="[
                  'flex-1 py-4 px-6 text-center border-b-2 font-semibold transition-colors',
                  activeTab === 'documents'
                    ? 'border-[#D4AF37] text-[#D4AF37]'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                ]"
              >
                <Icon name="lucide:paperclip" class="w-5 h-5 inline-block mr-2" />
                Documentos
                <span v-if="documents.length > 0" class="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-[#D4AF37] rounded-full">
                  {{ documents.length }}
                </span>
              </button>
            </nav>
          </div>

          <!-- Tab Content -->
          <div class="p-6">
            <!-- Info Tab -->
            <div v-if="activeTab === 'info'" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 class="text-sm font-semibold text-gray-500 mb-1">Tipo de POA</h3>
                  <p class="text-lg text-gray-900">{{ getTypeLabel(poa.type) }}</p>
                </div>
                <div>
                  <h3 class="text-sm font-semibold text-gray-500 mb-1">Estado</h3>
                  <p class="text-lg text-gray-900">{{ getStatusLabel(poa.status) }}</p>
                </div>
                <div>
                  <h3 class="text-sm font-semibold text-gray-500 mb-1">Dirección</h3>
                  <p class="text-gray-900">{{ poa.clientAddress }}</p>
                </div>
                <div>
                  <h3 class="text-sm font-semibold text-gray-500 mb-1">Identificación</h3>
                  <p class="text-gray-900">{{ poa.clientIdentification }}</p>
                </div>
              </div>

              <div v-if="poa.activationTriggers && poa.activationTriggers.length > 0">
                <h3 class="text-sm font-semibold text-gray-500 mb-2">Eventos de Activación</h3>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="trigger in poa.activationTriggers"
                    :key="trigger"
                    class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold"
                  >
                    {{ trigger }}
                  </span>
                </div>
              </div>

              <div v-if="poa.clientNotes">
                <h3 class="text-sm font-semibold text-gray-500 mb-2">Notas del Cliente</h3>
                <p class="text-gray-900 bg-gray-50 p-4 rounded-lg">{{ poa.clientNotes }}</p>
              </div>

              <div v-if="poa.adminNotes">
                <h3 class="text-sm font-semibold text-gray-500 mb-2">Notas del Administrador</h3>
                <p class="text-gray-900 bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">{{ poa.adminNotes }}</p>
              </div>

              <div v-if="poa.rejectionReason">
                <h3 class="text-sm font-semibold text-gray-500 mb-2">Razón de Rechazo</h3>
                <p class="text-gray-900 bg-red-50 p-4 rounded-lg border-l-4 border-red-500">{{ poa.rejectionReason }}</p>
              </div>
            </div>

            <!-- Instructions Tab -->
            <div v-if="activeTab === 'instructions'" class="space-y-6">
              <div class="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-md mb-6">
                <div class="flex">
                  <Icon name="lucide:lock" class="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                  <div class="ml-3 text-sm text-yellow-700">
                    <p class="font-semibold">Información Encriptada</p>
                    <p class="mt-1">Esta información está encriptada y solo será accesible cuando el POA sea activado.</p>
                  </div>
                </div>
              </div>

              <!-- Cuentas -->
              <div v-if="poa.instructions?.accounts && poa.instructions.accounts.length > 0">
                <h3 class="text-lg font-bold text-gray-900 mb-3">Cuentas Bancarias</h3>
                <div class="space-y-2">
                  <div
                    v-for="(account, index) in poa.instructions.accounts"
                    :key="index"
                    class="flex items-center gap-3 bg-gray-50 p-3 rounded-lg"
                  >
                    <Icon name="lucide:building-2" class="w-5 h-5 text-gray-500" />
                    <span class="text-gray-900">{{ account }}</span>
                  </div>
                </div>
              </div>

              <!-- Acciones -->
              <div v-if="poa.instructions?.actions && poa.instructions.actions.length > 0">
                <h3 class="text-lg font-bold text-gray-900 mb-3">Acciones a Ejecutar</h3>
                <div class="space-y-2">
                  <div
                    v-for="(action, index) in poa.instructions.actions"
                    :key="index"
                    class="flex items-center gap-3 bg-gray-50 p-3 rounded-lg"
                  >
                    <Icon name="lucide:check-circle" class="w-5 h-5 text-green-500" />
                    <span class="text-gray-900">{{ action }}</span>
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
              <div class="space-y-4">
                <div v-if="poa.createdAt" class="flex gap-4">
                  <div class="flex flex-col items-center">
                    <div class="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <div class="w-0.5 h-full bg-gray-300"></div>
                  </div>
                  <div class="pb-8 flex-1">
                    <p class="font-semibold text-gray-900">POA Creado</p>
                    <p class="text-sm text-gray-600">{{ new Date(poa.createdAt).toLocaleString() }}</p>
                  </div>
                </div>

                <div v-if="poa.submittedAt" class="flex gap-4">
                  <div class="flex flex-col items-center">
                    <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div class="w-0.5 h-full bg-gray-300"></div>
                  </div>
                  <div class="pb-8 flex-1">
                    <p class="font-semibold text-gray-900">Enviado a Revisión</p>
                    <p class="text-sm text-gray-600">{{ new Date(poa.submittedAt).toLocaleString() }}</p>
                  </div>
                </div>

                <div v-if="poa.approvedAt" class="flex gap-4">
                  <div class="flex flex-col items-center">
                    <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div class="w-0.5 h-full bg-gray-300"></div>
                  </div>
                  <div class="pb-8 flex-1">
                    <p class="font-semibold text-gray-900">Aprobado</p>
                    <p class="text-sm text-gray-600">{{ new Date(poa.approvedAt).toLocaleString() }}</p>
                  </div>
                </div>

                <div v-if="poa.notarizedAt" class="flex gap-4">
                  <div class="flex flex-col items-center">
                    <div class="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <div class="w-0.5 h-full bg-gray-300"></div>
                  </div>
                  <div class="pb-8 flex-1">
                    <p class="font-semibold text-gray-900">Notariado</p>
                    <p class="text-sm text-gray-600">{{ new Date(poa.notarizedAt).toLocaleString() }}</p>
                  </div>
                </div>

                <div v-if="poa.activatedAt" class="flex gap-4">
                  <div class="flex flex-col items-center">
                    <div class="w-3 h-3 bg-indigo-500 rounded-full"></div>
                    <div class="w-0.5 h-full bg-gray-300"></div>
                  </div>
                  <div class="pb-8 flex-1">
                    <p class="font-semibold text-gray-900">Activado</p>
                    <p class="text-sm text-gray-600">{{ new Date(poa.activatedAt).toLocaleString() }}</p>
                  </div>
                </div>

                <div v-if="poa.executedAt" class="flex gap-4">
                  <div class="flex flex-col items-center">
                    <div class="w-3 h-3 bg-cyan-500 rounded-full"></div>
                  </div>
                  <div class="flex-1">
                    <p class="font-semibold text-gray-900">Ejecutado</p>
                    <p class="text-sm text-gray-600">{{ new Date(poa.executedAt).toLocaleString() }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Documents Tab -->
            <div v-if="activeTab === 'documents'" class="space-y-6">
              <!-- Header con botón para subir -->
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-semibold text-gray-900">Documentos del POA</h3>
                <button
                  v-if="canEdit"
                  @click="showUploadModal = true"
                  class="flex items-center gap-2 px-4 py-2 bg-[#D4AF37] text-[#0A1F44] font-semibold rounded-lg hover:bg-[#0A1F44] hover:text-white transition-colors"
                >
                  <Icon name="lucide:upload" class="w-5 h-5" />
                  Subir Documento
                </button>
              </div>

              <!-- Lista de documentos -->
              <div v-if="documents.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div
                  v-for="doc in documents"
                  :key="doc.id"
                  class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div class="flex items-start justify-between">
                    <div class="flex items-start gap-3 flex-1">
                      <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon name="lucide:file-text" class="w-6 h-6 text-blue-600" />
                      </div>
                      <div class="flex-1 min-w-0">
                        <p class="font-medium text-gray-900 truncate">{{ doc.fileName || doc.name }}</p>
                        <p class="text-sm text-gray-500 capitalize">{{ doc.type }}</p>
                        <p class="text-xs text-gray-400 mt-1">
                          Subido: {{ new Date(doc.uploadedAt || doc.createdAt).toLocaleDateString() }}
                        </p>
                      </div>
                    </div>
                    <div class="flex items-center gap-2 flex-shrink-0">
                      <button
                        @click="handleOpenDocument(doc.id)"
                        class="p-2 text-gray-600 hover:text-[#D4AF37] transition-colors"
                        title="Ver documento"
                      >
                        <Icon name="lucide:eye" class="w-5 h-5" />
                      </button>
                      <button
                        @click="handleDownloadDocument(doc.id)"
                        class="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                        title="Descargar documento"
                      >
                        <Icon name="lucide:download" class="w-5 h-5" />
                      </button>
                      <button
                        v-if="canEdit"
                        @click="confirmDeleteDocument(doc.id)"
                        class="p-2 text-gray-600 hover:text-red-600 transition-colors"
                        title="Eliminar documento"
                      >
                        <Icon name="lucide:trash-2" class="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Estado vacío -->
              <div v-else class="text-center py-12">
                <Icon name="lucide:inbox" class="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 class="text-lg font-medium text-gray-900 mb-2">No hay documentos</h3>
                <p class="text-gray-500 mb-6">Aún no has subido ningún documento para este POA.</p>
                <button
                  v-if="canEdit"
                  @click="showUploadModal = true"
                  class="inline-flex items-center gap-2 px-6 py-3 bg-[#D4AF37] text-[#0A1F44] font-semibold rounded-lg hover:bg-[#0A1F44] hover:text-white transition-colors"
                >
                  <Icon name="lucide:upload" class="w-5 h-5" />
                  Subir Primer Documento
                </button>
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
              <div class="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-[#0A1F44] to-blue-900">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-[#D4AF37] rounded-full flex items-center justify-center">
                      <Icon name="lucide:history" class="w-5 h-5 text-[#0A1F44]" />
                    </div>
                    <h3 class="text-xl font-bold text-white">Historial del POA</h3>
                  </div>
                  <button
                    @click="showHistoryModal = false"
                    class="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
                  >
                    <Icon name="lucide:x" class="w-6 h-6" />
                  </button>
                </div>
              </div>

              <!-- Content -->
              <div class="p-6 overflow-y-auto flex-1">
                <!-- Empty state -->
                <div v-if="history.length === 0" class="flex flex-col items-center justify-center py-12">
                  <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Icon name="lucide:inbox" class="w-8 h-8 text-gray-400" />
                  </div>
                  <p class="text-gray-500 font-medium">No hay historial disponible</p>
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
                      class="absolute left-2 top-8 bottom-0 w-0.5 bg-gradient-to-b from-[#D4AF37] to-gray-200"
                    ></div>

                    <!-- Timeline dot -->
                    <div class="absolute left-0 top-1 w-4 h-4 bg-[#D4AF37] rounded-full border-2 border-white shadow-md"></div>

                    <!-- Content -->
                    <div class="bg-gradient-to-br from-gray-50 to-white p-4 rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
                      <div class="flex items-start justify-between gap-4">
                        <div class="flex-1">
                          <p class="font-semibold text-gray-900">{{ item.action }}</p>
                          <p class="text-sm text-gray-600 mt-1 flex items-center gap-1">
                            <Icon name="lucide:clock" class="w-3 h-3" />
                            {{ new Date(item.createdAt).toLocaleString('es-ES', {
                              dateStyle: 'medium',
                              timeStyle: 'short'
                            }) }}
                          </p>
                          <p v-if="item.notes" class="text-sm text-gray-700 mt-2 bg-blue-50 p-3 rounded-md border-l-2 border-blue-500">
                            {{ item.notes }}
                          </p>
                        </div>
                      </div>
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
              <div class="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-[#0A1F44] to-blue-900">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-[#D4AF37] rounded-full flex items-center justify-center">
                      <Icon name="lucide:upload" class="w-5 h-5 text-[#0A1F44]" />
                    </div>
                    <h3 class="text-xl font-bold text-white">Subir Documento</h3>
                  </div>
                  <button
                    @click="showUploadModal = false"
                    class="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
                  >
                    <Icon name="lucide:x" class="w-6 h-6" />
                  </button>
                </div>
              </div>

              <!-- Content -->
              <div class="p-6 space-y-4">
                <!-- File Input -->
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">
                    Seleccionar Archivo
                  </label>
                  <div class="relative">
                    <input
                      type="file"
                      @change="handleFileSelect"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      class="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-[#D4AF37] file:text-[#0A1F44]
                        hover:file:bg-[#0A1F44] hover:file:text-white
                        file:cursor-pointer file:transition-colors"
                    />
                  </div>
                  <p v-if="selectedFile" class="mt-2 text-sm text-gray-600">
                    <Icon name="lucide:file" class="w-4 h-4 inline-block mr-1" />
                    {{ selectedFile.name }}
                  </p>
                </div>

                <!-- Document Type -->
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-2">
                    Tipo de Documento
                  </label>
                  <select
                    v-model="documentType"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
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
              <div class="px-6 py-4 border-t border-gray-200 bg-gray-50 flex gap-3">
                <button
                  @click="showUploadModal = false"
                  :disabled="isUploadingDocument"
                  class="flex-1 py-2.5 px-4 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50"
                >
                  Cancelar
                </button>
                <button
                  @click="handleUploadDocument"
                  :disabled="!selectedFile || isUploadingDocument"
                  class="flex-1 py-2.5 px-4 bg-[#D4AF37] text-[#0A1F44] font-semibold rounded-lg hover:bg-[#0A1F44] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Icon v-if="isUploadingDocument" name="lucide:loader-2" class="w-5 h-5 animate-spin" />
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
  </div>
</template>
