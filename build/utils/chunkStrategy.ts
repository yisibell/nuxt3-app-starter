import { extractSubDirName } from './extractSubDirName'
import type { ManualChunkMeta } from 'rollup'
import { parsePath } from 'ufo'

/**
 * 获取第三方依赖 chunk 名称
 */
export function getVendorChunkName(moduleId: string) {
  if (moduleId.includes('@sentry')) {
    return 'vendor-sentry'
  }

  return null
}

export const SHARED_COMPONENTS_DIR = 'src/components/'

export const skipedModules = new Map()

export function isSharedComponents(id: string) {
  return id.includes(SHARED_COMPONENTS_DIR)
}

/**
 * 获取共享 chunk 名称
 */
export function getSharedChunkName(moduleId: string, meta: ManualChunkMeta) {
  const modulePathname = parsePath(moduleId).pathname
  const name = extractSubDirName(moduleId, SHARED_COMPONENTS_DIR)

  if (name) {
    if (isShareableModule(moduleId, meta) && !skipedModules.has(modulePathname)) {
      return `shared-components-${name}`
    }
    else {
      skipedModules.set(modulePathname, true)
    }
  }

  return null
}

/**
 * 判断模块 id 是否可被合并为共享模块
 */
export function isShareableModule(id: string, meta: ManualChunkMeta) {
  const moduleName = extractSubDirName(id, SHARED_COMPONENTS_DIR)
  const info = meta.getModuleInfo(id)
  const importers = info?.importers || []

  const stats = importers.filter((v) => {
    return isSharedComponents(v)
  }).every((v) => {
    const currentDirName = extractSubDirName(v, SHARED_COMPONENTS_DIR)

    return currentDirName === moduleName
  })

  return stats
}
