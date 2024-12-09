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

const props = withDefaults(defineProps<{
  items: IGoodsInfoObject[]
  viewMode: string
}>(), {
  items: () => [],
  viewMode: 'big',
})

const perRowCols = computed(() => (props.viewMode === 'big' ? 4 : 3))
const imgHeight = computed(() => (props.viewMode === 'big' ? 280 : 220))
</script>
