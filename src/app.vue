<template>
  <NuxtLayout><NuxtPage /></NuxtLayout>
</template>

<script setup lang="ts">
const appConfig = useAppConfig()

onMounted(() => {
  console.log('nuxt app entrypoint!!!')
  console.log('app config:', appConfig)
})
</script>
