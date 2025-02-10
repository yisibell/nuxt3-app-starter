import type { IEnvConfig } from '../index'

export default {
  NUXT_APP_ENV: 'development',
  // NUXT_APP_BASE_API: 'http://18.163.184.231',

  NUXT_APP_BASE_API: '/api2',
  proxy: {
    options: [
      {
        target: 'http://18.163.184.231',
        pathRewrite: { '/api2': '' },
        pathFilter: ['/api2/**'],
      },
    ],
  },

  routeCache: true,

  componentCache: true,

} satisfies IEnvConfig
