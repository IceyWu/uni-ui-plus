# Img 图片

增强版的 img 标签，提供多种图片填充模式，支持图片懒加载、加载完成、加载失败。

## 基本用法

基础用法与原生 image 标签一致，可以设置 `src` 、 `width` 、`height` 等原生属性。

原生属性，参考[uni-app image 官方文档](https://uniapp.dcloud.net.cn/component/image.html#image)。

## 插槽

使用`loading` `error`插槽设置在图片加载时、加载失败后的展示内容

```vue
<template>
  <up-image :width="100" :height="100" src="https://www.123.com/a.jpg">
    <template #error>
      <view class="error-wrap">加载失败</view>
    </template>
    <template #loading>
      <view class="loading-wrap">
        <wd-loading />
      </view>
    </template>
  </up-image>
</template>

<style>
.error-wrap {
  width: 100%;
  height: 100%;
  background-color: red;
  color: white;
  line-height: 100px;
  text-align: center;
}

.loading-wrap {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
```

## 填充模式

通过 `mode` 属性可以设置图片填充模式，可选值见下方表格。

mode 为小程序原生属性，参考[微信小程序 image 官方文档](https://developers.weixin.qq.com/miniprogram/dev/component/image.html)。

```html
<up-image :width="100" :height="100" mode="center" :src="joy" />
```

## 圆形设置

通过 `round` 属性可以设置以圆形展示。

```html
<up-image :width="100" :height="100" round :src="joy" />
```

## 预加载占位图

通过 `placeholder-src` 属性可以设置以圆形展示。

```html
<up-image
  src="http://nest-js.oss-accelerate.aliyuncs.com/nestTest/1/1746282136181.JPG"
  placeholder-src="http://nest-js.oss-accelerate.aliyuncs.com/nestTest/1/1746282136181.JPG?x-oss-process=image/resize,l_100"
  width="120"
  height="120"
/>
```

## 可预览

通过设置`enable-preview`属性可以支持点击预览，底层调用 uni.previewImage 来实现预览效果

```html
<up-image :width="100" :height="100" :src="joy" :enable-preview="true" />
```

也可以传入 `preview-src` 属性来预览另外的图片

```html
<up-image :width="100" :height="100" :src="joy" :preview-src="img" :enable-preview="true" />
```

## Attributes

| 参数                   | 说明                                               | 类型            | 可选值                                                                                                                                                                             | 默认值        | 最低版本 |
| ---------------------- | -------------------------------------------------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- | -------- |
| src                    | 图片链接                                           | string          | -                                                                                                                                                                                  | -             | -        |
| width                  | 宽度，默认单位为 px                                | number / string | -                                                                                                                                                                                  | -             | -        |
| height                 | 高度，默认单位为 px                                | number / string | -                                                                                                                                                                                  | -             | -        |
| mode                   | 填充模式                                           | ImageMode       | 'top left' / 'top right' / 'bottom left' / 'bottom right' / 'right' / 'left' / 'center' / 'bottom' / 'top' / 'heightFix' / 'widthFix' / 'aspectFill' / 'aspectFit' / 'scaleToFill' | 'scaleToFill' | -        |
| round                  | 是否显示为圆形                                     | boolean         | -                                                                                                                                                                                  | false         | -        |
| radius                 | 圆角大小，默认单位为 px                            | number / string | -                                                                                                                                                                                  | -             | -        |
| enable-preview         | 是否支持点击预览                                   | boolean         | -                                                                                                                                                                                  | false         | 1.2.11   |
| show-menu-by-longpress | 开启长按图片显示识别小程序码菜单，仅微信小程序支持 | boolean         | -                                                                                                                                                                                  | false         | 1.3.11   |
| preview-src            | 预览图片链接                                       | string          | -                                                                                                                                                                                  | -             | 1.8.0    |

## Events

| 事件名称 | 说明                 | 参数                        | 最低版本 |
| -------- | -------------------- | --------------------------- | -------- |
| click    | 点击事件             | (event: MouseEvent) => void | -        |
| load     | 当图片载入完毕时触发 | `{height, width}`           | -        |
| error    | 当错误发生时触发     | `{errMsg}`                  | -        |

## Slots

| 名称    | 说明               | 最低版本 |
| ------- | ------------------ | -------- |
| loading | 图片加载时展示     | 1.2.21   |
| error   | 图片加载失败后展示 | 1.2.21   |

## 外部样式类

| 类名         | 说明                 | 最低版本 |
| ------------ | -------------------- | -------- |
| custom-class | 根节点样式           | -        |
| custom-image | image 外部自定义样式 | -        |
