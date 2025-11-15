<script setup lang="ts">
import type { POA } from '~/types/api'

definePageMeta({
  middleware: 'auth'
})

const route = useRoute()
const router = useRouter()
const { getPoa, submitPoa, cancelPoa, getPoaHistory, getStatusLabel, getStatusColor, getTypeLabel } = usePoa()
const toast = useToast()

const poaId = route.params.id as string
const poa = ref<POA | null>(null)
const history = ref<any[]>([])
const isLoading = ref(false)
const isSubmitting = ref(false)
const showCancelModal = ref(false)
const showHistoryModal = ref(false)
const activeTab = ref('info')

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

// Enviar a revisión
const handleSubmit = async () => {
  if (!confirm('¿Estás seguro de enviar este POA a revisión? No podrás editarlo después.')) return

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
            @click="handleSubmit"
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
          </div>
        </div>
      </div>
    </div>

    <!-- Cancel Modal -->
    <Teleport to="body">
      <div v-if="showCancelModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
          <div class="text-center mb-6">
            <div class="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <Icon name="lucide:alert-triangle" class="w-6 h-6 text-red-600" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">Cancelar POA</h3>
            <p class="text-gray-600">¿Estás seguro de que deseas cancelar este POA? Esta acción no se puede deshacer.</p>
          </div>

          <div class="flex gap-3">
            <button
              @click="showCancelModal = false"
              class="flex-1 py-3 px-4 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
            >
              No, mantener
            </button>
            <button
              @click="handleCancel"
              class="flex-1 py-3 px-4 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors"
            >
              Sí, cancelar
            </button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- History Modal -->
    <Teleport to="body">
      <div v-if="showHistoryModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col">
          <div class="p-6 border-b border-gray-200">
            <div class="flex items-center justify-between">
              <h3 class="text-xl font-bold text-gray-900">Historial del POA</h3>
              <button @click="showHistoryModal = false" class="text-gray-500 hover:text-gray-700">
                <Icon name="lucide:x" class="w-6 h-6" />
              </button>
            </div>
          </div>

          <div class="p-6 overflow-y-auto flex-1">
            <div v-if="history.length === 0" class="text-center py-8 text-gray-500">
              No hay historial disponible
            </div>
            <div v-else class="space-y-4">
              <div
                v-for="(item, index) in history"
                :key="index"
                class="bg-gray-50 p-4 rounded-lg"
              >
                <p class="font-semibold text-gray-900">{{ item.action }}</p>
                <p class="text-sm text-gray-600 mt-1">{{ new Date(item.createdAt).toLocaleString() }}</p>
                <p v-if="item.notes" class="text-sm text-gray-700 mt-2">{{ item.notes }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>
