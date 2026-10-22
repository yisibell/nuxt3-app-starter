export const features = [
  { icon: '✦', title: 'Nuxt SSR', text: '以服务端渲染为基础，保留清晰的页面与服务端扩展入口。' },
  { icon: '◈', title: '状态管理', text: 'Pinia store 已接入，适合承载用户、站点和业务状态。' },
  { icon: '↗', title: '请求封装', text: '统一处理鉴权、加载状态、错误响应和环境 API 地址。' },
  { icon: '◎', title: '多环境', text: 'development、ft、production 配置分离，构建命令简单直接。' },
  { icon: 'Aa', title: 'TypeScript', text: '从页面到 API 接口都有类型支持，方便持续扩展。' },
  { icon: '▦', title: '部署就绪', text: '内置 Node、PM2 和 Docker PM2 启动脚本。' },
]

export const stack = ['Nuxt 3', 'Vue 3', 'TypeScript', 'Pinia', 'Vant', 'UnoCSS', 'Sass']

export const moduleDemos = [
  {
    id: 'nuxt-svg-icons',
    name: 'nuxt-svg-icons',
    label: 'Assets & UI',
    description: '把 assets/icons 下的 SVG 作为全局组件或 Vue 组件使用，并支持尺寸、颜色等属性控制。',
    status: 'Ready',
    version: '3.3.1',
  },
  {
    id: 'nuxt-proxy-request',
    name: 'nuxt-proxy-request',
    label: 'Server & Network',
    description: '在开发和生产环境中统一代理 API 请求，隐藏后端地址并保持前端调用路径稳定。',
    status: 'Ready',
    version: '2.1.0',
  },
  {
    id: 'nuxt-spritesmith',
    name: 'nuxt-spritesmith',
    label: 'Assets & Performance',
    description: '将多个 PNG 资源合并成精灵图，并自动生成可复用的 CSS class。',
    status: 'Ready',
    version: '2.1.1',
  },
  {
    id: 'nuxt-conf',
    name: 'nuxt-conf',
    label: 'Configuration',
    description: '统一加载多环境 TypeScript 配置，并注入 appConfig、runtimeConfig 和 Nuxt options。',
    status: 'Ready',
    version: 'local',
  },
]
