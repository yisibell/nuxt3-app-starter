<template>
  <v-btn
    icon
    @click="linkToReceiptNoticePage"
  >
    <v-badge
      :model-value="orders.length > 0"
      :content="orders.length"
      color="red"
    >
      <v-icon>mdi-bell</v-icon>
    </v-badge>
  </v-btn>
</template>

<script setup lang="ts">
import { useNoticeStore } from '~/store/notice'

const router = useRouter()
const NoticeStore = useNoticeStore()

const linkToReceiptNoticePage = () => {
  router.push({ path: '/notice/receipt' })
}

const orders = computed(() => NoticeStore.willReceivedOrders)

onMounted(() => {
  NoticeStore.fetchWillReceivedOrders()
})
</script>
