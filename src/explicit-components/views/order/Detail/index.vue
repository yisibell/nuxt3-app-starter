<template>
  <div v-if="data">
    <ActionPanel
      :order-ids="data.orderIds"
      :order-status="orderStatus"
      :create-time="data.createTime"
      :order-sn="data.orderSn"
      :delivery-method="currDeliveryMethod"
      :delivery-address="currDeliveryAddress"
      :remaining-timestamp="data.remainingTimestamp"
      :goods-list="data.list"
      class="mb-4"
      @change="reload"
    />

    <v-card
      flat
      class="pb-10"
    >
      <v-card-text>
        <OrderProgress
          :order-status="orderStatus"
          :order-data="data"
          class="mb-10"
        />

        <DeliveryInfo
          v-model="currDeliveryAddress"
          :info="data"
          :disabled="disabledDeliveryMethodChange"
          class="mb-8"
        />

        <!-- 收货方式 -->
        <DeliveryMethod
          v-model="currDeliveryMethod"
          :disabled="disabledDeliveryMethodChange"
          class="mb-8"
        />

        <GoodsInfo :table-data="data.list" />
      </v-card-text>

      <v-card-text class="d-flex justify-end pa-4">
        <div class="summary">
          <div class="summary-item">
            <span class="summary-item__label">商品件数:</span>
            <span class="summary-item__value">{{ data.total }} 件</span>
          </div>
          <div class="summary-item">
            <span class="summary-item__label">合计金额:</span>
            <span class="summary-item__value">
              {{ data.showSlash ? '/' : `￥ ${data.totalPrice}` }}
            </span>
          </div>
          <template v-if="!data.showSlash && data.specialPrice > 0">
            <div class="summary-item">
              <span class="summary-item__label">商品原价:</span>
              <span class="summary-item__value text-grey fs-16">
                {{ `￥ ${data.originalPrice}` }}
              </span>
            </div>
            <div class="summary-item">
              <span class="summary-item__label">共计优惠:</span>
              <span class="summary-item__value text-grey fs-16">
                -{{ `￥ ${data.specialPrice}` }}
              </span>
            </div>
          </template>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import ActionPanel from './ActionPanel.vue'
import OrderProgress from './OrderProgress.vue'
import DeliveryInfo from './DeliveryInfo.vue'
import DeliveryMethod from './DeliveryMethod.vue'
import GoodsInfo from './GoodsInfo.vue'
import { ORDER_TO_BE_CONFIRMED } from '~/composables/logic/useOrder'
import type {
  IOrderDetailInfo,
  IOrderConfirmParams,
} from '~/composables/api/interfaces/order'

const props = withDefaults(defineProps<{
  data?: IOrderDetailInfo
  modelDeliveryMethod: number
}>(), {
  modelDeliveryMethod: 1,
})

const emit = defineEmits(['reload', 'update:modelDeliveryMethod'])

const { data } = toRefs(props)

const reload = () => {
  emit('reload')
}

const orderStatus = computed(() => data.value?.orderStatus)
const disabledDeliveryMethodChange = computed(
  () => orderStatus.value !== ORDER_TO_BE_CONFIRMED,
)

const currDeliveryMethod = computed({
  get() {
    return props.modelDeliveryMethod
  },
  set(value) {
    emit('update:modelDeliveryMethod', value)
  },
})

const currDeliveryAddress = ref<IOrderConfirmParams['address']>({
  id: 0,
  contact: '',
  address: '',
  phone: '',
})
</script>

<style lang="scss" scoped>
.summary {
  &-item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    justify-content: space-between;

    &__label {
      margin-right: 10px;
    }

    &__value {
      color: rgb(var(--v-theme-error));
      font-size: 20px;
      font-weight: bold;
      min-width: 90px;
      text-align: right;
    }
  }
}
</style>
