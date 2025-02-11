import { defineMultiCacheOptions } from 'nuxt-multi-cache/dist/runtime/serverOptions'
import { getQuery, getCookie } from 'h3'
// import redisDriver from 'unstorage/drivers/redis'

export default defineMultiCacheOptions({
  route: {
    buildCacheKey(event) {
      const path = event.path

      const savedLang = getCookie(event, 'savedLang')

      // Handle specific routes that need query strings.
      if (path.startsWith('/api/query/products')) {
        const { id } = getQuery(event)
        if (id) {
          return 'api_query_products_' + id
        }
      }

      // Remove query string from path.
      return `${path.split('?')[0]}_${savedLang}`
    },
    // storage: {
    //   driver: redisDriver({
    //     base: 'route:',
    //     host: '0.0.0.0',
    //     port: 80,
    //     password: '123456',
    //   }),
    // },
  },

})
