<template>
  <div class="product-view">
    <div class="product-view__header">
      product
    </div>

    <WithPurchaseMain />
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'ProductView',
})
</script>

<style lang="scss" scoped>
.product-view {
  &__header {
    height: 100px;
    font-size: 30px;
  }
}
</style>
