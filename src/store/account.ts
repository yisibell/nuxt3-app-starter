import { IUserInfo } from '~~/packages/api/modules/user'

import { $api } from '~~/packages/api'
import { defineStore } from 'pinia'

export const useAccountStore = defineStore('account', {
  state: () => ({
    info: {} as IUserInfo,
    loading: false,
  }),
  actions: {
    SET_INFO(payload: IUserInfo) {
      this.info = payload
    },
    SET_LOADING(payload: boolean) {
      this.loading = payload
    },
    async fetchUserInfo() {
      try {
        this.SET_LOADING(true)

        const { code, data } = await $api.user.info()

        if (code === 0) {
          this.SET_INFO(data || {})
        }
      } finally {
        this.SET_LOADING(true)
      }
    },
  },
})
