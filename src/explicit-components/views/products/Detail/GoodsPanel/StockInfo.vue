<template>
  <v-card
    flat
    color="grey-lighten-3"
  >
    <v-card-text class="text-grey-darken-1">
      <div>库存量：{{ info.inventory || '0' }} {{ info.unit }}</div>
      <div>预计发货时间：{{ day }}天内</div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import type { IGoodsStockRes } from '~/composables/api/interfaces/goods'

const props = withDefaults(defineProps<{
  info: IGoodsStockRes
}>(), {})

const { info } = toRefs(props)

const shipTime = computed(() => info.value.shipTime || 0)
const day = computed(() => shipTime.value / 1000 / 60 / 60 / 24)
</script>
