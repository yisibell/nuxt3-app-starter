import type { NuxtRenderHTMLContext } from '#app'

// 辅助函数：提取关键 CSS 文件
function extractCriticalCssFiles(html: NuxtRenderHTMLContext) {
  const cssFiles: string[] = []
  // 匹配所有包含 '_nuxt' 且以 .css 结尾的链接
  const cssRegex = /<link[^>]*href="[^"]*_nuxt[^"]*\.css"[^>]*>/g
  const matches = html.head.join('').match(cssRegex) || []

  matches.forEach((linkTag) => {
    const hrefMatch = linkTag.match(/href="([^"]*)"/)
    if (hrefMatch && hrefMatch[1]) {
      cssFiles.push(hrefMatch[1])
    }
  })

  return cssFiles
}

// 辅助函数：创建 preload 链接
function createPreloadLink(cssHref: string) {
  return `<link rel="preload" href="${cssHref}" as="style" crossorigin="anonymous" >`
}

// 辅助函数：检查是否已存在 preload 链接
const isPreloadLinkExists = (headTags: string[], cssHref: string): boolean => {
  // 标准化 CSS 路径，移除查询参数和哈希
  const normalizePath = (path: string): string => {
    return path.split('?')[0].split('#')[0]
  }

  const targetHref = normalizePath(cssHref)

  return headTags.some((tag) => {
    // 检查是否是 link 标签
    if (!tag.includes('<link') || !tag.includes('href=')) {
      return false
    }

    // 提取 href 属性值
    const hrefMatch = tag.match(/href=(["'])(.*?)\1/)
    if (!hrefMatch || !hrefMatch[2]) {
      return false
    }

    const existingHref = normalizePath(hrefMatch[2])

    // 检查是否是 preload 链接并且匹配目标 CSS
    const isPreload = tag.includes('rel="preload"')
      || tag.includes('rel=\'preload\'')
      || (tag.includes('rel=') && tag.includes('preload'))

    const isStyle = tag.includes('as="style"')
      || tag.includes('as=\'style\'')
      || (tag.includes('as=') && tag.includes('style'))

    return isPreload && isStyle && existingHref === targetHref
  })
}

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('render:html', (html) => {
    // 这里开始处理 HTML
    const criticalCssFiles = extractCriticalCssFiles(html)

    criticalCssFiles.forEach((cssFile) => {
      const preloadLink = createPreloadLink(cssFile)

      // 避免重复添加 ?

      html.head.unshift(preloadLink) // 插入到 head 顶部
    })
  })
})
