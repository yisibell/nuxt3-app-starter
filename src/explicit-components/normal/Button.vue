<template>
  <ElButton type="warning">
    <slot name="default">{{ text }}</slot>
  </ElButton>
</template>

<script lang="ts">
export default defineComponent({
  name: 'NormalButton',
  props: {
    text: {
      type: String,
      default: '',
    },
  },
})
</script>
