<template>
  <v-card
    flat
    class="base-return-panel"
  >
    <v-card-text>
      <div class="d-flex flex-wrap mb-4 mt-2">
        <div class="d-flex mr-6">
          <span class="mr-2 text-grey">退货日期:</span>
          <span>{{ baseInfo.createTime }}</span>
        </div>
        <div class="d-flex mr-6">
          <span class="mr-2 text-grey">退货状态:</span>
          <span>{{ baseInfo.status }}</span>
        </div>
        <div class="d-flex mr-6">
          <span class="mr-2 text-grey">快递公司:</span>
          <span>{{ baseInfo.logisticsName }}</span>
        </div>
        <div class="d-flex mr-6">
          <span class="mr-2 text-grey">退货物流单号:</span>
          <span>{{ baseInfo.logisticsNo }}</span>
        </div>
        <div class="d-flex mr-6">
          <span class="mr-2 text-grey">订单号:</span>
          <span>{{ baseInfo.orderSn }}</span>
        </div>
        <div class="d-flex mr-6">
          <span class="mr-2 text-grey">退货单号:</span>
          <span>{{ baseInfo.returnSn }}</span>
        </div>
        <div class="d-flex mr-6">
          <span class="mr-2 text-grey">退货运费:</span>
          <span>{{ `￥ ${baseInfo.shippingFee}` }}</span>
        </div>
      </div>

      <v-divider />
    </v-card-text>

    <v-card-text>
      <VcTreeTable
        :data="tableData"
        :columns="columns"
        border
      >
        <template #left>
          <ElTableColumn
            label="商品信息"
            align="left"
            header-align="center"
            width="250"
          >
            <template #default="{ row }">
              <BaseGoodsInfo :data="row" />
            </template>
          </ElTableColumn>
        </template>

        <template #column-refundDetailInventorys="{ row }">
          <VcTreeTable
            :data="row.refundDetailInventorys"
            :columns="itemsColumns"
            border
          />
        </template>
      </VcTreeTable>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import type {
  IReturnListItemInfo,
  IRefundDetailItem,
} from '~/composables/api/interfaces/refund'

withDefaults(defineProps<{
  baseInfo: IReturnListItemInfo
  tableData: IRefundDetailItem[]
}>(), {})

const columns = [
  { label: '申请退货数', prop: 'applyQty', align: 'center', width: 95 },
  { label: '剩余可退数', prop: 'leaveQty', align: 'center', width: 95 },
  { label: '实际退货数', prop: 'realQty', align: 'center', width: 95 },
  {
    label: '预定挂牌信息',
    prop: 'refundDetailInventorys',
    align: 'center',
  },
  { label: '退货原因', prop: 'reason', align: 'center', width: 100 },
  {
    label: '退货原因描述',
    prop: 'description',
    align: 'center',
    width: 120,
  },
]

const itemsColumns = [
  { label: '挂牌号', prop: 'stockNumber', align: 'center' },
  { label: '剩余可退数', prop: 'leaveQty', align: 'center' },
  { label: '申请退货数', prop: 'applyQty', align: 'center' },
  { label: '处理状态', prop: 'status', align: 'center' },
]
</script>
