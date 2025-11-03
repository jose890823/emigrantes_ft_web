<script setup lang="ts">
const { toasts, removeToast } = useToast()

const getIcon = (type: string) => {
  switch (type) {
    case 'success':
      return 'lucide:check-circle'
    case 'error':
      return 'lucide:x-circle'
    case 'warning':
      return 'lucide:alert-triangle'
    case 'info':
      return 'lucide:info'
    default:
      return 'lucide:bell'
  }
}

const getColorClasses = (type: string) => {
  switch (type) {
    case 'success':
      return 'bg-green-50 border-green-200 text-green-800'
    case 'error':
      return 'bg-red-50 border-red-200 text-red-800'
    case 'warning':
      return 'bg-amber-50 border-amber-200 text-amber-800'
    case 'info':
      return 'bg-blue-50 border-blue-200 text-blue-800'
    default:
      return 'bg-gray-50 border-gray-200 text-gray-800'
  }
}
</script>

<template>
  <div class="fixed top-4 right-4 z-50 space-y-2 max-w-sm w-full">
    <TransitionGroup
      enter-active-class="transition ease-out duration-300"
      enter-from-class="opacity-0 translate-x-8"
      enter-to-class="opacity-100 translate-x-0"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100 translate-x-0"
      leave-to-class="opacity-0 translate-x-8"
    >
      <div
        v-for="toast in toasts"
        :key="toast.id"
        :class="getColorClasses(toast.type)"
        class="p-4 rounded-lg border shadow-lg backdrop-blur-sm"
      >
        <div class="flex items-start space-x-3">
          <Icon :name="getIcon(toast.type)" class="w-5 h-5 shrink-0 mt-0.5" />
          <div class="flex-1 min-w-0">
            <p class="font-semibold text-sm">{{ toast.title }}</p>
            <p v-if="toast.description" class="text-sm mt-1 opacity-90">
              {{ toast.description }}
            </p>
          </div>
          <button
            @click="removeToast(toast.id)"
            class="shrink-0 p-1 hover:bg-black/5 rounded transition-colors"
          >
            <Icon name="lucide:x" class="w-4 h-4" />
          </button>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>
