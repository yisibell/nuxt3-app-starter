import { defineStore } from 'pinia'
import type { IGetWillReceivedOrdersRes } from '~/composables/api/interfaces/notice'
import { useNoticeApi } from '~/composables/api/modules/notice'

export const useNoticeStore = defineStore('notice', () => {
  const willReceivedOrders = ref<IGetWillReceivedOrdersRes['list']>([])

  const { getWillReceivedOrders } = useNoticeApi()

  const fetchWillReceivedOrders = async () => {
    const { code, data } = await getWillReceivedOrders()
    if (code === 0) {
      willReceivedOrders.value = Array.isArray(data?.list) ? data.list : []

      return willReceivedOrders.value
    }
    else {
      willReceivedOrders.value = []
      return []
    }
  }

  return {
    willReceivedOrders,
    fetchWillReceivedOrders,
  }
})
