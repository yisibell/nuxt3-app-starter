<template>
  <div class="goods-row mb-5 text-grey-darken-2">
    <v-row class="mb-2">
      <v-col
        :cols="12"
        :md="2"
      >
        <div class="d-flex align-center">
          <div style="min-width: 58px">
            <slot
              name="selection"
              :row="data"
            />
          </div>
          <v-img
            :width="140"
            :src="data.img.src"
          />
        </div>
      </v-col>
      <v-col
        :cols="12"
        :md="10"
      >
        <div class="d-flex flex-column justify-space-between fill-height">
          <div class="mb-3">
            <span
              class="goods-row__code"
              @click="handleToDetail"
            >{{ data.code }}</span>
          </div>
          <v-row>
            <v-col
              :md="3"
              class="text-caption goods-row__goods-style"
            >
              <div
                v-if="data.style"
                class="d-flex"
              >
                <span class="mr-2">款式:</span>
                <span>{{ data.style }}</span>
              </div>
              <div
                v-if="data.clothSeedName"
                class="d-flex"
              >
                <span class="mr-2">布种:</span>
                <span>{{ data.clothSeedName }}</span>
              </div>
              <div
                v-if="data.color"
                class="d-flex"
              >
                <span class="mr-2">颜色:</span>
                <span>{{ data.color }}</span>
              </div>
              <div
                v-if="data.size"
                class="d-flex"
              >
                <span class="mr-2">尺码:</span>
                <span>{{ data.size }}</span>
              </div>
              <div
                v-if="data.specs && data.specs.name"
                class="d-flex"
              >
                <span class="mr-2">规格:</span>
                <span>{{ data.specs.name }}</span>
              </div>
            </v-col>
            <v-col :md="3">
              <div class="d-flex align-center">
                <div class="text-subtitle-1">
                  <span>{{ data.currency || '￥' }}</span>
                  <span>{{ data.price }}</span>
                </div>
                <div v-if="data.unit">
                  <span
                    class="mx-1 text-caption"
                  >/</span>
                  <span class="text-body-2">
                    {{ data.unit }}
                  </span>
                </div>
              </div>

              <div
                v-if="data.discountPrice > 0 && showDiscountChip"
                class="my-2"
              >
                <v-chip
                  size="small"
                  color="error"
                >
                  <span>折扣单价：</span>
                  <span>{{ data.currency || '￥' }}</span>
                  <span>{{ data.discountPrice }}</span>
                  <span
                    v-if="data.unit"
                    class="mx-1"
                  >/</span>
                  <span class="text-caption">
                    {{ data.unit }}
                  </span>
                </v-chip>
              </div>
            </v-col>
            <v-col
              :md="3"
              class="d-flex align-center justify-center"
            >
              <v-menu
                open-on-hover
                offset-y
                :close-on-click="false"
                :close-on-content-click="false"
                :disabled="!data.clothSeedList"
              >
                <template #activator="quantitySlot">
                  <div
                    v-bind="quantitySlot.props"
                  >
                    <VcStepper
                      v-model="currQuantity"
                      :step="stepQuantity"
                      :strict-step="strictStepQuantity"
                      :readonly="!!data.clothSeedList"
                      max-width="180px"
                      class="mr-4 goods-row__quantity"
                      @change="handleQuantityChange"
                    />
                  </div>
                </template>
                <ClothSeedAmount
                  class="mt-3"
                  :data="data"
                />
              </v-menu>

              <div
                v-if="specsList.length > 0"
                class="goods-row__specs-select"
              >
                <v-select
                  v-model="currSpecs"
                  :items="specsList"
                  color="primary"
                  item-title="name"
                  item-value="value"
                  density="compact"
                  variant="underlined"
                  light
                  hide-details
                  @update:model-value="handleSpecsChange"
                />
              </div>
              <div
                v-else
                class="goods-row__unit"
              >
                {{ data.unit }}
              </div>
            </v-col>
            <v-col
              :md="3"
              class="d-flex align-center justify-center"
            >
              <v-chip
                v-if="data.showSlash"
                size="small"
                color="warning"
              >
                预定后结算
              </v-chip>

              <div v-else>
                <div class="text-center">
                  <span> {{ data.currency || '￥' }} {{ data.total }} </span>
                </div>

                <div v-if="data.discountTotalPrice > 0 && showDiscountChip">
                  <v-chip
                    size="small"
                    color="error"
                  >
                    <span>折扣价：</span>
                    <span>
                      {{ data.currency || '￥' }}
                      {{ data.discountTotalPrice }}
                    </span>
                  </v-chip>
                </div>
              </div>
            </v-col>
          </v-row>
          <div>
            <span
              class="text-error cursor-pointer text-caption"
              @click="handleRemove"
            >
              删除
            </span>
          </div>
        </div>
      </v-col>
    </v-row>
    <v-divider />
  </div>
</template>

<script setup lang="ts">
import ClothSeedAmount from './ClothSeedAmount.vue'
import type { ICartItemObject } from '~/composables/api/interfaces/cart'
import { $layer } from '~/utils/layer'
import { useCartStore } from '~/store/cart'

const props = withDefaults(defineProps<{
  data: ICartItemObject
  checkedIds: number[]
}>(), {})

const emit = defineEmits(['remove'])

const { data, checkedIds } = toRefs(props)

const CartStore = useCartStore()

const specsList = computed(() => data.value.specsList || [])
const currSpecs = ref(data.value.specs?.value || 0)

const primaryCategory = computed(() => data.value.primaryCategory)

const showDiscountChip = computed(() =>
  checkedIds.value.includes(data.value.id),
)

watch(
  data,
  (val) => {
    currSpecs.value = val.specs?.value || 0
  },
  { deep: true },
)

// 更新规格
const handleSpecsChange = (specs: number) => {
  const form = {
    cartId: data.value.id,
    goodsId: data.value.gid,
    number: data.value.quantity,
    specs,
  }

  CartStore.updateCartItem(form)
}

const currQuantity = ref(data.value.quantity)
watch(
  data,
  (val) => {
    currQuantity.value = val.quantity
  },
  {
    deep: true,
  },
)

// 更新数量
const handleQuantityChange = (number: number) => {
  const form = {
    cartId: data.value.id,
    goodsId: data.value.gid,
    number,
    specs: data.value.specs?.value,
  }

  CartStore.updateCartItem(form)
}

// 删除商品
const handleRemove = (): void => {
  $layer.confirm('确定要删除该商品吗?').then(async ({ isConfirmed }) => {
    if (isConfirmed) {
      await CartStore.removeCartItem([data.value.id])

      emit('remove', data.value.id)
    }
  })
}

const router = useRouter()
const handleToDetail = () => {
  router.push({
    path: `/products/${data.value.code}`,
    query: { id: data.value.gid },
  })
}

// 数量步数控制
const stepQuantity = computed(() => {
  // 面料按整米购买控制递增步数
  if (primaryCategory.value === 6 && currSpecs.value === 2) {
    return 0.5
  }

  return 1
})

// 数量严格步数
const strictStepQuantity = computed(() => {
  // 面料按整米购买控制严格步数
  if (primaryCategory.value === 6 && currSpecs.value === 2) {
    return true
  }

  return false
})
</script>

<style lang="scss" scoped>
.goods-row {
  &__code {
    font-weight: bold;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
      color: rgb(var(--v-theme-primary));
    }
  }

  &__goods-style {
    line-height: 20px;
  }

  &__quantity {
    flex: 1;
  }

  &__unit {
    width: 56px;
  }

  &__specs-select {
    width: 56px;

    :deep() {
      input {
        color: #9e9e9e;
      }

      .v-select__selection {
        color: #9e9e9e;
        font-size: 12px;
        overflow: visible;
      }
    }
  }
}
</style>
