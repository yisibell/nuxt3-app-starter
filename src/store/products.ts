import cloneDeep from 'lodash/cloneDeep'
import type {
  IGoodsInfoObject,
  IGetGoodsListParams,
} from '~~/packages/api/modules/goods'
import { $api } from '~~/packages/api'
import { defineStore } from 'pinia'

export const useProductsStore = defineStore('products', {
  state: () => ({
    data: [] as IGoodsInfoObject[],
    loading: false,
    total: 0,
  }),
  actions: {
    SET_DATA(payload: IGoodsInfoObject[]) {
      this.data = Array.isArray(payload) ? payload : []
    },
    SET_LOADING(payload: boolean) {
      this.loading = payload
    },
    SET_TOTAL(payload: number) {
      this.total = payload
    },
    async fetchGoodsList(payload: IGetGoodsListParams) {
      try {
        const params = cloneDeep(payload)

        if (params.keyword) {
          params.topCategory = 0
          params.secondaryCategory = 0
        }

        this.SET_LOADING(true)
        const { code, data } = await $api.goods.list(params)
        if (code === 0) {
          const { list, total } = data || {}

          this.SET_DATA(Array.isArray(list) ? list : [])
          this.SET_TOTAL(total || 0)
        }
      } catch (err) {
        console.error(err)
      } finally {
        this.SET_LOADING(false)
      }
    },
  },
})
