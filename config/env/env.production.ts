export default {
  NUXT_APP_ENV: 'production',
  // NUXT_APP_BASE_API: '',

  NUXT_APP_BASE_API: '/api2',
  proxy: {
    options: [
      {
        target: '',
        pathRewrite: { '/api2': '' },
        pathFilter: ['/api2/**'],
      },
    ],
  },
}
