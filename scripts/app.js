import path from 'node:path'
import minimist from 'minimist'
import { execaCommand } from 'execa'

async function run() {
  try {
    const argv = minimist(process.argv.slice(2))

    const serverEntryPath = path.resolve(
      process.cwd(),
      './.output/server/index.mjs',
    )

    const { env = 'production', port = 3389, host = '0.0.0.0' } = argv
    const cmdStr = `cross-env HOST=${host} PORT=${port} NUXT_APP_ENV=${env} node ${serverEntryPath}`

    await execaCommand(cmdStr, {
      stdio: 'inherit',
    })
  }
  catch (err) {
    console.error(err)
  }
}

run()
