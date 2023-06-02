<template>
  <div class="pa-4">
    <h3>Home</h3>

    <div><BaseButton text="button" /> <NormalButton text="need import" /></div>

    <div><NuxtLink to="/demo/counter">Go Counter demo</NuxtLink></div>

    <div class="py-4">
      <v-btn color="primary">test</v-btn>
    </div>
  </div>
</template>

<script setup>
import NormalButton from '~/explicit-components/normal/Button.vue'
import { useSiteStore } from '~/store/site'

definePageMeta({
  layout: 'custom',
})

const siteStore = useSiteStore()
const nuxtData = useNuxtData()
const nuxtApp = useNuxtApp()

onMounted(() => {
  siteStore.setToken('this is a demo token')
  console.log('nuxt data', nuxtData)
  console.log('nuxt app', nuxtApp)
})
</script>
