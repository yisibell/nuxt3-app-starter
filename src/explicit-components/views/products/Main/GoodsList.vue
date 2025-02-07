<template>
  <div
    class="goods-list"
  >
    <div
      v-for="(v, i) in items"
      :key="i"
      class="goods-list__item"
      :class="`${viewMode}-mode`"
    >
      <GoodsCard
        :data="v"
        :img-height="imgHeight"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import GoodsCard from './GoodsCard.vue'
import type { IGoodsInfoObject } from '~/composables/api/interfaces/goods'
import type { IViewMode } from '~/composables/logic/useProducts'

const props = withDefaults(defineProps<{
  items: IGoodsInfoObject[]
  viewMode: IViewMode
}>(), {
  items: () => [],
  viewMode: 'big',
})

const imgHeight = computed(() => {
  switch (props.viewMode) {
    case 'big':
      return 280
    default:
      return 220
  }
})
</script>

<style lang="scss" scoped>
.goods-list {
  --media-card-gap: 16px;

  display: flex;
  flex-wrap: wrap;

  &__item {
    margin-right: var(--media-card-gap);
    margin-bottom: var(--media-card-gap);
  }

  @media screen and (max-width: 960px) {
    &__item {
      width: calc(calc(100% - calc(var(--media-card-gap) * 1)) / 2);

      &:nth-child(2n) {
        margin-right: 0;
      }

      &.small-mode {
        width: calc(calc(100% - calc(var(--media-card-gap) * 2)) / 3);
        margin-right: var(--media-card-gap);
        margin-bottom: var(--media-card-gap);

        &:nth-child(3n) {
          margin-right: 0;
        }
      }
    }
  }

  @media screen and (min-width: 960px) and (max-width: 1280px) {
    &__item {
      width: calc(calc(100% - calc(var(--media-card-gap) * 2)) / 3);

      &:nth-child(3n) {
        margin-right: 0;
      }

      &.small-mode {
        width: calc(calc(100% - calc(var(--media-card-gap) * 3)) / 4);
        margin-right: var(--media-card-gap);
        margin-bottom: var(--media-card-gap);

        &:nth-child(4n) {
          margin-right: 0;
        }
      }
    }
  }

  @media screen and (min-width: 1280px) and (max-width: 1919px) {
    &__item {
      width: calc(calc(100% - calc(var(--media-card-gap) * 3)) / 4);

      &:nth-child(4n) {
        margin-right: 0;
      }

      &.small-mode {
        width: calc(calc(100% - calc(var(--media-card-gap) * 4)) / 5);
        margin-right: var(--media-card-gap);
        margin-bottom: var(--media-card-gap);

        &:nth-child(5n) {
          margin-right: 0;
        }
      }
    }
  }

  @media screen and (min-width: 1920px) {
    &__item {
      width: calc(calc(100% - calc(var(--media-card-gap) * 5)) / 6);

      &:nth-child(6n) {
        margin-right: 0;
      }

      &.small-mode {
        width: calc(calc(100% - calc(var(--media-card-gap) * 7)) / 8);
        margin-right: var(--media-card-gap);
        margin-bottom: var(--media-card-gap);

        &:nth-child(8n) {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
