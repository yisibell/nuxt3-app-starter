<template>
  <div>
    <AttrWrapper
      v-if="form"
      label="布种:"
    >
      <v-chip-group
        :model-value="form.clothSeed"
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
  </div>
</template>

<script setup lang="ts">
import AttrWrapper from './AttrWrapper.vue'
import {
  AddToCartFormInjectionSymbol,
  UpdateDynamicPriceInjectionSymbol,
  SetFormQuantityInjectionSymbol,
  SetFormClothSeedInjecttionSymbol,
} from '~/composables/logic/useAddToCart'

withDefaults(defineProps<{
  items: { name: string, value: number }[]
}>(), {})

const form = inject(AddToCartFormInjectionSymbol)
const updateDynamicPrice = inject(UpdateDynamicPriceInjectionSymbol)
const setFormQuantity = inject(SetFormQuantityInjectionSymbol)
const setFormClothSeed = inject(SetFormClothSeedInjecttionSymbol)

const handleChange = (value: number | undefined) => {
  if (typeof value === 'number') {
    if (setFormClothSeed) {
      setFormClothSeed(value)
    }
  }
  else {
    if (setFormClothSeed) {
      setFormClothSeed(0)
    }
  }

  if (setFormQuantity) {
    setFormQuantity(1)
  }

  if (updateDynamicPrice) {
    updateDynamicPrice()
  }
}
</script>
