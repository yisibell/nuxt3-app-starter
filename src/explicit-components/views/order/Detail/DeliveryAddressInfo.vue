<template>
  <v-card
    variant="outlined"
    color="grey-lighten-2"
  >
    <v-card-text class="text-grey-darken-2">
      <div class="mb-2">
        <span class="font-weight-bold">收货人：</span>
        {{ info.contact }}
      </div>
      <div class="mb-2">
        <span class="font-weight-bold">收货地址：</span>
        {{ info.address }}
      </div>
      <div class="mb-2">
        <span class="font-weight-bold">联系方式：</span>
        {{ info.mobile }}
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import type { IOrderDetailInfo } from '~/composables/api/interfaces/order'

withDefaults(defineProps<{
  info: IOrderDetailInfo
}>(), {

})
</script>
