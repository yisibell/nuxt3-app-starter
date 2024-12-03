import useRequest from '../request'
import type { IUserLoginParams, ILoginResData, IUserInfo, IUserAddressData } from '~/composables/api/interfaces/user'

export const useUserApi = () => {
  const { request } = useRequest()

  /** 登录 */
  const loginSubmit = (body: IUserLoginParams) => request<ILoginResData>('/user/login', {
    method: 'POST',
    body,
  })

  /** 登出 */
  const logoutSubmit = () => request('/user/logout', {
    method: 'GET',
  })

  /** 获取用户信息 */
  const getUserInfo = () => request<IUserInfo>('/user/info', {
    method: 'GET',
  })

  /** 获取用户地址 */
  const getUserAddress = () => request<IUserAddressData>('/user/addresses', {
    method: 'POST',
  })

  return {
    loginSubmit,
    logoutSubmit,
    getUserInfo,
    getUserAddress,
  }
}
