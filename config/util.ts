import { isPlainObject } from 'lodash-es'

export type IConfigObject = Record<string, any>

/**
 * 获取可对外的公共配置数据
 */
const getPublicRuntimeConfig = (obj: IConfigObject, privateKey = 'private') => {
  const keys = Object.keys(obj)

  return keys.reduce((res, key) => {
    const value = obj[key]

    if (!isPlainObject(value) || value[privateKey] !== true) {
      res[key] = value
    }

    return res
  }, {} as IConfigObject)
}

export { getPublicRuntimeConfig }
