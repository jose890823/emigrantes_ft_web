<script setup lang="ts">
import type { CreatePOARequest, POAType } from '~/types/api'

definePageMeta({
  middleware: 'auth'
})

const { createPoa } = usePoa()
const { user } = useAuth()
const toast = useToast()
const router = useRouter()

const currentStep = ref(1)
const isLoading = ref(false)

// Formulario
const form = reactive<CreatePOARequest>({
  type: 'durable' as POAType,
  clientFullName: '',
  clientAddress: '',
  clientIdentification: '',
  instructions: {
    accounts: [],
    actions: []
  },
  beneficiaries: [],
  activationTriggers: [],
  clientNotes: ''
})

// Campos temporales para agregar items
const newAccount = ref('')
const newAction = ref('')
const newBeneficiary = reactive({
  name: '',
  relationship: '',
  percentage: 0
})

// Tipos de POA disponibles
const poaTypes = [
  {
    value: 'durable' as POAType,
    label: 'POA Duradero',
    description: 'Permanece válido incluso si quedas incapacitado'
  },
  {
    value: 'standard' as POAType,
    label: 'POA Estándar',
    description: 'Válido solo mientras estés capacitado'
  },
  {
    value: 'springing' as POAType,
    label: 'POA Condicional',
    description: 'Se activa solo cuando se cumplen ciertas condiciones'
  }
]

// Triggers disponibles
const availableTriggers = [
  { value: 'deportation', label: 'Deportación' },
  { value: 'incapacity', label: 'Incapacidad' },
  { value: 'absence', label: 'Ausencia prolongada' },
  { value: 'emergency', label: 'Emergencia' }
]

// Cargar datos del usuario
onMounted(() => {
  if (user.value) {
    form.clientFullName = `${user.value.firstName} ${user.value.lastName}`
    form.clientAddress = user.value.address || ''
    form.clientIdentification = user.value.identificationNumber || ''
  }
})

// Agregar cuenta
const addAccount = () => {
  if (newAccount.value.trim()) {
    if (!Array.isArray(form.instructions.accounts)) {
      form.instructions.accounts = []
    }
    form.instructions.accounts.push(newAccount.value.trim())
    newAccount.value = ''
  }
}

// Eliminar cuenta
const removeAccount = (index: number) => {
  form.instructions.accounts.splice(index, 1)
}

// Agregar acción
const addAction = () => {
  if (newAction.value.trim()) {
    if (!Array.isArray(form.instructions.actions)) {
      form.instructions.actions = []
    }
    form.instructions.actions.push(newAction.value.trim())
    newAction.value = ''
  }
}

// Eliminar acción
const removeAction = (index: number) => {
  form.instructions.actions.splice(index, 1)
}

// Agregar beneficiario
const addBeneficiary = () => {
  if (newBeneficiary.name && newBeneficiary.relationship && newBeneficiary.percentage > 0) {
    form.beneficiaries.push({ ...newBeneficiary })
    newBeneficiary.name = ''
    newBeneficiary.relationship = ''
    newBeneficiary.percentage = 0
  }
}

// Eliminar beneficiario
const removeBeneficiary = (index: number) => {
  form.beneficiaries.splice(index, 1)
}

// Toggle trigger
const toggleTrigger = (trigger: string) => {
  const index = form.activationTriggers.indexOf(trigger)
  if (index === -1) {
    form.activationTriggers.push(trigger)
  } else {
    form.activationTriggers.splice(index, 1)
  }
}

// Validar paso actual
const validateStep = (step: number): boolean => {
  if (step === 1) {
    if (!form.type) {
      toast.error('Error', 'Debes seleccionar un tipo de POA')
      return false
    }
  } else if (step === 2) {
    if (!form.clientFullName || !form.clientAddress || !form.clientIdentification) {
      toast.error('Error', 'Todos los campos son obligatorios')
      return false
    }
  }
  return true
}

// Avanzar paso
const nextStep = () => {
  if (validateStep(currentStep.value)) {
    currentStep.value++
  }
}

// Retroceder paso
const previousStep = () => {
  currentStep.value--
}

// Enviar formulario
const handleSubmit = async () => {
  if (!validateStep(currentStep.value)) return

  isLoading.value = true
  try {
    const result = await createPoa(form)
    if (result.success) {
      toast.success('POA creado', 'Tu POA ha sido creado como borrador')
      router.push(`/poa/${result.data.id}`)
    } else {
      toast.error('Error', result.error || 'No se pudo crear el POA')
    }
  } catch (error) {
    toast.error('Error', 'Ocurrió un error inesperado')
  } finally {
    isLoading.value = false
  }
}

// Progreso del formulario
const progress = computed(() => (currentStep.value / 4) * 100)
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center gap-4 mb-4">
          <button @click="router.back()" class="text-gray-600 hover:text-[#0A1F44] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="m12 19-7-7 7-7"/>
              <path d="M19 12H5"/>
            </svg>
          </button>
          <div>
            <h1 class="text-3xl font-bold text-[#0A1F44]">Crear Nuevo POA</h1>
            <p class="text-gray-600 mt-1">Poder Notarial Duradero para Emigrantes</p>
          </div>
        </div>

        <!-- Progress bar -->
        <div class="bg-gray-200 rounded-full h-2 overflow-hidden">
          <div class="bg-[#D4AF37] h-full transition-all duration-300" :style="{ width: `${progress}%` }"></div>
        </div>
        <div class="flex justify-between mt-2 text-sm text-gray-600">
          <span>Paso {{ currentStep }} de 4</span>
          <span>{{ progress.toFixed(0) }}% completado</span>
        </div>
      </div>

      <!-- Form Card -->
      <div class="bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <!-- Step 1: Tipo de POA -->
        <div v-if="currentStep === 1" class="space-y-6">
          <div>
            <h2 class="text-2xl font-bold text-[#0A1F44] mb-2">Tipo de POA</h2>
            <p class="text-gray-600">Selecciona el tipo de poder notarial que mejor se adapte a tus necesidades</p>
          </div>

          <div class="grid grid-cols-1 gap-4">
            <label
              v-for="type in poaTypes"
              :key="type.value"
              :class="[
                'relative flex items-start p-5 rounded-xl border-2 cursor-pointer transition-all',
                form.type === type.value
                  ? 'border-[#D4AF37] bg-[#D4AF37]/5'
                  : 'border-gray-200 hover:border-gray-300'
              ]"
            >
              <input
                type="radio"
                :value="type.value"
                v-model="form.type"
                class="mt-1 h-4 w-4 text-[#D4AF37] focus:ring-[#D4AF37]"
              />
              <div class="ml-4 flex-1">
                <div class="flex items-center gap-2">
                  <span class="text-lg font-bold text-[#0A1F44]">{{ type.label }}</span>
                  <svg v-if="form.type === type.value" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <path d="m9 11 3 3L22 4"/>
                  </svg>
                </div>
                <p class="text-gray-600 mt-1">{{ type.description }}</p>
              </div>
            </label>
          </div>
        </div>

        <!-- Step 2: Información Personal -->
        <div v-if="currentStep === 2" class="space-y-6">
          <div>
            <h2 class="text-2xl font-bold text-[#0A1F44] mb-2">Información Personal</h2>
            <p class="text-gray-600">Verifica y completa tus datos personales</p>
          </div>

          <div class="space-y-4">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                Nombre Completo <span class="text-red-500">*</span>
              </label>
              <input
                v-model="form.clientFullName"
                type="text"
                required
                class="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
              />
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                Dirección Completa <span class="text-red-500">*</span>
              </label>
              <textarea
                v-model="form.clientAddress"
                required
                rows="3"
                class="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
              ></textarea>
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                Número de Identificación <span class="text-red-500">*</span>
              </label>
              <input
                v-model="form.clientIdentification"
                type="text"
                required
                placeholder="V-12345678"
                class="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
              />
            </div>
          </div>
        </div>

        <!-- Step 3: Instrucciones y Beneficiarios -->
        <div v-if="currentStep === 3" class="space-y-6">
          <div>
            <h2 class="text-2xl font-bold text-[#0A1F44] mb-2">Instrucciones y Beneficiarios</h2>
            <p class="text-gray-600">Esta información será encriptada y solo accesible en caso de activación</p>
          </div>

          <!-- Cuentas Bancarias -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              Cuentas Bancarias
            </label>
            <div class="flex gap-2 mb-3">
              <input
                v-model="newAccount"
                type="text"
                placeholder="Ej: Bank of America - XXXX1234"
                @keyup.enter="addAccount"
                class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
              />
              <button
                @click="addAccount"
                type="button"
                class="px-4 py-2 bg-[#D4AF37] text-[#0A1F44] font-semibold rounded-lg hover:bg-[#0A1F44] hover:text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M5 12h14"/>
                  <path d="M12 5v14"/>
                </svg>
              </button>
            </div>
            <div v-if="form.instructions.accounts?.length > 0" class="space-y-2">
              <div
                v-for="(account, index) in form.instructions.accounts"
                :key="index"
                class="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
              >
                <span class="text-gray-700">{{ account }}</span>
                <button @click="removeAccount(index)" class="text-red-500 hover:text-red-700">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 6 6 18"/>
                    <path d="m6 6 12 12"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Acciones a Ejecutar -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              Acciones a Ejecutar
            </label>
            <div class="flex gap-2 mb-3">
              <input
                v-model="newAction"
                type="text"
                placeholder="Ej: Transferir fondos a beneficiarios"
                @keyup.enter="addAction"
                class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
              />
              <button
                @click="addAction"
                type="button"
                class="px-4 py-2 bg-[#D4AF37] text-[#0A1F44] font-semibold rounded-lg hover:bg-[#0A1F44] hover:text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M5 12h14"/>
                  <path d="M12 5v14"/>
                </svg>
              </button>
            </div>
            <div v-if="form.instructions.actions?.length > 0" class="space-y-2">
              <div
                v-for="(action, index) in form.instructions.actions"
                :key="index"
                class="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
              >
                <span class="text-gray-700">{{ action }}</span>
                <button @click="removeAction(index)" class="text-red-500 hover:text-red-700">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 6 6 18"/>
                    <path d="m6 6 12 12"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Beneficiarios -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              Beneficiarios
            </label>
            <div class="border border-gray-300 rounded-lg p-4 mb-3 space-y-3">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                <input
                  v-model="newBeneficiary.name"
                  type="text"
                  placeholder="Nombre completo"
                  class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                />
                <input
                  v-model="newBeneficiary.relationship"
                  type="text"
                  placeholder="Relación (ej: hijo)"
                  class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                />
                <input
                  v-model.number="newBeneficiary.percentage"
                  type="number"
                  min="0"
                  max="100"
                  placeholder="Porcentaje %"
                  class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                />
              </div>
              <button
                @click="addBeneficiary"
                type="button"
                class="w-full px-4 py-2 bg-[#D4AF37] text-[#0A1F44] font-semibold rounded-lg hover:bg-[#0A1F44] hover:text-white transition-colors"
              >
                Agregar Beneficiario
              </button>
            </div>
            <div v-if="form.beneficiaries?.length > 0" class="space-y-2">
              <div
                v-for="(ben, index) in form.beneficiaries"
                :key="index"
                class="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
              >
                <div>
                  <span class="font-semibold text-gray-900">{{ ben.name }}</span>
                  <span class="text-gray-600 text-sm ml-2">({{ ben.relationship }}) - {{ ben.percentage }}%</span>
                </div>
                <button @click="removeBeneficiary(index)" class="text-red-500 hover:text-red-700">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 6 6 18"/>
                    <path d="m6 6 12 12"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Step 4: Triggers y Notas -->
        <div v-if="currentStep === 4" class="space-y-6">
          <div>
            <h2 class="text-2xl font-bold text-[#0A1F44] mb-2">Condiciones de Activación</h2>
            <p class="text-gray-600">Selecciona cuándo debe activarse este POA</p>
          </div>

          <!-- Activation Triggers -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-3">
              Eventos de Activación
            </label>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <label
                v-for="trigger in availableTriggers"
                :key="trigger.value"
                :class="[
                  'flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all',
                  form.activationTriggers.includes(trigger.value)
                    ? 'border-[#D4AF37] bg-[#D4AF37]/5'
                    : 'border-gray-200 hover:border-gray-300'
                ]"
              >
                <input
                  type="checkbox"
                  :checked="form.activationTriggers.includes(trigger.value)"
                  @change="toggleTrigger(trigger.value)"
                  class="h-5 w-5 text-[#D4AF37] focus:ring-[#D4AF37] rounded"
                />
                <span class="font-semibold text-gray-900">{{ trigger.label }}</span>
              </label>
            </div>
          </div>

          <!-- Notas Adicionales -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              Notas Adicionales (Opcional)
            </label>
            <textarea
              v-model="form.clientNotes"
              rows="4"
              placeholder="Cualquier información adicional que consideres importante..."
              class="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
            ></textarea>
          </div>

          <!-- Información importante -->
          <div class="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-md">
            <div class="flex">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-blue-500 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 16v-4"/>
                <path d="M12 8h.01"/>
              </svg>
              <div class="ml-3 text-sm text-blue-700">
                <p class="font-semibold mb-1">Información Importante</p>
                <ul class="list-disc list-inside space-y-1">
                  <li>Tu POA será creado como borrador y podrás editarlo antes de enviarlo</li>
                  <li>Toda la información confidencial será encriptada</li>
                  <li>Una vez enviado a revisión, no podrás modificarlo</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation Buttons -->
        <div class="flex justify-between mt-8 pt-6 border-t border-gray-200">
          <button
            v-if="currentStep > 1"
            @click="previousStep"
            type="button"
            class="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="m12 19-7-7 7-7"/>
              <path d="M19 12H5"/>
            </svg>
            Anterior
          </button>
          <div v-else></div>

          <button
            v-if="currentStep < 4"
            @click="nextStep"
            type="button"
            class="flex items-center gap-2 px-6 py-3 bg-[#D4AF37] text-[#0A1F44] font-semibold rounded-lg hover:bg-[#0A1F44] hover:text-white transition-colors"
          >
            Siguiente
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14"/>
              <path d="m12 5 7 7-7 7"/>
            </svg>
          </button>

          <button
            v-else
            @click="handleSubmit"
            :disabled="isLoading"
            type="button"
            class="flex items-center gap-2 px-6 py-3 bg-[#D4AF37] text-[#0A1F44] font-semibold rounded-lg hover:bg-[#0A1F44] hover:text-white transition-colors disabled:opacity-50"
          >
            <svg v-if="isLoading" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 6 9 17l-5-5"/>
            </svg>
            {{ isLoading ? 'Creando...' : 'Crear POA' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
