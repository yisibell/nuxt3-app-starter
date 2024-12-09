<template>
  <div class="d-flex align-center">
    <div class="mr-2 text-grey label">
      {{ label }}
    </div>
    <slot name="default" />
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  label?: string
}>(), {
  label: '',
})
</script>

<style lang="scss" scoped>
.label {
  min-width: 48px;
}
</style>
