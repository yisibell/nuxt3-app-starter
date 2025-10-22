import { defineNuxtModule, useNuxt } from '@nuxt/kit'
import { getSvgIconChunkName } from '@@/build/utils/chunkSvgIcons'
import { getVendorChunkName, getSharedChunkName } from '@@/build/utils/chunkStrategy'

export default defineNuxtModule({
  meta: {
    name: 'chunk-strategy',
  },
  setup() {
    const nuxt = useNuxt()
    let dirs: string[]

    nuxt.hook('components:dirs', (_dirs) => {
      dirs = _dirs.map(d => (typeof d === 'string' ? d : d.path))
    })

    // Use single components chunk
    nuxt.hook('vite:extendConfig', (config, { isServer }) => {
      if (!config.build?.rollupOptions?.output || Array.isArray(config.build.rollupOptions.output) || isServer) return

      config.build.rollupOptions.output.manualChunks = (id, meta) => {
        // SVG
        const svgIconChunkName = getSvgIconChunkName(id)
        if (svgIconChunkName) {
          return svgIconChunkName
        }

        // vendor
        const vendorChunkName = getVendorChunkName(id)
        if (vendorChunkName) {
          return vendorChunkName
        }

        // components
        if (
          dirs.some(dir => id.includes(dir))
        ) {
          return getSharedChunkName(id, meta)
        }
      }
    })
  },
})
