<template>
  <div class="collection-view">
    <div class="collection-view__header">
      products page
    </div>

    <ProductList />

    <BaseTooltip />
  </div>
</template>

<script lang="ts" setup>
import ProductList from '@/explicitComponents/views/products/ProductList.vue'

defineOptions({
  name: 'CollectionView',
})
</script>

<style lang="scss" scoped>
.collection-view {
  &__header {
    height: 100px;
  }
}
</style>
