// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'
import envConfig from './config'
import { getPublicRuntimeConfig } from './config/util'

const { NUXT_APP_ENV } = process.env

const allConfig = await envConfig(NUXT_APP_ENV)
const publicRuntimeConfig = getPublicRuntimeConfig(allConfig)

export default defineNuxtConfig({
  modules: [
    // 'nuxt-proxy-request',
    '@pinia/nuxt',
    'nuxt-svg-icons',
    '@vant/nuxt',
    '@unocss/nuxt',
  ],
  devtools: {
    enabled: false,
  },
  css: ['~/assets/styles/index.scss'],
  appConfig: publicRuntimeConfig,
  srcDir: 'src/',
  compatibilityDate: '2024-12-03',

  sourcemap: allConfig.NUXT_APP_ENV === 'development',

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

  // proxy: allConfig.proxy,

  vant: {
    defaultLocale: 'en-US',
  },

})
