<template>
  <div>
    <h1 class="text-subtitle-1 mb-2 text-grey font-weight-bold">
      商品信息
    </h1>
    <VcTreeTable
      :data="tableData"
      :columns="columns"
      border
    >
      <template #column-code="{ row }">
        <BaseGoodsInfo :data="row" />
      </template>

      <template #column-price="{ row }">
        <div v-if="row.discountPrice > 0">
          <span>{{ row.currency || '￥' }}</span>
          <span>{{ row.discountPrice }}</span>
          <span v-if="row.unit">/ {{ row.unit }}</span>
        </div>

        <div
          :class="
            row.discountPrice > 0
              ? 'text-decoration-line-through text-grey text-caption'
              : ''
          "
        >
          <span>{{ row.currency || '￥' }}</span>
          <span>{{ row.price }}</span>
          <span v-if="row.unit">/ {{ row.unit }}</span>
        </div>
      </template>

      <template #column-reserveStatus="{ row }">
        {{ row.reserveStatus ? '是' : '否' }}
      </template>

      <template #column-totalPrice="{ row }">
        <div v-if="row.showSlash">
          /
        </div>
        <template v-else>
          <div v-if="row.discountTotalPrice > 0">
            ￥{{ row.discountTotalPrice }}
          </div>
          <div
            :class="
              row.discountTotalPrice > 0
                ? ['text-decoration-line-through', 'text-grey', 'text-caption']
                : ''
            "
          >
            ￥{{ row.totalPrice }}
          </div>
        </template>
      </template>

      <template #column-listingNumber="{ row }">
        {{ row.listingNumber && row.listingNumber.toString() }}
      </template>
    </VcTreeTable>
  </div>
</template>

<script setup lang="ts">
import type { IOrderDetailInfo } from '~/composables/api/interfaces/order'

withDefaults(defineProps<{
  tableData: IOrderDetailInfo['list']
}>(), {
  tableData: () => [],
})

const columns = [
  { align: 'center', label: '商品信息', prop: 'code' },
  { align: 'center', label: '单价', prop: 'price' },
  { align: 'center', label: '数量', prop: 'quantity', width: 110 },
  { align: 'center', label: '小计', prop: 'totalPrice', width: 110 },
  { align: 'center', label: '预定状态', prop: 'reserveStatus', width: 110 },
  { align: 'center', label: '挂牌号', prop: 'listingNumber' },
  { align: 'center', label: '备注', prop: 'remark' },
]
</script>
