<p align="center">
<img src="https://nest-js.oss-accelerate.aliyuncs.com/nestTest/1/1745638907584.png" width="100" height="100" style="max-width: 100%;" alt="logo" />
</p>
<h1 align="center">uni-ui-plus</h1>
<p align="center">一个现代化的 uni-app 组件库</p>
<p align="center">
<a href="https://github.com/iceywu/uni-ui-plus">
  <img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/iceywu/uni-ui-plus?logo=github&color=%234d80f0&link=https%3A%2F%2Fgithub.com%2iceywu%2Funi-ui-plus">
 </a>
<a href="https://www.npmjs.com/package/uni-ui-plus">
  <img alt="npm" src="https://img.shields.io/npm/v/uni-ui-plus?logo=npm&color=%234d80f0&link=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Funi-ui-plus">
</a>
<a href="https://www.npmjs.com/package/uni-ui-plus">
  <img alt="npm" src="https://img.shields.io/npm/dw/uni-ui-plus?logo=npm&link=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Funi-ui-plus">
</a>
<a href="https://www.npmjs.com/package/uni-ui-plus">
  <img src="https://img.shields.io/npm/dt/uni-ui-plus?style=flat-square" alt="downloads">
</a>

## 特性

-  多平台覆盖，支持微信小程序、支付宝小程序、H5、APP 等
-  使用 TypeScript 构建，提供良好的组件类型系统
-  支持国际化
-  支持修改 CSS 变量实现主题定制
-  支持暗黑模式

## 快速上手

### 安装

```bash
pnpm add uni-ui-plus
```

### 引入主题样式

在 `App.vue` 中全局引入主题样式，否则组件的间距、颜色等 CSS 变量无法生效：

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

### 配置

#### 方案 1：vite 自动引入

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

#### 方案 2：easycom

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

### Volar 支持

```json
// tsconfig.json
{
  "compilerOptions": {
    "types": ["uni-ui-plus/global"]
  }
}
```

## 开源协议

本项目基于 [MIT](https://opensource.org/licenses/MIT) 协议。
