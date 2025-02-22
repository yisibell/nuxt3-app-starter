# 前端项目文档

# 技术栈

Nuxt 3 (Vite 6 + Vue 3 + Pinia(状态管理) + Typescript + ofetch (数据请求)) + vant (组件库) + sass + unocss。

# 图标

图标全部使用 SVG，由 [nuxt-svg-icons](https://github.com/yisibell/nuxt-svg-icons) 驱动。

1. **SVG** 图标按需导入。

例如，将 `SVG` 作为 **Vue 组件导入**。这种方式使用的图标就是服务端处理好的。

```vue
<Logo />
```

```ts
import Logo from '@/assets/icons/vue-logo.svg?component'
```

# 多语言

多语言使用 [@nuxtjs/i18n](https://github.com/nuxt-modules/i18n)。

- 页面按需请求所需 **翻译code**。处理逻辑类似 **azazie**。

# 埋点

按现有逻辑处理。

# 性能优化

## 前端缓存
  
由 [nuxt-multi-cache](https://nuxt-multi-cache.dulnan.net/overview/introduction) 驱动。

支持 **路由级页面缓存**及**组件级缓存**方案。缓存驱动可以是 `Memmory` 、`Redis`、`MongoDB` 或 `S3` 等等。具体可以查看 **unstorage** 所有支持的 [drivers](https://unstorage.unjs.io/drivers)。

- 页面级缓存。
  
缓存 `key` 生成逻辑 `路由地址+国家+货币+用户id(游客模式可不加)`。





   
