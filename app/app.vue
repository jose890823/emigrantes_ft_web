<script setup lang="ts">
// Importar el composable de autenticación
const { checkAuth } = useAuth()
const { captureReferralCode } = useReferral()

// Verificar autenticación al iniciar la app
// y capturar código de referido si existe en la URL
onMounted(async () => {
  captureReferralCode()
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
