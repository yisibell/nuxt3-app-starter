<template>
  <v-dialog
    :value="dialogVisible"
    persistent
    max-width="420"
    @input="handleInput"
  >
    <v-card>
      <v-toolbar dense flat class="d-flex justify-end">
        <v-btn icon small @click="handleClose">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-title class="d-flex justify-center pt-0 pb-6"
        >收货提醒</v-card-title
      >

      <v-card-text>
        您有以下订单未确认收货，即将自动签收，请及时处理！
      </v-card-text>

      <v-card-text>
        <div v-for="v in orderSns" :key="v.orderSn" class="mb-2">
          <span
            class="primary--text cursor-pointer"
            @click="handleToOrderDetail(v.orderSn)"
            >{{ v.orderSn }}</span
          >
        </div>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
          color="green darken-1"
          text
          :loading="confirmReceiptLoading"
          @click="handleBatchReceipt"
        >
          一键确认收货
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  ref,
  toRefs,
  useRouter,
  watch,
} from '#imports'
import type { PropType } from 'vue'
import useOrder from '~~/packages/composables/logic/useOrder'
import type { IGetWillReceivedOrdersRes } from '~~/packages/api/modules/notice'

export default defineComponent({
  props: {
    orderSns: {
      type: Array as PropType<IGetWillReceivedOrdersRes['list']>,
      default: () => [],
    },
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue', 'close', 'batch-receipt-success'],
  setup(props, { emit }) {
    const { modelValue } = toRefs(props)
    const dialogVisible = ref<boolean>(modelValue.value)
    const router = useRouter()

    watch(modelValue, (val) => {
      dialogVisible.value = val
    })

    const handleInput = (val: boolean) => {
      dialogVisible.value = val
      emit('update:modelValue', val)
    }

    const handleClose = () => {
      handleInput(false)
      emit('close')
    }

    const { linkToOrderDetail, confirmReceipt, confirmReceiptLoadingMap } =
      useOrder()

    const handleToOrderDetail = (orderSn: string) => {
      handleInput(false)
      linkToOrderDetail(orderSn)
    }

    const orderIds = computed(() =>
      (props.orderSns as IGetWillReceivedOrdersRes['list']).map(
        (v) => v.orderId
      )
    )

    const confirmReceiptLoading = computed(
      () => confirmReceiptLoadingMap.value[orderIds.value[0]]
    )

    const handleBatchReceipt = () => {
      confirmReceipt(orderIds.value, () => {
        handleInput(false)
        router.push('/order/list')

        emit('batch-receipt-success')
      })
    }

    return {
      dialogVisible,
      handleInput,
      handleClose,
      confirmReceiptLoading,
      handleBatchReceipt,
      handleToOrderDetail,
    }
  },
})
</script>
