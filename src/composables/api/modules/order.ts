import useRequest from '../request'
import type { IOrderCommitSuccessRes, IOrderConfirmParams,
  IOrderDetailInfo, IOrderStatusChangeParams, IGetOrderListParams, IOrderListInfo } from '~/composables/api/interfaces/order'

export const useOrderApi = () => {
  const { request } = useRequest()

  /** 订单提交 */
  const commit = (body: {
    cartId: string
  }) => request<IOrderCommitSuccessRes>('/order/commit', {
    method: 'post',
    body,
  })

  /** 订单详情 */
  const detail = (body: { orderSn: string }) => request<IOrderDetailInfo>('/order/detail', { method: 'POST', body })

  /** 订单确认 */
  const confirm = (body: IOrderConfirmParams) => request('/order/confirm', { method: 'POST', body })

  /** 变更订单状态 */
  const changeStatus = (body: IOrderStatusChangeParams) => request('/order/status', { method: 'POST', body })

  /** 订单列表 */
  const list = (body: IGetOrderListParams) => request<{ list: IOrderListInfo[], total: number }>('/order/list', { method: 'POST', body })

  return {
    commit,
    detail,
    confirm,
    changeStatus,
    list,
  }
}
