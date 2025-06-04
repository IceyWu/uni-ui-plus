# Img 图片

增强版的 img 标签，支持多种图片填充模式、懒加载、加载占位、自定义加载/失败内容、圆角/圆形、滤镜、图片预览等功能。

## 基本用法

基础用法与原生 image 标签一致，可以设置 `src` 、 `width` 、`height` 等原生属性。

```vue
<up-image
  src="https://oss-console-img-demo-cn-hangzhou-3az.oss-cn-hangzhou.aliyuncs.com/example1.jpg"
  width="120"
  height="120"
/>
```

## 延时加载

通过 `delay` 属性设置图片加载延迟（单位 ms）。

```vue
<up-image
  src="https://oss-console-img-demo-cn-hangzhou-3az.oss-cn-hangzhou.aliyuncs.com/example1.jpg"
  width="120"
  height="120"
  :delay="2000"
/>
```

## 预加载占位图

通过 `placeholder-src` 属性设置加载中的占位图片。

```vue
<up-image
  src="https://oss-console-img-demo-cn-hangzhou-3az.oss-cn-hangzhou.aliyuncs.com/example1.jpg"
  placeholder-src="https://oss-console-img-demo-cn-hangzhou-3az.oss-cn-hangzhou.aliyuncs.com/example1.jpg?x-oss-process=image/resize,p_50"
  width="120"
  height="120"
  :delay="2000"
/>
```

## 图片加载滤镜

通过 `filter` 属性设置加载过程中的图片模糊效果。

```vue
<up-image
  src="https://oss-console-img-demo-cn-hangzhou-3az.oss-cn-hangzhou.aliyuncs.com/example1.jpg"
  placeholder-src="https://oss-console-img-demo-cn-hangzhou-3az.oss-cn-hangzhou.aliyuncs.com/example1.jpg?x-oss-process=image/resize,p_50"
  width="120"
  height="120"
  :delay="40000"
  :filter="30"
/>
```

## 自定义圆角

通过 `radius` 属性自定义圆角大小，或通过 `round` 属性设置为圆形。

```vue
<up-image
  src="https://oss-console-img-demo-cn-hangzhou-3az.oss-cn-hangzhou.aliyuncs.com/example1.jpg"
  width="120"
  height="120"
  :radius="8"
/>
<up-image
  src="https://oss-console-img-demo-cn-hangzhou-3az.oss-cn-hangzhou.aliyuncs.com/example1.jpg"
  width="100"
  height="100"
  round
/>
```

## 填充模式

通过 `mode` 属性设置图片填充方式，支持多种小程序原生模式。

```vue
<up-image
  src="https://oss-console-img-demo-cn-hangzhou-3az.oss-cn-hangzhou.aliyuncs.com/example1.jpg"
  width="120"
  height="120"
  mode="center"
/>
```

可选值：`scaleToFill`、`aspectFit`、`aspectFill`、`heightFix`、`widthFix`、`top left`、`top right`、`bottom left`、`bottom right`、`right`、`left`、`center`、`bottom`、`top`。

## 懒加载

通过 `lazy-load` 属性开启图片懒加载（默认开启）。

```vue
<up-image
  src="https://oss-console-img-demo-cn-hangzhou-3az.oss-cn-hangzhou.aliyuncs.com/example1.jpg"
  width="120"
  height="120"
  :lazy-load="true"
/>
```

## 图片预览

通过 `enable-preview` 属性支持点击图片预览，底层调用 `uni.previewImage`。

```vue
<up-image
  src="https://oss-console-img-demo-cn-hangzhou-3az.oss-cn-hangzhou.aliyuncs.com/example1.jpg"
  width="100"
  height="100"
  :enable-preview="true"
/>
```

可通过 `preview-src` 指定预览的图片地址。

```vue
<up-image
  src="https://oss-console-img-demo-cn-hangzhou-3az.oss-cn-hangzhou.aliyuncs.com/example1.jpg"
  preview-src="https://oss-console-img-demo-cn-hangzhou-3az.oss-cn-hangzhou.aliyuncs.com/example2.jpg"
  width="100"
  height="100"
  :enable-preview="true"
/>
```

## 自定义插槽

可通过 `loading` 和 `error` 插槽自定义加载中和加载失败时的内容。

```vue
<up-image :src="src" width="120" height="120" :delay="40000">
  <template #loading>
    <view class="custom-loading">加载中自定义</view>
  </template>
</up-image>

<up-image src="1" width="120" height="120" radius="8">
  <template #error>
    <view class="custom-error">加载异常自定义</view>
  </template>
</up-image>
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
| delay                  | 图片加载延迟，单位 ms                              | number          | -                                                                                                                                                                                  | 0             | -        |
| placeholder-src        | 加载中占位图片                                     | string          | -                                                                                                                                                                                  | -             | -        |
| filter                 | 加载中滤镜模糊值，单位 px                          | number / string | -                                                                                                                                                                                  | -             | -        |
| min-height             | 最小高度，默认 200rpx                              | number / string | -                                                                                                                                                                                  | 200rpx        | -        |
| lazy-load              | 是否开启懒加载                                     | boolean         | -                                                                                                                                                                                  | true          | -        |
| custom-style           | 自定义样式                                         | string          | -                                                                                                                                                                                  | ''            | -        |
| custom-class           | 根节点自定义类名                                   | string          | -                                                                                                                                                                                  | ''            | -        |
| enable-preview         | 是否支持点击预览                                   | boolean         | -                                                                                                                                                                                  | false         | 1.2.11   |
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