<template>
  <div class="specification-info">
    <v-card
      color="#385F73"
      :elevation="0"
    >
      <v-card-text
        v-if="specsInfo"
        class="text-caption text-white"
      >
        <b>包装规格：</b>
        <span>{{ specsInfo }}。</span>
      </v-card-text>

      <v-card-text
        v-else-if="packSpec && packSpec.num"
        class="text-caption text-white"
      >
        <b>包装规格：</b>
        <span>
          {{ packSpec.num }}{{ packSpec.unit }}/{{ packSpec.packUnit }}。
        </span>
      </v-card-text>

      <v-card-text
        v-if="buyTips"
        class="text-caption text-white"
      >
        <b>购买须知：</b>
        <span> 面料按支购买时，预定后按面料实际米数结算。 </span>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import type { IGoodsDetailObject } from '~/composables/api/interfaces/goods'

const props = withDefaults(defineProps<{
  goodsInfo: IGoodsDetailObject
  specsInfo?: string
}>(), {

})

const { goodsInfo } = toRefs(props)

const primaryCategory = computed(() => goodsInfo.value?.primaryCategory)
const packSpec = computed(() => goodsInfo.value.packSpec)

// 面料
const buyTips = computed(() => primaryCategory.value === 6)
</script>
