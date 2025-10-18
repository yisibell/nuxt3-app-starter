<template>
  <div class="products-view">
    <div class="products-view__header">
      products page
    </div>

    <ProductList />

    <BaseTooltip />
  </div>
</template>

<script lang="ts" setup>
import ProductList from './ProductList.vue'

defineOptions({
  name: 'ProductsView',
})
</script>

<style lang="scss" scoped>
.products-view {
  &__header {
    height: 100px;
  }
}
</style>
