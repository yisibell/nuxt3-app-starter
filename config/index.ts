import type { ProxyOptions } from 'nuxt-proxy-request'
import type { NuxtConfConfigObject, NuxtConfValue } from 'nuxt-conf'

export interface IEnvConfig extends NuxtConfConfigObject {
  NUXT_APP_ENV: 'development' | 'ft' | 'production'
  NUXT_APP_BASE_API: string
  proxy?: {
    options: ProxyOptions
  }
  multiCache?: NuxtConfValue<{
    routeCache?: boolean
    componentCache?: boolean
    apiAuthorization?: string
    debug?: boolean
  }>
}
