<template>
  <div v-if="items.length">
    <v-card-subtitle class="px-4 py-3 d-flex justify-space-between">
      历史记录

      <v-icon
        size="small"
        icon="mdi-trash-can-outline"
        class="cursor-pointer"
        @click="handleClear"
      />
    </v-card-subtitle>

    <v-divider />

    <v-card-text
      class="flex-wrap"
      style="max-width: 420px;"
    >
      <v-chip
        v-for="(v, i) in items"
        :key="i"
        color="grey"
        closable
        size="small"
        class="mr-2 mb-2 cursor-pointer"
        @click:close="handleDelete(i)"
        @click="handleSearch(v.keyword)"
      >
        {{ v.keyword }}
      </v-chip>
    </v-card-text>
  </div>
</template>

<script lang="ts" setup>
import { useProductsStore } from '~/store/products'

const props = withDefaults(defineProps<{
  type: number
}>(), {})

const emit = defineEmits(['search'])

const ProductsStore = useProductsStore()

const items = computed(() => ProductsStore.searchHistory.filter(v => v.type === props.type))

const handleSearch = (value: string) => {
  emit('search', value)
}

const handleClear = () => {
  ProductsStore.clearSearchHistory()
}

const handleDelete = (index: number) => {
  ProductsStore.deleteSearchHistory(index)
}
</script>
