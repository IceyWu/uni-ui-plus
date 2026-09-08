# Skeleton 骨架屏

用于内容加载时的占位，提升页面加载体验。

## 基本用法

最简单的骨架屏用法：

```vue
<template>
  <up-skeleton />
</template>
```

## 动画效果

通过 `animate` 属性控制骨架屏是否显示动画效果，通常与加载状态联动。

```vue
<template>
  <up-skeleton :animate="isShowLoading" />
</template>

<script setup>
import { ref } from 'vue'
const isShowLoading = ref(false)
</script>
```

## 头像骨架

通过 `type="avatar"` 显示头像骨架，可设置 `avatarSize` 和 `avatarShape`。

```vue
<template>
  <up-skeleton type="avatar" :avatarSize="80" avatarShape="circle" />
</template>
```

## 标题行数

通过 `rows` 属性设置骨架屏的行数。

```vue
<template>
  <up-skeleton :rows="1" />
</template>
```

## 标题宽度

通过 `titleWidth` 属性设置标题宽度。

```vue
<template>
  <up-skeleton titleWidth="50%" />
</template>
```

## Attributes

| 参数         | 说明         | 类型              | 默认值    |
| ------------ | ------------ | ----------------- | --------- |
| type         | 骨架屏类型   | string            | 'title'   |
| loading      | 是否显示骨架 | boolean           | true      |
| animate      | 是否显示动画 | boolean           | true      |
| avatarShape  | 头像形状     | string            | 'circle'  |
| avatarSize   | 头像大小     | number/string     | 60        |
| titleHeight  | 段落高度     | number/string     | 36        |
| titleWidth   | 段落宽度     | number/string     | '100%'    |
| rows         | 行数         | number            | 3         |

## Events

| 事件名称 | 说明         | 参数 |
| -------- | ------------ | ---- |
| -        | 暂无事件     | -    |

## Slots

| 名称    | 说明         |
| ------- | ------------ |
| default | 自定义骨架屏内容 |

## 外部样式类

| 类名         | 说明       |
| ------------ | ---------- |
| custom-class | 根节点样式 |

## 示例

更多用法请参考 `src/subPages/skeleton/Index.vue` 示例页面。
