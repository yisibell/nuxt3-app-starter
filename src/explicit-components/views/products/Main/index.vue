<template>
  <ClientOnly>
    <GoodsLoading v-if="productsLoading" />

    <template v-else-if="productsData.length">
      <div class="d-flex justify-end">
        <v-btn-toggle
          v-model="viewMode"
          color="deep-purple-accent-3"
          class="mb-2"
          density="compact"
          rounded="0"
          variant="tonal"
        >
          <v-btn
            v-for="(v, i) in viewProductsMode"
            :key="i"
            :value="v.value"
            size="small"
            :class="v.className"
          >
            {{ v.label }}
          </v-btn>
        </v-btn-toggle>
      </div>

      <GoodsList
        :view-mode="viewMode"
        :items="productsData"
      />
    </template>

    <v-empty-state
      v-else
      headline="Whoops, 404"
      title="未搜索到相关商品"
      text="The page you were looking for does not exist"
      icon="mdi-magnify"
      action-text="重新查询"
      @click:action="handleCurrentChange"
    />

    <div class="py-8 d-flex justify-center">
      <VcPagination
        v-model="currentPage"
        :page-size="pageSize"
        :total="total"
        @current-change="handleCurrentChange"
      />
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import GoodsList from './GoodsList.vue'
import GoodsLoading from './GoodsLoading.vue'
import useProducts, { viewProductsMode } from '~/composables/logic/useProducts'
import type { IViewMode } from '~/composables/logic/useProducts'

defineOptions({
  name: 'ProductsMain',
})

const viewMode = ref<IViewMode>('big')

const { currentPage, pageSize, total, updateProductsData, productsData, productsLoading }
  = useProducts()

const handleCurrentChange = () => {
  updateProductsData(false)
}
</script>
