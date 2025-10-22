import type { OutputOptions } from 'rollup'
import { getSvgIconChunkName } from './utils/chunkSvgIcons'
import { getSharedChunkName, getVendorChunkName, isSharedComponents } from './utils/chunkStrategy'

export const manualChunks: OutputOptions['manualChunks'] = (id) => {
  const svgIconChunkName = getSvgIconChunkName(id)
  if (svgIconChunkName) {
    return svgIconChunkName
  }

  const vendorChunkName = getVendorChunkName(id)
  if (vendorChunkName) {
    return vendorChunkName
  }

  if (isSharedComponents(id)) {
    return getSharedChunkName(id)
  }

  return null
}
