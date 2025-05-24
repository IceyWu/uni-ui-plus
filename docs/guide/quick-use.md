# 快速上手

本节介绍如何在 `uni-app` 项目中安装、配置并使用 `uni-ui-plus`。

## 使用之前

使用前，请确保你已经学习过 Vue 官方的 [快速上手](https://cn.vuejs.org/guide/quick-start.html) 和 uni-app 提供的 [学习路线](https://uniapp.dcloud.net.cn/resource.html)。

## 安装

:::warning 关于安装

- 使用`npm`安装需要额外配置，更新组件库时无需处理代码差异。

:::

### npm 安装

::: code-group

```bash [npm]
npm i uni-ui-plus
```

```bash [yarn]
yarn add uni-ui-plus
```

```bash [pnpm]
pnpm add uni-ui-plus
```

:::

## Sass

`uni-ui-plus` 依赖 `sass` ，因此在使用之前需要确认项目中是否已经安装了 `sass`，如果没有安装，可以通过以下命令进行安装：

::: code-group

```bash [npm]
npm i sass -D
```

```bash [yarn]
yarn add sass -D
```

```bash [pnpm]
pnpm add sass -D
```


:::

## 配置

### 导入组件

::: tip 提醒
使用 `uni_modules` 安装时 `uni-ui-plus` 的组件天然支持 `easycom` 规范，无需额外配置就可以自动引入组件，而使用 `npm 安装` 需按照此步骤配置，以下两种方案二选一即可。
:::

#### 配置 easycom 自动引入组件<el-tag type="primary" style="vertical-align: middle;margin-left:8px;" effect="dark" >方案 1</el-tag>

传统 vue 组件，需要安装、引用、注册，三个步骤后才能使用组件。`easycom`将其精简为一步。  
只要组件路径符合规范（具体见[easycom](https://uniapp.dcloud.net.cn/collocation/pages.html#easycom)），就可以不用引用、注册，直接在页面中使用。

:::tip 提醒

- uni-app 考虑到编译速度，直接在 `pages.json` 内修改 `easycom` 不会触发重新编译，需要改动页面内容触发。
- 请确保您的 `pages.json` 中只有一个 `easycom` 字段，否则请自行合并多个引入规则。

:::

```JSON
// pages.json
{
 "easycom": {
  "autoscan": true,
  "custom": {
    "^up-(.*)?-(.*)": "uni-ui-plus/components/$1$2/$1$2.vue",
    "^up-(.*)": "uni-ui-plus/components/$1/$1.vue",
  }
 },
 
 // 此为本身已有的内容
 "pages": [
  // ......
 ]
}
```

#### 基于 vite 配置自动引入组件<el-tag type="primary" style="vertical-align: middle;margin-left:8px;" effect="dark" >方案 2</el-tag>

如果不熟悉 `easycom`，也可以通过 [@uni-helper/vite-plugin-uni-components](https://github.com/uni-helper/vite-plugin-uni-components) 实现组件的自动引入。

:::tip 提醒

- 如果使用此方案时控制台打印很多 `Sourcemap for  points to missing source files​` ，可以尝试将 `Vite` 版本升级至 `4.5.x` 以上版本。

:::

::: code-group

```bash [npm]
npm i @uni-helper/vite-plugin-uni-components -D
```

```bash [yarn]
yarn add @uni-helper/vite-plugin-uni-components -D
```

```bash [pnpm]
pnpm add @uni-helper/vite-plugin-uni-components -D
```

:::

```ts
// vite.config.ts
import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";

import Components from '@uni-helper/vite-plugin-uni-components'
import { UpResolver } from "uni-ui-plus";


export default defineConfig({
  plugins: [
    // make sure put it before `Uni()`
    Components({
    resolvers: [UpResolver()]
  }), uni()],
});
```

如果你使用 `pnpm` ，请在根目录下创建一个 `.npmrc` 文件，参见 [Issue](https://github.com/antfu/unplugin-vue-components/issues/389)。

```text
// .npmrc
public-hoist-pattern[]=@vue*
// or
// shamefully-hoist = true
```

## Volar 支持

如果您使用 `Volar`，请在 `tsconfig.json` 中通过 `compilerOptions.type` 指定全局组件类型。

:::tip
cli 项目使用 `uni_modules` 安装无需配置，对 `Volar` 的支持自动生效，`HbuildX` 项目不支持此配置，故此步骤仅在 `cli` 项目使用 `npm` 安装时需要配置。
:::

```json
// tsconfig.json
{
  "compilerOptions": {
    "types": ["uni-ui-plus/global"]
  }
}
```

## 使用

`uni-ui-plus` 安装、配置完成之后，支持组件自动引入，故可以直接在 SFC 中使用，无需在页面内 import，也不需要在 components 内声明，即可在任意页面使用。值得注意的是，`uni-app` 平台不支持全局挂载组件，所以 `Message`、`Toast` 等组件仍需在 SFC 中显式使用，例如：

``` html
<up-button>test</up-button>
```

