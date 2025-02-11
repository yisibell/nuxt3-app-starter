export const useMultiCacheApi = () => {
  /**
   * 清除路由缓存
   */
  const purgeRoute = async (paths: string[]) => {
    const res = await $fetch('/__nuxt_multi_cache/purge/route', {
      method: 'POST',
      body: paths,
    })

    return res
  }

  /**
   * 清除组件缓存
   */
  const purgeComponent = async (keys: string[]) => {
    const res = await $fetch('/__nuxt_multi_cache/purge/component', {
      method: 'POST',
      body: keys,
    })

    return res
  }

  /**
   * 清除缓存标签
   */
  const purgeCacheTags = async (tags: string[]) => {
    const res = await $fetch('/__nuxt_multi_cache/purge/tags', {
      method: 'POST',
      body: tags,
    })

    return res
  }

  /**
   * 清除所有缓存
   */
  const purgeAll = () => {
    fetch('/__nuxt_multi_cache/purge/all', {
      method: 'POST',
    })
  }

  /**
   * 获取所有路由缓存
   */
  const getAllRouteCacheList = async () => {
    const res = await $fetch('__nuxt_multi_cache/stats/route', {
      method: 'GET',
    })

    return res
  }

  /**
   * 获取所有组件缓存
   */
  const getAllComponentCacheList = async () => {
    const res = await $fetch('__nuxt_multi_cache/stats/component', {
      method: 'GET',
    })

    return res
  }

  /**
   * 检查缓存组件
   */
  const inspectComponent = async (key: string) => {
    const res = await $fetch('/__nuxt_multi_cache/inspect/component', {
      method: 'GET',
      query: {
        key,
      },
    })

    return res
  }

  /**
   * 检查缓存路由
   */
  const inspectRoute = async (key: string) => {
    const res = await $fetch('/__nuxt_multi_cache/inspect/route', {
      method: 'GET',
      query: {
        key,
      },
    })

    return res
  }

  return {
    purgeRoute,
    purgeComponent,
    purgeCacheTags,
    purgeAll,
    getAllRouteCacheList,
    getAllComponentCacheList,
    inspectComponent,
    inspectRoute,
  }
}
