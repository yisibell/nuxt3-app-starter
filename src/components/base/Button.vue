<template>
  <ElButton type="primary">
    <slot name="default">{{ text }}</slot>
  </ElButton>
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
