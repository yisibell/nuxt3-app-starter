<template>
  <el-table
    v-bind="props"
    class="lu-tree-table"
    @selection-change="handleSelectionChange"
  >
    <slot name="left" />

    <el-table-column
      v-for="(v, i) in columns"
      :key="i"
      v-bind="v"
    >
      <template #default="{ row, $index }">
        <slot
          :name="`column-${v.prop}`"
          :row="row"
          :index="$index"
        >
          {{ v.prop && row[v.prop] }}
        </slot>
      </template>
    </el-table-column>

    <slot name="default" />
  </el-table>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  data?: any[]
  columns: {
    label?: string
    prop?: string
    width?: string | number
    align?: string
    headerAlign?: string
  }[]
  indent?: number
  rowKey?: string
  border?: boolean
}>(), {
  rowKey: 'id',
  data: () => [],
})

const emit = defineEmits(['selection-change'])

const handleSelectionChange = (value: any[]) => {
  emit('selection-change', value)
}
</script>
