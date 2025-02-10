import useRequest from '../request'
import type { IUserLoginParams, ILoginResData } from '~/composables/api/interfaces/user'

export const useUserApi = () => {
  const { request } = useRequest()

  /** 登录 */
  const login = (body: IUserLoginParams) => request<ILoginResData>('/user/login', {
    method: 'POST',
    body,
  }, { loading: true })

  /** 登出 */
  const logout = () => request('/user/logout', {
    method: 'GET',
  })

  const getUserInfo = () => {
    return request('/user/info', {
      method: 'GET',
    })
  }

  return {
    login,
    logout,
    getUserInfo,
  }
}
