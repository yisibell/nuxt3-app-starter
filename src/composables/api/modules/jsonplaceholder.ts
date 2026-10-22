import useRequest from '../request'
import type {
  ICreatePostParams,
  IJsonPlaceholderPost,
  IJsonPlaceholderUser,
} from '~/composables/api/interfaces/jsonplaceholder'

export const useJsonPlaceholderApi = () => {
  const { requestRaw } = useRequest()

  /** 获取文章详情 */
  const getPost = (id: number) => requestRaw<IJsonPlaceholderPost>(`/posts/${id}`, {
    method: 'GET',
  })

  /** 获取用户信息 */
  const getUser = (id: number) => requestRaw<IJsonPlaceholderUser>(`/users/${id}`, {
    method: 'GET',
  })

  /** 创建文章 */
  const createPost = (body: ICreatePostParams) => requestRaw<IJsonPlaceholderPost>('/posts', {
    method: 'POST',
    body,
  })

  return {
    getPost,
    getUser,
    createPost,
  }
}
