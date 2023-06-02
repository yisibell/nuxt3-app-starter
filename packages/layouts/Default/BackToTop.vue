<template>
  <v-btn
    v-show="visible"
    fab
    dark
    fixed
    right
    bottom
    color="primary"
    @click="scrollToTop"
  >
    <v-icon dark> mdi-arrow-up </v-icon>
  </v-btn>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, onBeforeUnmount } from '#imports'

export default defineComponent({
  setup() {
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
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

    return {
      scrollToTop,
      visible,
    }
  },
})
</script>
