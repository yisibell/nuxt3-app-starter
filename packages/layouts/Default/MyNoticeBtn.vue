<template>
  <v-btn icon @click="linkToReceiptNoticePage">
    <v-badge
      :content="orders.length"
      :value="orders.length > 0"
      color="red"
      overlap
    >
      <v-icon>mdi-bell</v-icon>
    </v-badge>
  </v-btn>
</template>

<script lang="ts">
import { computed, defineComponent, useRouter, onMounted } from '#imports'
import { useNoticeStore } from '~/store/notice'

export default defineComponent({
  setup() {
    const router = useRouter()

    const linkToReceiptNoticePage = () => {
      router.push({ path: '/notice/receipt' })
    }

    const NoticeStore = useNoticeStore()

    const orders = computed(() => NoticeStore.willReceivedOrders)

    onMounted(() => {
      NoticeStore.fetchWillReceivedOrders()
    })

    return {
      linkToReceiptNoticePage,
      orders,
    }
  },
})
</script>
