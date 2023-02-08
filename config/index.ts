import devConfig from './env/env.development'
import ftConfig from './env/env.ft'
import prodConfig from './env/env.production'

export default function (env?: string) {
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
