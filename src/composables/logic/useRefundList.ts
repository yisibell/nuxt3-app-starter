import type { IReturnListItemInfo } from '~/composables/api/interfaces/refund'
import { useRefundApi } from '~/composables/api/modules/refund'

export const useRefundStatus = () => {
  // 退货状态
  const refundStatusOptions = [
    { label: '申请中', value: 'N' },
    { label: '已驳回', value: 'C' },
    { label: '已完成', value: 'Y' },
  ]

  const filterRefundStatusLabel = (value: string) => {
    const item = refundStatusOptions.find(v => (v.value = value))
    return item && item.label
  }

  return {
    refundStatusOptions,
    filterRefundStatusLabel,
  }
}

const useRefundList = () => {
  const RefundApi = useRefundApi()

  const defaultForm = () => ({
    page: 1,
    pageSize: 10,
    orderSn: '',
    returnSn: '',
    date: [],
    startTime: '',
    endTime: '',
    status: '',
    categories: [],
  })

  const totalNumber = ref(0)
  const form = ref(defaultForm())
  const loading = ref(false)
  const tableData = ref<IReturnListItemInfo[]>([])
  const pickDate = (index = 0) => {
    return Array.isArray(form.value.date) ? form.value.date[index] : ''
  }
  const getTableData = async () => {
    try {
      const params = {
        ...form.value,
        startTime: pickDate(0),
        endTime: pickDate(1),
      }
      loading.value = true
      const { code, data } = await RefundApi.list(params)

      if (code === 0) {
        const { list, total } = data || {}
        tableData.value = Array.isArray(list) ? list : []
        totalNumber.value = total
      }
    }
    finally {
      loading.value = false
    }
  }

  const handleReset = () => {
    form.value = defaultForm()
  }

  const handleQuery = () => {
    form.value.page = 1
    getTableData()
  }

  const handleCurrentChange = (index: number) => {
    form.value.page = index
    getTableData()
  }

  return {
    totalNumber,
    form,
    loading,
    tableData,
    getTableData,
    handleReset,
    handleQuery,
    handleCurrentChange,
  }
}

export default useRefundList
