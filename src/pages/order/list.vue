<template>
  <OrderList />
</template>

<script lang="ts" setup>
import OrderList from '~/explicit-components/views/order/List/index.vue'

definePageMeta({
  title: '订单列表',
})

const route = useRoute()

useHead({
  title: route.meta.title as string,
})
</script>
