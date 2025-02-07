<template>
  <ReturnList />
</template>

<script lang="ts" setup>
import ReturnList from '~/explicit-components/views/order/ReturnList/index.vue'

definePageMeta({
  title: '退货列表',
})

const route = useRoute()

useHead({
  title: route.meta.title as string,
})
</script>
