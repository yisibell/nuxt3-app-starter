# nuxt-conf

## CDN behavior

CDN processing is enabled by default. Configure `NUXT_APP_CDN_BASE_URL` in the
selected `config/env/env.*.ts` file to enable automatic CDN URL generation:

```ts
export default {
  NUXT_APP_CDN_BASE_URL: 'https://cdn.example.com/assets',
}
```

The module generates `NUXT_APP_CDN_VERSION` when it is not provided, then
creates `NUXT_APP_CDN_URL` with the following format:

```text
https://cdn.example.com/assets/{version}/
```

The resolved URL is also assigned to `nuxt.options.app.cdnURL`.

By default, `version.json` is written in every environment. The file name and
write behavior can be controlled explicitly:

```ts
export default defineNuxtConfig({
  modules: [
    ['~/modules/conf/module', {
      cdn: {
        enabled: true,
        writeVersionFile: true,
        versionFileName: 'cdn-version.json',
      },
    }],
  ],
})
```
