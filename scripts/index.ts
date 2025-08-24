#!/usr/bin/env node

/**
 * 统一脚本入口
 * 用法: pnpm scripts <command> [options]
 */

import { execSync } from 'child_process'
import { program } from 'commander'

const pkg = require('../package.json')

program.name('uni-ui-plus-scripts').description('uni-ui-plus 项目脚本工具').version(pkg.version)

// 构建相关
program
  .command('build:web-types')
  .description('构建 web-types')
  .action(() => {
    execSync('esno ./scripts/build-web-types.ts', { stdio: 'inherit' })
  })

program
  .command('build:theme-vars')
  .description('构建主题变量')
  .action(() => {
    execSync('esno ./scripts/buildThemeVars.ts', { stdio: 'inherit' })
  })

program
  .command('build:compiler')
  .description('编译组件库')
  .action(() => {
    execSync('esno ./scripts/compiler.ts', { stdio: 'inherit' })
  })

// 测试相关
program
  .command('test:component')
  .description('测试组件')
  .argument('[components...]', '要测试的组件')
  .option('--coverage', '生成覆盖率报告')
  .action((components, options) => {
    const args = components.join(' ')
    const coverageFlag = options.coverage ? ' --coverage' : ''
    execSync(`esno ./scripts/test-component.ts ${args}${coverageFlag}`, { stdio: 'inherit' })
  })

program
  .command('test:workflow')
  .description('测试工作流')
  .argument('[components...]', '要测试的组件')
  .option('--all', '测试所有组件')
  .option('--skip-lint', '跳过 lint 检查')
  .option('--coverage', '生成覆盖率报告')
  .action((components, options) => {
    const args = components.join(' ')
    const allFlag = options.all ? ' --all' : ''
    const skipLintFlag = options.skipLint ? ' --skip-lint' : ''
    const coverageFlag = options.coverage ? ' --coverage' : ''
    execSync(`esno ./scripts/test-workflow.ts ${args}${allFlag}${skipLintFlag}${coverageFlag}`, { stdio: 'inherit' })
  })

// 发布相关
program
  .command('release')
  .description('发布版本')
  .action(() => {
    execSync('esno ./scripts/release.ts', { stdio: 'inherit' })
  })

program
  .command('sync:changelog')
  .description('同步 changelog')
  .action(() => {
    execSync('esno ./scripts/syncChangelog.ts', { stdio: 'inherit' })
  })

// 工具相关
program
  .command('qrcode')
  .description('生成二维码')
  .option('--APP_ID <id>', 'APP ID')
  .option('--APP_SECRET <secret>', 'APP Secret')
  .action((options) => {
    const appIdFlag = options.APP_ID ? ` --APP_ID ${options.APP_ID}` : ''
    const appSecretFlag = options.APP_SECRET ? ` --APP_SECRET ${options.APP_SECRET}` : ''
    execSync(`esno ./scripts/qrcode.ts${appIdFlag}${appSecretFlag}`, { stdio: 'inherit' })
  })

program
  .command('demo:copy')
  .description('复制演示文件')
  .action(() => {
    execSync('esno ./scripts/demoCopy.ts', { stdio: 'inherit' })
  })

program.parse()
