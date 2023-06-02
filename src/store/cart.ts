import {
  ICartItemObject,
  IUpdateCartParams,
} from '~~/packages/api/modules/cart'
import { $api } from '~~/packages/api'
import { $layer } from '~/plugins/layer'
import {
  IGetGoodsPriceParams,
  IDynamicGoodsPriceObject,
} from '~~/packages/api/modules/goods'

import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    loading: false,
    totalPrice: 0,
    totalNumber: 0,
    items: [] as ICartItemObject[],
    checkedItemIds: [] as number[],
  }),
  getters: {
    totalGoodsNumber(state) {
      return state.items.reduce((res, v) => {
        res += v.quantity

        return res
      }, 0)
    },
    checkedItems(state) {
      return state.items.filter((v) => state.checkedItemIds.includes(v.id))
    },
  },
  actions: {
    SET_CHECKED_ITEM_IDS(payload: number[]) {
      this.checkedItemIds = payload
    },
    SET_ITEMS(payload: ICartItemObject[]) {
      this.items = payload
    },
    UPDATE_ITEM_PRICE(payload: {
      index: number
      data: IDynamicGoodsPriceObject
    }) {
      const { stockType, price, total, discountPrice, discountTotalPrice } =
        payload.data || {}

      const item = this.items[payload.index]
      this.items[payload.index] = {
        ...item,
        stockType,
        price,
        total,
        discountPrice,
        discountTotalPrice,
      }

      this.items = [...this.items]
    },
    SET_LOADING(payload: boolean) {
      this.loading = payload
    },
    SET_TOTAL_PRICE(payload: number) {
      this.totalPrice = payload
    },
    SET_TOTAL_NUMBER(payload: number) {
      this.totalNumber = payload
    },
    async fetchCartList(reloadPrice: boolean = true) {
      try {
        this.SET_LOADING(true)
        const { code, data } = await $api.cart.list()
        const { list, totalPrice, totalNumber } = data || {}

        if (code === 0) {
          this.SET_ITEMS(Array.isArray(list) ? list : [])

          this.SET_TOTAL_PRICE(totalPrice)

          this.SET_TOTAL_NUMBER(totalNumber)

          if (reloadPrice) {
            this.updateCartGoodsPrice()
          }
        }
      } finally {
        this.SET_LOADING(false)
      }
    },
    async updateCartItem(payload: IUpdateCartParams) {
      try {
        const { code, msg } = await $api.cart.update(payload, true)

        if (code !== 0) {
          setTimeout(() => {
            $layer.toast(msg || '操作失败', { icon: 'error' })
          }, 500)
        }
      } finally {
        this.fetchCartList()
      }
    },
    async removeCartItem(payload: number[]) {
      try {
        const { code, msg } = await $api.cart.remove({ cartId: payload }, true)

        if (code !== 0) {
          setTimeout(() => {
            $layer.toast(msg || '操作失败', { icon: 'error' })
          }, 500)
        }
      } finally {
        this.fetchCartList()
      }
    },
    async updateCartGoodsPrice() {
      const items = this.checkedItems as ICartItemObject[]

      if (!items.length) return

      const params = items.reduce(
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
        { goodsList: [] } as IGetGoodsPriceParams
      )

      const { code, data } = await $api.goods.price(params)

      if (code === 0) {
        const { list } = data || {}

        list.forEach((v) => {
          const index = this.items.findIndex((e) => e.id === v.uniqueId)

          this.UPDATE_ITEM_PRICE({ index, data: v })
        })
      }
    },
  },
})
