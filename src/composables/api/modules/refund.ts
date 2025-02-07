import useRequest from '../request'
import type {
  IRefundApplyParams,
  IGetRefundListParams,
  IReturnListItemInfo,
  IRefundApplyListItemInfo,
} from '~/composables/api/interfaces/refund'

export const useRefundApi = () => {
  const { request } = useRequest()

  // 获取分类数据
  const applyList = (body: {
    orderId: number
  }, loading?: boolean) => {
    return request<{ list: IRefundApplyListItemInfo[] }>(
      '/refund/applyItems',
      {
        method: 'post',
        body,
      },
      {
        loading,
      },
    )
  }

  const apply = (body: IRefundApplyParams) => {
    return request(`/refund/apply`, {

      method: 'post',
      body,
    })
  }

  const list = (body: IGetRefundListParams) => {
    return request<{ list: IReturnListItemInfo[], total: number }>('/refund/list', {

      method: 'post',
      body,
    })
  }

  return {
    applyList,
    apply,
    list,

  }
}
