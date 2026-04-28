import { execSync } from 'child_process'
import { readdirSync, readFileSync, statSync, writeFileSync } from 'fs'
import inquirer from 'inquirer'
import path from 'path'

const src = path.resolve(import.meta.dirname, '../src/uni_modules/uni-ui-plus')
const oldVersion = require('../package.json').version
const LOWEST_VERSION = '$LOWEST_VERSION$'

const handleLowestVersion = (dir: string, version: string) => {
  const files = readdirSync(dir)

  for (const item of files) {
    const itemPath = path.resolve(dir, item)
    const stat = statSync(itemPath)

    if (stat.isFile()) {
      if (item.endsWith('.md')) {
        let content = readFileSync(itemPath, 'utf-8')

        if (content.includes(LOWEST_VERSION)) {
          content = content.replace(/\$LOWEST_VERSION\$/g, version)
          writeFileSync(itemPath, content)
        }
      }
    } else {
      handleLowestVersion(itemPath, version)
    }
  }
}

inquirer
  .prompt([
    {
      type: 'list',
      name: 'version',
      message: '请选择发版类型（默认值：✨ minor)',
      choices: ['🐛 patch 小版本', '✨ minor 中版本', '🚀 major 大版本'],
      default: '✨ minor 中版本'
    },
    {
      type: 'list',
      name: 'release',
      message: '确认发布？',
      choices: ['Y', 'N'],
      default: 'Y'
    }
  ])
  .then((answers: any) => {
    if (!answers.release || answers.release.toLowerCase() != 'y') {
      console.log('🚨 操作取消')
      return
    }
    // 项目版本更新
    switch (answers.version) {
      case '🐛 patch 小版本':
        execSync('pnpm release:patch')
        break
      case '✨ minor 中版本':
        execSync('pnpm release:minor')
        break
      case '🚀 major 大版本':
        execSync('pnpm release:major')
        break
      default:
        execSync('pnpm release:minor')
        break
    }
    // 更新版本
    const file = readFileSync(path.resolve(import.meta.dirname, '../package.json'))
    const packageJson = JSON.parse(file.toString())
    const newVersion = packageJson.version

    console.log(`√ bumping version in package.json from ${oldVersion} to ${newVersion}`)

    // 同步版本号到 uni_modules
    const tarfetPackageJson = require('../src/uni_modules/uni-ui-plus/package.json')
    tarfetPackageJson.version = newVersion
    writeFileSync(path.resolve(src, 'package.json'), JSON.stringify(tarfetPackageJson, null, 2))

    // 处理文档中的最低版本标识
    handleLowestVersion(path.resolve(import.meta.dirname, '../docs'), newVersion)

    // 同步 changelog 到各个目录
    execSync('pnpm build:changelog')

    // 代码检查
    execSync('pnpm lint')
    // 提交到 git
    execSync('git add -A ')
    execSync(`git commit -m "chore(release): ${newVersion}"`)
    execSync(`git tag -a v${newVersion} -m "chore(release): ${newVersion}"`)
    console.log('√ committing changes')
    const branch = execSync('git branch --show-current').toString().replace(/\*/g, '').replace(/ /g, '').trim()
    console.log('🎉 版本发布成功')
    const tip = 'Run `git push --follow-tags origin ' + branch + '` to publish'
    console.log(tip.replace(/\n/g, ''))
  })
  .catch((error: any) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  })
