<template>
  <div class="view-return-info">
    <div
      v-for="(v, i) in items"
      :key="i"
      class="mb-8"
    >
      <BaseReturnPanel
        :base-info="v"
        :table-data="v.refundDetails || []"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IReturnListItemInfo } from '~/composables/api/interfaces/refund'
import { useRefundApi } from '~/composables/api/modules/refund'

definePageMeta({
  title: '查看退货',
})

const route = useRoute()

useHead({
  title: route.meta.title as string,
})

const query = computed(() => route.query)
const orderSn = computed(() => query.value.orderSn as string)

const RefundApi = useRefundApi()

const loading = ref(false)
const items = ref<IReturnListItemInfo[]>([])
const fetchReturnInfo = async () => {
  try {
    const params = {
      orderSn: orderSn.value,
      returnSn: '',
      startTime: '',
      endTime: '',
      status: '',
      page: 1,
      pageSize: 100,
    }

    loading.value = true
    const { code, data } = await RefundApi.list(params)

    if (code === 0) {
      const { list } = data || {}

      items.value = list || []
    }
  }
  finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchReturnInfo()
})
</script>
