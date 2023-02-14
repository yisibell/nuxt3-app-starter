import useRequest from '../request'
import type { IUserLoginParams } from '~/composables/api/interfaces/user'

export const useLogin = () => {
  const { apiFetch } = useRequest<{ accessToken: string }>()

  const loginSubmit = async (body: IUserLoginParams) => {
    return await apiFetch('/user/login', {
      method: 'POST',
      body,
    })
  }

  return {
    loginSubmit,
  }
}

export const useUserInfo = () => {
  const { apiFetch } = useRequest()

  const fetchUserInfo = async () => {
    return await apiFetch('/user/info', {
      method: 'GET',
    })
  }

  return {
    fetchUserInfo,
  }
}
