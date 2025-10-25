export default defineEventHandler((event) => {
  // 设置响应头
  event.node.res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate')
  event.node.res.setHeader('Pragma', 'no-cache')
  event.node.res.setHeader('Expires', '0')
})
