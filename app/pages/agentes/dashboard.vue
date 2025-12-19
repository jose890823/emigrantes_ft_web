<script setup lang="ts">
/**
 * Dashboard del agente
 * Panel principal con estadísticas y acciones rápidas
 */
import type { AgentDashboard } from '~/types/agent'

definePageMeta({
  layout: 'default',
  middleware: 'auth'
})

const {
  agent,
  isAgent,
  getDashboard,
  getReferralLink,
  getStripeStatus,
  copyReferralLink,
  loading
} = useAgent()
const toast = useToast()
const router = useRouter()

const dashboard = ref<AgentDashboard | null>(null)
const referralLink = ref('')
const stripeStatus = ref<any>(null)
const isLoadingData = ref(true)

// Cargar datos del dashboard
const loadDashboard = async () => {
  isLoadingData.value = true

  try {
    // Cargar dashboard
    const dashResult = await getDashboard()
    if (dashResult.success) {
      dashboard.value = dashResult.data
    }

    // Cargar enlace de referido
    const linkResult = await getReferralLink()
    if (linkResult.success) {
      referralLink.value = linkResult.data.referralLink
    }

    // Cargar estado de Stripe
    const stripeResult = await getStripeStatus()
    if (stripeResult.success) {
      stripeStatus.value = stripeResult.data
    }
  } catch (error) {
    console.error('Error loading dashboard:', error)
  } finally {
    isLoadingData.value = false
  }
}

// Verificar si es agente y cargar datos
onMounted(async () => {
  // Si no es agente, redirigir al registro
  if (!isAgent.value) {
    const { getMyProfile } = useAgent()
    const result = await getMyProfile()
    if (!result.success) {
      router.push('/agentes/register')
      return
    }
  }

  await loadDashboard()
})

// Copiar enlace al portapapeles
const handleCopyLink = async () => {
  const result = await copyReferralLink(referralLink.value)
  if (result.success) {
    toast.success('Enlace copiado', 'El enlace de referido ha sido copiado al portapapeles')
  } else {
    toast.error('Error', result.error || 'No se pudo copiar el enlace')
  }
}

// Formatear moneda
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount)
}

// Stats cards
const stats = computed(() => {
  if (!dashboard.value) return []

  return [
    {
      label: 'Total Referidos',
      value: dashboard.value.stats.totalReferrals,
      icon: 'lucide:users',
      color: 'blue'
    },
    {
      label: 'Referidos Convertidos',
      value: dashboard.value.stats.convertedReferrals,
      icon: 'lucide:user-check',
      color: 'green'
    },
    {
      label: 'Ganancias Totales',
      value: formatCurrency(dashboard.value.stats.totalEarnings),
      icon: 'lucide:trending-up',
      color: 'purple'
    },
    {
      label: 'Saldo Pendiente',
      value: formatCurrency(dashboard.value.stats.pendingBalance),
      icon: 'lucide:wallet',
      color: 'yellow'
    }
  ]
})

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  approved: 'bg-green-100 text-green-800',
  suspended: 'bg-red-100 text-red-800'
}

const statusLabels: Record<string, string> = {
  pending: 'Pendiente de aprobación',
  approved: 'Activo',
  suspended: 'Suspendido'
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Loading State -->
      <div v-if="isLoadingData" class="flex items-center justify-center py-20">
        <Icon name="lucide:loader-2" class="w-8 h-8 animate-spin text-[#D4AF37]" />
      </div>

      <template v-else-if="agent">
        <!-- Header -->
        <div class="mb-8">
          <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 class="text-3xl font-bold text-[#0A1F44]">
                Panel de Agente
              </h1>
              <p class="text-gray-600 mt-1">
                Bienvenido, {{ agent.user?.firstName }}
              </p>
            </div>
            <div class="flex items-center gap-3">
              <span :class="['px-3 py-1 rounded-full text-sm font-medium', statusColors[agent.status]]">
                {{ statusLabels[agent.status] }}
              </span>
              <span class="text-sm text-gray-500">
                Código: <strong class="text-[#0A1F44]">{{ agent.referralCode }}</strong>
              </span>
            </div>
          </div>
        </div>

        <!-- Pending Approval Warning -->
        <div v-if="agent.status === 'pending'" class="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg mb-8">
          <div class="flex">
            <Icon name="lucide:clock" class="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
            <div class="ml-3">
              <h3 class="text-sm font-medium text-yellow-800">Tu cuenta está pendiente de aprobación</h3>
              <p class="mt-1 text-sm text-yellow-700">
                Nuestro equipo está revisando tu solicitud. Una vez aprobada, podrás empezar a generar comisiones.
              </p>
            </div>
          </div>
        </div>

        <!-- Referral Link Card -->
        <div v-if="agent.status === 'approved'" class="bg-gradient-to-r from-[#0A1F44] to-blue-800 rounded-2xl p-6 mb-8 text-white">
          <h2 class="text-lg font-semibold mb-3">Tu Enlace de Referido</h2>
          <div class="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              :value="referralLink"
              readonly
              class="flex-1 px-4 py-3 bg-white/10 rounded-lg text-white placeholder-white/50 border border-white/20 focus:outline-none"
            />
            <button
              @click="handleCopyLink"
              class="px-6 py-3 bg-[#D4AF37] text-[#0A1F44] rounded-lg font-semibold hover:bg-white transition-colors flex items-center justify-center gap-2"
            >
              <Icon name="lucide:copy" class="w-5 h-5" />
              Copiar
            </button>
          </div>
          <p class="text-sm text-white/70 mt-3">
            Comparte este enlace con potenciales clientes para ganar comisiones
          </p>
        </div>

        <!-- Stats Grid -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div
            v-for="stat in stats"
            :key="stat.label"
            class="bg-white rounded-xl p-6 shadow-sm"
          >
            <div class="flex items-center gap-3 mb-3">
              <div
                class="w-10 h-10 rounded-lg flex items-center justify-center"
                :class="{
                  'bg-blue-100': stat.color === 'blue',
                  'bg-green-100': stat.color === 'green',
                  'bg-purple-100': stat.color === 'purple',
                  'bg-yellow-100': stat.color === 'yellow'
                }"
              >
                <Icon
                  :name="stat.icon"
                  class="w-5 h-5"
                  :class="{
                    'text-blue-600': stat.color === 'blue',
                    'text-green-600': stat.color === 'green',
                    'text-purple-600': stat.color === 'purple',
                    'text-yellow-600': stat.color === 'yellow'
                  }"
                />
              </div>
            </div>
            <p class="text-2xl font-bold text-[#0A1F44]">{{ stat.value }}</p>
            <p class="text-sm text-gray-500">{{ stat.label }}</p>
          </div>
        </div>

        <!-- Stripe Connect Card -->
        <div class="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-semibold text-[#0A1F44]">Stripe Connect</h2>
            <Icon name="simple-icons:stripe" class="w-6 h-6 text-[#635BFF]" />
          </div>

          <div v-if="stripeStatus?.isConnected && stripeStatus?.isVerified" class="flex items-center gap-3 text-green-600 mb-4">
            <Icon name="lucide:check-circle" class="w-5 h-5" />
            <span class="font-medium">Cuenta conectada y verificada</span>
          </div>

          <div v-else-if="stripeStatus?.isConnected && !stripeStatus?.isVerified" class="flex items-center gap-3 text-yellow-600 mb-4">
            <Icon name="lucide:alert-circle" class="w-5 h-5" />
            <span class="font-medium">Cuenta pendiente de verificación</span>
          </div>

          <div v-else class="flex items-center gap-3 text-gray-500 mb-4">
            <Icon name="lucide:link" class="w-5 h-5" />
            <span>No has conectado tu cuenta de Stripe</span>
          </div>

          <NuxtLink
            to="/agentes/perfil"
            class="inline-flex items-center gap-2 text-[#D4AF37] hover:text-[#0A1F44] font-medium transition-colors"
          >
            {{ stripeStatus?.isConnected ? 'Gestionar cuenta' : 'Conectar cuenta' }}
            <Icon name="lucide:arrow-right" class="w-4 h-4" />
          </NuxtLink>
        </div>

        <!-- Quick Actions -->
        <div class="grid md:grid-cols-3 gap-4 mb-8">
          <NuxtLink
            to="/agentes/referidos"
            class="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4"
          >
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Icon name="lucide:users" class="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 class="font-semibold text-[#0A1F44]">Ver Referidos</h3>
              <p class="text-sm text-gray-500">Listado de todos tus referidos</p>
            </div>
          </NuxtLink>

          <NuxtLink
            to="/agentes/comisiones"
            class="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4"
          >
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Icon name="lucide:dollar-sign" class="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 class="font-semibold text-[#0A1F44]">Ver Comisiones</h3>
              <p class="text-sm text-gray-500">Historial de comisiones</p>
            </div>
          </NuxtLink>

          <NuxtLink
            to="/agentes/perfil"
            class="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4"
          >
            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Icon name="lucide:settings" class="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 class="font-semibold text-[#0A1F44]">Mi Perfil</h3>
              <p class="text-sm text-gray-500">Configuración de cuenta</p>
            </div>
          </NuxtLink>
        </div>

        <!-- Recent Activity -->
        <div class="grid md:grid-cols-2 gap-8">
          <!-- Recent Referrals -->
          <div class="bg-white rounded-xl shadow-sm p-6">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-lg font-semibold text-[#0A1F44]">Referidos Recientes</h2>
              <NuxtLink to="/agentes/referidos" class="text-sm text-[#D4AF37] hover:text-[#0A1F44]">
                Ver todos
              </NuxtLink>
            </div>

            <div v-if="dashboard?.stats.recentReferrals.length" class="space-y-3">
              <div
                v-for="referral in dashboard.stats.recentReferrals.slice(0, 5)"
                :key="referral.id"
                class="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
              >
                <div>
                  <p class="font-medium text-[#0A1F44]">
                    {{ referral.referredUser?.firstName }} {{ referral.referredUser?.lastName }}
                  </p>
                  <p class="text-sm text-gray-500">
                    {{ new Date(referral.createdAt).toLocaleDateString() }}
                  </p>
                </div>
                <span
                  class="px-2 py-1 rounded text-xs font-medium"
                  :class="{
                    'bg-green-100 text-green-800': referral.status === 'converted',
                    'bg-yellow-100 text-yellow-800': referral.status === 'registered',
                    'bg-gray-100 text-gray-800': referral.status === 'expired'
                  }"
                >
                  {{ referral.status === 'converted' ? 'Convertido' : referral.status === 'registered' ? 'Registrado' : 'Expirado' }}
                </span>
              </div>
            </div>

            <div v-else class="text-center py-8 text-gray-500">
              <Icon name="lucide:users" class="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>Aún no tienes referidos</p>
            </div>
          </div>

          <!-- Recent Commissions -->
          <div class="bg-white rounded-xl shadow-sm p-6">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-lg font-semibold text-[#0A1F44]">Comisiones Recientes</h2>
              <NuxtLink to="/agentes/comisiones" class="text-sm text-[#D4AF37] hover:text-[#0A1F44]">
                Ver todas
              </NuxtLink>
            </div>

            <div v-if="dashboard?.stats.recentCommissions.length" class="space-y-3">
              <div
                v-for="commission in dashboard.stats.recentCommissions.slice(0, 5)"
                :key="commission.id"
                class="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
              >
                <div>
                  <p class="font-medium text-[#0A1F44]">
                    {{ formatCurrency(commission.commissionAmount) }}
                  </p>
                  <p class="text-sm text-gray-500">
                    {{ new Date(commission.createdAt).toLocaleDateString() }}
                  </p>
                </div>
                <span
                  class="px-2 py-1 rounded text-xs font-medium"
                  :class="{
                    'bg-green-100 text-green-800': commission.status === 'paid',
                    'bg-blue-100 text-blue-800': commission.status === 'approved',
                    'bg-yellow-100 text-yellow-800': commission.status === 'pending',
                    'bg-red-100 text-red-800': commission.status === 'rejected'
                  }"
                >
                  {{ commission.status === 'paid' ? 'Pagada' : commission.status === 'approved' ? 'Aprobada' : commission.status === 'pending' ? 'Pendiente' : 'Rechazada' }}
                </span>
              </div>
            </div>

            <div v-else class="text-center py-8 text-gray-500">
              <Icon name="lucide:dollar-sign" class="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>Aún no tienes comisiones</p>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
