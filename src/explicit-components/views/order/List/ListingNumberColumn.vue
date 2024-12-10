<template>
  <div v-if="items">
    <div
      v-for="v in items"
      :key="v"
      class="text-caption"
    >
      {{ v }}
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  items: string[]
}>(), {
  items: () => [],
})
</script>
