# nuxt3-app-starter

A ssr app starter built by Nuxt (3) + vue (3) + pinia + ofetch + element-plus + typescript + sass !!!

# Features

- Support **http(s) proxy** in **development** and **server**.
- Friendly **SVG** icon usage.
- Support **PM2**.
- Using **pinia** for state management.
- Using **ofetch** for http request.
- Using **element-plus** ui component libary.
- Support **Typescript**.
- Styling via **sass**.
- Easy to use environment configuration.

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install
```

## Development Server

Start the development server on http://localhost:3389

```bash
$ yarn dev
```

## Production

Build the application for production:

```bash
# build for production
$ yarn build

# build for ft
$ yarn build:ft
```

Locally preview production build:

```bash
$ yarn preview
```

Start the node server:

``` bash
# start for production
$ yarn start
# start for production with pm2
$ yarn pm2:start
# start for production with pm2 in docker
$ yarn pm2:docker:start

# start for ft
$ yarn start:ft
# start for ft with pm2
$ yarn pm2:start-ft
# start for ft with pm2 in docker
$ yarn pm2:docker:start-ft
```


