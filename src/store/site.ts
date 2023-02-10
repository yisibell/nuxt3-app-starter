import { defineStore } from 'pinia'

export const useSiteStore = defineStore(
  'site',
  () => {
    const token = ref('')

    const setToken = (value: string) => {
      token.value = value
    }

    return {
      token,
      setToken,
    }
  },
  {
    persist: {
      storage: persistedState.cookiesWithOptions({
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 365, // 1 年有效期
        secure: false,
      }),
    },
  }
)
