# 快速上手

## 安装

`uni-ui-plus` 提供了 `uni_modules` 和 `npm` 两种安装方式。

### npm 安装

::: code-group

```bash [pnpm]
pnpm add uni-ui-plus
```

```bash [yarn]
yarn add uni-ui-plus
```

```bash [npm]
npm i uni-ui-plus
```

:::

### uni_modules 安装

在 `src` 目录下创建 `uni_modules` 文件夹并将 `uni-ui-plus` 解压到其中：

```bash
- uni_modules
- - - uni-ui-plus
```

## Sass

`uni-ui-plus` 依赖 `sass`：

```bash
pnpm add sass -D
```

## 配置

### 导入组件

::: tip 提示
使用 `uni_modules` 安装时组件天然支持 `easycom` 规范，无需额外配置。使用 `npm 安装` 需按照以下步骤配置。
:::

#### 基于 vite 配置自动引入组件（方案 1）

```ts
// src/resolvers/up-resolver.ts
import type { ComponentResolver } from '@uni-helper/vite-plugin-uni-components'
import { kebabCase } from '@uni-helper/vite-plugin-uni-components'

export function UpResolver(): ComponentResolver {
  return {
    type: 'component',
    resolve: (name: string) => {
      if (name.match(/^Up[A-Z]/)) {
        const compName = kebabCase(name)
        return {
          name,
          from: `uni-ui-plus/components/${compName}/${compName}.vue`,
        }
      }
    },
  }
}
```

```ts
// vite.config.ts
import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import Components from '@uni-helper/vite-plugin-uni-components'
import { UpResolver } from '@/resolvers/up-resolver'

export default defineConfig({
  plugins: [
    Components({ resolvers: [UpResolver()] }),
    uni()
  ],
});
```

如果使用 `pnpm`，请在根目录下的 `.npmrc` 文件中添加：

```text
public-hoist-pattern[]=@vue*
```

#### 配置 easycom 自动引入组件（方案 2）

```json
// pages.json
{
  "easycom": {
    "autoscan": true,
    "custom": {
      "^up-(.*)": "uni-ui-plus/components/up-$1/up-$1.vue"
    }
  }
}
```

## 引入主题样式

`uni-ui-plus` 使用 CSS 自定义属性实现主题系统，需要在 `App.vue` 中全局引入主题样式：

```vue
<!-- App.vue -->
<style lang="scss">
@use 'uni-ui-plus/styles/theme/index.scss';
</style>
```

如果使用 `uni_modules` 安装方式：

```vue
<!-- App.vue -->
<style lang="scss">
@use '@/uni_modules/uni-ui-plus/styles/theme/index.scss';
</style>
```

::: warning 注意
不引入主题样式会导致组件的间距、颜色、圆角等 CSS 变量无法生效，组件样式会异常。
:::

## Volar 支持

在 `tsconfig.json` 中配置全局组件类型：

```json
{
  "compilerOptions": {
    "types": ["uni-ui-plus/global"]
  }
}
```

## 使用

配置完成后，可以直接在 SFC 中使用组件：

```html
<template>
  <up-image src="https://example.com/a.jpg" width="100" height="100" />
  <up-empty description="暂无数据" />
</template>
```