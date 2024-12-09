<template>
  <AttrWrapper
    v-if="form"
    label="尺码:"
  >
    <v-chip-group
      v-model="form.size"
      selected-class="text-deep-purple-accent-4"
      column
      @update:model-value="handleChange"
    >
      <v-chip
        v-for="(v, i) in items"
        :key="i"
        :value="v.value"
      >
        {{ v.name }}
      </v-chip>
    </v-chip-group>
  </AttrWrapper>
</template>

<script setup lang="ts">
import AttrWrapper from './AttrWrapper.vue'
import {
  AddToCartFormInjectionSymbol,
  UpdateDynamicPriceInjectionSymbol,
  SetFormQuantityInjectionSymbol,
  UpdateDynamicAttrSymbol,
} from '~/composables/logic/useAddToCart'
import type { IGoodsDetailAttrObject } from '~/composables/api/interfaces/goods'

withDefaults(defineProps<{
  items: IGoodsDetailAttrObject[]
}>(), {
  items: () => [],
})

const form = inject(AddToCartFormInjectionSymbol)
const updateDynamicPrice = inject(UpdateDynamicPriceInjectionSymbol)
const setFormQuantity = inject(SetFormQuantityInjectionSymbol)
const updateDynamicAttr = inject(UpdateDynamicAttrSymbol)

const handleChange = () => {
  if (setFormQuantity) {
    setFormQuantity(1)
  }

  if (updateDynamicPrice) {
    updateDynamicPrice()
  }

  // 获取可用颜色
  if (updateDynamicAttr) {
    updateDynamicAttr(1, form?.value.size)
  }
}
</script>
