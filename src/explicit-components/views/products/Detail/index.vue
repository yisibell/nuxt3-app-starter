<template>
  <div>
    <GoodsPanel
      v-if="goodsDetailData"
      :data="goodsDetailData"
      :goods-id="goodsId"
      :search-gid="sgid"
    />
    <ProductDetail
      v-if="goodsDetailData"
      :data="goodsDetailData"
    />
  </div>
</template>

<script setup lang="ts">
import ProductDetail from './ProductDetail/index.vue'
import GoodsPanel from './GoodsPanel/index.vue'
import type { IGoodsDetailObject } from '~/composables/api/interfaces/goods'
import { useGoodsApi } from '~/composables/api/modules/goods'

const GoodsApi = useGoodsApi()

const route = useRoute()
const query = computed(() => route.query)
const goodsId = computed(() => Number.parseInt(query.value.id as string))
const sgid = computed(() => Number.parseInt(query.value.sgid as string))

const loading = ref(false)
const goodsDetailData = ref<IGoodsDetailObject | null>()

const fetchGoodsDetail = async () => {
  try {
    const params = {
      goodsId: goodsId.value,
    }
    loading.value = true
    const { code, data } = await GoodsApi.detail(params)
    if (code === 0) {
      goodsDetailData.value = data
    }
  }
  finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchGoodsDetail()
})
</script>
