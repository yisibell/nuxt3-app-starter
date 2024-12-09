<template>
  <div
    v-if="!hidePagination"
    class="lu-pagination"
  >
    <div class="lu-pagination__total">
      <slot
        name="total"
        :page-count="pageCount"
        :current-page="current"
      />
    </div>
    <v-pagination
      v-model="current"
      :length="pageCount"
      active-color="primary"
      rounded="circle"
      size="small"
      variant="elevated"
      elevation="3"
      :total-visible="totalVisible"
      @update:model-value="handleInput"
    />
  </div>
</template>

<script setup lang="ts">
const current = defineModel<number>()

const props = withDefaults(defineProps<{
  pageSize: number
  total: number
  hideOnNoData?: boolean
  totalVisible?: number
}>(), {
  pageSize: 20,
  total: 0,
  hideOnNoData: true,
  totalVisible: 10,
})

const emit = defineEmits(['current-change'])

const handleInput = (index: number) => {
  emit('current-change', index)
}

// 页数
const pageCount = computed(() => Math.ceil(props.total / props.pageSize))

const hidePagination = computed(
  () => props.hideOnNoData && (props.total <= 0),
)
</script>

<style lang="scss" scoped>
.lu-pagination {
  display: flex;
  align-items: center;

  &__total {
    font-size: 13px;
    color: #959595;
  }
}
</style>
