import devConfig from './env/env.development'
import ftConfig from './env/env.ft'
import prodConfig from './env/env.production'
import type { Options } from 'http-proxy-middleware'

export interface IEnvConfig {
  NUXT_APP_ENV: string
  NUXT_APP_BASE_API: string
  proxy?: {
    options: Array<Options> | Options
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
