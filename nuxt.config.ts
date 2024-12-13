// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'
import envConfig from './config'
import { getPublicRuntimeConfig } from './config/util'

const { NUXT_APP_ENV } = process.env

const allConfig = await envConfig(NUXT_APP_ENV)
const publicRuntimeConfig = getPublicRuntimeConfig(allConfig)

export default defineNuxtConfig({
  modules: [
    'nuxt-proxy-request',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@element-plus/nuxt',
    'nuxt-svg-icons',
    'vuetify-nuxt-module',
  ],
  devtools: {
    enabled: false,
  },
  css: ['~/assets/styles/index.scss', '@mdi/font/css/materialdesignicons.css'],
  appConfig: publicRuntimeConfig,
  srcDir: 'src/',
  compatibilityDate: '2024-12-03',

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern',
        },
      },
    },
  },
  telemetry: false,

  elementPlus: {
    defaultLocale: 'zh-cn',
  },

  proxy: allConfig.proxy,

  vuetify: {
    moduleOptions: {
      /* module specific options */
    },
    vuetifyOptions: {
      /* vuetify options */
      theme: {
        defaultTheme: 'light',
        themes: {
          light: {
            dark: false,
            colors: {
              primary: '#0097C7',
              secondary: '#52A28F',
              error: '#ff5252',
              wineRed: '#C51162',
              appbody: '#F3F5F8',
            },
          },
        },
      },

    },
  },
})
