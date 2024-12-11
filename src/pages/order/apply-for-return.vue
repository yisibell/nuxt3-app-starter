<template>
  <v-card
    flat
    :min-height="450"
  >
    <v-card-subtitle class="py-4">
      申请退货
    </v-card-subtitle>
    <v-divider />
    <v-card-text>
      <el-table
        :data="form.list"
        border
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          align="center"
          width="50"
        />

        <el-table-column
          label="商品信息"
          align="center"
          width="180"
        >
          <template #default="{ row }">
            <BaseGoodsInfo :data="row" />
          </template>
        </el-table-column>

        <el-table-column
          label="商品数量"
          prop="qty"
          align="center"
          width="90"
        />

        <el-table-column
          label="预定挂牌信息"
          align="center"
        >
          <template #default="{ row }">
            <el-table
              :data="row.items"
              border
            >
              <el-table-column
                label="挂牌号"
                prop="stockNumber"
                align="center"
              />
              <el-table-column
                label="剩余可退货数量"
                prop="leaveQty"
                align="center"
              />
              <el-table-column
                label="申请退货数量"
                align="center"
                width="180"
              >
                <template #default="applyQtyColProps">
                  <VcInputNumber
                    v-model="applyQtyColProps.row.applyQty"
                    :min="0"
                    :max="applyQtyColProps.row.leaveQty"
                    :precision="getRefundPrecision(row)"
                    :step="getRefundStepConf(row).step"
                    :strict-step="getRefundStepConf(row).strictStep"
                  />
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>

        <el-table-column
          label="退货原因"
          align="center"
          width="150"
        >
          <template #default="{ row }">
            <el-select
              v-model="row.reason"
            >
              <el-option
                v-for="(v) in refundResonOptions"
                :key="v.value"
                :label="v.label"
                :value="v.value"
              />
            </el-select>
          </template>
        </el-table-column>

        <el-table-column
          label="退货原因描述"
          align="center"
          width="200"
        >
          <template #default="{ row }">
            <el-input
              v-model="row.description"
              type="textarea"
              maxlength="100"
              show-word-limit
              autosize
            />
          </template>
        </el-table-column>
      </el-table>
    </v-card-text>

    <v-card-text>
      <el-form
        ref="formVNode"
        :model="form"
        :rules="rules"
        inline
        size="large"
      >
        <el-form-item
          label="快递公司"
          prop="expressCompany"
        >
          <el-input
            v-model.trim="form.expressCompany"
            style="width: 300px"
          />
        </el-form-item>

        <el-form-item
          label="物流单号"
          prop="logisticsNo"
        >
          <el-input
            v-model.trim="form.logisticsNo"
            style="width: 300px"
          />
        </el-form-item>
      </el-form>
    </v-card-text>

    <v-card-actions class="justify-end">
      <div>
        <v-btn
          color="error"
          variant="outlined"
          class="mr-4"
          @click="handleCancel"
        >
          <span class="px-4">取 消</span>
        </v-btn>
        <v-btn
          color="primary"
          variant="elevated"
          :loading="submitLoading"
          @click="handleRefundApplySubmit"
        >
          <span class="px-4">确 定</span>
        </v-btn>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import useRefund from '~/composables/logic/useRefund'

definePageMeta({
  title: '申请退货',
})

const route = useRoute()

useHead({
  title: route.meta.title as string,
})

const router = useRouter()
const query = computed(() => route.query)
const orderId = computed(() =>
  Number.parseInt((query.value.orderId as string) || ''),
)

const orderSn = computed(() => query.value.orderSn as string)

const {
  getRefundStepConf,
  refundResonOptions,
  form,
  rules,
  fetchRefundGoodsList,
  formVNode,
  submitLoading,
  handleRefundApplySubmit,
  getRefundPrecision,
  handleSelectionChange,
} = useRefund(orderId.value, orderSn.value)

onMounted(() => {
  fetchRefundGoodsList()
})

const handleCancel = () => {
  router.replace({ name: 'order-list' })
}
</script>
