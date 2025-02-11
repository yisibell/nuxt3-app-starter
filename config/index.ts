import type { ProxyOptions } from 'nuxt-proxy-request'
import devConfig from './env/env.development'

export interface IEnvConfig {
  NUXT_APP_ENV: 'development' | 'ft' | 'production'
  NUXT_APP_BASE_API: string
  proxy?: {
    options: ProxyOptions
  }

  multiCache?: {
    private?: boolean
    routeCache?: boolean
    componentCache?: boolean
    apiAuthorization?: string
    debug?: boolean
  }
}

export default async function (env?: string): Promise<IEnvConfig> {
  if (env === 'development') {
    return (await import('./env/env.development')).default
  }
  else if (env === 'ft') {
    return (await import('./env/env.ft')).default
  }
  else if (env === 'production') {
    return (await import('./env/env.production')).default
  }

  return devConfig
}
