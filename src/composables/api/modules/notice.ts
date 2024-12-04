import useRequest from '../request'
import type { IGetWillReceivedOrdersRes } from '~/composables/api/interfaces/notice'

export const useNoticeApi = () => {
  const { request } = useRequest()

  /** 获取待确认收货订单 */
  const getWillReceivedOrders = () => {
    return request<IGetWillReceivedOrdersRes>('/news/auto', {
      method: 'post',
    })
  }

  return {
    getWillReceivedOrders,
  }
}
