# Empty 空状态

用于展示页面或数据为空时的占位提示。

## 基本用法

最简单的用法，展示默认的空状态图片和描述。

```vue
<template>
  <up-empty description="无数据" />
</template>
```

## 不同图片类型

通过 `image` 属性切换不同的空状态图片类型，可选值有 `empty`、`error`、`network`，也支持自定义图片 URL。

```vue
<template>
  <up-empty image="empty" description="无内容" />
  <up-empty image="error" description="加载失败/错误" />
  <up-empty image="network" description="无网络" />
</template>
```

## 自定义图片

通过传入图片 URL 自定义展示图片。

```vue
<template>
  <up-empty
    description="描述文字"
    image="https://oss-console-img-demo-cn-hangzhou-3az.oss-cn-hangzhou.aliyuncs.com/example1.jpg"
  />
</template>
```

## 自定义内容

通过默认插槽可自定义底部内容，如添加按钮等。

```vue
<template>
  <up-empty image="error" description="加载失败">
    <div style="margin-top: 10px">
      <button icon="refresh" type="primary">重试</button>
    </div>
  </up-empty>
</template>
```

## 图片大小

通过 `imageSize` 属性自定义图片大小，单位为 px。

```vue
<template>
  <up-empty imageSize="120" description="自定义图片大小" />
</template>
```

## Props

| 参数         | 说明                                         | 类型                                         | 默认值    |
| ------------ | -------------------------------------------- | -------------------------------------------- | --------- |
| image        | 图片类型，可选值为 `empty`、`error`、`network`，或图片 URL | string                                       | 'empty'   |
| imageSize    | 图片大小，单位为 px                           | number \| string                             | -         |
| description  | 图片下方的描述文字                            | string                                       | -         |
| customStyle  | 自定义样式                                   | object \| string                             | -         |

## 插槽

| 名称         | 说明             |
| ------------ | ---------------- |
| image        | 自定义图片内容   |
| description  | 自定义描述内容   |
| default      | 图片下方自定义内容 |
