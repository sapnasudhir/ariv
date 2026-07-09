import { execSync } from 'node:child_process'

function run(cmd) {
  return execSync(cmd, { encoding: 'utf8' }).trim()
}

const status = run('git status --porcelain')

if (!status) {
  console.log('Nothing changed — site is already up to date.')
  process.exit(0)
}

console.log('Changes detected:')
console.log(status)

run('git add -A')

const timestamp = new Date().toISOString().slice(0, 16).replace('T', ' ')
execSync(`git commit -m "Update videos (${timestamp})"`, { stdio: 'inherit' })

console.log('Pushing to GitHub...')
execSync('git push', { stdio: 'inherit' })

console.log('\nDone. GitHub Actions will rebuild and redeploy the site in about 30 seconds.')
console.log('Site: https://sapnasudhir.github.io/ariv/')
