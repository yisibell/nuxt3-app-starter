// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'
import { extendLocales, pathLocaleLangCodeMap } from './i18n'
import path from 'node:path'
import { getJobConfHostName } from './config/getJobConf'

const activeEnv = process.env.NUXT_APP_ENV || 'development'

export default defineNuxtConfig({
  modules: [
    [
      'nuxt-conf',
      {
        nuxtOptions: {
          proxy: 'proxy',
          multiCache: 'multiCache',
        },
      },
    ],
    '@pinia/nuxt',
    '@vant/nuxt',
    '@nuxtjs/i18n',
    '@unocss/nuxt',
    '@nuxt/fonts',
    'nuxt-font-fallback',
    'nuxt-proxy-request',
    'nuxt-preload-pruner',
    'nuxt-svg-icons',
    'nuxt-spritesmith',

  ],

  devtools: {
    enabled: false,
  },

  css: ['~/assets/styles/index.scss'],

  appConfig: {
    job_host_name: getJobConfHostName(),
  },

  // dir: {
  //   public: 'src/public/',
  // },

  srcDir: 'src/',

  serverDir: 'src/server/',

  sourcemap: activeEnv === 'development',

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
    server: {
      allowedHosts: ['dev.demo.com'],
    },
    build: {
      // Default target in Vite 6
      target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14'],
      modulePreload: false,
      terserOptions: {
        compress: {
          drop_console:
            activeEnv !== 'development'
              ? ['log', 'info', 'dir', 'warn']
              : false,
        },
      },
    },
  },

  telemetry: false,

  fontFallback: {
    fonts: [
      { name: 'GothamBookOverride', src: 'public/fonts/gotham/Gotham-Book.otf' },
      { name: 'GothamMediumOverride', src: 'public/fonts/gotham/Gotham-Medium.otf' },
      { name: 'GothamBoldOverride', src: 'public/fonts/gotham/Gotham-Bold.otf' },
      { name: 'BlackerProDisplayRegularOverride', src: 'public/fonts/blacker-pro/BlackerProDisplayRegular.otf' },
      { name: 'BlackerProDisplayLightOverride', src: 'public/fonts/blacker-pro/BlackerProDisplayLight.otf' },
    ],
  },

  fonts: {
    processCSSVariables: true,
    families: [
      {
        name: 'GothamBook',
        src: '/fonts/gotham/Gotham-Book.otf',
        preload: false,
        display: 'swap',
      },
      {
        name: 'GothamMedium',
        src: '/fonts/gotham/Gotham-Medium.otf',
        preload: false,
        display: 'swap',
      },
      {
        name: 'GothamBold',
        src: '/fonts/gotham/Gotham-Bold.otf',
        preload: false,
        display: 'swap',
      },
      {
        name: 'BlackerProDisplayRegular',
        src: '/fonts/blacker-pro/BlackerProDisplayRegular.otf',
        preload: false,
        display: 'swap',
      },
      {
        name: 'BlackerProDisplayLight',
        src: '/fonts/blacker-pro/BlackerProDisplayLight.otf',
        preload: false,
        display: 'swap',
      },
    ],
  },

  i18n: {
    vueI18n: path.resolve(process.cwd(), './i18n/i18n.config.ts'),
    strategy: 'prefix_and_default',
    lazy: false,
    defaultLocale: 'en',
    detectBrowserLanguage: false,
    locales: extendLocales.map(code => ({
      code,
      file: `${pathLocaleLangCodeMap[code]}.json`,
    })),
    bundle: {
      // https://github.com/nuxt-modules/i18n/issues/3238#issuecomment-2672492536
      optimizeTranslationDirective: false,
    },
  },

  vant: {
    defaultLocale: 'en-US',
  },
})
