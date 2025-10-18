import { defineNuxtModule } from '@nuxt/kit'

export default defineNuxtModule({
  setup(resolvedOptions, nuxt) {
    nuxt.hooks.hook('build:manifest', (manifest) => {
      for (const item of Object.values(manifest)) {
        item.dynamicImports = []
        item.prefetch = false
        item.preload = false
      }

      console.log('>>>>>>>>>', manifest)
    })
  },
})
