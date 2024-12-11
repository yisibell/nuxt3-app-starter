<template>
  <ElCascader
    v-model="selected"
    :options="items"
    :props="{
      label: 'name',
      value: 'id',
      children: 'list',
      multiple: true,
      checkStrictly: true,
    }"
    clearable
    :placeholder="placeholder"
  />
</template>

<script setup lang="ts">
import type { IGetOrderListCategoriesParam } from '~/composables/api/interfaces/order'
import { useCategoryStore } from '~/store/category'

type ICategoryParam = IGetOrderListCategoriesParam
type ICascaderValue = number[][]

const props = withDefaults(defineProps<{
  modelValue: ICategoryParam
  placeholder?: string
}>(), {})

const emit = defineEmits(['update:modelValue'])

const selected = computed({
  get() {
    return formatInputValue(props.modelValue)
  },
  set(value) {
    emit('update:modelValue', formatOutputValue(value))
  },
})

const CategoryStore = useCategoryStore()

const items = computed(() => CategoryStore.items)

const getPid = (id: number) => {
  const item = items.value.find((v) => {
    if (Array.isArray(v.list) && v.list.every(e => e.id === id))
      return true

    return false
  })

  if (item) {
    return item.id
  }

  return 0
}

const formatInputValue: (ori: ICategoryParam) => ICascaderValue = (ori) => {
  if (Array.isArray(ori) && ori.length > 0) {
    return ori.reduce((res, v) => {
      if (v.p && v.s) {
        res.push([v.p, v.s])
      }
      else if (v.p && !v.s) {
        res.push([v.p])
      }
      else if (!v.p && v.s) {
        res.push([getPid(v.s), v.s])
      }

      return res
    }, [] as ICascaderValue)
  }

  return []
}

const formatOutputValue: (ori: ICascaderValue) => ICategoryParam = (
  ori,
) => {
  const out = ori.reduce((res, v) => {
    res.push({
      p: v[0],
      s: v[1] || 0,
    })

    return res
  }, [] as ICategoryParam)

  return out
}
</script>
