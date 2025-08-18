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

## Props

| 参数              | 说明                     | 类型               | 默认值           | 可选值 |
|-------------------|--------------------------|-------------------|------------------|--------|
| video-src         | 视频源地址               | string            | -                | -      |
| src               | 静态图片源地址           | string            | -                | -      |
| width             | 组件宽度                 | number \| string  | '100%'           | -      |
| height            | 组件高度                 | number \| string  | '100%'           | -      |
| radius            | 圆角大小                 | number \| string  | 0                | -      |
| custom-style      | 自定义样式               | string            | ''               | -      |
| custom-class      | 自定义类名               | string            | ''               | -      |
| mode              | 图片填充模式             | string            | 'scaleToFill'    | -      |
| show-indicator    | 是否显示Live Photo指示器 | boolean           | true             | -      |
| autoplay          | 是否自动播放             | boolean           | false            | -      |
| enable-vibration  | 是否启用振动反馈         | boolean           | true             | -      |
| muted             | 是否静音播放             | boolean           | true             | -      |
| lazy-load         | 是否懒加载图片           | boolean           | true             | -      |
| enable-preview    | 是否启用图片预览         | boolean           | false            | -      |
| preview-src       | 预览图片地址             | string            | ''               | -      |
| placeholder-src   | 占位图片地址             | string            | ''               | -      |
| filter            | 图片滤镜                 | number \| string  | ''               | -      |
| delay             | 加载延迟时间             | number            | 0                | -      |
| min-height        | 最小高度                 | number \| string  | '200rpx'         | -      |
| round             | 是否为圆形               | boolean           | false            | -      |

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
