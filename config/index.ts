import devConfig from './env/env.development'
import ftConfig from './env/env.ft'
import prodConfig from './env/env.production'
import type { ProxyOptions } from 'nuxt-proxy-request'

export interface IEnvConfig {
  NUXT_APP_ENV: string
  NUXT_APP_BASE_API: string
  NUXT_APP_MOCK_API: string
  proxy?: {
    options: ProxyOptions
  }
}

export default function (env?: string): IEnvConfig {
  switch (env) {
    case 'development':
      return devConfig
    case 'ft':
      return ftConfig
    case 'production':
      return prodConfig
    default:
      return devConfig
  }
}
