<template>
  <div>
    <slot name="default" />
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'DefaultLayout',
})
</script>
