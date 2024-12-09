<template>
  <v-card flat>
    <v-card-text
      v-for="(v, i) in clothSeedList"
      :key="i"
      class="d-flex align-center"
    >
      <div
        class="mr-2 text-center"
        style="min-width: 50px"
      >
        {{ v.name }}
      </div>
      <VcInputNumber
        :model-value="v.quantity"
        :min="1"
        size="small"
        @change="handleChange($event, v.clothSeedId)"
      />
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import type { ICartItemObject } from '~/composables/api/interfaces/cart'
import { useCartStore } from '~/store/cart'

const props = withDefaults(defineProps<{
  data: ICartItemObject
}>(), {})

const { data } = toRefs(props)

const CartStore = useCartStore()

const clothSeedList = computed(() => data.value.clothSeedList)

const handleChange = (number: number, clothSeedId: number) => {
  const form = {
    cartId: data.value.id,
    goodsId: data.value.gid,
    number,
    specs: data.value.specs?.value,
    clothSeedId,
  }

  CartStore.updateCartItem(form)
}
</script>
