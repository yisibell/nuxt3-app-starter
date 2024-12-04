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
