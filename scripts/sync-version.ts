import { readdirSync, readFileSync, statSync, writeFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import packageConfig from '../package.json'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const { version } = packageConfig
const marker = '$LOWEST_VERSION$'

function updateJson(filePath: string) {
  const content = JSON.parse(readFileSync(filePath, 'utf8'))
  content.version = version
  writeFileSync(filePath, `${JSON.stringify(content, null, 2)}\n`)
}

function updateLowestVersion(dir: string) {
  for (const entry of readdirSync(dir)) {
    const entryPath = path.join(dir, entry)
    if (statSync(entryPath).isDirectory()) {
      updateLowestVersion(entryPath)
      continue
    }
    if (!entry.endsWith('.md')) {
      continue
    }

    const content = readFileSync(entryPath, 'utf8')
    if (content.includes(marker)) {
      writeFileSync(entryPath, content.replaceAll(marker, version))
    }
  }
}

updateJson(path.join(root, 'src/uni_modules/uni-ui-plus/package.json'))
updateJson(path.join(root, 'docs/package.json'))

const aboutPath = path.join(root, 'src/pages/about/Index.vue')
const aboutContent = readFileSync(aboutPath, 'utf8').replace(/v\d+\.\d+\.\d+/, `v${version}`)
writeFileSync(aboutPath, aboutContent)

updateLowestVersion(path.join(root, 'docs'))
console.log(`Version synchronized to ${version}`)
