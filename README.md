<p align="center">
<img src="https://nest-js.oss-accelerate.aliyuncs.com/nestTest/1/1745638907584.png"
width="100"
height="100" style="max-width: 100%;" alt="logo" />
</p>
<h1 align="center">uni-ui-plus</h1>
<p align="center">uni-ui 二次封装</p>
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

## 介绍

uni-ui-plus 是对@dcloudio/uni-ui的二次封装，提供了更好的使用体验和更多的功能。

# 快速上手

## NPM方式

### 安装

```bash [pnpm]
pnpm add uni-ui-plus
```

```bash [yarn]
yarn add uni-ui-plus
```

```bash [npm]
npm install uni-ui-plus
```

### 配置

---

#### 组件导入

::: warning 注意
自动按需导入组件有 `unplugin` 和 `easycom` 两种方式，请勿混用~
:::

##### <Badge type="tip">推荐</Badge> unplugin方式

- 安装插件

  > [@uni-helper/vite-plugin-uni-components](https://github.com/uni-helper/vite-plugin-uni-components)

  ::: code-group

  ```bash [pnpm]
  pnpm add -D @uni-helper/vite-plugin-uni-components
  ```

  ```bash [yarn]
  yarn add --dev @uni-helper/vite-plugin-uni-components
  ```

  ```bash [npm]
  npm install -D @uni-helper/vite-plugin-uni-components
  ```

  :::

- 配置插件

  > vite.config.ts

  ```ts
  import { defineConfig } from "vite";
  import UniApp from "@dcloudio/vite-plugin-uni";
  import UniComponents from "@uni-helper/vite-plugin-uni-components";
  import { UpResolver } from "uni-ui-plus";

  export default defineConfig({
    // ...
    plugins: [
      // ...
      // 确保放在 `UniApp()` 之前
      UniComponents({
        resolvers: [UpResolver()],
      }),
      UniApp(),
    ],
  });
  ```

  > 如果使用 `pnpm` 管理依赖，请在项目根目录下的
  > `.npmrc` 文件中添加如下内容

  ```bash
  shamefully-hoist=true # or public-hoist-pattern[]=@vue*
  ```

- 类型提示

  > tsconfig.json（需要[IDE 支持](https://cn.vuejs.org/guide/typescript/overview.html#ide-support)）

  ```json5
  {
    compilerOptions: {
      // ...
      types: ["uni-ui-plus/global.d.ts"],
    },
  }
  ```

##### easycom方式

- 配置easycom

  > pages.json（若原本已存在easycom字段，则添加easycom.custom字段中的内容）

  ```json5
  {
    easycom: {
      autoscan: true,
      custom: {
        "^up-(.*)?-(.*)": "uni-ui-plus/components/$1$2/$1$2.vue",
        "^up-(.*)": "uni-ui-plus/components/$1/$1.vue",
      },
    },
    // ...
  }
  ```

### 完成

---

> 配置完成，现在所有的组件都可以直接使用，它将自动完成按需导入

```html
<template>
  <up-button type="primary">主要按钮</up-button>

  <!-- 或者（仅限unplugin方式） -->
  <UpButton type="primary">主要按钮</UpButton>
</template>
```

## 组件列表

---

### Image

```html
<template>
  <up-image
    src="http://nest-js.oss-accelerate.aliyuncs.com/nestTest/1/1746282136181.JPG"
    placeholder-src="http://nest-js.oss-accelerate.aliyuncs.com/nestTest/1/1746282136181.JPG?x-oss-process=image/resize,l_100"
    width="120"
    height="120"
    radius="8"
    :lazy-load="true"
  />
</template>
```

---

### Skeleton

```html
<template>
  <up-skeleton :loading="true" type="title" />
  <up-skeleton :loading="true" type="avatar" avatar-shape="circle" />
</template>
```

---

### List

```html
<script setup>
  import { getObjVal, list, sleep } from "@iceywu/utils";
  import { useRequest } from "vue-hooks-pure";

  const scrollListRef = ref();
  // 模拟api
  async function getTestApi(params) {
    await sleep(500);
    const { page = 0, size = 10, maxPage = 3 } = params;
    const baseSize = page * size;
    const data = list(0, size - 1, (index) => {
      const element = baseSize + index;
      return {
        id: element,
        cover: `https://picsum.photos/id/${element}/200/300`,
        title: `title ${element}`,
        desc: `desc ${element}`,
      };
    });
    return {
      code: 200,
      msg: "查询成功",
      result: {
        content: data,
        last: page + 1 === maxPage,
        total: 100,
      },
    };
  }

  const {
    onRefresh,
    onLoad: onLoadMore,
    result,
  } = useRequest(getTestApi, {
    target: "list",
    loadingDelay: 300,
    getVal: (res) => {
      const list = getObjVal(res, "result.content", []);
      return list;
    },
    listOptions: {
      defaultPageKey: "page",
      defaultSizeKey: "size",
      defaultDataKey: "list",
      defaultPage: -1,
      getTotal: (data) => {
        const total = getObjVal(data, "result.total", 0);
        return total;
      },
    },
    onRequestEnd: (res) => {
      if (scrollListRef.value) {
        scrollListRef.value.stopRefresh();
      }
    },
  });
  onMounted(() => {
    onRefresh();
  });
</script>

<template>
  <view class="h-50vh">
    <up-list
      ref="scrollListRef"
      v-model:list-obj="result"
      style="height: 100%;"
      :is-need-h-full="true"
      :scroll-y="true"
      @on-load="onLoadMore"
      @on-refresh="onRefresh"
    >
      <template #default="{ data: { list } }">
        <view v-for="(item, index) in list" :key="index" class="mb-4 flex">
          <image :src="item.cover" class="h-20 w-20" mode="widthFix" />
          <view>{{ item.title }}</view>
        </view>
      </template>
    </up-list>
  </view>
</template>
```
