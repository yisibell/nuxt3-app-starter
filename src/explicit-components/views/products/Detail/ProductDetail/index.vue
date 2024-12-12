<template>
  <div class="py-16">
    <v-card elevation="12">
      <v-card-text class="px-4 bg-grey-lighten-4">
        商品详情
      </v-card-text>

      <v-card-text class="px-6 pt-8">
        <v-row>
          <v-col
            v-for="(v, i) in infoItems"
            :key="i"
            :col="12"
            :md="4"
          >
            <div class="d-flex mb-2">
              <span class="mr-8 text-grey">{{ v.label }}: </span>
              <span class="font-weight-bold text-grey-darken-2">{{ v.value || '-' }}</span>
            </div>
            <v-divider />
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-text class="pa-6 d-flex justify-center">
        <div>
          <v-img
            v-for="(v, i) in goodsDetailImgs"
            :key="i"
            :src="v.src"
            :width="800"
            class="mb-4"
          />
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import type { IGoodsDetailObject } from '~/composables/api/interfaces/goods'
import { useSiteStore } from '~/store/site'

const props = withDefaults(defineProps<{
  data: IGoodsDetailObject
}>(), {

})

const SiteStore = useSiteStore()

const topCategory = computed(
  () => SiteStore.goodsListSearchParams.topCategory,
)

const infoItems = computed(() => {
  switch (topCategory.value) {
    case 1:
      return [
        { label: '分类', value: props.data.classify },
        { label: '编号', value: props.data.code },
        { label: '所属地', value: props.data.location },
        { label: '蕾丝种类', value: props.data.fabric },
        { label: '成分', value: props.data.component },
        { label: '弹性', value: props.data.elasticity },
        { label: '染色工艺', value: props.data.dyeing },
        { label: '蕾丝工艺说明', value: props.data.laceProcessDesc },
      ]
    default:
      return [
        { label: '分类', value: props.data.classify },
        { label: '编号', value: props.data.code },
        { label: '所属地', value: props.data.location },
        { label: '尺寸规格', value: props.data.size },
        { label: '门幅', value: props.data.width },
        { label: '面料参数', value: props.data.fabric },
        { label: '成分', value: props.data.component },
        { label: '弹性', value: props.data.elasticity },
        { label: '染色工艺', value: props.data.dyeing },
      ]
  }
})

const goodsDetailImgs = computed(() => props.data.bottomImg || [])
</script>
