# nuxt3-app-starter

A ssr app starter built by Nuxt (3) + vue (3) + pinia + ofetch + vant + typescript + sass !!!

- [docs](./docs/README.md)

# Features

- **pnpm** for package management.
- Support **http(s) proxy** in **development** and **server**.
- Friendly **SVG** icon usage.
- Support **PM2**.
- Using **pinia** for state management.
- Using **ofetch** for http request.
- Using **vant** ui component libary.
- Support **Typescript**.
- Styling via **sass** and **unocss**.
- Internationalization via **@nuxtjs/i18n**.
- Easy to use environment configuration.

## Setup

Make sure to install the dependencies:

```bash
# pnpm
pnpm install
```

## Development Server

Start the development server on http://localhost:3389

```bash
$ pnpm dev
```

## Production

Build the application for production:

```bash
# build for production
$ pnpm build

# build for ft
$ pnpm build:ft
```

Locally preview production build:

```bash
$ pnpm preview
```

Start the node server:

``` bash
# start for production
$ pnpm start
# start for production with pm2
$ pnpm pm2:start
# start for production with pm2 in docker
$ pnpm pm2:docker:start

# start for ft
$ pnpm start:ft
# start for ft with pm2
$ pnpm pm2:start-ft
# start for ft with pm2 in docker
$ pnpm pm2:docker:start-ft
```


