import type { IEnvConfig } from '../index'

export default {
  NUXT_APP_ENV: 'production',
  // NUXT_APP_BASE_API: 'https://jsonplaceholder.typicode.com',
  NUXT_APP_BASE_API: '/api2',
  proxy: {
    options: [
      {
        target: 'https://jsonplaceholder.typicode.com',
        pathRewrite: { '/api2': '' },
        pathFilter: ['/api2/**'],
      },
    ],
  },

  multiCache: {
    routeCache: false,

    componentCache: true,
  },

} satisfies IEnvConfig
