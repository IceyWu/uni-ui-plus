# LivePhoto 实况照片

基于 video 和 image 实现的实况照片组件，支持长按播放视频、自动播放、自定义样式、事件监听等功能。用户可以通过长按图片来播放对应的视频内容，模拟 iOS Live Photo 的效果。

## 基本用法

基础用法需要提供视频源和静态图片源。

```vue
<up-live-photo
  video-src="https://sample-videos.com/zip/10/mp4/SampleVideo_360x240_1mb.mp4"
  src="https://picsum.photos/400/300?random=1"
  width="300"
  height="200"
  radius="12"
/>
```

## 自定义圆角

通过 `radius` 属性设置自定义圆角大小。

```vue
<up-live-photo
  video-src="https://sample-videos.com/zip/10/mp4/SampleVideo_360x240_1mb.mp4"
  src="https://picsum.photos/400/300?random=1"
  width="300"
  height="200"
  :radius="20"
/>
```

## 自动播放

通过 `autoplay` 属性启用自动播放模式，视频会自动开始播放，播放结束后仍可手动交互。

```vue
<up-live-photo
  video-src="https://sample-videos.com/zip/10/mp4/SampleVideo_360x240_1mb.mp4"
  src="https://picsum.photos/400/300?random=1"
  width="300"
  height="200"
  radius="12"
  :autoplay="true"
/>
```

## 隐藏指示器

通过 `show-indicator` 属性控制指示器的显示。

```vue
<up-live-photo
  video-src="https://sample-videos.com/zip/10/mp4/SampleVideo_360x240_1mb.mp4"
  src="https://picsum.photos/400/300?random=1"
  width="300"
  height="200"
  radius="12"
  :show-indicator="false"
/>
```

## 展示模式

通过 `display-only` 属性启用展示模式，只显示图片和指示器，不支持视频交互。

```vue
<up-live-photo
  video-src="https://sample-videos.com/zip/10/mp4/SampleVideo_360x240_1mb.mp4"
  src="https://picsum.photos/400/300?random=1"
  width="300"
  height="200"
  radius="12"
  :display-only="true"
/>
```

## 自定义指示器位置

通过 `indicator-left` 和 `indicator-top` 属性自定义指示器的位置。

```vue
<up-live-photo
  video-src="https://sample-videos.com/zip/10/mp4/SampleVideo_360x240_1mb.mp4"
  src="https://picsum.photos/400/300?random=1"
  width="300"
  height="200"
  radius="12"
  indicator-left="50"
  indicator-top="30"
/>
```

## 自定义图片插槽

使用 `image` 插槽自定义图片内容，可以添加覆盖层、特效等自定义元素。

```vue
<up-live-photo
  video-src="https://sample-videos.com/zip/10/mp4/SampleVideo_360x240_1mb.mp4"
  src="https://picsum.photos/400/300?random=1"
  width="300"
  height="200"
  radius="12"
>
  <template #image="{ src }">
    <view class="custom-image-container">
      <image :src="src" mode="aspectFill" class="custom-image" />
      <view class="custom-overlay">
        <text>自定义覆盖内容</text>
      </view>
    </view>
  </template>
</up-live-photo>
```

## 事件监听

支持监听长按开始/结束、视频播放/暂停等事件。

```vue
<up-live-photo
  video-src="https://sample-videos.com/zip/10/mp4/SampleVideo_360x240_1mb.mp4"
  src="https://picsum.photos/400/300?random=1"
  width="300"
  height="200"
  radius="12"
  @press-start="onPressStart"
  @press-end="onPressEnd"
  @video-play="onVideoPlay"
  @video-pause="onVideoPause"
  @video-loaded="onVideoLoaded"
  @video-progress="onVideoProgress"
/>
```

## 组件方法

可以通过组件实例调用相关方法。

```vue
<template>
  <up-live-photo
    ref="livePhotoRef"
    video-src="https://sample-videos.com/zip/10/mp4/SampleVideo_360x240_1mb.mp4"
    src="https://picsum.photos/400/300?random=1"
    width="300"
    height="200"
    radius="12"
  />
  <button @click="stopVideo">停止播放</button>
  <button @click="checkIsPlaying">检查播放状态</button>
  <button @click="resetComponent">重置组件</button>
</template>

<script setup>
import { ref } from 'vue'

const livePhotoRef = ref()

function stopVideo() {
  livePhotoRef.value.stopVideo()
}

function checkIsPlaying() {
  const isPlaying = livePhotoRef.value.isPlaying()
  console.log('播放状态:', isPlaying)
}

function resetComponent() {
  livePhotoRef.value.reset()
}
</script>
```

## Attributes

> **注意**：LivePhoto 组件继承了 Image 组件的所有属性，因此支持 Image 组件的所有配置选项。

### LivePhoto 特有属性

| 参数              | 说明                     | 类型               | 默认值           | 可选值 |
|-------------------|--------------------------|-------------------|------------------|--------|
| video-src         | 视频源地址（必填）       | string            | -                | -      |
| show-indicator    | 是否显示Live Photo指示器 | boolean           | true             | -      |
| autoplay          | 是否自动播放             | boolean           | false            | -      |
| enable-vibration  | 是否启用振动反馈         | boolean           | true             | -      |
| muted             | 是否静音播放             | boolean           | true             | -      |
| display-only      | 是否仅展示模式           | boolean           | false            | -      |
| indicator-left    | 指示器距左边距离         | string \| number  | '20rpx'          | -      |
| indicator-top     | 指示器距顶部距离         | string \| number  | '20rpx'          | -      |
| long-press-delay  | 长按触发延迟时间（ms），用于区分短按（点击）与长按 | number | 150 | -      |

### 继承自 Image 组件的属性

| 参数              | 说明                     | 类型               | 默认值           | 可选值 |
|-------------------|--------------------------|-------------------|------------------|--------|
| src               | 静态图片源地址（必填）   | string            | -                | -      |
| width             | 组件宽度                 | number \| string  | -                | -      |
| height            | 组件高度                 | number \| string  | -                | -      |
| mode              | 图片填充模式             | ImageMode         | 'scaleToFill'    | 见 Image 组件 |
| radius            | 圆角大小                 | number \| string  | 0                | -      |
| round             | 是否为圆形               | boolean           | false            | -      |
| delay             | 加载延迟时间（ms）       | number            | 0                | -      |
| min-height        | 最小高度                 | number \| string  | '200rpx'         | -      |
| lazy-load         | 是否懒加载图片           | boolean           | true             | -      |
| placeholder-src   | 占位图片地址             | string            | ''               | -      |
| filter            | 图片滤镜模糊值           | number \| string  | ''               | -      |
| enable-preview    | 是否启用图片预览（LivePhoto 默认禁用） | boolean | false | -      |
| preview-src       | 预览图片地址             | string            | ''               | -      |
| custom-style      | 自定义样式               | string            | ''               | -      |
| custom-class      | 自定义类名               | string            | ''               | -      |

> 更多 Image 组件属性请参考 [Image 组件文档](./img.md)

## Slots

| 插槽名 | 说明           | 参数                          |
|--------|----------------|-------------------------------|
| image  | 自定义图片内容 | `{ src: string, imageProps: object }` |
| loading| 自定义加载状态 | -                             |
| error  | 自定义错误状态 | -                             |

## Events

| 事件名          | 说明           | 回调参数           |
|----------------|----------------|-------------------|
| video-play     | 视频开始播放   | -                 |
| video-pause    | 视频暂停播放   | -                 |
| press-start    | 开始长按       | -                 |
| press-end      | 结束长按       | -                 |
| video-ended    | 视频播放结束   | -                 |
| video-loaded   | 视频加载完成   | -                 |
| video-progress | 视频加载进度   | progress: number  |
| load           | 图片加载成功   | event             |
| error          | 图片加载失败   | event             |
| click          | 图片点击事件   | event             |

## Methods

| 方法名      | 说明           | 参数 | 返回值  |
|------------|----------------|------|---------|
| stopVideo  | 停止视频播放   | -    | -       |
| isPlaying  | 是否正在播放   | -    | boolean |
| reset      | 重置组件状态   | -    | -       |

## 注意事项

1. 组件需要同时提供 `video-src` 和 `image-src` 属性
2. 视频建议使用较短的循环视频，以获得更好的 Live Photo 效果
3. 在小程序平台，视频播放可能受到平台限制
4. 建议为视频和图片提供相同的宽高比，以保证显示效果
5. 组件支持振动反馈，但在某些平台可能不可用

## 外部样式类

| 类名         | 说明       |
| ------------ | ---------- |
| custom-class | 根节点样式 |

## 示例

更多用法请参考 `src/subPages/livephoto/Index.vue` 示例页面。
