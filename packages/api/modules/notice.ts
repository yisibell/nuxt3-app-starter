import {
  IApiModuleContainer,
  IResponseInstance,
} from '~~/packages/types/apiRepository'

export interface IGetWillReceivedOrdersRes {
  list: Array<{
    orderSn: string
    orderId: number
  }>
}

export interface INoticeApiModuleInstance {
  // 获取待确认收货订单
  getWillReceivedOrders(): Promise<IResponseInstance<IGetWillReceivedOrdersRes>>
}

const noticeApi: IApiModuleContainer<INoticeApiModuleInstance> = (request) => ({
  getWillReceivedOrders() {
    return request({
      url: '/news/auto',
      method: 'post',
    })
  },
})

export default noticeApi
