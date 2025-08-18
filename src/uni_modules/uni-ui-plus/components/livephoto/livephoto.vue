<script setup lang="ts">
import { computed, getCurrentInstance, nextTick, onUnmounted, ref } from 'vue'
import { addUnit, isDef, objToStyle } from '../_utils'
import UpImage from '../image/image.vue'
import type { LivePhotoEmits, LivePhotoProps } from './livephoto'
import { livePhotoProps } from './livephoto'

// Props 定义
const props = defineProps(livePhotoProps)

// Emits 定义
const emit = defineEmits<LivePhotoEmits>()

// 生成唯一的组件实例ID
const componentId = ref(Math.random().toString(36).substring(2, 15))

// 状态管理
const isPressed = ref(false)
const isVideoPlaying = ref(false)
const isTransitioning = ref(false)

const instance = getCurrentInstance()

// 计算传递给 up-image 的 props
const imageProps = computed(() => {
  const {
    videoSrc,
    showIndicator,
    showHint,
    hintText,
    enableVibration,
    muted,
    ...restProps
  } = props
  
  return {
    ...restProps,
    // 覆盖一些默认值以适应 LivePhoto 的需求
    src: props.src, // 使用 src 而不是 imageSrc
    enablePreview: false // LivePhoto 不应该启用预览
  }
})

// 计算样式
const containerStyle = computed(() => {
  const styles: Record<string, any> = {}

  if (isDef(props.width)) {
    styles.width = addUnit(props.width)
  }

  if (isDef(props.height)) {
    styles.height = addUnit(props.height)
  }

  if (props.radius) {
    styles.borderRadius = addUnit(props.radius)
    styles.overflow = 'hidden'
  }

  return `${objToStyle(styles)}${props.customStyle}`
})

// 计算根样式类
const rootClass = computed(() => {
  return `up-live-photo ${props.customClass}`
})

// 获取视频上下文
function getVideoContext() {
  const videoId = `live-photo-video-${componentId.value}`
  return uni.createVideoContext(videoId, instance)
}

// 长按开始 - 播放视频
function onLongPressStart() {
  if (isPressed.value) return

  isPressed.value = true
  isTransitioning.value = true

  // 添加振动反馈
  if (props.enableVibration) {
    try {
      uni.vibrateShort({
        type: 'light'
      })
    } catch (error) {
      console.log('振动反馈不可用:', error)
    }
  }

  nextTick(() => {
    const videoCtx = getVideoContext()
    if (videoCtx) {
      videoCtx.play()
      // 给视频一些时间准备播放，然后开始过渡
      setTimeout(() => {
        isVideoPlaying.value = true
        // 过渡完成后重置状态
        setTimeout(() => {
          isTransitioning.value = false
        }, 300) // 与 CSS 过渡时间一致
      }, 50)
    }
  })

  emit('press-start')
  emit('video-play')
}

// 长按结束 - 暂停视频，显示图片
function onLongPressEnd() {
  if (!isPressed.value) return

  isPressed.value = false
  isTransitioning.value = true

  // 先开始过渡，然后暂停视频
  setTimeout(() => {
    isVideoPlaying.value = false
    const videoCtx = getVideoContext()
    if (videoCtx) {
      videoCtx.pause()
      // 重置到开始位置
      videoCtx.seek(0)
    }
    // 过渡完成后重置状态
    setTimeout(() => {
      isTransitioning.value = false
    }, 300) // 与 CSS 过渡时间一致
  }, 50)

  emit('press-end')
  emit('video-pause')
}

// 视频播放事件
function onVideoPlay() {
  isVideoPlaying.value = true
  emit('video-play')
}

// 视频暂停事件
function onVideoPause() {
  isVideoPlaying.value = false
  emit('video-pause')
}

// 视频结束事件 - 自动重新开始播放（如果还在长按中）
function onVideoEnded() {
  if (isPressed.value) {
    // 如果还在长按，重新播放
    const videoCtx = getVideoContext()
    if (videoCtx) {
      videoCtx.seek(0)
      videoCtx.play()
    }
  } else {
    isVideoPlaying.value = false
  }
  emit('video-ended')
}
const imageLoaded = ref(false);
// 图片加载成功
function onImageLoad() {
  imageLoaded.value = true
  imageError.value = false
  emit('image-load')
}

// 图片加载失败
function onImageError() {
  imageError.value = true
  imageLoaded.value = false
  emit('image-error')
}

// 获取图片源
function getDisplayImageSrc() {
  return props.imageSrc
}

// 获取视频封面
function getVideoPoster() {
  return props.imageSrc
}

// 暴露给父组件的方法
defineExpose({
  stopVideo: onLongPressEnd,
  isPlaying: () => isVideoPlaying.value,
  reset: () => {
    onLongPressEnd()
    imageLoaded.value = false
    imageError.value = false
  }
})

// 组件卸载时清理
onUnmounted(() => {
  onLongPressEnd()
})
</script>

<script lang="ts">
import { PREFIX } from '../_constants'

const componentName = `${PREFIX}-live-photo`
export default {
  name: componentName,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    // #ifndef H5
    styleIsolation: 'shared'
    // #endif
  }
}
</script>

<template>
  <view :class="rootClass" :style="containerStyle">
    <!-- 静态图片层 - 默认显示 -->
    <view
      class="up-live-photo__image-layer"
      :class="{
        'up-live-photo__image-layer--hidden': isPressed && isVideoPlaying,
        'up-live-photo__image-layer--transitioning': isTransitioning
      }"
    >
      <image :src="getDisplayImageSrc()" :mode="mode" class="up-live-photo__image" @load="onImageLoad" @error="onImageError" />

      <!-- 加载中状态 -->
      <view v-if="!imageLoaded && !imageError" class="up-live-photo__loading">
        <view class="up-live-photo__loading-bg" />
      </view>
    </view>

    <!-- 视频层 - 长按时显示 -->
    <view
      class="up-live-photo__video-layer"
      :class="{
        'up-live-photo__video-layer--visible': isPressed && isVideoPlaying,
        'up-live-photo__video-layer--transitioning': isTransitioning
      }"
    >
      <video
        :id="`live-photo-video-${componentId}`"
        :src="videoSrc"
        class="up-live-photo__video"
        :controls="false"
        :show-play-btn="false"
        :show-fullscreen-btn="false"
        :show-progress="false"
        :show-center-play-btn="false"
        :show-loading="false"
        :muted="muted"
        :poster="getVideoPoster()"
        object-fit="cover"
        @play="onVideoPlay"
        @pause="onVideoPause"
        @ended="onVideoEnded"
      />
    </view>

    <!-- 交互层 - 处理长按事件 -->
    <view
      class="up-live-photo__interaction"
      :class="{ 'up-live-photo__interaction--pressing': isPressed }"
      @touchstart="onLongPressStart"
      @touchend="onLongPressEnd"
      @touchcancel="onLongPressEnd"
    >
      <!-- Live Photo 指示器 -->
      <view v-if="showIndicator" class="up-live-photo__indicator" :class="{ 'up-live-photo__indicator--active': isPressed }">
        <view class="up-live-photo__indicator-icon">
          <text class="up-live-photo__indicator-text">LIVE</text>
        </view>
      </view>

      <!-- 长按提示 -->
      <view v-if="showHint && !isPressed" class="up-live-photo__hint" :class="{ 'up-live-photo__hint--hiding': isTransitioning }">
        <text class="up-live-photo__hint-text">{{ hintText }}</text>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
