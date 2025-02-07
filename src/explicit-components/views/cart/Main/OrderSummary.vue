<template>
  <v-card
    flat
    class="order-summary"
  >
    <v-card-text class="px-0 py-4 d-flex justify-space-between">
      <div class="d-flex align-center">
        <div class="mr-4">
          <v-checkbox
            v-model="checked"
            :indeterminate="isIndeterminate"
            color="primary"
            hide-details
            :label="checked ? '取消全选' : '全选'"
            @update:model-value="handleChange"
          />
        </div>
        <v-btn
          color="red"
          size="small"
          variant="text"
          :disabled="!isCheckedGoods"
          @click="handleRemoveChecked"
        >
          删除选中商品
        </v-btn>
      </div>

      <div class="d-flex justify-space-between align-center">
        <div class="mr-6">
          <div class="d-flex align-center justify-end">
            <span>
              共
              <span class="text-error">{{ totalGoodsNumber }}</span> 件商品，
            </span>
            <span>
              已选择
              <span class="text-error">{{ checkedTotalGoodsNumber }}</span> 件
            </span>

            <v-divider
              class="mx-3"
              inset
              vertical
            />

            <span>合计金额:</span>
            <span class="text-h6 font-weight-bold ml-3 text-error">
              ￥ {{ checkedTotalPrice }}
            </span>
          </div>

          <template v-if="checkedTotalPrice < checkedOriginTotalPrice">
            <div class="text-right text-error font-weight-bold">
              <span>商品原价:</span>
              <span class="price-display">
                ￥ {{ checkedOriginTotalPrice }}
              </span>
            </div>
            <div class="text-right text-error font-weight-bold">
              <span>共计优惠:</span>
              <span class="price-display"> -￥{{ discountAmount }} </span>
            </div>
          </template>

          <v-alert
            v-show="hasIndefiniteGoods"
            icon="$warning"
            color="wineRed"
            variant="tonal"
            density="compact"
            text="合计金额未包含面料类商品，面料品类商品预定后按实际米数结算"
            class="text-caption"
          />
        </div>

        <v-btn
          color="primary"
          size="large"
          variant="elevated"
          :width="180"
          :loading="commitLoading"
          :disabled="!isCheckedGoods"
          @click="handleCommit"
        >
          提 交
        </v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import * as NP from 'number-precision'
import useOrder from '~/composables/logic/useOrder'
import { useCartStore } from '~/store/cart'
import { useOrderApi } from '~/composables/api/modules/order'

const props = withDefaults(defineProps<{
  checkedItemIds: number[]
  totalGoodsNumber: number
}>(), {
  checkedItemIds: () => [],
  totalGoodsNumber: 0,
})

const checked = defineModel<boolean>()
const isIndeterminate = defineModel<boolean>('indeterminate')

const emit = defineEmits(['checkbox-change'])

const { checkedItemIds } = toRefs(props)

const CartStore = useCartStore()
const OrderApi = useOrderApi()

const handleChange = (isChecked: boolean | null) => {
  emit('checkbox-change', isChecked)
}

// const totalPrice = computed(() => CartStore.totalPrice)
const items = computed(() => CartStore.items)
const checkedItems = computed(() =>
  items.value.filter(v => checkedItemIds.value.includes(v.id)),
)

// 是否存在金额不确定的商品
const hasIndefiniteGoods = computed(() =>
  checkedItems.value.some(v => v.showSlash),
)

// 合计金额（原价）
const checkedOriginTotalPrice = computed(() => {
  const total = checkedItems.value
    .filter(v => !v.showSlash)
    .reduce((res, v) => {
      res = NP.plus(res, v.total)

      return res
    }, 0)

  return Number.parseFloat(total.toFixed(2))
})

// 合计金额（折扣价）
const checkedDiscountTotalPrice = computed(() => {
  const total = checkedItems.value
    .filter(v => !v.showSlash)
    .reduce((res, v) => {
      res = NP.plus(
        res,
        v.discountTotalPrice > 0 ? v.discountTotalPrice : v.total,
      )

      return res
    }, 0)

  return Number.parseFloat(total.toFixed(2))
})

// 合计优惠
const discountAmount = computed(() =>
  NP.minus(checkedOriginTotalPrice.value, checkedDiscountTotalPrice.value),
)

// 合计金额（实际）
const checkedTotalPrice = computed(() =>
  NP.minus(checkedOriginTotalPrice.value, discountAmount.value),
)

// 已选择结算商品数
const checkedTotalGoodsNumber = computed(() => {
  return checkedItems.value.length
})

const isCheckedGoods = computed(() => checkedItemIds.value.length > 0)

const handleRemoveChecked = () => {
  $layer.confirm('确定要删除吗').then(async ({ isConfirmed }) => {
    if (isConfirmed) {
      await CartStore.removeCartItem(checkedItemIds.value)
      handleChange(false)
    }
  })
}

// 验证
const validate = () => {
  if (checkedTotalGoodsNumber.value > 1000) {
    $layer.alert('商品件数不能超过 1000')
    return false
  }

  if (checkedTotalPrice.value > 50000) {
    $layer.alert('合计金额不可超过 5w')
    return false
  }

  return true
}

const { linkToOrderDetail } = useOrder()

// 提交
const commitLoading = ref(false)
const handleCommit = async () => {
  if (!validate()) return

  try {
    const params = {
      cartId: props.checkedItemIds.join(','),
    }
    commitLoading.value = true
    const { code, data, msg } = await OrderApi.commit(params)

    const { orderSn } = data || {}

    if (code === 0 && orderSn) {
      linkToOrderDetail(orderSn)
    }
    else {
      $layer.toast(msg || '下单失败!', { icon: 'error' })
    }
  }
  finally {
    commitLoading.value = false
    CartStore.fetchCartList()
  }
}
</script>

<style lang="scss" scoped>
.price-display {
  min-width: 56px;
  display: inline-block;
}
</style>
