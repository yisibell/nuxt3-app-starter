import { isPlainObject } from 'lodash'

export interface IConfigObject {
  [key: string]: any
}

/**
 * 获取可对外的公共配置数据
 * @param {object} obj 源对象数据
 * @param {string} privateKey 定义判断私有配置字段名称
 * @returns {object} 剔除了配置对象中含有 privateKey = true 的配置项
 */
const getPublicRuntimeConfig = (obj: IConfigObject, privateKey = 'private') => {
  const keys = Object.keys(obj)

  return keys.reduce((res, key) => {
    const val = obj[key]

    if (!isPlainObject(val) || val[privateKey] !== true) {
      res[key] = val
    }

    return res
  }, {} as IConfigObject)
}

export { getPublicRuntimeConfig }
