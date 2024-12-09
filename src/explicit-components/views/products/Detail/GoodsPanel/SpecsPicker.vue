<template>
  <div>
    <AttrWrapper v-show="tips">
      <span class="fs-12 text-red">
        {{ tips }}
      </span>
    </AttrWrapper>

    <AttrWrapper
      v-if="form"
      label="规格:"
    >
      <v-chip-group
        :model-value="selectedSpecs"
        selected-class="text-deep-purple-accent-4"
        column
        @update:model-value="handleChange"
      >
        <v-chip
          v-for="(v) in items"
          :key="v.value"
          :value="v.value"
          :title="v.value"
        >
          {{ v.name }}
        </v-chip>
      </v-chip-group>
    </AttrWrapper>
  </div>
</template>

<script setup lang="ts">
import AttrWrapper from './AttrWrapper.vue'
import {
  AddToCartFormInjectionSymbol,
  UpdateDynamicPriceInjectionSymbol,
  SetFormQuantityInjectionSymbol,
  SetFormSpecsInjecttionSymbol,
  UpdateDynamicAttrSymbol,
} from '~/composables/logic/useAddToCart'
import type { IGoodsDetailSpecsObject } from '~/composables/api/interfaces/goods'

const props = withDefaults(defineProps<{
  items: IGoodsDetailSpecsObject[]
  secondaryCategory: number
  tips?: string
}>(), {
  items: () => [],
})

const form = inject(AddToCartFormInjectionSymbol)
const updateDynamicPrice = inject(UpdateDynamicPriceInjectionSymbol)
const setFormQuantity = inject(SetFormQuantityInjectionSymbol)
const setFormSpecs = inject(SetFormSpecsInjecttionSymbol)
const updateDynamicAttr = inject(UpdateDynamicAttrSymbol)

const selectedSpecs = computed({
  get() {
    return form?.value.specs || undefined
  },
  set(value?: number) {
    if (form) {
      form.value.specs = value
    }
  },
})

const handleChange = (value?: number) => {
  if (typeof value === 'number') {
    if (setFormSpecs) {
      setFormSpecs(value)
    }
  }
  else {
    if (setFormSpecs) {
      setFormSpecs(0)
    }
  }

  if (setFormQuantity) {
    setFormQuantity(1)
  }

  if (updateDynamicPrice) {
    updateDynamicPrice()
  }

  // 获取可用颜色
  if (![8, 10].includes(props.secondaryCategory)) {
    const keyword = form?.value.specs

    if (updateDynamicAttr) {
      updateDynamicAttr(3, keyword ? keyword + '' : '')
    }
  }
}
</script>
