import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const src = path.resolve(__dirname, '../src/uni_modules/uni-ui-plus')
const libDir = path.resolve(__dirname, '../lib')

// 构建前先清空 lib 目录，避免残留旧产物
if (fs.existsSync(libDir)) {
  fs.rmSync(libDir, { recursive: true })
}

fs.cpSync(src, libDir, {
  filter: (sourcePath) => path.extname(sourcePath).toLowerCase() !== '.md' || path.basename(sourcePath).toLowerCase() === 'changelog.md',
  recursive: true
})

const copyFile = (srcPath: string, tarPath: string) => {
  fs.copyFileSync(srcPath, tarPath)
}

const readme = path.resolve(__dirname, '../README.md')
const license = path.resolve(__dirname, '../LICENSE')
copyFile(readme, path.join(libDir, 'README.md'))
copyFile(license, path.join(libDir, 'LICENSE'))
