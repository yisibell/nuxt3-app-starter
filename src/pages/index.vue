<template>
  <div>
    <h3>Home</h3>

    <div><BaseButton text="button" /> <NormalButton text="need import" /></div>

    <div><NuxtLink to="/demo/counter">Go Counter demo</NuxtLink></div>
  </div>
</template>

<script setup>
import NormalButton from '~/explicit-components/normal/Button.vue'
import { useSiteStore } from '~/store/site'

definePageMeta({
  layout: 'custom',
})

const siteStore = useSiteStore()

onMounted(() => {
  console.log('this is home page!')
  siteStore.setToken('this is a demo token')
})
</script>
