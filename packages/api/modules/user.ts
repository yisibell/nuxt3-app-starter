import {
  IApiModuleContainer,
  IResponseInstance,
} from '~~/packages/types/apiRepository'

export interface ILoginResData {
  // 鉴权 token
  accessToken: string
  // 鉴权 token 有效期
  expireTime: number
}

export interface IUserInfo {
  companyName: string
  code: string
  contactPerson: string
  companyAddress: string
  mobile: string
  postalCode: string
}

export interface IUserApiModuleInstance {
  login(data: {
    username: string
    password: string
  }): Promise<IResponseInstance<ILoginResData>>

  logout(): Promise<IResponseInstance<{}>>

  info(): Promise<IResponseInstance<IUserInfo>>
}

const userApi: IApiModuleContainer<IUserApiModuleInstance> = (request) => ({
  login(data) {
    return request({
      url: '/user/login',
      method: 'post',
      data,
    })
  },
  logout() {
    return request({
      url: '/user/logout',
      method: 'get',
    })
  },
  info() {
    return request({
      url: '/user/info',
      method: 'get',
    })
  },
})

export default userApi
