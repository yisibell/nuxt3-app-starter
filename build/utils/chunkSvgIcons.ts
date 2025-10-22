import { extractSubDirName } from './extractSubDirName'

export function getSvgIconChunkName(id: string): string | null {
  if (id.includes('src/assets/icons/downloadApp')) {
    return 'assets-svg-icons-downloadApp'
  }

  const filterIconChunkName = extractSubDirName(id, 'src/assets/icons/filter')
  if (filterIconChunkName) {
    return `assets-filter-icon-${filterIconChunkName}`
  }

  if (id.includes('src/assets/icons')) {
    return 'assets-svg-icons'
  }

  return null
}
