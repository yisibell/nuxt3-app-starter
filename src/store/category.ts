import { defineStore } from 'pinia'
import { cloneDeep } from 'lodash-es'
import type { ICategories } from '~/composables/api/interfaces/category'
import { useCategoryApi } from '~/composables/api/modules/category'

export const useCategoryStore = defineStore('category', () => {
  const CategoryApi = useCategoryApi()

  const items = ref<ICategories>([])

  const itemsTree = computed<ICategories>(() => {
    const ori = cloneDeep(items.value)

    ori.forEach((v) => {
      if (Array.isArray(v.list) && v.list.length > 0) {
        v.list.forEach((e) => {
          e.pid = v.id
        })
      }
    })

    return ori
  })

  const SET_ITEMS = (payload: ICategories) => {
    items.value = payload
  }

  const fetchCategories = async () => {
    try {
      const { code, data } = await CategoryApi.get()
      if (code === 0) {
        SET_ITEMS(Array.isArray(data) ? data : [])
      }
    }
    catch (err) {
      console.error(err)
    }
  }

  return {
    items,
    itemsTree,
    SET_ITEMS,
    fetchCategories,
  }
})
