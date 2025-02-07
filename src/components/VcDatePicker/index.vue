<template>
  <el-date-picker v-bind="props" />
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  type?: 'daterange' | 'date' | 'datetime'
  startPlaceholder?: string
  endPlaceholder?: string
  rangeSeparator?: string
  valueFormat?: string
}>(), {
  type: 'daterange',
  startPlaceholder: '开始日期',
  rangeSeparator: '-',
  endPlaceholder: '结束日期',
  valueFormat: 'yyyy-MM-dd',
})
</script>
