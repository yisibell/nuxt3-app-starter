// app/router.options.ts
import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    if (to.meta.scrollRestoration === 'auto') {
      if (savedPosition) {
        return savedPosition
      }
    }

    // 默认行为
    return { left: 0, top: 0 }
  },
}
