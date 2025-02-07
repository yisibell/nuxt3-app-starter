<template>
  <v-btn
    v-show="visible"
    dark
    position="fixed"
    location="right bottom"
    color="primary"
    size="large"
    class="mb-4 mr-4"
    icon="mdi-arrow-up"
    @click="scrollToTop"
  />
</template>

<script setup lang="ts">
import { useGoTo } from 'vuetify'

const goTo = useGoTo()

const scrollToTop = () => {
  goTo(0)
}

const visible = ref(false)

const scrollHandler = () => {
  visible.value = window.scrollY >= 500
}

onMounted(() => {
  scrollHandler()
  window.addEventListener('scroll', scrollHandler)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', scrollHandler)
})
</script>
