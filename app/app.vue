<script setup lang="ts">
// Importar el composable de autenticación
const { checkAuth } = useAuth()

// Verificar autenticación al iniciar la app
onMounted(async () => {
  await checkAuth()
})
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
