<template>
  <div>
    <template v-if="productsData.length">
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
            value="big"
            size="small"
            class="mr-4"
          >
            查看大图
          </v-btn>
          <v-btn
            value="small"
            size="small"
          >
            查看小图
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
  </div>
</template>

<script setup lang="ts">
import GoodsList from './GoodsList.vue'
import useProducts from '~/composables/logic/useProducts'

const viewMode = ref('big')

const { currentPage, pageSize, total, updateProductsData, productsData }
  = useProducts()

const handleCurrentChange = () => {
  updateProductsData(false)
}
</script>
