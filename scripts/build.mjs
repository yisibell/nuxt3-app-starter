import minimist from 'minimist'
import { execaCommand } from 'execa'

async function run() {
  try {
    const argv = minimist(process.argv.slice(2))

    const { env = 'production' } = argv
    const cmdStr = `cross-env NUXT_APP_ENV=${env} nuxt build`

    await execaCommand(cmdStr, {
      stdio: 'inherit',
    })
  } catch (err) {
    console.error(err)
  }
}

run()
