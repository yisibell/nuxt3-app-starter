<template>
  <div class="pa-2 d-flex align-center flex-wrap">
    <div class="mr-3">
      <v-img
        :src="imgSrc"
        width="50"
        contain
      />
    </div>
    <div class="text-left text-grey text-caption">
      <div>{{ data.code || data.number }}</div>
      <div v-if="data.size">
        尺码: {{ data.size }}
      </div>
      <div v-if="data.color">
        颜色: {{ data.color }}
      </div>
      <div v-if="data.specs">
        规格: {{ data.specs }}
      </div>
      <div v-if="data.clothSeedName">
        布种: {{ getClothSeedInfo }}
      </div>
      <div v-if="data.unit">
        单位: {{ data.unit }}
      </div>
    </div>
    <div
      v-if="data.shipTime > 0"
      class="text-warning text-caption"
    >
      预计 <span>{{ shipDate }}</span> 发货
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import type { IRefundDetailItem } from '~/composables/api/interfaces/refund'

const props = defineProps<{
  data: IRefundDetailItem
}>()

const { data } = toRefs(props)

const imgSrc = computed(() => data.value.img || data.value.imgUrl)

const shipDate = computed(() =>
  dayjs(data.value.shipTime).format('YYYY-MM-DD'),
)

const getClothSeedInfo = computed(() => {
  if (Array.isArray(data.value.clothSeedName)) {
    return data.value.clothSeedName
      .map(v => `${v.name}x${v.quantity}`)
      .join('，')
  }

  return data.value.clothSeedName
})
</script>
