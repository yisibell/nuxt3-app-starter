<template>
  <div
    v-show="info.type !== 4"
    class="text-error text-caption"
  >
    <div v-if="info.type === 1">
      <div v-if="info.add">
        再买{{ info.add.num }} {{ info.add.unit }}，达到染色起订量，单价为
        {{ info.add.price }} 元/{{ info.add.unit }}。
      </div>
    </div>
    <div v-else-if="info.type === 2">
      <div v-if="info.add">
        再买{{ info.add.num }}{{ info.add.unit }}，接近续重进位，价格更优惠，为
        {{ info.add.price }} 元/{{ info.add.unit }}。
      </div>
      <div v-if="info.minus">
        减少{{ info.minus.num
        }}{{ info.minus.unit }}，接近染色起订量，价格更优惠，为
        {{ info.minus.price }} 元/{{ info.minus.unit }}。
      </div>
    </div>
    <div v-else-if="info.type === 3">
      <div v-if="info.add">
        再买{{ info.add.num
        }}{{ info.add.unit }}，接近下一个续重进位，价格更优惠，为
        {{ info.add.price }} 元/{{ info.add.unit }}。
      </div>
      <div v-if="info.minus">
        减少{{ info.minus.num
        }}{{ info.minus.unit }}，接近上一个续重进位，价格更优惠，为
        {{ info.minus.price }} 元/{{ info.minus.unit }}。
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IOptimalPriceRes } from '~/composables/api/interfaces/goods'

withDefaults(defineProps<{
  info: IOptimalPriceRes
}>(), {

})
</script>
