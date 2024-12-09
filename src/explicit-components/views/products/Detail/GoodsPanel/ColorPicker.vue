<template>
  <AttrWrapper
    v-if="form"
    label="颜色:"
  >
    <v-autocomplete
      v-model="form.color"
      :items="items"
      item-title="name"
      item-value="value"
      placeholder="请选择"
      persistent-placeholder
      variant="outlined"
      hide-details
      density="compact"
      clearable
      color="primary"
      @update:model-value="handleChange"
    />
  </AttrWrapper>
</template>

<script setup lang="ts">
import AttrWrapper from './AttrWrapper.vue'
import {
  AddToCartFormInjectionSymbol,
  UpdateDynamicPriceInjectionSymbol,
  SetFormQuantityInjectionSymbol,
  UpdateDynamicAttrSymbol,
  SetFormColorInjecttionSymbol,
  UpdateDynamicOptimalPriceInjectionSymbol,
  GetGoodsMoqInfoInjectionSymbol,
} from '~/composables/logic/useAddToCart'
import type { IGoodsDetailAttrObject } from '~/composables/api/interfaces/goods'

const props = withDefaults(defineProps<{
  items: IGoodsDetailAttrObject[]
  primaryCategory: number
  secondaryCategory: number
}>(), {
  items: () => [],
  primaryCategory: 0,
  secondaryCategory: 0,
})

const { items } = toRefs(props)

const form = inject(AddToCartFormInjectionSymbol)
const updateDynamicPrice = inject(UpdateDynamicPriceInjectionSymbol)
const setFormQuantity = inject(SetFormQuantityInjectionSymbol)
const updateDynamicAttr = inject(UpdateDynamicAttrSymbol)
const setFormColor = inject(SetFormColorInjecttionSymbol)
const updateDynamicOptimalPrice = inject(
  UpdateDynamicOptimalPriceInjectionSymbol,
)

const getGoodsMoqInfo = inject(GetGoodsMoqInfoInjectionSymbol)

const handleChange = () => {
  if (setFormQuantity) {
    setFormQuantity(1)
  }

  if (updateDynamicPrice) {
    updateDynamicPrice()
  }

  // 获取可用尺码
  if (updateDynamicAttr) {
    updateDynamicAttr(2, form?.value.color)
  }

  // 获取可用规格
  // 拉链，胸棉除外

  if (![8, 10].includes(props.secondaryCategory)) {
    if (updateDynamicAttr) {
      updateDynamicAttr(4, form?.value.color)
    }
  }

  // 获取最优价格提示
  if (updateDynamicOptimalPrice) {
    updateDynamicOptimalPrice()
  }

  // 最低起订量
  if (getGoodsMoqInfo) {
    getGoodsMoqInfo()
  }
}

watch(
  items,
  (arr) => {
    if (arr.every(v => v.value !== form?.value.color)) {
      if (setFormColor) {
        setFormColor('')
      }
    }
  },
  {
    deep: true,
  },
)
</script>

<style lang="scss" scoped>
$--color: #9e9e9e;

:deep() {
  .v-text-field {
    input {
      color: $--color;
    }
  }
}
</style>
