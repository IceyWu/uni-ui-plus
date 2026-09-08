import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const srcRoot = path.join(__dirname, '../dist/build/h5')
const targetSrcRoot = path.join(__dirname, '../docs/.vitepress/dist/demo')

function copyFolder(sourceDir: string, targetDir: string) {
  fs.mkdirSync(targetDir, { recursive: true })

  const fileNames = fs.readdirSync(sourceDir)

  fileNames.forEach((fileName) => {
    const sourcePath = path.join(sourceDir, fileName)
    const targetPath = path.join(targetDir, fileName)

    if (fs.statSync(sourcePath).isDirectory()) {
      copyFolder(sourcePath, targetPath)
    } else {
      fs.copyFileSync(sourcePath, targetPath)
    }
  })
}

copyFolder(srcRoot, targetSrcRoot)
