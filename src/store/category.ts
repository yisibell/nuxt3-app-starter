import cloneDeep from 'lodash/cloneDeep'
import type { ICategories } from '~~/packages/api/modules/category'
import { $api } from '~~/packages/api'
import { defineStore } from 'pinia'

export const useCategoryStore = defineStore('category', {
  state: () => ({
    items: [] as ICategories,
  }),
  getters: {
    itemsTree(state) {
      const ori = cloneDeep(state.items)

      ori.forEach((v) => {
        if (Array.isArray(v.list) && v.list.length > 0) {
          v.list.forEach((e) => {
            e.pid = v.id
          })
        }
      })

      return ori
    },
  },
  actions: {
    SET_ITEMS(payload: ICategories) {
      this.items = payload
    },
    async fetchCategories() {
      try {
        const { code, data } = await $api.category.get()
        if (code === 0) {
          this.SET_ITEMS(Array.isArray(data) ? data : [])
        }
      } catch (err) {
        console.error(err)
      }
    },
  },
})
