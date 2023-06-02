import {
  IApiModuleContainer,
  IResponseInstance,
} from '~~/packages/types/apiRepository'

export interface IRefundApplyStockInfo {
  stockNumber: string
  lsiId: number
  leaveQty: number
  applyQty: number
}

export interface IRefundApplyListItemInfo {
  primaryCategory: number
  secondaryCategory: number
  gid: number
  imgUrl: string
  number: string
  color?: string
  size?: string
  specs?: string
  clothSeedName?: string
  unit: string
  qty: number
  reason: string
  description: string
  items: Array<IRefundApplyStockInfo>
}

export interface IRefundApplyParams {
  orderSn: string
  expressCompany: string
  logisticsNo: string
  list: Array<IRefundApplyListItemInfo>
}

export interface IGetRefundListParams {
  page: number
  pageSize: number
  orderSn?: string
  returnSn?: string
  startTime?: string
  endTime?: string
  status: string
  categories?: Array<{
    p: number
    s: number
  }>
}

export interface IRefundDetailItem {
  number: string
  color?: string
  size?: string
  specs?: string
  clothSeedName?: string
  unit: string
  status: string
  reason: string
  description: string
  leaveQty: number
  applyQty: number
  realQty: number
  refundDetailInventorys: Array<{
    stockNumber: string
    leaveQty: number
    applyQty: number
    status: string
  }>
}

export interface IReturnListItemInfo {
  orderSn: string
  returnSn: string
  createTime: string
  logisticsName: string
  logisticsNo: string
  status: string
  shippingFee: number
  refundDetails: Array<IRefundDetailItem>
}

export interface IRefundApiModuleInstance {
  applyList(
    data: {
      orderId: number
    },
    loading?: boolean
  ): Promise<IResponseInstance<{ list: IRefundApplyListItemInfo[] }>>

  apply(data: IRefundApplyParams): Promise<IResponseInstance<{}>>

  list(
    data: IGetRefundListParams
  ): Promise<IResponseInstance<{ list: IReturnListItemInfo[]; total: number }>>
}

const refundApi: IApiModuleContainer<IRefundApiModuleInstance> = (request) => ({
  // 获取分类数据
  applyList(data, loading) {
    return request(
      {
        url: '/refund/applyItems',
        method: 'post',
        data,
      },
      {
        loading,
      }
    )
  },
  apply(data) {
    return request({
      url: `/refund/apply`,
      method: 'post',
      data,
    })
  },
  list(data) {
    return request({
      url: '/refund/list',
      method: 'post',
      data,
    })
  },
})

export default refundApi
