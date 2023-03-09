import minimist from 'minimist'
import { execaCommand } from 'execa'
import path from 'node:path'

async function run() {
  try {
    const argv = minimist(process.argv.slice(2))

    const serverEntryPath = path.resolve(
      process.cwd(),
      './.output/server/index.mjs'
    )

    const { env = 'production' } = argv
    const cmdStr = `cross-env NUXT_APP_ENV=${env} node ${serverEntryPath}`

    await execaCommand(cmdStr, {
      stdio: 'inherit',
    })
  } catch (err) {
    console.error(err)
  }
}

run()
