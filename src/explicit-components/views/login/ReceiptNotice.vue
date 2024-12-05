<template>
  <v-dialog
    v-model="dialogVisible"
    persistent
    max-width="420"
  >
    <v-card>
      <v-toolbar
        density="compact"
      >
        <v-toolbar-title>收货提醒</v-toolbar-title>

        <v-spacer />

        <v-btn
          icon
          size="small"
          @click="handleClose"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text>
        您有以下订单未确认收货，即将自动签收，请及时处理！
      </v-card-text>

      <v-card-text>
        <div
          v-for="v in orderSns"
          :key="v.orderSn"
          class="mb-2"
        >
          <span
            class="text-primary cursor-pointer"
            @click="handleToOrderDetail(v.orderSn)"
          >{{ v.orderSn }}</span>
        </div>
      </v-card-text>

      <v-card-actions>
        <v-spacer />

        <v-btn
          color="green darken-1"
          variant="text"
          :loading="confirmReceiptLoading"
          @click="handleBatchReceipt"
        >
          一键确认收货
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import useOrder from '~/composables/logic/useOrder'
import type { IGetWillReceivedOrdersRes } from '~/composables/api/interfaces/notice'

const props = withDefaults(defineProps<{
  orderSns: IGetWillReceivedOrdersRes['list']
  modelValue: boolean
}>(), {
  orderSns: () => [],
  modelValue: false,
})

const emit = defineEmits(['update:modelValue', 'close', 'batch-receipt-success'])

const dialogVisible = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})

const router = useRouter()

const handleClose = () => {
  dialogVisible.value = false
  emit('close')
}

const { linkToOrderDetail, confirmReceipt, confirmReceiptLoadingMap } = useOrder()

const handleToOrderDetail = (orderSn: string) => {
  dialogVisible.value = false
  linkToOrderDetail(orderSn)
}

const orderIds = computed(() =>
  (props.orderSns as IGetWillReceivedOrdersRes['list']).map(
    v => v.orderId,
  ),
)

const confirmReceiptLoading = computed(
  () => confirmReceiptLoadingMap.value[orderIds.value[0]],
)

const handleBatchReceipt = () => {
  confirmReceipt(orderIds.value, () => {
    dialogVisible.value = false
    router.push('/order/list')

    emit('batch-receipt-success')
  })
}
</script>
