import useRequest from '../request'
import type { ICategories } from '~/composables/api/interfaces/category'

export const useCategoryApi = () => {
  const { request } = useRequest()

  // 获取分类数据
  const get = () => {
    return request<ICategories>('/goods/category', {
      method: 'get',
    })
  }

  return {
    get,
  }
}
