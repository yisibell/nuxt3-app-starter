/* for development mode */

import minimist from 'minimist'
import { execaCommand } from 'execa'

async function run() {
  try {
    const argv = minimist(process.argv.slice(2))

    const { env = 'development', port = 3389, host = '127.0.0.1' } = argv
    const cmdStr = `cross-env HOST=${host} PORT=${port} NUXT_APP_ENV=${env} nuxt dev`

    await execaCommand(cmdStr, {
      stdio: 'inherit',
    })
  } catch (err) {
    console.error(err)
  }
}

run()
