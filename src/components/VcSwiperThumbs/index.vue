<template>
  <div class="lu-swiper-thumbs">
    <div class="lu-swiper-thumbs__wrapper">
      <SwiperWrapper
        class="lu-swiper-thumbs__thumb"
        direction="vertical"
        slides-per-view="auto"
        :observer="true"
        :space-between="10"
        :navigation="true"
        :modules="[Navigation]"
        :class="{ 'mt-7': items.length > showNavigationWhenItemsGet }"
        @init="onThumbInit"
        @slide-change="onThumbSlideChange"
      >
        <SwiperSlide
          v-for="(v, i) in items"
          :key="v.src"
          @mouseenter="onThumbSlideHover(i)"
        >
          <template #default>
            <img
              :src="v.src"
              :class="{
                active: i === activeIndex,
              }"
            >
          </template>
        </SwiperSlide>
      </swiperwrapper>
    </div>

    <SwiperWrapper
      class="lu-swiper-thumbs__gallery"
      auto-height
      :on="gallerySwiperOn"
      @init="onGalleryInit"
    >
      <SwiperSlide
        v-for="(v) in items"
        :key="v.src"
      >
        <template #default>
          <img
            :src="v.src"
            class="lu-swiper-thumbs__gallery__img"
          >
        </template>
      </SwiperSlide>
    </swiperwrapper>
  </div>
</template>

<script setup lang="ts">
import { Swiper as SwiperWrapper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules'
import type Swiper from 'swiper'

import 'swiper/css'
import 'swiper/css/navigation'

type SwiperInstance = InstanceType<typeof Swiper>

withDefaults(defineProps<{
  /**
   * 缩略图列表
   */
  items: { src: string }[]
  showNavigationWhenItemsGet?: number
}>(), {
  items: () => [],
  showNavigationWhenItemsGet: 5,
})

const activeIndex = ref(0)

const thumbInstance = ref<SwiperInstance>()
const onThumbInit = (sw: SwiperInstance) => {
  thumbInstance.value = sw
}

const onThumbSlideChange = (sw: SwiperInstance) => {
  activeIndex.value = sw.activeIndex
}

const onThumbSlideHover = (index: number) => {
  activeIndex.value = index
  galleryInstance.value?.slideTo(index)
}

const gallerySwiperOn = {
  slideChange(sw: SwiperInstance) {
    activeIndex.value = sw.activeIndex
  },
}

const galleryInstance = ref<SwiperInstance>()
const onGalleryInit = (sw: SwiperInstance) => {
  galleryInstance.value = sw
}
</script>

<style lang="scss" scoped>
$--thumbs-height: 376px;

.lu-swiper-thumbs {
  display: flex;

  &__wrapper {
    position: relative;
  }

  &__thumb {
    max-height: $--thumbs-height;
    margin-right: 14px;
    width: 85px;

    &.swiper {
      position: static;
    }

    img {
      display: block;
      width: 100%;

      &.active {
        padding: 1px;
        border: 1px solid red;
        box-sizing: border-box;
      }
    }

    :deep() {
      .swiper-button-prev,
      .swiper-button-next {
        position: absolute;
        width: 85px;
        height: 20px;
        background-color: #f5f5f5;
        right: 0;
        left: 0;
        cursor: pointer;
        z-index: 10;
      }

      .swiper-button-prev {
        top: 20px;
        transform: rotate(180deg);

        &::after {
          transform: rotate(-90deg);
          font-size: 17px;
          color: #000;
          margin-bottom: 0;
          font-weight: bold;
        }
      }

      .swiper-button-next {
        top: $--thumbs-height + 60px;

        &::after {
          transform: rotate(90deg);
          font-size: 17px;
          margin-bottom: 0;
          color: #000;
          font-weight: bold;
        }
      }
    }
  }

  &__gallery {
    position: relative;
    flex: 1;

    &__img {
      cursor: default;
      width: 100%;
    }
  }
}
</style>
