import { defineStore } from 'pinia'
import type { IUserInfo } from '~/composables/api/interfaces/user'
import { useUserApi } from '~/composables/api/modules/user'

const defaultUserInfo = (): IUserInfo => ({
  companyName: '',
  code: '',
  contactPerson: '',
  companyAddress: '',
  mobile: '',
  postalCode: '',
})

export const useAccountStore = defineStore('account', () => {
  const UserApi = useUserApi()

  const info = ref<IUserInfo>(defaultUserInfo())
  const loading = ref(false)

  const SET_INFO = (payload: IUserInfo) => {
    info.value = payload
  }

  const SET_LOADING = (payload: boolean) => {
    loading.value = payload
  }

  const fetchUserInfo = async () => {
    try {
      SET_LOADING(true)
      const { code, data } = await UserApi.info()

      if (code === 0) {
        SET_INFO(data || defaultUserInfo())
      }
    }
    finally {
      SET_LOADING(false)
    }
  }

  return {
    info,
    loading,
    SET_INFO,
    SET_LOADING,
    fetchUserInfo,
  }
})
