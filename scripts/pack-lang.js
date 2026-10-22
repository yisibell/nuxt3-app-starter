/** 多语言打包脚本 */

import fs from 'node:fs'
import path from 'node:path'
import consola from 'consola'

const locales = [
  'en', 'de', 'es', 'fr', 'se', 'no', 'it', 'pt', 'da', 'fi', 'ru', 'nl', 'ja', 'pl', 'tr', 'cs',
]

const run = async () => {
  locales.forEach((code) => {
    const data = {}

    const jsonData = JSON.stringify(data)
    const output = `${path.resolve(process.cwd(), `i18n/locales/${code}.json`)}`

    // 写入 JSON 文件
    fs.writeFile(output, jsonData, (err) => {
      if (err) {
        consola.error(`${code}语言包生成失败:`, err)
      }
      else {
        consola.success(`${code} 语言包生成成功！`)
      }
    })
  })
}

run()
