<template>
  <div>
    <CartEmpty v-if="isCartEmpty" />
    <CartMain
      v-else
      ref="cartMainVNode"
    />
  </div>
</template>

<script setup lang="ts">
import CartMain from '~/explicit-components/views/cart/Main/index.vue'
import CartEmpty from '~/explicit-components/views/cart/CartEmpty.vue'
import { useCartStore } from '~/store/cart'

interface ICartMainRef {
  autoCheckedAll: () => void
}

definePageMeta({
  title: '我的购物车',
})

const route = useRoute()

useHead({
  title: route.meta.title as string,
})

const CartStore = useCartStore()

const isCartEmpty = computed(() => CartStore.items.length <= 0)

const cartMainVNode = ref<ICartMainRef>()

onMounted(async () => {
  await CartStore.fetchCartList(false)

  cartMainVNode.value?.autoCheckedAll()
})
</script>
