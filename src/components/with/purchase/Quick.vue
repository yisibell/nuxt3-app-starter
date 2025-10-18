<template>
  <div class="with-purchase-quick">
    <div class="with-purchase-quick__header">
      quick purchase header
    </div>

    <WithPurchaseMain />
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'WithPurchaseQuick',
})
</script>

<style lang="scss" scoped>
.with-purchase-quick {
  position: fixed;
  right: 0;
  bottom: 56px;
  background-color: sienna;
  width: 100vw;

  &__header {
    color: #fff;
  }
}
</style>
