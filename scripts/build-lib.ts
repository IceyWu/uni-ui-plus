import fs from 'fs'
import path from 'path'

const src = path.resolve(import.meta.dirname, '../src/uni_modules/uni-ui-plus')
const libDir = path.resolve(import.meta.dirname, '../lib')

const copyComponents = (srcPath: string, tarPath: string, filter: string[] = []) => {
  fs.mkdir(tarPath, (err) => {})
  fs.readdir(srcPath, (err, files) => {
    if (err === null) {
      files.forEach((filename) => {
        const filedir = path.join(srcPath, filename)
        const filterFlag = filter.some((item) => path.extname(filename).toLowerCase() === item && filename !== 'changelog.md')
        if (!filterFlag) {
          fs.stat(filedir, (errs, stats) => {
            const isFile = stats.isFile()
            if (isFile) {
              const destPath = path.join(tarPath, filename)
              fs.copyFile(filedir, destPath, (err) => {})
            } else {
              const tarFiledir = path.join(tarPath, filename)
              copyComponents(filedir, tarFiledir, filter)
            }
          })
        }
      })
    } else if (err) {
      console.error(err)
    }
  })
}

copyComponents(src, libDir, ['.md'])

const copyFile = (srcPath: string, tarPath: string) => {
  const isFile = fs.statSync(srcPath).isFile()
  if (isFile) {
    fs.copyFile(srcPath, tarPath, (err) => {})
  }
}

const readme = path.resolve(import.meta.dirname, '../README.md')
const license = path.resolve(import.meta.dirname, '../LICENSE')
copyFile(readme, path.join(libDir, 'README.md'))
copyFile(license, path.join(libDir, 'LICENSE'))
