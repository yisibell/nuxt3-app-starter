import { proxyRequest } from 'h3'

const target = 'http://16.163.143.182'

export default defineEventHandler((event) => {
  const { req } = event.node
  const { url } = req
  console.log('New request------------------: ' + url)

  if (url && url.startsWith('/api2')) {
    req.url = url.replace('/api2', '')

    console.log('proxy request--------------------:', req.url)

    const targetUrl = `${target}${req.url}`

    return proxyRequest(event, targetUrl)
  }
})
