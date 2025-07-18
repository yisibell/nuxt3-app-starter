<template>
  <NuxtLoadingIndicator :height="4" />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const appConfig = useAppConfig()

onMounted(() => {
  console.log(appConfig)
})
</script>
