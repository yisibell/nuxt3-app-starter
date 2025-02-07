<template>
  <v-stepper
    alt-labels
    flat
    :model-value="orderStatus"
  >
    <v-stepper-header>
      <v-stepper-item
        :value="1"
        :complete="orderStatus >= 1"
        color="primary"
      >
        <div class="d-flex flex-column align-center">
          提交订单
          <small class="mt-2">{{ orderData.commitTime }}</small>
        </div>
      </v-stepper-item>

      <v-divider />

      <v-stepper-item
        :value="2"
        :complete="orderStatus >= 2"
        color="primary"
      >
        <div class="d-flex flex-column align-center">
          确认下单
          <small class="mt-2">{{ orderData.confirmTime }}</small>
        </div>
      </v-stepper-item>

      <v-divider />

      <v-stepper-item
        :value="3"
        :complete="orderStatus >= 3"
        :error="orderStatus === 4"
        color="primary"
      >
        <div class="d-flex flex-column align-center">
          <span
            v-if="orderStatus == 4"
            class="text-error"
          >公司取消</span>

          <span v-else>公司确认</span>

          <small class="mt-2">{{ orderData.companyConfirmTime }}</small>
        </div>
      </v-stepper-item>

      <v-divider />

      <v-stepper-item
        :value="4"
        :complete="orderStatus >= 5"
        color="primary"
      >
        <div class="d-flex flex-column align-center">
          商品发货
          <small class="mt-2">{{ orderData.goodsDeliveryTime }}</small>
        </div>
      </v-stepper-item>

      <v-divider />

      <v-stepper-item
        :value="5"
        :complete="orderStatus >= 6"
        color="primary"
      >
        <div class="d-flex flex-column align-center">
          完成收货
          <small class="mt-2">{{ orderData.completeReceiptTime }}</small>
        </div>
      </v-stepper-item>
    </v-stepper-header>
  </v-stepper>
</template>

<script setup lang="ts">
import type { IOrderDetailInfo } from '~/composables/api/interfaces/order'

withDefaults(defineProps<{
  orderStatus?: number
  orderData: IOrderDetailInfo
}>(), {
  orderStatus: 0,
})
</script>
