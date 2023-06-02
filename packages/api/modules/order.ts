import {
  IApiModuleContainer,
  IResponseInstance,
} from '~~/packages/types/apiRepository'

export interface IOrderCommitSuccessRes {
  orderSn: string
}

export interface IOrderDetailInfo {
  remainingTimestamp: number // 自动收货剩余时间戳
  commitTime: string
  confirmTime: string
  companyConfirmTime: string
  goodsDeliveryTime: string
  completeReceiptTime: string
  orderStatus: number
  orderSn: string
  orderIds: number[]
  createTime: string
  contact: string
  mobile: string
  address: string
  distributionMode: number
  showSlash?: boolean
  totalPrice: number
  total: number
  originalPrice: number
  specialPrice: number
  list: Array<{
    img: string
    code: string
    unit: string
    price: number
    showSlash?: boolean // 金额是否预定后确定
    currency: string
    totalPrice: number
    reserveStatus: boolean // 是否完成预定
    listingNumber: string[] // 挂牌号
    remark: string
    goodsId: number
    color?: string
    colorEn?: string
    size?: string
    specs?: string
    specsId?: number
    specsList?: {
      name: string
      value: number
    }[]
    quantity: number
    shipTime: number
    clothSeedName?: string
    clothSeedId?: number
    clothSeedList?: {
      clothSeedId: number
      name: string
      quantity: number
      unit: string
    }[]
  }>
}

export interface IOrderListInfo {
  listingNumber?: string[]
  orderSn: string
  time: string
  price: number
  showSlash?: boolean // 金额是否预定后确定
  warehouse: string[] // 仓库
  status: {
    code: string
    name: string
  }
  detail: Array<{
    number: string
    color: string
    colorEn: string
    price: number
    unit: string
    quantity: number
    remark: string
  }>
  waybillNo: {
    mode: number
    name: string
    no: string
  }
  refundableQuantity: number // 剩余可退货数
  children?: IOrderListInfo[]
}

export interface IOrderConfirmParams {
  orderIds: number[]
  model: number // 收货方式 1:物流配送，2:自提
}

export interface IOrderStatusChangeParams {
  orderIds: number[]
  status: number
}

export type IGetOrderListCategoriesParam = Array<{
  p: number
  s: number
}>

export interface IGetOrderListParams {
  page: number
  limit: number
  orderSn?: string
  startDate?: string
  endDate?: string
  status?: number[]
  categories?: IGetOrderListCategoriesParam
  listingNumber?: string
}

export interface IOrderApiModuleInstance {
  // 订单提交
  commit(data: {
    cartId: string
  }): Promise<IResponseInstance<IOrderCommitSuccessRes>>

  detail(data: {
    orderSn: string
  }): Promise<IResponseInstance<IOrderDetailInfo>>

  // 订单确认
  confirm(data: IOrderConfirmParams): Promise<IResponseInstance<{}>>

  // 变更订单状态
  changeStatus(data: IOrderStatusChangeParams): Promise<IResponseInstance<{}>>

  // 订单列表
  list(
    data: IGetOrderListParams
  ): Promise<IResponseInstance<{ list: IOrderListInfo[]; total: number }>>
}

const orderApi: IApiModuleContainer<IOrderApiModuleInstance> = (request) => ({
  commit(data) {
    return request({
      url: '/order/commit',
      method: 'post',
      data,
    })
  },
  detail(data) {
    return request({
      url: '/order/detail',
      method: 'post',
      data,
    })
  },
  confirm(data) {
    return request({
      url: '/order/confirm',
      method: 'post',
      data,
    })
  },
  changeStatus(data) {
    return request({
      url: '/order/status',
      method: 'post',
      data,
    })
  },
  list(data) {
    return request({
      url: '/order/list',
      method: 'post',
      data,
    })
  },
})

export default orderApi
