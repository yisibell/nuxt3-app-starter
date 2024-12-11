import { includes, cloneDeep } from 'lodash-es'
import type {
  IRefundApplyListItemInfo,
  IRefundApplyStockInfo,
  IRefundApplyParams,
} from '~/composables/api/interfaces/refund'
import { $layer } from '~/utils/layer'
import { useRefundApi } from '~/composables/api/modules/refund'

export interface IGetRefundPrecisionParams {
  unit: string
  primaryCategory: number
  secondaryCategory: number
  specs: string
}

const useRefund = (orderId: number, orderSn: string) => {
  const RefundApi = useRefundApi()
  const router = useRouter()

  // 退货原因
  const refundResonOptions = [
    { label: '质量问题', value: '质量问题' },
    { label: '配件问题', value: '配件问题' },
    { label: '少件/漏发', value: '少件/漏发' },
    { label: '与商品描述不符', value: '与商品描述不符' },
    { label: '包装/商品残缺', value: '包装/商品残缺' },
    { label: '其他', value: '其他' },
  ]

  const rules = {
    expressCompany: [
      { required: true, message: '请输入快递公司', trigger: 'blur' },
    ],
    logisticsNo: [
      { required: true, message: '请输入物流单号', trigger: 'blur' },
    ],
  }

  const form = ref<IRefundApplyParams>({
    orderSn,
    expressCompany: '',
    logisticsNo: '',
    list: [],
  })

  // 获取可退货商品列表
  const fetchRefundGoodsList = async () => {
    const params = {
      orderId,
    }
    const { code, data } = await RefundApi.applyList(params, true)

    if (code === 0) {
      const { list } = data || {}

      const tableData = (list || []).reduce((res, v) => {
        const item = {
          ...v,
          reason: refundResonOptions[0].value,
          description: '',
          items: v.items.reduce((itemsRes, e) => {
            itemsRes.push({
              ...e,
              applyQty: 0,
            })

            return itemsRes
          }, [] as IRefundApplyStockInfo[]),
        }

        res.push(item)

        return res
      }, [] as IRefundApplyListItemInfo[])

      form.value.list = tableData
    }
  }

  const formVNode = ref()
  const submitLoading = ref(false)

  // 当前选择退货商品
  const selectedRefundList = ref<IRefundApplyListItemInfo[]>([])
  const handleSelectionChange = (arr: IRefundApplyListItemInfo[]) => {
    selectedRefundList.value = arr
  }

  // 申请退货数据
  const getRefundApplyParams = () => {
    const params = cloneDeep(form.value)
    params.list = selectedRefundList.value

    return params
  }

  const validateRefundList = (params: IRefundApplyParams) => {
    const { list } = params

    if (selectedRefundList.value.length <= 0) {
      $layer.alert('请选择将要退货的商品')
      return false
    }

    if (list.every(v => v.items.every(e => e.leaveQty <= 0))) {
      $layer.alert('列表中无可用退货数量')
      return false
    }

    if (list.every(v => v.items.every(e => e.applyQty <= 0))) {
      $layer.alert('申请退货数量不可全部为 0')
      return false
    }

    return true
  }

  // 退货申请确认提交
  const handleRefundApplySubmit = () => {
    const params = getRefundApplyParams()

    formVNode.value?.validate((valid: boolean) => {
      if (valid) {
        if (!validateRefundList(params)) return

        $layer
          .confirm('确认要提交该退货申请吗?')
          .then(async ({ isConfirmed }) => {
            if (isConfirmed) {
              try {
                submitLoading.value = true

                const { code, msg } = await RefundApi.apply(params)

                if (code === 0) {
                  $layer.toast('申请退货成功')
                  router.replace({ name: 'order-return-list' })
                }
                else {
                  $layer.toast(msg || '申请退货失败', { icon: 'error' })
                }
              }
              finally {
                submitLoading.value = false
              }
            }
          })
      }
    })
  }

  // 退货数量小数位数
  const getRefundPrecision = (opts: IGetRefundPrecisionParams) => {
    const { primaryCategory, secondaryCategory, specs = '', unit = '' } = opts

    // 蕾丝、花边、朵花、面料 和 珠饰，且单位是米，可以是小数
    const isTargetPrimaryCategory = includes([1, 2, 3, 6], primaryCategory)
    const isTargetSecondaryCategory = includes([12], secondaryCategory)
    const isTargetUnit = includes(['米'], unit) && !specs.includes('支')

    if (
      (isTargetPrimaryCategory || isTargetSecondaryCategory)
      && isTargetUnit
    ) {
      return 2
    }

    return 0
  }

  // 退货数量步数
  const getRefundStepConf = (opts: IGetRefundPrecisionParams) => {
    const { unit, primaryCategory } = opts

    // 面料按米购买的按 0.5 的倍数申请数量
    const isTargetPrimaryCategory = includes([6], primaryCategory)
    const isTargetUnit = includes(['米'], unit)

    if (isTargetPrimaryCategory && isTargetUnit) {
      return {
        step: 0.5,
        strictStep: true,
      }
    }

    return {
      step: 1,
      strictStep: false,
    }
  }

  return {
    getRefundStepConf,
    selectedRefundList,
    handleSelectionChange,
    getRefundPrecision,
    refundResonOptions,
    rules,
    fetchRefundGoodsList,
    form,
    formVNode,
    submitLoading,
    handleRefundApplySubmit,
  }
}

export default useRefund
