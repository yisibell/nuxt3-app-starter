// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'
import envConfig from './config'
import { getPublicRuntimeConfig } from './config/util'

const { NUXT_APP_ENV } = process.env

const allConfig = envConfig(NUXT_APP_ENV)
const publicRuntimeConfig = getPublicRuntimeConfig(allConfig)

export default defineNuxtConfig({
  telemetry: false,
  srcDir: 'src/',
  appConfig: publicRuntimeConfig,
  modules: [
    'nuxt-proxy-request',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@element-plus/nuxt',
    'nuxt-svg-icons',
    '@invictus.codes/nuxt-vuetify',
  ],
  css: ['~/assets/styles/index.scss'],
  proxy: allConfig.proxy,
  vuetify: {
    moduleOptions: {
      treeshaking: true,
    },
    vuetifyOptions: {
      theme: {
        defaultTheme: 'myCustomLightTheme',
        themes: {
          myCustomLightTheme: {
            dark: false,
            colors: {
              /**
               * 主题色
               */
              primary: '#0097C7',
              secondary: '#52A28F',
              error: '#ff5252',
              /**
               * 应用背景色
               */
              appbody: '#F3F5F8',
            },
          },
        },
      },
    },
  },
})
