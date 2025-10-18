<template>
  <NuxtLoadingIndicator :height="4" />
  <NuxtLayout>
    <NuxtPage />

    <ApplicationInitialization />
  </NuxtLayout>
</template>

<script setup lang="ts">
import ApplicationInitialization from './components/ApplicationInitialization.vue'

const appConfig = useAppConfig()

onMounted(() => {
  console.log(appConfig)
})
</script>
