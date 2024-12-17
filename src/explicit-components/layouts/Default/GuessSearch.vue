<template>
  <div v-if="goodsNumberComboboxItems.length">
    <v-card-subtitle class="px-4 py-3">
      猜你想搜
    </v-card-subtitle>

    <v-divider />

    <v-card-text class="py-0 pr-0">
      <v-virtual-scroll
        :items="goodsNumberComboboxItems"
        max-height="400"
        class="scrollbar--primary"
      >
        <template #default="{ item }">
          <v-list-item
            :key="item.value"
            color="primary"
            rounded="xl"
            class="mr-4 my-2"
            density="compact"
            prepend-icon="mdi-magnify"
            @click="handleSearch(item.value)"
          >
            <v-list-item-subtitle>
              {{ item.text }}
            </v-list-item-subtitle>
          </v-list-item>
        </template>
      </v-virtual-scroll>
    </v-card-text>
  </div>
</template>

<script lang="ts" setup>
import { useGoodsApi } from '~/composables/api/modules/goods'

const props = withDefaults(defineProps<{
  keyword: string
}>(), {
  keyword: '',
})

const emit = defineEmits(['search'])

const GoodsApi = useGoodsApi()

const handleSearch = (value: string) => {
  emit('search', value)
}

const goodsNumberList = ref<string[]>([])
const goodsNumberComboboxItems = computed(() => {
  return goodsNumberList.value
    .filter(
      e =>
        props.keyword
        && new RegExp(`${props.keyword.toLowerCase()}`).test(
          e.toLowerCase(),
        ),
    )
    .map(v => ({ text: v, value: v }))
})

const fetchGoodsNumberList = async () => {
  const { code, data } = await GoodsApi.getGoodsNumberAll()
  if (code === 0) {
    goodsNumberList.value = data.numberList
  }
}

onMounted(() => {
  fetchGoodsNumberList()
})
</script>
