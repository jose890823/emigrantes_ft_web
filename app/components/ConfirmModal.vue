<script setup lang="ts">
import { AlertTriangle, AlertCircle, Info, CheckCircle, Loader2 } from 'lucide-vue-next'

interface Props {
  show: boolean
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  type?: 'danger' | 'warning' | 'info' | 'success'
  isLoading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  confirmText: 'Confirmar',
  cancelText: 'Cancelar',
  type: 'info',
  isLoading: false
})

const emit = defineEmits<{
  confirm: []
  cancel: []
}>()

const handleConfirm = () => {
  if (!props.isLoading) {
    emit('confirm')
  }
}

const handleCancel = () => {
  if (!props.isLoading) {
    emit('cancel')
  }
}

// Configuración de colores según el tipo
const typeConfig = computed(() => {
  const configs = {
    danger: {
      icon: AlertTriangle,
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600',
      buttonBg: 'bg-red-500 hover:bg-red-600',
      buttonText: 'text-white'
    },
    warning: {
      icon: AlertCircle,
      iconBg: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
      buttonBg: 'bg-yellow-500 hover:bg-yellow-600',
      buttonText: 'text-white'
    },
    info: {
      icon: Info,
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      buttonBg: 'bg-blue-500 hover:bg-blue-600',
      buttonText: 'text-white'
    },
    success: {
      icon: CheckCircle,
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      buttonBg: 'bg-green-500 hover:bg-green-600',
      buttonText: 'text-white'
    }
  }
  return configs[props.type]
})
</script>

<template>
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
        v-if="show"
        class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        @click.self="handleCancel"
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
            v-if="show"
            class="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
            @click.stop
          >
            <!-- Contenido -->
            <div class="p-6">
              <!-- Icono -->
              <div class="flex justify-center mb-4">
                <div :class="['w-16 h-16 rounded-full flex items-center justify-center', typeConfig.iconBg]">
                  <component :is="typeConfig.icon" :class="['w-8 h-8', typeConfig.iconColor]" />
                </div>
              </div>

              <!-- Título -->
              <h3 class="text-xl font-bold text-gray-900 text-center mb-3">
                {{ title }}
              </h3>

              <!-- Mensaje -->
              <p class="text-gray-600 text-center mb-6">
                {{ message }}
              </p>

              <!-- Botones -->
              <div class="flex gap-3">
                <button
                  @click="handleCancel"
                  :disabled="isLoading"
                  class="flex-1 py-3 px-4 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {{ cancelText }}
                </button>
                <button
                  @click="handleConfirm"
                  :disabled="isLoading"
                  :class="[
                    'flex-1 py-3 px-4 font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2',
                    typeConfig.buttonBg,
                    typeConfig.buttonText
                  ]"
                >
                  <Loader2
                    v-if="isLoading"
                    class="w-5 h-5 animate-spin"
                  />
                  <span>{{ confirmText }}</span>
                </button>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>
