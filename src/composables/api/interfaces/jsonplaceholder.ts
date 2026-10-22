export interface IJsonPlaceholderPost {
  userId: number
  id: number
  title: string
  body: string
}

export interface IJsonPlaceholderUser {
  id: number
  name: string
  username: string
  email: string
  phone: string
  website: string
}

export interface ICreatePostParams {
  title: string
  body: string
  userId: number
}
