import inquirer from 'inquirer'
import { execSync } from 'child_process'
import { writeFileSync, readFileSync, readdirSync, statSync } from 'fs'
import path from 'path'

const src = path.resolve(__dirname, '../src/uni_modules/uni-ui-plus')
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
      message: '请选择发版类型（默认值：🐛 patch)',
      choices: ['🐛 patch 小版本', '✨ minor 中版本', '🚀 major 大版本'],
      default: '🐛 patch 小版本'
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
    if (!answers['release'] || answers['release'].toLowerCase() != 'y') {
      console.log('🚨 操作取消')
      return
    }

    try {
      console.log('\n📦 开始发布流程...\n')

      // 1. 项目版本更新
      console.log('1️⃣ 更新版本号...')
      switch (answers['version']) {
        case '🐛 patch 小版本':
          execSync('pnpm release:patch', { stdio: 'inherit' })
          break
        case '✨ minor 中版本':
          execSync('pnpm release:minor', { stdio: 'inherit' })
          break
        case '🚀 major 大版本':
          execSync('pnpm release:major', { stdio: 'inherit' })
          break
        default:
          execSync('pnpm release:patch', { stdio: 'inherit' })
          break
      }

      // 2. 读取新版本号
      const file = readFileSync(path.resolve(__dirname, '../package.json'))
      const packageJson = JSON.parse(file.toString())
      const newVersion = packageJson.version
      console.log(`✓ 版本号已更新: ${oldVersion} → ${newVersion}\n`)

      // 3. 同步版本号到 uni_modules
      console.log('2️⃣ 同步版本号到 uni_modules...')
      const tarfetPackageJson = require('../src/uni_modules/uni-ui-plus/package.json')
      tarfetPackageJson.version = newVersion
      writeFileSync(path.resolve(src, 'package.json'), JSON.stringify(tarfetPackageJson, null, 2))
      console.log('✓ uni_modules 版本号已同步\n')

      // 4. 处理文档中的最低版本标识
      console.log('3️⃣ 更新文档中的版本标识...')
      handleLowestVersion(path.resolve(__dirname, '../docs'), newVersion)
      console.log('✓ 文档版本标识已更新\n')

      // 5. 同步 changelog
      console.log('4️⃣ 同步 Changelog 到各个目录...')
      execSync('pnpm build:changelog', { stdio: 'inherit' })
      console.log('✓ Changelog 已同步\n')

      // 6. 生成主题变量
      console.log('5️⃣ 构建主题变量...')
      execSync('pnpm build:theme-vars', { stdio: 'inherit' })
      console.log('✓ 主题变量已构建\n')

      // 7. 代码检查
      console.log('6️⃣ 运行代码检查...')
      execSync('pnpm lint', { stdio: 'inherit' })
      console.log('✓ 代码检查通过\n')

      // 8. 提交到 git
      console.log('7️⃣ 提交更改到 Git...')
      execSync('git add -A ')
      execSync(`git commit -m "chore(release): ${newVersion}"`)
      execSync(`git tag -a v${newVersion} -m "chore(release): ${newVersion}"`)
      console.log('✓ Git 提交完成\n')

      // 9. 完成
      const branch = execSync('git branch --show-current').toString().trim()
      console.log('═'.repeat(50))
      console.log('🎉 版本发布成功！')
      console.log('═'.repeat(50))
      console.log(`\n📌 版本: v${newVersion}`)
      console.log(`📌 分支: ${branch}`)
      console.log('\n✨ 运行以下命令推送到远程仓库:')
      console.log(`   git push --follow-tags origin ${branch}\n`)
    } catch (error) {
      console.error('\n❌ 发布失败:', error)
      process.exit(1)
    }
  })
  .catch((error: any) => {
    if (error.isTtyError) {
      console.error('❌ 无法在当前环境中渲染提示')
    } else {
      console.error('❌ 发生错误:', error)
    }
    process.exit(1)
  })
