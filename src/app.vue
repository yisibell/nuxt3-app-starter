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

const route = useRoute()

const { data } = await useAsyncData(() => {
  return Promise.resolve({ description: `这是描述-${route.meta.pageName}` })
})

useSeoMeta({
  description: data.value?.description,
})

useRouteCache((helper) => {
  const cachedTimes = 1 * 60 * 60 * 24 // 1 天

  helper.setCacheable().setMaxAge(cachedTimes)
})
</script>
