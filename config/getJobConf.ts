import fs from 'node:fs'
import path from 'node:path'

export const readFileContent = (filePath: string) => {
  try {
    const absolutePath = path.resolve(filePath)
    const data = fs.readFileSync(absolutePath, 'utf8')
    return { success: true, data }
  }
  catch {
    return {
      success: false,
      data: null,
    }
  }
}

export const getJobConfHostName = () => {
  const result = readFileContent('/var/job/host_name.conf')

  if (result.success && result.data) {
    const arr = result.data.split('=')

    return arr[1]
  }

  return 'unknown'
}
