<template>
  <div class="text-caption">
    <div
      v-for="(v, i) in items"
      :key="i"
    >
      <span>{{ v.number }}</span>
      <span>{{ v.color }}-{{ v.colorEn }}</span>
      <span class="mr-2">({{ `${v.quantity}${v.unit}` }})</span>
      <span
        v-if="v.remark"
        class="text-error "
      >{{ v.remark }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IOrderListInfo } from '~/composables/api/interfaces/order'

withDefaults(defineProps<{
  items: IOrderListInfo['detail']
}>(), {
  items: () => [],
})
</script>
