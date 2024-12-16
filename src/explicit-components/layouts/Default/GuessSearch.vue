<template>
  <div v-if="items.length">
    <v-card-subtitle class="px-4 py-3">
      猜你想搜
    </v-card-subtitle>

    <v-divider />

    <v-card-text class="py-0 pr-0">
      <v-virtual-scroll
        :items="items"
        max-height="480"
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
withDefaults(defineProps<{
  items: { text: string, value: string }[]
}>(), {
  items: () => [],
})

const emit = defineEmits(['search'])

const handleSearch = (value: string) => {
  emit('search', value)
}
</script>
