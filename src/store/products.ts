import { defineStore } from 'pinia'
import { cloneDeep } from 'lodash-es'
import type { IGoodsInfoObject, IGetGoodsListParams } from '~/composables/api/interfaces/goods'
import { useGoodsApi } from '~/composables/api/modules/goods'

export const useProductsStore = defineStore('products', () => {
  const GoodsApi = useGoodsApi()

  const data = ref<IGoodsInfoObject[]>([])
  const loading = ref(false)
  const total = ref(0)

  const SET_DATA = (payload: IGoodsInfoObject[]) => {
    data.value = Array.isArray(payload) ? payload : []
  }

  const SET_LOADING = (payload: boolean) => {
    loading.value = payload
  }

  const SET_TOTAL = (payload: number) => {
    total.value = payload
  }

  const fetchGoodsList = async (payload: IGetGoodsListParams) => {
    try {
      const params = cloneDeep(payload)

      if (params.keyword) {
        params.topCategory = 0
        params.secondaryCategory = 0
      }

      SET_LOADING(true)
      const { code, data } = await GoodsApi.list(params)
      if (code === 0) {
        SET_DATA(Array.isArray(data?.list) ? data?.list : [])

        SET_TOTAL(data?.total || 0)
      }
    }
    catch (err) {
      console.error(err)
    }
    finally {
      SET_LOADING(false)
    }
  }

  return {
    data,
    loading,
    total,

    SET_DATA,
    SET_LOADING,
    SET_TOTAL,

    fetchGoodsList,
  }
})
