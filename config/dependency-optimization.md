# 依赖优化建议

## 核心依赖分类

### 必需的运行时依赖
- @dcloudio/* (uni-app 核心)
- vue
- vue-i18n

### 构建工具依赖
- vite
- @vitejs/plugin-vue
- typescript
- vue-tsc

### 代码质量工具
- eslint + 相关插件
- prettier
- husky
- lint-staged

### 测试工具
- vitest
- @vue/test-utils
- jsdom

### 文档工具
- vitepress
- vitepress-plugin-llms

### 可以考虑移除的依赖
- standard-version (可用 bumpp 替代)
- 部分 @types 包 (检查是否真的需要)
- 重复功能的工具包

## 优化建议
1. 合并功能相似的工具
2. 升级到最新版本
3. 移除未使用的依赖
4. 考虑使用 pnpm 的 workspace 管理 monorepo
