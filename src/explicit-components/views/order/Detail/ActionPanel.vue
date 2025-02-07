<template>
  <div>
    <v-card
      flat
      class="py-8"
    >
      <v-card-text class="d-flex justify-space-around align-center">
        <!-- 订单状态提示 -->
        <div
          v-if="orderStatusTips.title"
          class="d-flex flex-column align-center"
        >
          <v-icon
            size="x-large"
            :color="orderStatusTips.color"
            class="mb-2"
          >
            {{ orderStatusTips.icon }}
          </v-icon>
          <span class="font-weight-bold text-body-1 text-center text-grey-darken-2">
            {{ orderStatusTips.title }}
          </span>
          <ClientOnly>
            <BaseCountDown
              v-if="countDownTime > 0"
              :time="countDownTime"
            />
          </ClientOnly>
        </div>

        <div class="d-flex flex-column align-center">
          <span class="mb-2 font-weight-bold">订单号</span>
          <span class="text-grey-darken-2">{{ orderSn }}</span>
        </div>

        <div class="d-flex flex-column align-center">
          <span class="mb-2 font-weight-bold">创建时间</span>
          <span class="text-grey-darken-2">{{ createTime }}</span>
        </div>

        <!-- 操作 -->
        <div v-if="showConfirmOrderBtn || showCancelOrderBtn">
          <v-btn
            v-if="showConfirmOrderBtn"
            color="primary"
            variant="elevated"
            class="mr-3"
            :loading="confirmOrderLoading"
            @click="handleConfirmOrder"
          >
            确认下单
          </v-btn>
          <v-btn
            v-if="showCancelOrderBtn"
            color="error"
            variant="outlined"
            :loading="cancelOrderLoading"
            @click="handleCancelOrder"
          >
            取消下单
          </v-btn>
        </div>

        <v-btn
          v-if="showConfirmReceiptBtn"
          color="primary"
          class="mr-3"
          variant="elevated"
          :loading="confirmReceiptLoadingMap[orderIds[0]]"
          @click="handleConfirmReceipt"
        >
          确认收货
        </v-btn>

        <BuyAgain
          v-if="showBuyAgainBtn"
          :goods-list="goodsList"
        />
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import BuyAgain from './BuyAgain.vue'
import useOrder, {
  ORDER_CANCELED,
  ORDER_TO_BE_CONFIRMED,
  ORDER_CONFIRMED_BY_COMPANY,
  ORDER_SHIPPED,
  ORDER_RECEIPTED,
  ORDER_HAS_RETURNS,
} from '~/composables/logic/useOrder'

import type { IOrderConfirmParams, IOrderDetailInfo } from '~/composables/api/interfaces/order'

const props = withDefaults(defineProps<{
  goodsList: IOrderDetailInfo['list']
  remainingTimestamp?: number
  orderStatus?: number
  orderSn: string
  orderIds: number[]
  createTime: string
  /** 收货方式  */
  deliveryMethod: number
  deliveryAddress: IOrderConfirmParams['address']
}>(), {
  remainingTimestamp: 0,
  orderStatus: 1,
  orderSn: '',
  orderIds: () => [],
  createTime: '',
  deliveryMethod: 1,
})

const emit = defineEmits(['change'])

const { orderStatus, remainingTimestamp } = toRefs(props)

const orderStatusTips = computed(() => {
  const tips = {
    icon: '',
    title: '',
    color: '',
  }

  if (orderStatus.value === ORDER_TO_BE_CONFIRMED) {
    tips.icon = 'mdi-clock'
    tips.title = '等待确认'
    tips.color = 'primary'
  }
  else if (orderStatus.value === ORDER_CANCELED) {
    tips.icon = 'mdi-close-circle'
    tips.title = '已取消订单'
    tips.color = 'error'
  }
  else if (orderStatus.value === ORDER_CONFIRMED_BY_COMPANY) {
    tips.icon = 'mdi-bag-personal'
    tips.title = '公司已确认'
    tips.color = 'primary'
  }
  else if (orderStatus.value === ORDER_SHIPPED) {
    tips.icon = 'mdi-truck-delivery'
    tips.title = '商品已发货'
    tips.color = 'primary'
  }
  else if (orderStatus.value === ORDER_RECEIPTED) {
    tips.icon = 'mdi-check-circle'
    tips.title = '完成收货'
    tips.color = 'success'
  }
  else if (orderStatus.value === ORDER_HAS_RETURNS) {
    tips.icon = 'mdi-backup-restore'
    tips.title = '有退货'
    tips.color = 'error'
  }

  return tips
})

const {
  confirmOrderLoading,
  confirmOrder,
  cancelOrderLoading,
  cancelOrder,
  isActionValid,
  confirmReceiptLoadingMap,
  confirmReceipt,
} = useOrder()

const showBuyAgainBtn = computed(() => orderStatus.value === ORDER_CANCELED)

const showConfirmOrderBtn = computed(() =>
  isActionValid(orderStatus.value, { name: 'confirmOrder' }),
)
// 确认下单
const handleConfirmOrder = () => {
  confirmOrder(
    {
      orderIds: props.orderIds,
      model: props.deliveryMethod,
      address: props.deliveryAddress,
    },
    () => {
      emit('change')
    },
  )
}

const showCancelOrderBtn = computed(() =>
  isActionValid(orderStatus.value, { name: 'cancelOrder' }),
)
// 取消下单
const handleCancelOrder = () => {
  cancelOrder(props.orderIds as number[], () => {
    emit('change')
  })
}

const showConfirmReceiptBtn = computed(() =>
  isActionValid(orderStatus.value, { name: 'confirmReceipt' }),
)
// 确认收货
const handleConfirmReceipt = () => {
  confirmReceipt(props.orderIds as number[], () => {
    emit('change')
  })
}

const countDownTime = computed(() => {
  return remainingTimestamp.value || 0
})
</script>
