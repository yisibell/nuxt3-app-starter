<template>
  <v-row>
    <v-col
      v-for="(v, i) in items"
      :key="i"
      :cols="6"
      :md="perRowCols"
      :xl="2"
    >
      <GoodsCard
        :data="v"
        :img-height="imgHeight"
      />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import GoodsCard from './GoodsCard.vue'
import type { IGoodsInfoObject } from '~/composables/api/interfaces/goods'
import type { IViewMode } from '~/composables/logic/useProducts'

const props = withDefaults(defineProps<{
  items: IGoodsInfoObject[]
  viewMode: IViewMode
}>(), {
  items: () => [],
  viewMode: 'big',
})

const perRowCols = computed(() => {
  switch (props.viewMode) {
    case 'big':
      return 4
    default:
      return 3
  }
})

const imgHeight = computed(() => {
  switch (props.viewMode) {
    case 'big':
      return 280
    default:
      return 220
  }
})
</script>
