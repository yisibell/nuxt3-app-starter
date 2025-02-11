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
    '@vant/nuxt',
    'nuxt-multi-cache',
    '@unocss/nuxt',
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
    vueI18n: './i18n/i18n.config.ts',
    strategy: 'prefix_and_default',
    lazy: true,
    defaultLocale: 'en',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'savedLang',
      redirectOn: 'root',
    },
    locales: [
      {
        code: 'en',
        file: 'en.ts',
      },
      {
        code: 'fr',
        file: 'fr.ts',
      },
      // ...
    ],

  },

  multiCache: {
    debug: allConfig?.multiCache?.debug,
    route: {
      enabled: allConfig?.multiCache?.routeCache,
    },
    component: {
      enabled: allConfig?.multiCache?.componentCache,
    },
    api: {
      enabled: true,
      prefix: '/__nuxt_multi_cache',
      authorization: false,
      cacheTagInvalidationDelay: 60000,
    },
  },

  proxy: allConfig.proxy,

  vant: {
    defaultLocale: 'en-US',
  },

})
