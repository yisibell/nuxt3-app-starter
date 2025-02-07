<template>
  <div>
    <AttrWrapper
      v-if="form"
      label="数量:"
    >
      <VcStepper
        v-model="form.quantity"
        :max="max"
        :step="step"
        :strict-step="strictStep"
        @change="handleQuantityChange"
      />
    </AttrWrapper>

    <AttrWrapper>
      <OptimalPriceTips
        v-if="dynamicOptimalPrice"
        :info="dynamicOptimalPrice"
      />
    </AttrWrapper>
  </div>
</template>

<script setup lang="ts">
import AttrWrapper from './AttrWrapper.vue'
import OptimalPriceTips from './OptimalPriceTips.vue'
import {
  AddToCartFormInjectionSymbol,
  UpdateDynamicPriceInjectionSymbol,
  DynamicOptimalPriceInjectionSymbol,
  UpdateDynamicOptimalPriceInjectionSymbol,
} from '~/composables/logic/useAddToCart'
import type { IAddCartParams } from '~/composables/api/interfaces/cart'

withDefaults(defineProps<{
  primaryCategory?: number
  max?: number
  step?: number
  strictStep?: boolean
}>(), {
  primaryCategory: 0,
})

const form = inject<IAddCartParams>(AddToCartFormInjectionSymbol)
const updateDynamicPrice = inject(UpdateDynamicPriceInjectionSymbol)
const dynamicOptimalPrice = inject(DynamicOptimalPriceInjectionSymbol)
const updateDynamicOptimalPrice = inject(
  UpdateDynamicOptimalPriceInjectionSymbol,
)

const handleQuantityChange = () => {
  // 获取动态价格
  if (updateDynamicPrice) {
    updateDynamicPrice()
  }

  // 获取最优价格提示
  if (updateDynamicOptimalPrice) {
    updateDynamicOptimalPrice()
  }
}
</script>
