<template>
  <div class="delivery-address-picker">
    <div
      v-for="(v, i) in items"
      :key="i"
      class="delivery-address-picker__item"
      :class="{ selected: isSelected(v), disabled }"
      @click="handleChange(v)"
    >
      <div class="delivery-address-picker__item-content">
        <div class="delivery-address-picker__item-title">
          {{ v.contact }}
        </div>
        <div class="delivery-address-picker__item-address">
          {{ v.address }}
        </div>
        <div class="delivery-address-picker__item-phone">
          {{ v.phone }}
        </div>
      </div>
      <div v-if="v.isDefault">
        默认地址
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IUserAddressData } from '~/composables/api/interfaces/user'

export type IDeliveryAddressItem = IUserAddressData['addresses'][0]

const props = withDefaults(defineProps<{
  modelValue?: IDeliveryAddressItem
  items: IDeliveryAddressItem[]
  disabled?: boolean
}>(), {})

const emit = defineEmits(['update:modelValue'])

const selected = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})

const isSelected = (row: IDeliveryAddressItem) => {
  return row.id === selected.value?.id
}

const handleChange = (row: IDeliveryAddressItem) => {
  if (props.disabled) return
  selected.value = row
}
</script>

<style lang="scss" scoped>
.delivery-address-picker {
  width: 50%;

  &__item {
    min-height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border: 1px solid #86868b;
    border-radius: 12px;
    box-sizing: border-box;
    cursor: pointer;
    margin-bottom: 12px;

    &.selected {
      border-width: 2px;
      border-color: rgb(var(--v-theme-primary));
    }

    &.disabled {
      cursor: default;
    }
  }

  &__item-title {
    font-weight: 600;
    color: #1d1d1f;
    font-size: 16px;
  }

  &__item-address,
  &__item-phone {
    font-size: 12px;
  }
}
</style>
