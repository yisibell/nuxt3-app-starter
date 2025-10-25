export default defineEventHandler((event) => {
  const forwarded = getRequestIP(event, { xForwardedFor: true })

  const clientIP = forwarded ? forwarded.split(',')[0].trim() : event.node.req.socket.remoteAddress

  // 设置到请求头（供后续使用）
  event.node.req.headers['x-client-ip'] = clientIP

  // 设置到响应头（返回给客户端）
  setResponseHeader(event, 'X-Forwarded-For', clientIP)
})
