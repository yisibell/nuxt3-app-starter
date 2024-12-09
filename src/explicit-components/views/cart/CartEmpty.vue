<template>
  <v-empty-state
    headline="Whoops, 404"
    title="购物车内暂时没有商品"
    text="The shopping cart is temporarily empty"
    icon="mdi-magnify"
    action-text="继续逛逛"
    @click:action="navigateTo('/')"
  />
</template>

<script lang="ts" setup>

</script>
