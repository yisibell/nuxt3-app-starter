import { defineNuxtModule } from '@nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: 'dynamic-routes',
  },
  setup(inlineOptions, nuxt) {
    nuxt.hook('pages:extend', (pages) => {
      // console.log(pages)
    })
  },
})
