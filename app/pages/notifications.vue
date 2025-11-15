<script setup lang="ts">
import type { Notification, NotificationFilterParams } from '~/types/api'

definePageMeta({
  middleware: 'auth'
})

const {
  getMyNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
  getChannelLabel,
  getCategoryLabel,
  getChannelIcon
} = useNotifications()
const toast = useToast()

const notifications = ref<Notification[]>([])
const unreadCount = ref(0)
const isLoading = ref(false)
const selectedFilter = ref<NotificationFilterParams>({
  page: 1,
  limit: 20
})

// Cargar notificaciones
const loadNotifications = async () => {
  isLoading.value = true
  try {
    const result = await getMyNotifications(selectedFilter.value)
    if (result.success && result.data) {
      notifications.value = result.data
    }
  } catch (error) {
    toast.error('Error', 'No se pudieron cargar las notificaciones')
  } finally {
    isLoading.value = false
  }
}

// Cargar contador de no leídas
const loadUnreadCount = async () => {
  const result = await getUnreadCount()
  if (result.success) {
    unreadCount.value = result.count
  }
}

// Marcar como leída
const handleMarkAsRead = async (id: string) => {
  const result = await markAsRead(id)
  if (result.success) {
    await loadNotifications()
    await loadUnreadCount()
  }
}

// Marcar todas como leídas
const handleMarkAllAsRead = async () => {
  const result = await markAllAsRead()
  if (result.success) {
    toast.success('Listo', 'Todas las notificaciones marcadas como leídas')
    await loadNotifications()
    await loadUnreadCount()
  }
}

// Aplicar filtro
const applyFilter = (key: keyof NotificationFilterParams, value: any) => {
  selectedFilter.value = { ...selectedFilter.value, [key]: value, page: 1 }
  loadNotifications()
}

// Limpiar filtros
const clearFilters = () => {
  selectedFilter.value = { page: 1, limit: 20 }
  loadNotifications()
}

// Clases por estado
const getStatusBadgeClasses = (status: string) => {
  const classes: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    queued: 'bg-blue-100 text-blue-800',
    sending: 'bg-indigo-100 text-indigo-800',
    sent: 'bg-green-100 text-green-800',
    delivered: 'bg-emerald-100 text-emerald-800',
    failed: 'bg-red-100 text-red-800',
    bounced: 'bg-orange-100 text-orange-800',
    cancelled: 'bg-gray-100 text-gray-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

// Label de estado
const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    pending: 'Pendiente',
    queued: 'En Cola',
    sending: 'Enviando',
    sent: 'Enviado',
    delivered: 'Entregado',
    failed: 'Fallido',
    bounced: 'Rebotado',
    cancelled: 'Cancelado'
  }
  return labels[status] || status
}

onMounted(() => {
  loadNotifications()
  loadUnreadCount()
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Notificaciones</h1>
            <p class="text-gray-600 mt-1">
              Tienes <span class="font-semibold text-blue-600">{{ unreadCount }}</span> notificaciones sin leer
            </p>
          </div>
          <button
            v-if="unreadCount > 0"
            @click="handleMarkAllAsRead"
            class="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Icon name="lucide:check-check" class="w-5 h-5" />
            Marcar todas como leídas
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <!-- Filters Sidebar -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-xl shadow-md p-6 sticky top-8">
            <div class="flex items-center justify-between mb-4">
              <h3 class="font-bold text-gray-900">Filtros</h3>
              <button
                @click="clearFilters"
                class="text-sm text-blue-600 hover:text-blue-700 font-semibold"
              >
                Limpiar
              </button>
            </div>

            <!-- Canal -->
            <div class="mb-6">
              <label class="block text-sm font-semibold text-gray-700 mb-2">Canal</label>
              <select
                :value="selectedFilter.channel"
                @change="(e) => applyFilter('channel', (e.target as HTMLSelectElement).value)"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Todos</option>
                <option value="email">Email</option>
                <option value="sms">SMS</option>
                <option value="whatsapp">WhatsApp</option>
                <option value="push">Push</option>
                <option value="in_app">En la App</option>
              </select>
            </div>

            <!-- Estado -->
            <div class="mb-6">
              <label class="block text-sm font-semibold text-gray-700 mb-2">Estado</label>
              <select
                :value="selectedFilter.status"
                @change="(e) => applyFilter('status', (e.target as HTMLSelectElement).value)"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Todos</option>
                <option value="pending">Pendiente</option>
                <option value="sent">Enviado</option>
                <option value="delivered">Entregado</option>
                <option value="failed">Fallido</option>
              </select>
            </div>

            <!-- Categoría -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">Categoría</label>
              <select
                :value="selectedFilter.category"
                @change="(e) => applyFilter('category', (e.target as HTMLSelectElement).value)"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Todas</option>
                <option value="poa_updates">POA</option>
                <option value="account">Cuenta</option>
                <option value="security">Seguridad</option>
                <option value="payments">Pagos</option>
                <option value="marketing">Marketing</option>
                <option value="system">Sistema</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Notifications List -->
        <div class="lg:col-span-3">
          <div v-if="isLoading" class="flex justify-center py-12">
            <Icon name="lucide:loader-2" class="w-8 h-8 text-blue-600 animate-spin" />
          </div>

          <div v-else-if="notifications.length === 0" class="bg-white rounded-xl shadow-md p-12 text-center">
            <Icon name="lucide:inbox" class="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 class="text-xl font-semibold text-gray-700 mb-2">No hay notificaciones</h3>
            <p class="text-gray-500">No tienes notificaciones que coincidan con los filtros</p>
          </div>

          <div v-else class="space-y-4">
            <div
              v-for="notification in notifications"
              :key="notification.id"
              :class="[
                'bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg',
                notification.readAt ? 'opacity-75' : 'border-l-4 border-blue-600'
              ]"
            >
              <div class="p-6">
                <div class="flex items-start gap-4">
                  <!-- Icon -->
                  <div :class="[
                    'flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center',
                    notification.readAt ? 'bg-gray-100' : 'bg-blue-100'
                  ]">
                    <Icon
                      :name="getChannelIcon(notification.channel)"
                      :class="[
                        'w-6 h-6',
                        notification.readAt ? 'text-gray-500' : 'text-blue-600'
                      ]"
                    />
                  </div>

                  <!-- Content -->
                  <div class="flex-1 min-w-0">
                    <div class="flex items-start justify-between mb-2">
                      <div class="flex-1">
                        <h4 v-if="notification.subject" class="text-lg font-bold text-gray-900 mb-1">
                          {{ notification.subject }}
                        </h4>
                        <p class="text-gray-700">{{ notification.body }}</p>
                      </div>
                      <button
                        v-if="!notification.readAt"
                        @click="handleMarkAsRead(notification.id)"
                        class="ml-4 text-blue-600 hover:text-blue-700 flex-shrink-0"
                        title="Marcar como leída"
                      >
                        <Icon name="lucide:check" class="w-5 h-5" />
                      </button>
                    </div>

                    <!-- Meta Info -->
                    <div class="flex flex-wrap items-center gap-3 mt-3">
                      <span class="inline-flex items-center gap-1 text-sm text-gray-600">
                        <Icon name="lucide:tag" class="w-4 h-4" />
                        {{ getCategoryLabel(notification.category) }}
                      </span>
                      <span class="inline-flex items-center gap-1 text-sm text-gray-600">
                        <Icon :name="getChannelIcon(notification.channel)" class="w-4 h-4" />
                        {{ getChannelLabel(notification.channel) }}
                      </span>
                      <span
                        :class="['inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold', getStatusBadgeClasses(notification.status)]"
                      >
                        <Icon name="lucide:circle" class="w-2 h-2 fill-current" />
                        {{ getStatusLabel(notification.status) }}
                      </span>
                      <span class="text-sm text-gray-500">
                        {{ new Date(notification.createdAt).toLocaleString() }}
                      </span>
                    </div>

                    <!-- Error Message -->
                    <div v-if="notification.errorMessage" class="mt-3 bg-red-50 border-l-2 border-red-500 p-3 rounded">
                      <p class="text-sm text-red-700">
                        <span class="font-semibold">Error:</span> {{ notification.errorMessage }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Pagination -->
          <div v-if="notifications.length > 0" class="mt-6 flex justify-center gap-2">
            <button
              @click="applyFilter('page', (selectedFilter.page || 1) - 1)"
              :disabled="(selectedFilter.page || 1) <= 1"
              class="px-4 py-2 bg-white border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Anterior
            </button>
            <span class="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold">
              Página {{ selectedFilter.page || 1 }}
            </span>
            <button
              @click="applyFilter('page', (selectedFilter.page || 1) + 1)"
              :disabled="notifications.length < (selectedFilter.limit || 20)"
              class="px-4 py-2 bg-white border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Siguiente
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
