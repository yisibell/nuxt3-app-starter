/** 多语言打包脚本 */
import fs from 'node:fs'
import path from 'node:path'
import consola from 'consola'

const run = async () => {
  // const res = await fetch('/some/path')

  const data = {
    welcome: 'Welcome2',
  }

  const jsonData = JSON.stringify(data)
  const output = `${path.resolve(process.cwd(), 'i18n/locales/en-ES.json')}`

  // 写入 JSON 文件
  fs.writeFile(output, jsonData, (err) => {
    if (err) {
      consola.error('语言包生成失败:', err)
    }
    else {
      consola.success('语言包生成成功！')
    }
  })
}

run()
