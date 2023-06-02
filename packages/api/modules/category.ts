import {
  IApiModuleContainer,
  IResponseInstance,
} from '~~/packages/types/apiRepository'

/**
 * 导航单节点数据对象
 */
export interface ICategoryObject {
  /**
   * 分类名称
   */
  name: string

  pid?: number

  /**
   * 分类 id
   */
  id: number

  list?: Array<ICategoryObject>
}

export type ICategories = ICategoryObject[]

export interface ICategoryApiModuleInstance {
  get(): Promise<IResponseInstance<ICategories>>
}

const categoryApi: IApiModuleContainer<ICategoryApiModuleInstance> = (
  request
) => ({
  // 获取分类数据
  get() {
    return request({
      url: '/goods/category',
      method: 'get',
    })
  },
})

export default categoryApi
