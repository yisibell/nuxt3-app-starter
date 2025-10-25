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
    '~/modules/vitalizer.ts',
  ],
  devtools: {
    enabled: false,
  },
  css: ['~/assets/styles/index.scss'],
  appConfig: publicRuntimeConfig,
  srcDir: 'src/',

  sourcemap: allConfig.NUXT_APP_ENV === 'development',

  features: {
    inlineStyles: true,
  },
  compatibilityDate: '2024-12-03',

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern',
        },
      },
    },

    $client: {
      build: {
        modulePreload: false,
        rollupOptions: {
          output: {
            manualChunks(id) {
              if (id.includes('src/components/')) {
                return 'shared-components'
              }

              return null
            },
          },
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
