// pm2 config for production
module.exports = {
  apps: [
    {
      name: 'NuxtAppStarterMatPur',
      exec_mode: 'cluster', // fork, cluster
      instances: 'max', // Or a number of instances
      script: './.output/server/index.mjs',
      env: {
        HOST: '0.0.0.0',
        PORT: 3389,
        NUXT_APP_ENV: 'production',
      },
    },
  ],
}
