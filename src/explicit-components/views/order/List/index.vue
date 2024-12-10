<template>
  <div>
    <v-card
      flat
      class="mb-4"
    >
      <v-card-text>
        <div class="d-flex flex-wrap">
          <div class="d-flex align-center mb-4 mr-6">
            <span class="mr-3 form-label">订单号:</span>
            <ElInput
              v-model="form.orderSn"
              clearable
              style="width: 280px"
            />
          </div>

          <div class="d-flex align-center mb-4 mr-6">
            <span class="mr-3">申请日期:</span>
            <VcDatePicker
              v-model="form.date"
              style="width: 280px"
            />
          </div>

          <div class="d-flex align-center mb-4 mr-6">
            <span class="mr-3">订单状态:</span>
            <el-select
              v-model="form.status"
              clearable
              multiple
              style="width: 280px"
            >
              <el-option
                v-for="(v) in orderStatusOptions"
                :key="v.value"
                :value="v.value"
                :label="v.label"
              />
            </el-select>
          </div>
          <div class="d-flex align-center mb-4">
            <span class="mr-3">商品类型:</span>
            <BaseCategoryPicker
              v-model="form.categories"
              style="width: 280px"
            />
          </div>

          <div class="d-flex align-center mb-4 mr-6">
            <span class="mr-3 form-label">挂牌号:</span>
            <ElInput
              v-model="form.listingNumber"
              clearable
              style="width: 280px"
            />
          </div>
        </div>

        <div class="d-flex justify-end mt-4">
          <div>
            <v-btn
              color="error"
              variant="outlined"
              class="mr-4"
              @click="handleReset"
            >
              清空筛选项
            </v-btn>
            <v-btn color="primary">
              <span
                class="px-5"
                @click="handleQuery"
              >查 询</span>
            </v-btn>
          </div>
        </div>
      </v-card-text>
    </v-card>

    <v-card
      flat
      :min-height="400"
    >
      <v-card-text>
        <VcTreeTable
          :data="tableData"
          :columns="columns"
          :indent="36"
          :border="true"
          row-key="orderSn"
        >
          <template #column-price="{ row }">
            <span>
              {{ row.showSlash ? '/' : `￥${row.price}` }}
            </span>
          </template>

          <template #column-orderSn="{ row }">
            <div class="d-inline-block">
              <div
                :class="
                  !row.children
                    ? 'text-primary cursor-pointer text-decoration-underline'
                    : ''
                "
                @click="linkToOrderDetail(row.children ? '' : row.orderSn)"
              >
                {{ row.orderSn }}
              </div>
              <div class="text-caption">
                {{ row.time }}
              </div>
            </div>
          </template>

          <template #column-status="{ row }">
            <span v-if="!row.children">
              {{ row.status && row.status.name }}
            </span>
            <span v-else />
          </template>

          <template #column-warehouse="{ row }">
            <span v-if="!row.children">
              {{ row.warehouse && row.warehouse.join() }}
            </span>
            <span v-else />
          </template>

          <template #column-waybillNo="{ row }">
            <div v-if="row.waybillNo && !row.children">
              <div v-if="row.waybillNo.no">
                {{ row.waybillNo.no }}
              </div>
              <div v-else>
                {{ row.waybillNo.name }}
              </div>
            </div>
            <span v-else />
          </template>

          <template #column-detail="{ row }">
            <OrderDetailColumn :items="row.detail" />
          </template>

          <template #column-listingNumber="{ row }">
            <ListingNumberColumn :items="row.listingNumber" />
          </template>

          <ElTableColumn
            label="操作"
            align="center"
            width="110"
          >
            <template #default="{ row }">
              <div v-if="row.status && !row.children">
                <v-btn
                  v-if="
                    isActionValid(row.status.code, { name: 'confirmOrder' })
                  "
                  variant="text"
                  size="small"
                  color="primary"
                  @click="handleConfirmOrder(row.orderSn)"
                >
                  确认下单
                </v-btn>
                <v-btn
                  v-if="isActionValid(row.status.code, { name: 'cancelOrder' })"
                  variant="text"
                  size="small"
                  color="error"
                  @click="handleCancelOrder(row.orderSn)"
                >
                  取消订单
                </v-btn>
                <v-btn
                  v-if="
                    isActionValid(row.status.code, { name: 'confirmReceipt' })
                  "
                  variant="text"
                  size="small"
                  color="success"
                  :loading="confirmReceiptLoadingMap[row.orderId]"
                  @click="handleConfirmReceipt([row.orderId])"
                >
                  确认收货
                </v-btn>
                <v-btn
                  v-if="
                    isActionValid(row.status.code, {
                      name: 'applyForReturn',
                      extra: row.refundableQuantity > 0,
                    })
                  "
                  variant="text"
                  size="small"
                  color="warning"
                  @click="handleApplyForReturn(row.orderId, row.orderSn)"
                >
                  申请退货
                </v-btn>
                <v-btn
                  v-if="
                    isActionValid(row.status.code, { name: 'viewReturnInfo' })
                  "
                  variant="text"
                  size="small"
                  color="info"
                  @click="handleViewReturnInfo(row.orderSn)"
                >
                  查看退货
                </v-btn>
              </div>
              <span v-else />
            </template>
          </ElTableColumn>
        </VcTreeTable>
      </v-card-text>
    </v-card>

    <div class="d-flex justify-center my-4">
      <VcPagination
        v-model="form.page"
        :total="totalNumber"
        :page-size="form.limit"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import OrderDetailColumn from './OrderDetailColumn.vue'
import ListingNumberColumn from './ListingNumberColumn.vue'
import useOrder, {
  ORDER_TO_BE_CONFIRMED,
  ORDER_CONFIRMED,
  ORDER_CONFIRMED_BY_COMPANY,
  ORDER_SHIPPED,
  ORDER_RECEIPTED,
} from '~/composables/logic/useOrder'
import type { IOrderListInfo } from '~/composables/api/interfaces/order'
// import BaseCategoryPicker from '~~/packages/components/BaseCategoryPicker/index.vue'
import { useOrderApi } from '~/composables/api/modules/order'

const router = useRouter()
const OrderApi = useOrderApi()

const columns = [
  {
    label: '订单号/日期',
    prop: 'orderSn',
    align: 'left',
    headerAlign: 'center',
    width: 330,
  },
  { label: '订单金额', prop: 'price', align: 'center', width: 110, headerAlign: 'center' },
  { label: '订单状态', prop: 'status', align: 'center', width: 110, headerAlign: 'center' },
  { label: '订单明细', prop: 'detail', align: 'center', headerAlign: 'center' },
  { label: '已预订挂牌明细', prop: 'listingNumber', align: 'center', headerAlign: 'center' },
  { label: '仓库', prop: 'warehouse', align: 'center', width: 120, headerAlign: 'center' },
  { label: '运单号', prop: 'waybillNo', align: 'center', width: 150, headerAlign: 'center' },
]

const tableData = ref<IOrderListInfo[]>([])

const defaultForm = () => ({
  page: 1,
  limit: 20,
  orderSn: '',
  date: [],
  status: [
    ORDER_TO_BE_CONFIRMED,
    ORDER_CONFIRMED,
    ORDER_CONFIRMED_BY_COMPANY,
    ORDER_SHIPPED,
    ORDER_RECEIPTED,
  ],
  categories: [],
  listingNumber: '',
})

const form = ref(defaultForm())
const totalNumber = ref(0)
const pickDate = (index = 0) => {
  return Array.isArray(form.value.date) ? form.value.date[index] : ''
}

const loading = ref(false)
const fetchTableData = async () => {
  try {
    const params = {
      ...form.value,
      startDate: pickDate(0),
      endDate: pickDate(1),
    }

    loading.value = true
    const { code, data } = await OrderApi.list(params)

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

const handleQuery = () => {
  form.value.page = 1
  fetchTableData()
}

const handleReset = () => {
  const tmp = defaultForm()

  tmp.status = []
  form.value = tmp
}

onMounted(() => {
  fetchTableData()
})

const handleCurrentChange = (index: number) => {
  form.value.page = index
  fetchTableData()
}

const {
  orderStatusOptions,
  linkToOrderDetail,
  isActionValid,
  confirmReceiptLoadingMap,
  confirmReceipt,
} = useOrder()

// 确认下单
const handleConfirmOrder = (orderSn: string) => {
  linkToOrderDetail(orderSn)
}

// 取消订单
const handleCancelOrder = (orderSn: string) => {
  linkToOrderDetail(orderSn)
}

// 确认收货
const handleConfirmReceipt = (orderIds: number[]) => {
  confirmReceipt(orderIds, () => {
    fetchTableData()
  })
}

// 申请退货
const handleApplyForReturn = (orderId: number, orderSn: string) => {
  router.push({
    name: 'order-apply-for-return',
    query: { orderId: orderId + '', orderSn },
  })
}

// 查看退货
const handleViewReturnInfo = (orderSn: string) => {
  router.push({
    name: 'order-view-return-info',
    query: { orderSn },
  })
}
</script>

<style lang="scss" scoped>
.form-label {
  min-width: 60px;
  text-align: right;
}
</style>
