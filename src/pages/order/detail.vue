<template>
  <div>
    <OrderDetail
      v-if="orderDetailData"
      v-model:model-delivery-method="currDeliveryMethod"
      :data="orderDetailData"
      @reload="fetchOrderDetail"
    />
  </div>
</template>

<script setup lang="ts">
import OrderDetail from '~/explicit-components/views/order/Detail/index.vue'
import type { IOrderDetailInfo } from '~/composables/api/interfaces/order'
import { useOrderApi } from '~/composables/api/modules/order'

const route = useRoute()
const router = useRouter()
const query = computed(() => route.query)
const orderSn = computed(() => query.value.orderSn as string)

const OrderApi = useOrderApi()

const currDeliveryMethod = ref(1)

const loading = ref(false)
const orderDetailData = ref<IOrderDetailInfo>()
const fetchOrderDetail = async () => {
  try {
    const params = {
      orderSn: orderSn.value,
    }

    loading.value = true
    const { code, data, msg } = await OrderApi.detail(params)

    if (code === 0) {
      orderDetailData.value = data
      currDeliveryMethod.value = data.distributionMode || 1
    }
    else {
      $layer.toast(msg || '下单失败!', { icon: 'error' })
      router.replace({ name: 'cart' })
    }
  }
  finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchOrderDetail()
})
</script>
