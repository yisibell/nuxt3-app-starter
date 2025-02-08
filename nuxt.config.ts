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
    'nuxt-svg-icons',
    '@nuxtjs/i18n',
  ],
  devtools: {
    enabled: false,
  },
  css: ['~/assets/styles/index.scss'],
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

  i18n: {
    lazy: true,
    defaultLocale: 'en',
    locales: [
      {
        code: 'en',
        file: 'en-ES.json',
      },
      {
        code: 'fr',
        file: 'fr-FR.json',
      },
    ],
  },

  proxy: allConfig.proxy,

})
