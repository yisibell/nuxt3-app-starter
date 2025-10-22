import { withoutTrailingSlash } from 'ufo'

export function extractSubDirName(id: string, dir: string) {
  const dirPath = withoutTrailingSlash(dir)
  const pageRegex = new RegExp(`${dirPath}/([^/]+)/`)
  const match = id.match(pageRegex)

  if (match) {
    return match[1]
  }

  return null
}
