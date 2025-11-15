<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

const { user } = useAuth()
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
      <!-- Welcome Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-[#0A1F44]">
          ¡Bienvenido, {{ user?.firstName }}!
        </h1>
        <p class="text-gray-600 mt-2">
          Este es tu panel de control de Emigrantes FT
        </p>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <!-- Stat Card 1 -->
        <div class="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#D4AF37]">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-sm font-medium">POAs Activos</p>
              <p class="text-3xl font-bold text-[#0A1F44] mt-1">0</p>
            </div>
            <div class="w-12 h-12 bg-[#D4AF37]/10 rounded-lg flex items-center justify-center">
              <Icon name="lucide:file-text" class="w-6 h-6 text-[#D4AF37]" />
            </div>
          </div>
        </div>

        <!-- Stat Card 2 -->
        <div class="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-sm font-medium">Documentos</p>
              <p class="text-3xl font-bold text-[#0A1F44] mt-1">0</p>
            </div>
            <div class="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <Icon name="lucide:folder" class="w-6 h-6 text-blue-500" />
            </div>
          </div>
        </div>

        <!-- Stat Card 3 -->
        <div class="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-sm font-medium">Pagos</p>
              <p class="text-3xl font-bold text-[#0A1F44] mt-1">$0</p>
            </div>
            <div class="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
              <Icon name="lucide:dollar-sign" class="w-6 h-6 text-green-500" />
            </div>
          </div>
        </div>

        <!-- Stat Card 4 -->
        <div class="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-500 text-sm font-medium">Notificaciones</p>
              <p class="text-3xl font-bold text-[#0A1F44] mt-1">0</p>
            </div>
            <div class="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
              <Icon name="lucide:bell" class="w-6 h-6 text-purple-500" />
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 class="text-xl font-bold text-[#0A1F44] mb-4">Acciones Rápidas</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <NuxtLink
            to="/poa/create"
            class="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-[#D4AF37] hover:bg-[#D4AF37]/5 transition-all group"
          >
            <div class="w-10 h-10 bg-[#D4AF37]/10 rounded-lg flex items-center justify-center group-hover:bg-[#D4AF37]/20 transition-colors">
              <Icon name="lucide:file-plus" class="w-5 h-5 text-[#D4AF37]" />
            </div>
            <div>
              <p class="font-semibold text-gray-900 group-hover:text-[#D4AF37] transition-colors">Crear POA</p>
              <p class="text-sm text-gray-500">Nuevo poder notarial</p>
            </div>
          </NuxtLink>

          <NuxtLink
            to="/profile"
            class="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-[#D4AF37] hover:bg-[#D4AF37]/5 transition-all group"
          >
            <div class="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
              <Icon name="lucide:user" class="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <p class="font-semibold text-gray-900 group-hover:text-[#D4AF37] transition-colors">Mi Perfil</p>
              <p class="text-sm text-gray-500">Editar información</p>
            </div>
          </NuxtLink>

          <NuxtLink
            to="/support"
            class="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-[#D4AF37] hover:bg-[#D4AF37]/5 transition-all group"
          >
            <div class="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
              <Icon name="lucide:headphones" class="w-5 h-5 text-green-500" />
            </div>
            <div>
              <p class="font-semibold text-gray-900 group-hover:text-[#D4AF37] transition-colors">Soporte</p>
              <p class="text-sm text-gray-500">Contacta con nosotros</p>
            </div>
          </NuxtLink>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="bg-white rounded-xl shadow-md p-6">
        <h2 class="text-xl font-bold text-[#0A1F44] mb-4">Actividad Reciente</h2>
        <div class="text-center py-8">
          <Icon name="lucide:inbox" class="w-16 h-16 text-gray-300 mx-auto mb-3" />
          <p class="text-gray-500">No hay actividad reciente</p>
          <p class="text-sm text-gray-400 mt-1">Tus acciones aparecerán aquí</p>
        </div>
      </div>
    </div>
  </div>
</template>
