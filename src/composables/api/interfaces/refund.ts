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
