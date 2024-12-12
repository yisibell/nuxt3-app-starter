<template>
  <v-card
    elevation="12"
    class="goods-card"
  >
    <v-img
      :src="data.img"
      :height="imgHeight"
      class="goods-card__img"
      contain
      @click="handleClick"
    >
      <template #placeholder>
        <v-row
          class="fill-height ma-0"
          align="center"
          justify="center"
        >
          <v-progress-circular
            indeterminate
            color="grey lighten-2"
          />
        </v-row>
      </template>
    </v-img>

    <div class="goods-card__desc pa-4">
      <div class="d-flex text-grey text-caption">
        <span style="min-width: 40px">编号：</span>
        <span class="">{{ data.code }}</span>
      </div>
      <div
        v-if="data.style"
        class="d-flex text-grey text-caption"
      >
        <span style="min-width: 40px">款式：</span>
        <span
          class="text-truncate"
          :title="data.style"
        >{{ data.style }}</span>
      </div>
      <div
        v-if="data.color"
        class="d-flex text-grey text-caption"
      >
        <span style="min-width: 40px">颜色：</span>
        <span
          class="text-truncate"
          :title="data.color"
        >{{ data.color }}</span>
      </div>
    </div>

    <v-card-actions class="px-4">
      <div class="d-flex text-success">
        <span>{{ data.currency || '￥' }}</span>
        <span class="fs-18 font-weight-bold">{{ data.price }}</span>
        <span class="text-caption px-1">
          {{ data.unit ? `/ ${data.unit}` : '' }}
        </span>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { useSiteStore } from '~/store/site'
import type { IGoodsInfoObject } from '~/composables/api/interfaces/goods'

const props = withDefaults(defineProps<{
  data: IGoodsInfoObject
  imgHeight: string | number
}>(), {
  imgHeight: 220,
})

const SiteStore = useSiteStore()

const sgid = computed(() =>
  SiteStore.goodsListSearchParams.type === 2
    ? SiteStore.goodsListSearchParams.keyword
    : 0,
)

const handleClick = () => {
  const href = `/products/${props.data.code}?id=${props.data.goodsId}&sgid=${sgid.value}`

  window.open(href, '_blank')
}
</script>

<style lang="scss" scoped>
.goods-card {
  height: 100%;
  &__img {
    cursor: pointer;
  }
}
</style>
