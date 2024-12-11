export interface IUserLoginParams {
  username: string
  password: string
}

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

export interface IUserAddressData {
  username: string
  code: string
  addresses: {
    id: number
    contact: string
    phone: string
    address: string
    status?: number
    isDefault?: 0 | 1
  }[]
}
