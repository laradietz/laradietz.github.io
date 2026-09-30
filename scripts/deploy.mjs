// Builds the site for https://laradietz.github.io and publishes dist/ to the gh-pages branch,
// which GitHub Pages serves. Usage: npm run deploy
import { execSync } from 'node:child_process'
import { writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const SITE_URL = 'https://laradietz.github.io'
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = resolve(root, 'dist')
const run = (command, cwd = root) => execSync(command, { cwd, stdio: 'inherit' })

const remote = execSync('git remote get-url origin', { cwd: root }).toString().trim()
const commit = execSync('git rev-parse --short HEAD', { cwd: root }).toString().trim()

execSync('npm run build', { cwd: root, stdio: 'inherit', env: { ...process.env, PUBLIC_SITE_URL: SITE_URL } })
// Without this file GitHub Pages runs Jekyll, which is not needed for a static build.
writeFileSync(resolve(dist, '.nojekyll'), '')

run('git init -q -b gh-pages', dist)
run('git add -A', dist)
run(`git commit -q -m "Deploy ${commit}"`, dist)
run(`git push -f ${remote} gh-pages`, dist)
console.log(`\nPublicado: ${SITE_URL}`)
