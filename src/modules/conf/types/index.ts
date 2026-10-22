/**
 * Base configuration shape consumed by nuxt-conf.
 *
 * The generic parameter allows each project to extend the shared CDN fields
 * with its own typed environment configuration.
 */
export type NuxtConfConfigObject<T extends object = Record<string, any>> = T & {
  /** Fully resolved CDN URL used by Nuxt for generated assets. */
  NUXT_APP_CDN_URL?: string
  /** Version segment used when building the resolved CDN URL. */
  NUXT_APP_CDN_VERSION?: string
  /** Base CDN URL used to generate NUXT_APP_CDN_URL. */
  NUXT_APP_CDN_BASE_URL?: string
} & Record<string, any>

/** Maps a value from the environment config to a Nuxt option path. */
export interface NuxtConfOptionMapping {
  /** Dot-notated source path in the loaded environment config. */
  from: string
  /** Whether the mapped value should replace an existing Nuxt option. */
  override?: boolean
}

/** A configuration object that can be marked as private at runtime. */
export type NuxtConfValue<T extends Record<string, any> = Record<string, any>> = T & {
  /** Marks the value as private while preserving its original object shape. */
  private?: boolean
}

export interface NuxtConfModuleOptions {
  /** Directory relative to the project root containing environment files. */
  configDir?: string
  /** Environment variable used to select the environment file. */
  envVariable?: string
  /** Environment loaded when the selector is missing or unsupported. */
  defaultEnv?: string
  /** CDN processing is enabled automatically when NUXT_APP_CDN_BASE_URL is configured. */
  cdn?: {
    /** Explicitly enable or disable CDN URL processing. */
    enabled?: boolean
    /** Whether to write the generated version file. Defaults to true. */
    writeVersionFile?: boolean
    /** Version file name written to the project root. Defaults to version.json. */
    versionFileName?: string
  }
  /** Target nuxt.options path -> source config path. */
  nuxtOptions?: Record<string, string | NuxtConfOptionMapping>
}
