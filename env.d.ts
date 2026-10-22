/// <reference types="nuxt-svg-icons/client" />

declare module 'vue-router' {
  interface RouteMeta {
    scrollRestoration?: ScrollRestoration
  }
}

declare module '#app' {
  interface PageMeta {
    scrollRestoration?: ScrollRestoration
  }
}

export {}
