// pm2 config for ft
module.exports = {
  apps: [
    {
      name: 'NuxtAppStarter-ft',
      exec_mode: 'cluster', // fork, cluster
      instances: '1', // Or a number of instances
      script: './.output/server/index.mjs',
      env: {
        HOST: '0.0.0.0',
        PORT: 3390,
        NUXT_APP_ENV: 'ft',
      },
    },
  ],
}
