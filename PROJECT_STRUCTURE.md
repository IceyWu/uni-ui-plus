# uni-ui-plus 项目结构优化

## 优化后的项目结构

```
uni-ui-plus/
├── config/                    # 📁 配置文件统一管理
│   ├── .eslintrc.js          # ESLint 配置
│   ├── commitlint.config.js  # Commitlint 配置
│   ├── vitest.config.ts      # Vitest 测试配置
│   ├── versionrc.js          # 版本发布配置
│   └── *.md                  # 配置相关文档
├── docs/                      # 📚 文档系统
│   ├── .vitepress/           # VitePress 配置
│   ├── component/            # 组件文档
│   ├── guide/                # 中文指南
│   ├── en-US/                # 英文文档
│   └── public/               # 静态资源
├── scripts/                   # 🔧 构建脚本
│   ├── index.ts              # 🆕 统一脚本入口
│   ├── build-web-types.ts    # 构建 web types
│   ├── buildThemeVars.ts     # 构建主题变量
│   ├── release.ts            # 版本发布
│   └── ...                   # 其他脚本
├── src/                       # 💻 源代码
│   ├── uni_modules/          # uni-app 模块
│   │   └── uni-ui-plus/      # 组件库核心代码
│   ├── components/           # 演示组件
│   ├── pages/                # 演示页面
│   └── ...                   # 其他源码
├── tests/                     # 🧪 测试文件
│   ├── components/           # 组件测试
│   ├── composables/          # 组合函数测试
│   └── setup.ts             # 测试配置
└── 配置文件                   # 根目录配置（代理到 config/）
```

## 主要优化内容

### 1. 脚本管理优化 ✨

- **统一入口**: 创建 `scripts/index.ts` 作为所有脚本的统一入口
- **简化命令**: 使用 `pnpm scripts <command>` 执行所有脚本操作
- **减少重复**: 移除重复的平台构建命令

**使用示例:**
```bash
# 构建相关
pnpm scripts build:web-types
pnpm scripts build:theme-vars

# 测试相关
pnpm scripts test:component wd-button
pnpm scripts test:workflow --all

# 发布相关
pnpm scripts release
```

### 2. package.json 脚本优化 📦

**优化前 (60+ 个脚本):**
```json
{
  "scripts": {
    "dev:app": "uni -p app",
    "dev:app-android": "uni -p app-android",
    "dev:app-ios": "uni -p app-ios",
    "dev:mp-weixin": "uni -p mp-weixin",
    "dev:mp-alipay": "uni -p mp-alipay",
    // ... 50+ 类似的脚本
  }
}
```

**优化后 (30+ 个脚本):**
```json
{
  "scripts": {
    "dev": "uni",
    "dev:h5": "uni",
    "dev:app": "uni -p app",
    "dev:mp-weixin": "uni -p mp-weixin",
    "scripts": "esno ./scripts/index.ts",
    // 保留常用平台，移除不常用的
  }
}
```

### 3. 配置文件管理 ⚙️

- **集中管理**: 所有配置文件移动到 `config/` 目录
- **代理配置**: 根目录保留代理文件，指向 `config/` 目录
- **易于维护**: 配置文件集中，便于管理和版本控制

### 4. 依赖清理 🧹

- **移除重复工具**: 移除 `standard-version`，使用 `bumpp`
- **清理未使用依赖**: 分析并移除未使用的包
- **升级提醒**: 标记需要升级的依赖

## 新增功能

### 统一脚本系统

通过 `scripts/index.ts` 提供：

1. **命令行界面**: 使用 commander.js 提供友好的命令行体验
2. **参数传递**: 支持各种命令行参数和选项
3. **错误处理**: 统一的错误处理和日志输出
4. **帮助信息**: 自动生成帮助文档

### 配置管理系统

通过 `config/` 目录提供：

1. **配置集中**: 所有配置文件统一管理
2. **文档化**: 每个配置都有对应的说明文档
3. **版本控制友好**: 配置变更容易追踪

## 使用指南

### 开发环境

```bash
# 启动 H5 开发
pnpm dev:h5

# 启动小程序开发
pnpm dev:mp-weixin

# 启动文档开发
pnpm docs:dev
```

### 构建发布

```bash
# 构建组件库
pnpm build:lib

# 构建文档
pnpm docs:build

# 发布版本
pnpm scripts release
```

### 测试

```bash
# 运行所有测试
pnpm test

# 测试特定组件
pnpm scripts test:component wd-button

# 运行测试工作流
pnpm scripts test:workflow --all
```

## 维护建议

1. **定期清理**: 定期检查和清理不需要的依赖
2. **文档更新**: 保持配置文档与实际配置同步
3. **脚本优化**: 根据实际使用情况继续优化脚本
4. **依赖升级**: 定期升级依赖到最新版本

## 兼容性

- ✅ 保持所有原有功能的兼容性
- ✅ 原有的 npm/pnpm 脚本仍然可用
- ✅ 构建产物保持不变
- ✅ 开发体验得到改善
