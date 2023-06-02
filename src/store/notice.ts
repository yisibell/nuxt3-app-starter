import { defineStore } from 'pinia'
import { $api } from '~~/packages/api'
import type { IGetWillReceivedOrdersRes } from '~~/packages/api/modules/notice'

export const useNoticeStore = defineStore('notice', {
  state: () => {
    return {
      willReceivedOrders: [] as IGetWillReceivedOrdersRes['list'],
    }
  },
  actions: {
    SET_WILL_RECEIVED_ORDERS(payload: IGetWillReceivedOrdersRes['list']) {
      this.willReceivedOrders = payload
    },
    async fetchWillReceivedOrders() {
      const { code, data } = await $api.notice.getWillReceivedOrders()
      if (code === 0) {
        const { list } = data || {}

        this.SET_WILL_RECEIVED_ORDERS(Array.isArray(list) ? list : [])

        return this.willReceivedOrders
      } else {
        this.SET_WILL_RECEIVED_ORDERS([])
        return []
      }
    },
  },
})
