<template>
  <div class="return-list">
    <v-card
      flat
      class="mb-6"
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
            <span class="mr-3">退货单号:</span>
            <ElInput
              v-model="form.returnSn"
              clearable
              style="width: 280px"
            />
          </div>

          <div class="d-flex align-center mb-4 mr-6">
            <span class="mr-3">退货日期:</span>
            <VcDatePicker
              v-model="form.date"
              style="width: 280px"
            />
          </div>

          <div class="d-flex align-center mb-4 mr-6">
            <span class="mr-3">退货状态:</span>
            <el-select
              v-model="form.status"
              clearable
              style="width: 280px"
            >
              <el-option
                v-for="(v) in refundStatusOptions"
                :key="v.value"
                :label="v.label"
                :value="v.value"
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

    <div
      v-if="tableData.length"
      class="return-list-wrapper"
    >
      <div
        v-for="(v, i) in tableData"
        :key="i"
        class="mb-6 return-list-item"
      >
        <BaseReturnPanel
          :base-info="v"
          :table-data="v.refundDetails || []"
        />
      </div>
    </div>

    <v-empty-state
      v-else
      headline="Whoops, 404"
      title="暂无退货数据"
      text="No return data available"
      icon="mdi-magnify"
    />

    <div class="d-flex justify-center pb-5">
      <VcPagination
        v-model="form.page"
        :page-size="form.pageSize"
        :total="totalNumber"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import useRefundList, {
  useRefundStatus,
} from '~/composables/logic/useRefundList'

const { refundStatusOptions } = useRefundStatus()

const {
  totalNumber,
  form,
  tableData,
  loading,
  handleReset,
  handleQuery,
  handleCurrentChange,
} = useRefundList()

onMounted(() => {
  handleQuery()
})
</script>

<style lang="scss" scoped>
.form-label {
  min-width: 60px;
  text-align: right;
}
</style>
