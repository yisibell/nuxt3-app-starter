import useRequest from '../request'
import type { ICartList, IBatchAddCartParams, IUpdateCartParams } from '~/composables/api/interfaces/cart'

export const useCartApi = () => {
  const { request } = useRequest()

  // 获取购物车数据列表
  const list = () => {
    return request<{
      list: ICartList
      totalPrice: number
      totalNumber: number
    }>('/cart/list', {
      method: 'post',
    })
  }

  /** 加购 */
  const add = (body: IBatchAddCartParams) => {
    return request('/cart/add', {
      method: 'post',
      body,
    })
  }

  /** 更新 */
  const update = (body: IUpdateCartParams, loading?: boolean) => {
    return request(
      '/cart/update',
      {
        method: 'POST',
        body,
      },
      {
        loading,
      },
    )
  }

  /** 删除 */
  const remove = (body: { cartId: number[] }, loading?: boolean) => {
    return request(
      '/cart/remove',
      {
        method: 'post',
        body,
      },
      {
        loading,
      },
    )
  }

  return {
    list,
    add,
    update,
    remove,
  }
}
