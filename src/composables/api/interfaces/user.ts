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
