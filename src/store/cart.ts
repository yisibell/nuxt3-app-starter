import { defineStore } from 'pinia'
import type { ICartItemObject, IUpdateCartParams } from '~/composables/api/interfaces/cart'
import type { IDynamicGoodsPriceObject, IGetGoodsPriceParams } from '~/composables/api/interfaces/goods'
import { useCartApi } from '~/composables/api/modules/cart'
import { useGoodsApi } from '~/composables/api/modules/goods'

export const useCartStore = defineStore('cart', () => {
  const CartApi = useCartApi()
  const GoodsApi = useGoodsApi()

  const loading = ref(false)
  const totalPrice = ref(0)
  const totalNumber = ref(0)
  const items = ref<ICartItemObject[]>([])
  const checkedItemIds = ref<number[]>([])

  //
  const totalGoodsNumber = computed(() => {
    return items.value.reduce((res, v) => {
      res += v.quantity

      return res
    }, 0)
  })

  const checkedItems = computed(() => {
    return items.value.filter(v => checkedItemIds.value.includes(v.id))
  })

  //
  const SET_CHECKED_ITEM_IDS = (payload: number[]) => {
    checkedItemIds.value = payload
  }

  const SET_ITEMS = (payload: ICartItemObject[]) => {
    items.value = payload
  }

  const UPDATE_ITEM_PRICE = (
    payload: {
      index: number
      data: IDynamicGoodsPriceObject
    },
  ) => {
    const { stockType, price, total, discountPrice, discountTotalPrice }
      = payload.data || {}

    const item = items.value[payload.index]

    items.value[payload.index] = {
      ...item,
      stockType,
      price,
      total,
      discountPrice,
      discountTotalPrice,
    }

    items.value = [...items.value]
  }

  const SET_LOADING = (payload: boolean) => {
    loading.value = payload
  }

  const SET_TOTAL_PRICE = (payload: number) => {
    totalPrice.value = payload
  }

  const SET_TOTAL_NUMBER = (payload: number) => {
    totalNumber.value = payload
  }

  //

  const fetchCartList = async (reloadPrice: boolean = true) => {
    try {
      SET_LOADING(true)
      const { code, data } = await CartApi.list()
      const { list, totalPrice, totalNumber } = data || {}

      if (code === 0) {
        SET_ITEMS(Array.isArray(list) ? list : [])

        SET_TOTAL_PRICE(totalPrice)

        SET_TOTAL_NUMBER(totalNumber)

        if (reloadPrice) {
          await updateCartGoodsPrice()
        }
      }
    }
    finally {
      SET_LOADING(false)
    }
  }

  const updateCartItem = async (payload: IUpdateCartParams) => {
    try {
      const { code, msg } = await CartApi.update(payload, true)

      if (code !== 0) {
        setTimeout(() => {
          $layer.toast(msg || '操作失败', { icon: 'error' })
        }, 500)
      }
    }
    finally {
      fetchCartList()
    }
  }

  const removeCartItem = async (payload: number[]) => {
    try {
      const { code, msg } = await CartApi.remove({ cartId: payload }, true)

      if (code !== 0) {
        setTimeout(() => {
          $layer.toast(msg || '操作失败', { icon: 'error' })
        }, 500)
      }
    }
    finally {
      fetchCartList()
    }
  }

  const updateCartGoodsPrice = async () => {
    const cItems = checkedItems.value

    if (!cItems.length) return

    const params = cItems.reduce(
      (res, v) => {
        res.goodsList.push({
          uniqueId: v.id,
          goodsId: v.gid,
          quantity: v.quantity,
          color: v.colorEn,
          size: v.size,
          specs: v.specs?.value || 0,
        })

        return res
      },
      { goodsList: [] } as IGetGoodsPriceParams,
    )

    const { code, data } = await GoodsApi.price(params)

    if (code === 0) {
      const { list } = data || {}

      list.forEach((v) => {
        const index = items.value.findIndex(e => e.id === v.uniqueId)

        UPDATE_ITEM_PRICE({ index, data: v })
      })
    }
  }

  return {
    loading,
    totalPrice,
    totalNumber,
    items,
    checkedItemIds,

    totalGoodsNumber,
    checkedItems,

    SET_CHECKED_ITEM_IDS,
    SET_ITEMS,
    UPDATE_ITEM_PRICE,
    SET_LOADING,
    SET_TOTAL_PRICE,
    SET_TOTAL_NUMBER,

    fetchCartList,
    updateCartItem,
    removeCartItem,
    updateCartGoodsPrice,

  }
})
