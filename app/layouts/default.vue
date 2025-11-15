<script setup lang="ts">
// Layout por defecto con header y footer
const { checkAuth } = useAuth()

// Verificar autenticación al montar el layout
onMounted(() => {
  checkAuth()
})
</script>

<template>
  <div class="min-h-screen flex flex-col bg-white">
    <AppHeader />

    <main class="flex-grow">
      <slot />
    </main>

    <AppFooter />

    <!-- Toast notifications container -->
    <ToastContainer />
  </div>
</template>
