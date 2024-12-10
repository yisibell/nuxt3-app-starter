<template>
  <ProductsMain />
</template>

<script lang="ts" setup>
import ProductsMain from '~/explicit-components/views/products/Main/index.vue'

definePageMeta({
  title: '首页',
})

const route = useRoute()

useHead({
  title: route.meta.title as string,
})
</script>
