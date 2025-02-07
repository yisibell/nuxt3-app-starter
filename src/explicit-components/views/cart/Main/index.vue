<template>
  <v-card
    flat
    class="cart-main"
  >
    <v-card-text class="px-4">
      <span class="black--text font-weight-bold text-subtitle-1">
        商品数量({{ totalGoodsNumber }})
      </span>

      <v-row class="text-grey-darken-2">
        <v-col :cols="2" />
        <v-col :cols="10">
          <v-row>
            <v-col :md="3">
              商品信息
            </v-col>
            <v-col :md="3">
              单价
            </v-col>
            <v-col
              :md="3"
              class="text-center"
            >
              数量
            </v-col>
            <v-col
              :md="3"
              class="text-center"
            >
              小计
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card-text>

    <v-divider />

    <v-card-text>
      <GoodsRow
        v-for="(v, i) in goodsItems"
        :key="`${v.id}-${i}`"
        :data="v"
        :checked-ids="checkedItemIds"
        @remove="handleRowRemove"
      >
        <template #selection="{ row }">
          <v-checkbox
            v-model="checkedItemIds"
            :value="row.id"
            color="primary"
            hide-details
            multiple
            @update:model-value="handleRowCheckboxChange"
          />
        </template>
      </GoodsRow>
      <OrderSummary
        v-model="isCheckedAll"
        v-model:indeterminate="isIndeterminate"
        :total-goods-number="totalGoodsNumber"
        :checked-item-ids="checkedItemIds"
        @checkbox-change="handleAllCheckboxChange"
      />
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import GoodsRow from './GoodsRow.vue'
import OrderSummary from './OrderSummary.vue'
import { useCartStore } from '~/store/cart'

const CartStore = useCartStore()

const totalGoodsNumber = computed<number>(
  () => CartStore.totalNumber,
)

const goodsItems = computed(() => CartStore.items)
const goodsItemsLength = computed(() => goodsItems.value.length)

const checkedItemIds = computed({
  get() {
    return CartStore.checkedItemIds
  },
  set(val: number[]) {
    CartStore.SET_CHECKED_ITEM_IDS(val)
  },
})

watch(checkedItemIds, () => {
  CartStore.updateCartGoodsPrice()
})

const isCheckedAll = ref(false)
const isIndeterminate = ref(false)

const handleRowRemove = (id: number) => {
  const index = checkedItemIds.value.findIndex(v => v === id)
  const arr = [...checkedItemIds.value]

  arr.splice(index, 1)

  CartStore.SET_CHECKED_ITEM_IDS(arr)
}

const handleRowCheckboxChange = (arr: number[] | null) => {
  if (arr?.length === goodsItemsLength.value) {
    isCheckedAll.value = true
    isIndeterminate.value = false
  }
  else if (!arr || arr?.length === 0) {
    isCheckedAll.value = false
    isIndeterminate.value = false
  }
  else {
    isCheckedAll.value = false
    isIndeterminate.value = true
  }
}

const handleAllCheckboxChange = (isCheckedAll: boolean) => {
  if (isCheckedAll) {
    CartStore.SET_CHECKED_ITEM_IDS(goodsItems.value.map(v => v.id))
  }
  else {
    CartStore.SET_CHECKED_ITEM_IDS([])
  }
}

const autoCheckedAll = () => {
  checkedItemIds.value = goodsItems.value.map(v => v.id)
  isCheckedAll.value = true
}

defineExpose({
  autoCheckedAll,
})
</script>

<style lang="scss" scoped>
.cart-main {
  min-height: 500px;
}
</style>
