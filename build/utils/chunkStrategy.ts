import { extractSubDirName } from './extractSubDirName'

/**
 * 获取第三方依赖 chunk 名称
 */
export function getVendorChunkName(moduleId: string) {
  if (moduleId.includes('@sentry')) {
    return 'vendor-sentry'
  }

  return null
}

/**
 * 获取共享 chunk 名称
 */
export function getSharedChunkName(moduleId: string) {
  const name = extractSubDirName(moduleId, 'src/components')

  if (name && ['activity', 'base', 'with', 'some'].includes(name)) {
    return `shared-components-${name}`
  }

  return null

  // return 'shared-components'
}

export function isSharedComponents(id: string) {
  return id.includes('src/components/')
}
