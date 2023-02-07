<template>
  <div>
    Home <BaseButton text="button" /> <NormalButton text="need import" />
  </div>
</template>

<script setup>
import NormalButton from '~/normal-components/normal/Button.vue'

definePageMeta({
  layout: 'custom',
})

onMounted(() => {
  console.log('this is home page!')
})
</script>
