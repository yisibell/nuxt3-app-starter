<template>
  <div class="goods-panel">
    <v-row>
      <v-col
        :col="12"
        :md="7"
      >
        <div class="pr-3">
          <VcSwiperThumbs :items="goodsImgs" />
        </div>
      </v-col>
      <v-col
        :col="12"
        :md="5"
      >
        <div class="goods-panel__right">
          <div class="goods-panel__right__info-base mb-12">
            <h1
              class="text-h5 mb-1"
              :title="`${data.primaryCategory}-${data.secondaryCategory}`"
            >
              {{ data.code }}
            </h1>
            <div
              v-if="data.style && data.style.name"
              class="text-grey mb-3"
            >
              {{ data.style.name }}
            </div>

            <div class="product-price d-flex text-success mb-2 flex-wrap">
              <span
                class="text-body-2"
                style="margin-top: 5px; margin-right: 1px"
              >
                {{ data.currency || '￥' }}
              </span>
              <span class="text-h4 font-weight-bold">
                {{ goodsDynamicPrice }}
              </span>
              <span
                v-if="data.unit"
                class="product-price text-subtittle-2"
                style="margin-left: 2px; margin-top: 3px"
              >
                / {{ data.unit }}
              </span>
              <span
                v-show="showMinimumPrice"
                class="text-grey text-caption pt-2 mx-2"
              >
                起
              </span>

              <template v-if="goodsDynamicPriceForBatch > 0">
                <v-chip
                  size="small"
                  color="red"
                  class="mx-2 mt-2"
                >
                  <span>
                    ￥{{ goodsDynamicPriceForBatch }} /
                    {{ goodsDynamicUnitForBatch }}
                  </span>
                </v-chip>
              </template>

              <span
                v-show="dynamicStockType"
                class="text-grey text-caption pt-2 mx-2"
              >
                因制作工艺，价格会随购买数量产生浮动。如购买相同颜色及染色工艺的商品，结算时可再分摊染色费用，具体结算金额以购物车为准。
              </span>
            </div>

            <div
              v-if="goodsMoqInfo.num"
              class="text-caption text-error"
            >
              购买{{ goodsMoqInfo.num }}
              {{ goodsMoqInfo.unit }}，将达到染色费用起订量，单价为{{
                goodsMoqInfo.price
              }}元/{{ goodsMoqInfo.unit }}。
            </div>

            <!-- 规格信息 -->
            <SpecificationInfo
              :goods-info="data"
              :specs-info="
                goodsDynamicNumForBatch
                  ? `${goodsDynamicNumForBatch}${data.unit}/${goodsDynamicUnitForBatch}`
                  : ''
              "
            />
          </div>

          <div class="goods-panel__right__actions">
            <div class="pt-4">
              <!-- 尺码 -->
              <SizePicker
                v-if="sizeItems.length > 0"
                :items="sizeItems"
                class="mb-8"
              />

              <!-- 颜色 -->
              <ColorPicker
                v-if="colorItems.length > 0"
                :items="colorItems"
                :primary-category="data.primaryCategory"
                :secondary-category="data.secondaryCategory"
                class="mb-8"
              />

              <!-- 规格 -->
              <SpecsPicker
                v-if="specsItems.length > 0"
                :items="specsItems"
                :secondary-category="data.secondaryCategory"
                :tips="specsTips"
                class="mb-8"
              />

              <ClothSeedPicker
                v-if="clothSeedItems.length > 0"
                :items="clothSeedItems"
                class="mb-8"
              />

              <!-- 数量 -->
              <AmountPicker
                :primary-category="data.primaryCategory"
                :max="maxQuantity"
                :step="stepQuantity"
                :strict-step="strictStepQuantity"
                class="mb-8"
              />
            </div>

            <div class="pt-3">
              <v-btn
                color="#F3CC71"
                block
                size="large"
                :loading="loading"
                class="my-3"
                @click="handleAddToCart"
              >
                <v-icon start>
                  mdi-cart
                </v-icon>

                <span class="flex-grow-1">加入购物车</span>
              </v-btn>

              <StockInfo
                v-if="goodsStockInfo?.shipTime && goodsStockInfo?.shipTime > 0"
                :info="goodsStockInfo"
              />
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import SpecificationInfo from './SpecificationInfo.vue'
import SpecsPicker from './SpecsPicker.vue'
import SizePicker from './SizePicker.vue'
import ColorPicker from './ColorPicker.vue'
import AmountPicker from './AmountPicker.vue'
import ClothSeedPicker from './ClothSeedPicker.vue'
import StockInfo from './StockInfo.vue'
import useAddToCart, {
  AddToCartFormInjectionSymbol,
  UpdateDynamicPriceInjectionSymbol,
  SetFormQuantityInjectionSymbol,
  SetFormSizeInjecttionSymbol,
  SetFormSpecsInjecttionSymbol,
  SetFormClothSeedInjecttionSymbol,
  UpdateDynamicAttrSymbol,
  SetFormColorInjecttionSymbol,
  DynamicOptimalPriceInjectionSymbol,
  UpdateDynamicOptimalPriceInjectionSymbol,
  GetGoodsMoqInfoInjectionSymbol,
} from '~/composables/logic/useAddToCart'
import type { IGoodsDetailObject } from '~/composables/api/interfaces/goods'

const props = withDefaults(defineProps<{
  data: IGoodsDetailObject
  goodsId: number
  searchGid: number
}>(), {
  goodsId: 0,
  searchGid: 0,
})

const { data } = toRefs(props)

const goodsImgs = computed(() => props.data.img || [])

const {
  goodsStockInfo,
  goodsDynamicNumForBatch,
  goodsDynamicPriceForBatch,
  goodsDynamicUnitForBatch,
  strictStepQuantity,
  stepQuantity,
  specsTips,
  maxQuantity,
  specsItems,
  colorItems,
  sizeItems,
  clothSeedItems,
  showMinimumPrice,
  dynamicStockType,
  goodsDynamicPrice,
  updateDynamicPrice,
  form,
  setFormQuantity,
  setFormSize,
  setFormSpecs,
  setFormColor,
  setFormClothSeed,
  loading,
  handleAddToCart,
  updateDynamicAttr,
  dynamicOptimalPrice,
  updateDynamicOptimalPrice,
  goodsMoqInfo,
  getGoodsMoqInfo,
} = useAddToCart(data, props.goodsId, props.searchGid)

provide(AddToCartFormInjectionSymbol, form)
provide(UpdateDynamicPriceInjectionSymbol, updateDynamicPrice)
provide(SetFormQuantityInjectionSymbol, setFormQuantity)
provide(SetFormSizeInjecttionSymbol, setFormSize)
provide(UpdateDynamicAttrSymbol, updateDynamicAttr)
provide(SetFormSpecsInjecttionSymbol, setFormSpecs)
provide(SetFormColorInjecttionSymbol, setFormColor)
provide(SetFormClothSeedInjecttionSymbol, setFormClothSeed)
provide(UpdateDynamicOptimalPriceInjectionSymbol, updateDynamicOptimalPrice)
provide(DynamicOptimalPriceInjectionSymbol, dynamicOptimalPrice)
provide(GetGoodsMoqInfoInjectionSymbol, getGoodsMoqInfo)
</script>

<style lang="scss" scoped>
.goods-panel {
  &__right {
    &__info-base {
      .product-price {
        font-family: Roboto, -apple-system, BlinkMacSystemFont, Segoe UI,
          sans-serif !important;
      }
    }

    &__actions {
      max-width: 468px;
    }
  }
}
</style>
