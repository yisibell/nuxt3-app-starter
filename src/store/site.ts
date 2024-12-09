import { defineStore } from 'pinia'
import type { IGetGoodsListParams } from '~/composables/api/interfaces/goods'

export const useSiteStore = defineStore(
  'site',
  () => {
    const topCategoryIndex = ref(0)
    const goodsListSearchParams = ref<IGetGoodsListParams>({
      type: 2,
      keyword: '',
      topCategory: 1,
      secondaryCategory: 0,
      page: 1,
      limit: 48,
    })

    // 鉴权 token
    const accessToken = ref('')

    const SET_TOKEN = (paylode: string) => {
      accessToken.value = paylode
    }

    const SET_GOODS_LIST_SEARCH_PARAMS_TYPE = (paylode: number) => {
      goodsListSearchParams.value.type = paylode
    }

    const SET_GOODS_LIST_SEARCH_PARAMS_KEYWORD = (paylode: string) => {
      goodsListSearchParams.value.keyword = paylode
    }

    const SET_GOODS_LIST_SEARCH_PARAMS_TOPCATEGORY = (paylode: number) => {
      goodsListSearchParams.value.topCategory = paylode
    }

    const SET_GOODS_LIST_SEARCH_PARAMS_SECONDARY_CATEGORY = (payload: number) => {
      goodsListSearchParams.value.secondaryCategory = payload
    }

    const SET_GOODS_LIST_SEARCH_PARAMS_PAGE = (paylode: number) => {
      goodsListSearchParams.value.page = paylode
    }
    const SET_TOP_CATEGORY_INDEX = (payload: number) => {
      topCategoryIndex.value = payload
    }

    const RESET_GOODS_LIST_SEARCH_PARAMS = () => {
      goodsListSearchParams.value.keyword = ''
      topCategoryIndex.value = 0
      goodsListSearchParams.value.topCategory = 1
      goodsListSearchParams.value.secondaryCategory = 0
      goodsListSearchParams.value.page = 1
    }

    return {
      topCategoryIndex,
      goodsListSearchParams,
      accessToken,

      SET_TOKEN,
      SET_GOODS_LIST_SEARCH_PARAMS_TYPE,
      SET_GOODS_LIST_SEARCH_PARAMS_KEYWORD,
      SET_GOODS_LIST_SEARCH_PARAMS_TOPCATEGORY,
      SET_GOODS_LIST_SEARCH_PARAMS_SECONDARY_CATEGORY,
      SET_GOODS_LIST_SEARCH_PARAMS_PAGE,
      SET_TOP_CATEGORY_INDEX,
      RESET_GOODS_LIST_SEARCH_PARAMS,
    }
  },
  {
    persist: {
      storage: persistedState.cookiesWithOptions({
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 365, // 1 年有效期
        secure: false,
      }),
    },
  },
)
