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
  proxy: allConfig.proxy,
  vuetify: {
    moduleOptions: {
      treeshaking: true,
    },
  },
})
