import { createResolver, defineNuxtModule } from '@nuxt/kit'
import { defu } from 'defu'
import { createJiti } from 'jiti'
import { get, isPlainObject, set } from 'lodash-es'
import { existsSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { hash } from 'ohash'
import { joinURL, withTrailingSlash } from 'ufo'
import type { NuxtConfConfigObject, NuxtConfModuleOptions } from './types'

const getPublicConfig = (config: NuxtConfConfigObject) => {
  const publicConfig: NuxtConfConfigObject = {}

  for (const [key, value] of Object.entries(config)) {
    if (!isPlainObject(value) || value.private !== true) {
      publicConfig[key] = value
    }
  }

  return publicConfig
}

const createCdnVersion = (
  rootDir: string,
  createVersionFile: boolean,
  versionFileName: string,
) => {
  const version = hash({ date: +new Date() }).toLowerCase().slice(0, 10)

  if (createVersionFile) {
    writeFileSync(
      resolve(rootDir, versionFileName),
      JSON.stringify({ version }),
    )
  }

  return version
}

const resolveCdnUrl = (
  config: NuxtConfConfigObject,
  rootDir: string,
  writeVersionFile?: boolean,
  versionFileName = 'version.json',
) => {
  const baseUrl = config.NUXT_APP_CDN_BASE_URL

  if (!baseUrl) {
    return config.NUXT_APP_CDN_URL
  }

  const version = config.NUXT_APP_CDN_VERSION || createCdnVersion(
    rootDir,
    writeVersionFile ?? true,
    versionFileName,
  )

  config.NUXT_APP_CDN_VERSION = version
  config.NUXT_APP_CDN_URL = withTrailingSlash(joinURL(baseUrl, version))

  return config.NUXT_APP_CDN_URL
}

export type {
  NuxtConfConfigObject,
  NuxtConfModuleOptions,
  NuxtConfValue,
  NuxtConfOptionMapping,
} from './types'

export default defineNuxtModule<NuxtConfModuleOptions>({
  meta: {
    name: 'nuxt-conf',
    configKey: 'nuxtConf',
  },

  defaults: {
    configDir: 'config/env',
    envVariable: 'NUXT_APP_ENV',
    defaultEnv: 'development',
    cdn: {
      enabled: true,
      writeVersionFile: true,
      versionFileName: 'version.json',
    },
    nuxtOptions: {},
  },

  async setup(options, nuxt) {
    // Resolve environment configuration files from the consuming Nuxt project.
    const resolver = createResolver(nuxt.options.rootDir)
    const environment = process.env[options.envVariable!] || options.defaultEnv!
    const configFile = resolver.resolve(options.configDir!, `env.${environment}.ts`)
    const fallbackFile = resolver.resolve(options.configDir!, `env.${options.defaultEnv}.ts`)

    // Fall back to the default environment when the selected file is missing.
    const selectedFile = existsSync(configFile) ? configFile : fallbackFile

    if (!existsSync(selectedFile)) {
      throw new Error(`Environment config file not found: ${configFile}`)
    }

    // Use Jiti so the project can keep its environment configuration in TypeScript.
    const jiti = createJiti(nuxt.options.rootDir)
    const config = await jiti.import<NuxtConfConfigObject>(selectedFile, { default: true })
    const cdnUrl = options.cdn?.enabled === false
      ? undefined
      : resolveCdnUrl(
          config,
          nuxt.options.rootDir,
          options.cdn?.writeVersionFile,
          options.cdn?.versionFileName,
        )

    // Expose non-private values through appConfig while keeping the full config available on runtimeConfig.
    const publicConfig = getPublicConfig(config)

    nuxt.options.appConfig = defu(nuxt.options.appConfig, publicConfig)
    nuxt.options.runtimeConfig = defu(nuxt.options.runtimeConfig, config)

    if (cdnUrl) {
      nuxt.options.app = defu(nuxt.options.app, { cdnURL: cdnUrl })
    }

    // Map selected environment values to Nuxt or other module options.
    for (const [targetPath, mapping] of Object.entries(options.nuxtOptions || {})) {
      const sourcePath = typeof mapping === 'string' ? mapping : mapping.from
      const override = typeof mapping === 'string' ? false : mapping.override === true
      const value = get(config, sourcePath)

      if (value !== undefined) {
        const currentValue = get(nuxt.options, targetPath)

        if (override || currentValue === undefined) {
          set(nuxt.options, targetPath, value)
        }
        else if (isPlainObject(currentValue) && isPlainObject(value)) {
          set(nuxt.options, targetPath, defu(currentValue, value))
        }
      }
    }
  },
})
