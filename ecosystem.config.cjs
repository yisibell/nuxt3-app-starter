// pm2 config for production
module.exports = {
  apps: [
    {
      name: 'NuxtAppStarter',
      exec_mode: 'cluster', // fork, cluster
      instances: '2', // Or a number of instances
      script: './.output/server/index.mjs',
      env: {
        HOST: '0.0.0.0',
        PORT: 3389,
        NUXT_APP_ENV: 'production',
      },
    },
  ],
}
