<template>
  <button type="button">
    <slot name="default">{{ text }}</slot>
  </button>
</template>

<script lang="ts">
export default defineComponent({
  name: 'BaseButton',
  props: {
    text: {
      type: String,
      default: '',
    },
  },
})
</script>
