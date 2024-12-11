<template>
  <div>
    <h1 class="text-subtitle-1 mb-2 text-grey font-weight-bold">
      收货信息
    </h1>
    <DeliveryAddressInfo
      v-if="disabled"
      :info="info"
    />
    <DeliveryAddressPicker
      v-else
      v-model="selectedAddress"
      :items="availableAddressList"
    />
  </div>
</template>

<script setup lang="ts">
import DeliveryAddressPicker from './DeliveryAddressPicker.vue'
import DeliveryAddressInfo from './DeliveryAddressInfo.vue'
import type {
  IOrderDetailInfo,
  IOrderConfirmParams,
} from '~/composables/api/interfaces/order'
import type { IUserAddressData } from '~/composables/api/interfaces/user'
import { useUserApi } from '~/composables/api/modules/user'

const props = withDefaults(defineProps<{
  modelValue: IOrderConfirmParams['address']
  info: IOrderDetailInfo
  disabled?: boolean
}>(), {})

const emit = defineEmits(['update:modelValue'])

const UserApi = useUserApi()

const availableAddressList = ref<IUserAddressData['addresses']>([])

const selectedAddress = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})

const loading = ref(false)

const init = async () => {
  try {
    loading.value = true
    const { code, data } = await UserApi.getUserAddress()
    if (code === 0) {
      availableAddressList.value = Array.isArray(data.addresses)
        ? data.addresses
        : []

      const item = availableAddressList.value.find(v => v.isDefault)
      if (item) {
        selectedAddress.value = item
      }
    }
  }
  finally {
    loading.value = false
  }
}

onMounted(() => {
  if (!props.disabled) {
    init()
  }
})
</script>
