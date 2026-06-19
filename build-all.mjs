// Builds every Vite sub-site in this repo into dist/<site>/ with the correct
// base path, so Vercel can serve them at /club_website/, /district_website/, …
// Each site builds in isolation: one failing never blocks the others.
import { execSync } from 'node:child_process'
import { existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = dirname(fileURLToPath(import.meta.url))
const distRoot = join(root, 'dist')

// Sub-sites to build. Skipped automatically if they have no package.json.
const sites = ['club_website', 'district_website', 'riwebsite']

rmSync(distRoot, { recursive: true, force: true })
mkdirSync(distRoot, { recursive: true })

const built = []
for (const site of sites) {
  const cwd = join(root, site)
  if (!existsSync(join(cwd, 'package.json'))) {
    console.log(`• skip ${site} (no package.json)`)
    continue
  }
  try {
    console.log(`\n=== building ${site} ===`)
    const install = existsSync(join(cwd, 'package-lock.json')) ? 'npm ci' : 'npm install'
    execSync(install, { cwd, stdio: 'inherit' })
    // base + outDir passed on the CLI so we never have to edit each site's config.
    execSync(`npx vite build --base=/${site}/ --outDir ../dist/${site} --emptyOutDir`, {
      cwd,
      stdio: 'inherit',
    })
    built.push(site)
    console.log(`✓ ${site} built`)
  } catch (err) {
    console.error(`!! ${site} build FAILED — ${err.message}`)
  }
}

// Simple landing page at / so the root URL isn't a bare 404.
const links = built.map((s) => `<li><a href="/${s}/">${s.replace(/_/g, ' ')}</a></li>`).join('\n      ')
writeFileSync(
  join(distRoot, 'index.html'),
  `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Rotary Websites</title>
    <style>
      body { font-family: system-ui, sans-serif; margin: 0; min-height: 100vh; display: grid; place-items: center; background: #0A2472; color: #fff; }
      .card { text-align: center; }
      h1 { font-weight: 800; }
      ul { list-style: none; padding: 0; }
      li { margin: .5rem 0; }
      a { color: #FFB81C; font-weight: 700; font-size: 1.1rem; text-decoration: none; }
      a:hover { text-decoration: underline; }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>Rotary Websites</h1>
      <ul>
      ${links || '<li>No sites built.</li>'}
      </ul>
    </div>
  </body>
</html>
`,
)

console.log(`\nDone. Built: ${built.join(', ') || 'none'}`)
