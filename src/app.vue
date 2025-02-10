<template>
  <NuxtLoadingIndicator :height="4" />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { settings } from '~/settings'

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - ${settings.appName}` : settings.appName
  },
})

useRouteCache((helper) => {
  const cachedTimes = 7 * 60 * 60 * 24 // 7 天

  helper.setCacheable().setMaxAge(cachedTimes)
})
</script>
