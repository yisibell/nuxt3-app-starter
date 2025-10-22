export function extractSubDirName(id: string, dir: string) {
  const pageRegex = new RegExp(`${dir}/([^/]+)/`)
  const match = id.match(pageRegex)

  if (match) {
    return match[1]
  }

  return null
}
