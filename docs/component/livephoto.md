# LivePhoto 实况照片

基于 video 和 image 实现的实况照片组件，支持长按播放视频、自定义样式、事件监听等功能。用户可以通过长按图片来播放对应的视频内容，模拟 iOS Live Photo 的效果。

## 基本用法

基础用法需要提供视频源和静态图片源。

```vue
<up-live-photo
  video-src="https://sample-videos.com/zip/10/mp4/SampleVideo_360x240_1mb.mp4"
  image-src="https://picsum.photos/400/300?random=1"
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
  image-src="https://picsum.photos/400/300?random=1"
  width="300"
  height="200"
  :radius="20"
/>
```

## 不同尺寸

支持设置不同的宽度和高度。

```vue
<!-- 小尺寸 -->
<up-live-photo
  video-src="https://sample-videos.com/zip/10/mp4/SampleVideo_360x240_1mb.mp4"
  image-src="https://picsum.photos/400/300?random=1"
  width="120"
  height="80"
  radius="8"
/>

<!-- 中尺寸 -->
<up-live-photo
  video-src="https://sample-videos.com/zip/10/mp4/SampleVideo_360x240_1mb.mp4"
  image-src="https://picsum.photos/400/300?random=1"
  width="180"
  height="120"
  radius="12"
/>

<!-- 大尺寸 -->
<up-live-photo
  video-src="https://sample-videos.com/zip/10/mp4/SampleVideo_360x240_1mb.mp4"
  image-src="https://picsum.photos/400/300?random=1"
  width="240"
  height="160"
  radius="16"
/>
```

## 自定义提示文本

通过 `hint-text` 属性设置自定义的长按提示文本。

```vue
<up-live-photo
  video-src="https://sample-videos.com/zip/10/mp4/SampleVideo_360x240_1mb.mp4"
  image-src="https://picsum.photos/400/300?random=1"
  width="300"
  height="200"
  radius="12"
  hint-text="按住播放动态效果"
/>
```

## 隐藏指示器和提示

通过 `show-indicator` 和 `show-hint` 属性控制指示器和提示的显示。

```vue
<up-live-photo
  video-src="https://sample-videos.com/zip/10/mp4/SampleVideo_360x240_1mb.mp4"
  image-src="https://picsum.photos/400/300?random=1"
  width="300"
  height="200"
  radius="12"
  :show-indicator="false"
  :show-hint="false"
/>
```

## 事件监听

支持监听长按开始/结束、视频播放/暂停等事件。

```vue
<up-live-photo
  video-src="https://sample-videos.com/zip/10/mp4/SampleVideo_360x240_1mb.mp4"
  image-src="https://picsum.photos/400/300?random=1"
  width="300"
  height="200"
  radius="12"
  @press-start="onPressStart"
  @press-end="onPressEnd"
  @video-play="onVideoPlay"
  @video-pause="onVideoPause"
/>
```

## 组件方法

可以通过组件实例调用相关方法。

```vue
<template>
  <up-live-photo
    ref="livePhotoRef"
    video-src="https://sample-videos.com/zip/10/mp4/SampleVideo_360x240_1mb.mp4"
    image-src="https://picsum.photos/400/300?random=1"
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
| image-src         | 静态图片源地址           | string            | -                | -      |
| width             | 组件宽度                 | number \| string  | '100%'           | -      |
| height            | 组件高度                 | number \| string  | '100%'           | -      |
| radius            | 圆角大小                 | number \| string  | 0                | -      |
| custom-style      | 自定义样式               | string            | ''               | -      |
| custom-class      | 自定义类名               | string            | ''               | -      |
| mode              | 图片填充模式             | string            | 'aspectFill'     | -      |
| show-indicator    | 是否显示Live Photo指示器 | boolean           | true             | -      |
| show-hint         | 是否显示长按提示         | boolean           | true             | -      |
| hint-text         | 提示文本                 | string            | '长按查看实况'    | -      |
| enable-vibration  | 是否启用振动反馈         | boolean           | true             | -      |
| muted             | 是否静音播放             | boolean           | true             | -      |

## Events

| 事件名       | 说明           | 回调参数 |
|-------------|----------------|----------|
| video-play  | 视频开始播放   | -        |
| video-pause | 视频暂停播放   | -        |
| press-start | 开始长按       | -        |
| press-end   | 结束长按       | -        |
| video-ended | 视频播放结束   | -        |
| image-load  | 图片加载成功   | -        |
| image-error | 图片加载失败   | -        |

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
