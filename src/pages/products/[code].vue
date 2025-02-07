<template>
  <ProductsDetail />
</template>

<script setup lang="ts">
import ProductsDetail from '~/explicit-components/views/products/Detail/index.vue'

const route = useRoute()

const goodsCode = computed(() => route.params.code as string)

useHead({
  title: `${goodsCode.value}`,
})
</script>
