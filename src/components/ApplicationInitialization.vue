<template>
  <div class="">
    <ClientOnly>
      <WithPurchaseQuick />
      <ActivitySomePopup />
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
import { ClientOnly } from '#components'
import { hydrateOnIdle } from 'vue'

const WithPurchaseQuick = defineAsyncComponent({
  loader: () => import('@/components/with/purchase/Quick.vue'),
  hydrate: hydrateOnIdle(),
})

const ActivitySomePopup = defineAsyncComponent({
  loader: () => import('@/components/activity/SomePopup.vue'),
  hydrate: hydrateOnIdle(),
})

defineOptions({
  name: 'ApplicationInitialization',
})
</script>
