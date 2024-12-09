<template>
  <v-menu
    v-model="menuActive"
    :disabled="isCartEmpty"
    open-on-hover
    offset-y
    max-height="520"
    min-width="350"
  >
    <template #activator="{ props }">
      <v-btn
        icon
        v-bind="props"
        @click="handleToCart"
      >
        <v-badge
          :content="cartTotalNumberDisplay"
          :model-value="!!cartTotalNumber"
          color="red"
        >
          <v-icon>mdi-cart</v-icon>
        </v-badge>
      </v-btn>
    </template>

    <v-card>
      <v-card-text>
        <v-row
          v-for="(v, i) in cartItems"
          :key="i"
          align="center"
        >
          <v-col :md="4">
            <v-img
              :src="v.img.src"
              :width="100"
            />
          </v-col>
          <v-col :md="8">
            <div class="font-weight-bold text-grey">
              {{ v.code }}
            </div>
            <v-row>
              <v-col
                :md="6"
                class="text-grey-darken-2"
              >
                <div
                  v-if="v.color"
                  class="text-caption"
                >
                  <span>颜色:</span>
                  <span>{{ v.color }}</span>
                </div>
                <div
                  v-if="v.size"
                  class="text-caption"
                >
                  <span>尺码:</span>
                  <span>{{ v.size }}</span>
                </div>
                <div
                  v-if="v.specs && v.specs.name"
                  class="text-caption"
                >
                  <span>规格:</span>
                  <span>{{ v.specs.name }}</span>
                </div>
                <div
                  v-if="v.unit"
                  class="text-caption"
                >
                  <span>单位:</span>
                  <span>{{ v.unit }}</span>
                </div>
                <div class="text-caption">
                  <span>数量:</span>
                  <span>{{ v.quantity }}</span>
                </div>
              </v-col>
              <v-col
                :md="6"
                class="text-red"
              >
                <div class="px-2">
                  <span
                    v-if="v.showSlash"
                    class="text-caption"
                  >
                    预定后结算
                  </span>
                  <span v-else>￥{{ v.total }}</span>
                </div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider />

      <v-card-text>
        <div class="float-right text-right">
          <div class="text-body-2 mb-2">
            共<span class="text-red mx-2"> {{ totalNumber }} </span>件商品
          </div>
          <div class="mb-2">
            <span>合计:</span>
            <span class="text-red font-weight-bold">￥{{ totalPrice }}</span>
          </div>
        </div>

        <v-btn
          color="primary"
          rounded="0"
          block
          @click="handleToCart"
        >
          去购物车结算
        </v-btn>
      </v-card-text>
    </v-card>
  </v-menu>
</template>

<script setup lang="ts">
import { useCartStore } from '~/store/cart'

const CartStore = useCartStore()

const router = useRouter()

const cartTotalNumber = computed(() => CartStore.totalNumber)

const cartTotalNumberDisplay = computed(() =>
  cartTotalNumber.value > 99 ? '99+' : cartTotalNumber.value,
)

const handleToCart = () => {
  router.push({ name: 'cart' })
}

const menuActive = ref(false)

const cartItems = computed(() => CartStore.items)

const isCartEmpty = computed(() => cartItems.value.length <= 0)

const totalNumber = computed(() => CartStore.totalNumber)
const totalPrice = computed(() => CartStore.totalPrice)

onMounted(() => {
  CartStore.fetchCartList(false)
})
</script>
