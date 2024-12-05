export default {
  NUXT_APP_ENV: 'production',
  // NUXT_APP_BASE_API: 'http://16.163.143.182',

  NUXT_APP_BASE_API: '/api2',
  proxy: {
    options: [
      {
        target: 'http://16.163.143.182',
        pathRewrite: { '/api2': '' },
        pathFilter: ['/api2/**'],
      },
    ],
  },
}
