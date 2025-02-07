<template>
  <div>
    <v-card
      flat
      min-height="500"
    >
      <v-card-text class="d-flex justify-space-between">
        <h1 class="text-subtitle-1 font-weight-bold">
          收货提醒
        </h1>
      </v-card-text>

      <v-divider />

      <v-card-text class="d-flex justify-center">
        <div v-if="orders.length">
          <div class="mb-6">
            您有以下订单未确认收货，即将自动签收，请及时处理！
          </div>
          <div
            v-for="v in orders"
            :key="v.orderSn"
            class="mb-3"
          >
            <v-icon size="small">
              mdi-link-variant
            </v-icon>
            <nuxt-link :to="`/order/detail?orderSn=${v.orderSn}`">{{
              v.orderSn
            }}</nuxt-link>
          </div>
        </div>

        <v-empty-state
          v-else
          headline="Whoops, 404"
          title="未搜索到相关数据"
          text="The data you were looking for does not exist"
          icon="mdi-magnify"
        />
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { useNoticeStore } from '~/store/notice'

definePageMeta({
  title: '收货通知',
})

const route = useRoute()

useHead({
  title: route.meta.title as string,
})

const NoticeStore = useNoticeStore()

const orders = computed(() => NoticeStore.willReceivedOrders)

onMounted(() => {
  NoticeStore.fetchWillReceivedOrders()
})
</script>
