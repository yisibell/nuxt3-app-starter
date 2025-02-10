import { defineStore } from 'pinia'

export const useSiteStore = defineStore(
  'site',
  () => {
    // 鉴权 token
    const accessToken = ref('')

    const SET_TOKEN = (paylode: string) => {
      accessToken.value = paylode
    }

    return {
      accessToken,
      SET_TOKEN,
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
  },
)
