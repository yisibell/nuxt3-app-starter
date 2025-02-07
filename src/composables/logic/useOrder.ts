import { useOrderApi } from '~/composables/api/modules/order'
import type { IOrderConfirmParams } from '~/composables/api/interfaces/order'
import { $layer } from '~/utils/layer'
import { useNoticeStore } from '~/store/notice'

export const ORDER_CANCELED = 0
export const ORDER_TO_BE_CONFIRMED = 1
export const ORDER_CONFIRMED = 2
export const ORDER_CONFIRMED_BY_COMPANY = 3
export const ORDER_CANCELED_BY_COMPANY = 4
export const ORDER_SHIPPED = 5
export const ORDER_RECEIPTED = 6
export const ORDER_HAS_RETURNS = 7

const useOrder = () => {
  const OrderApi = useOrderApi()
  const NoticeStore = useNoticeStore()

  const orderStatusOptions = [
    { label: '已取消', value: ORDER_CANCELED },
    {
      label: '待确认',
      value: ORDER_TO_BE_CONFIRMED,
      confirmOrder: true,
      cancelOrder: true,
    },
    { label: '已确认', value: ORDER_CONFIRMED, cancelOrder: true },
    { label: '公司确认', value: ORDER_CONFIRMED_BY_COMPANY },
    { label: '公司取消', value: ORDER_CANCELED_BY_COMPANY },
    { label: '已发货', value: ORDER_SHIPPED, confirmReceipt: true },
    { label: '已收货', value: ORDER_RECEIPTED, applyForReturn: true },
    {
      label: '有退货',
      value: ORDER_HAS_RETURNS,
      applyForReturn: true,
      viewReturnInfo: true,
    },
  ]

  const isActionValid = (
    status: number | string,
    action: {
      name:
        | 'confirmOrder' // 确认订单
        | 'cancelOrder' // 取消订单
        | 'confirmReceipt' // 确认收货
        | 'applyForReturn' // 申请退货
        | 'viewReturnInfo' // 查看退货
      extra?: boolean
    },
  ) => {
    const currStatus
      = typeof status === 'string' ? Number.parseInt(status) : status

    const item = orderStatusOptions.find(v => v.value === currStatus)

    const actionBase = item ? item[action.name] : false

    if (typeof action.extra === 'boolean') {
      return actionBase && action.extra
    }

    return actionBase
  }

  const router = useRouter()

  const linkToOrderDetail = (orderSn: string) => {
    if (!orderSn) return
    router.push({ name: 'order-detail', query: { orderSn } })
  }

  const confirmOrderLoading = ref(false)
  // 确认订单
  const confirmOrder = async (
    params: IOrderConfirmParams,
    cb?: () => void,
  ) => {
    try {
      confirmOrderLoading.value = true
      const { code, msg } = await OrderApi.confirm(params)

      if (code === 0) {
        $layer.toast('确认下单成功')
        if (cb) {
          cb()
        }
      }
      else {
        $layer.toast(msg || '确认下单失败', { icon: 'error' })
      }
    }
    finally {
      confirmOrderLoading.value = false
    }
  }

  // 取消订单
  const cancelOrderLoading = ref(false)
  const cancelOrder = async (orderIds: number[], cb?: () => void) => {
    try {
      const params = {
        orderIds,
        status: 0,
      }
      cancelOrderLoading.value = true
      const { code, msg } = await OrderApi.changeStatus(params)

      if (code === 0) {
        $layer.toast('取消订单成功')
        if (cb) {
          cb()
        }
      }
      else {
        $layer.toast(msg || '取消订单失败', { icon: 'error' })
      }
    }
    finally {
      cancelOrderLoading.value = false
    }
  }

  // 确认收货
  const confirmReceiptLoadingMap = ref<{
    [propName: string]: boolean
  }>({
    0: false,
  })
  const confirmReceipt = (orderIds: number[], cb?: () => void) => {
    $layer.confirm('确定要确认收货吗?').then(async ({ isConfirmed }) => {
      if (isConfirmed) {
        try {
          const params = {
            orderIds,
            status: 6,
          }
          confirmReceiptLoadingMap.value[orderIds[0]] = true
          const { code, msg } = await OrderApi.changeStatus(params)

          if (code === 0) {
            $layer.toast('收货成功')

            NoticeStore.fetchWillReceivedOrders()
            if (cb) {
              cb()
            }
          }
          else {
            $layer.toast(msg || '确认收货失败', { icon: 'error' })
          }
        }
        finally {
          confirmReceiptLoadingMap.value[orderIds[0]] = false
        }
      }
    })
  }

  return {
    linkToOrderDetail,
    orderStatusOptions,
    isActionValid,
    confirmOrderLoading,
    confirmOrder,
    cancelOrderLoading,
    cancelOrder,
    confirmReceiptLoadingMap,
    confirmReceipt,
  }
}

export default useOrder
