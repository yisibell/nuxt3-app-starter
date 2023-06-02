import {
  IApiModuleContainer,
  IResponseInstance,
} from '~~/packages/types/apiRepository'

/**
 * 购物车商品数据对象
 */
export interface ICartItemObject {
  id: number
  gid: number
  img: {
    src: string
  }
  code: string
  color?: string
  style?: string
  size?: string
  colorEn: string
  clothSeedName?: string
  specs?: {
    // 规格
    name: string
    value: number
  }
  specsList?: {
    // 可选规格
    name: string
    value: number
  }[]
  clothSeedList?: {
    clothSeedId: number
    name: string
    quantity: number
    unit: string
  }[]
  unit: string
  currency: string
  price: number // 单价
  discountPrice: number // 折扣单价
  total: number // 小计
  discountTotalPrice: number // 折扣小计
  stockType: boolean // 是否为非常备款
  quantity: number
  showSlash?: boolean // 小计金额不确定，预定后结算
  primaryCategory: number
  secondaryCategory: number
}

export type ICartList = ICartItemObject[]

export interface IAddCartParams {
  goodsId: number
  quantity: number
  color?: string
  size?: string
  specs?: number
  clothSeed?: number
  searchId?: number
  [propName: string]: any
}

export type IBatchAddCartParams = {
  list: IAddCartParams[]
}

export interface IUpdateCartParams {
  cartId: number
  goodsId: number
  number: number
  specs?: number
  clothSeedId?: number
}

export interface ICartApiModuleInstance {
  list(): Promise<
    IResponseInstance<{
      list: ICartList
      totalPrice: number
      totalNumber: number
    }>
  >
  // 加购
  add(data: IBatchAddCartParams): Promise<IResponseInstance<{}>>

  // 更新
  update(
    data: IUpdateCartParams,
    loading?: boolean
  ): Promise<IResponseInstance<{}>>

  // 删除
  remove(
    data: { cartId: number[] },
    loading?: boolean
  ): Promise<IResponseInstance<{}>>
}

const cartApi: IApiModuleContainer<ICartApiModuleInstance> = (request) => ({
  // 获取购物车数据列表
  list() {
    return request({
      url: '/cart/list',
      method: 'post',
    })
  },
  add(data) {
    return request({
      url: '/cart/add',
      method: 'post',
      data,
    })
  },
  update(data, loading) {
    return request(
      {
        url: '/cart/update',
        method: 'POST',
        data,
      },
      {
        loading,
      }
    )
  },
  remove(data, loading) {
    return request(
      {
        url: '/cart/remove',
        method: 'post',
        data,
      },
      {
        loading,
      }
    )
  },
})

export default cartApi
