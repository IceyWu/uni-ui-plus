<script setup lang="ts">
import { computed, getCurrentInstance, nextTick, onUnmounted, ref, watch } from 'vue'
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
const videoLoadProgress = ref(0)
const isVideoLoaded = ref(false)
const isVideoLoading = ref(false)

const instance = getCurrentInstance()

// 计算传递给 up-image 的 props
const imageProps = computed(() => {
  const {
    videoSrc,
    showIndicator,
    autoplay,
    enableVibration,
    muted,
    // 排除样式相关的 props，这些由 LivePhoto 组件自己控制
    width,
    height,
    radius,
    customStyle,
    customClass,
    ...restProps
  } = props

  return {
    ...restProps,
    // 强制图片填充容器
    width: '100%',
    height: '100%',
    radius: 0, // 圆角由容器控制
    customStyle: '',
    customClass: ''
  }
})

// 计算容器样式
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

// 计算圆点位置
function getDotPosition(index: number) {
  const angle = (index * 30 - 90) * (Math.PI / 180) // 从顶部开始，转换为弧度
  const radius = 20 // 圆点到中心的距离
  const centerX = 24 // 容器中心 X (48/2)
  const centerY = 24 // 容器中心 Y (48/2)

  const x = centerX + radius * Math.cos(angle)
  const y = centerY + radius * Math.sin(angle)

  return {
    left: `${x - 2.5}rpx`, // 减去圆点半径（5rpx/2）
    top: `${y - 2.5}rpx` // 减去圆点半径（5rpx/2）
  }
}

// 监听视频源变化，重置加载状态
watch(
  () => props.videoSrc,
  () => {
    isVideoLoaded.value = false
    isVideoLoading.value = false
    videoLoadProgress.value = 0
  }
)

// 监听自动播放属性 - 只在组件初始化时触发
watch(
  () => props.autoplay,
  (newAutoplay) => {
    if (newAutoplay && !isVideoLoaded.value && !isVideoLoading.value && !isPressed.value) {
      // 只在没有用户交互的情况下自动播放
      startVideoLoad()
      nextTick(() => {
        const videoCtx = getVideoContext()
        if (videoCtx) {
          videoCtx.play()
          isVideoPlaying.value = true
        }
      })
    } else if (!newAutoplay && isVideoPlaying.value && !isPressed.value) {
      // 只在没有用户长按的情况下停止自动播放
      const videoCtx = getVideoContext()
      if (videoCtx) {
        videoCtx.pause()
        videoCtx.seek(0)
        isVideoPlaying.value = false
      }
    }
  },
  { immediate: true }
)

// 获取视频上下文
function getVideoContext() {
  const videoId = `live-photo-video-${componentId.value}`
  return uni.createVideoContext(videoId, instance)
}

// 开始视频加载
function startVideoLoad() {
  if (isVideoLoading.value || isVideoLoaded.value) return

  isVideoLoading.value = true
  videoLoadProgress.value = 0

  // 模拟进度增长，直到视频真正加载完成
  const progressTimer = setInterval(() => {
    if (isVideoLoaded.value) {
      clearInterval(progressTimer)
      return
    }

    if (videoLoadProgress.value < 90) {
      videoLoadProgress.value += Math.random() * 10 + 5
    }
  }, 200)

  // 防止无限等待，5秒后强制完成
  setTimeout(() => {
    clearInterval(progressTimer)
    if (!isVideoLoaded.value) {
      isVideoLoaded.value = true
      isVideoLoading.value = false
      videoLoadProgress.value = 100
    }
  }, 5000)
}

// 视频加载完成
function onVideoLoadedData() {
  isVideoLoaded.value = true
  isVideoLoading.value = false
  videoLoadProgress.value = 100
  emit('video-loaded')
}

// 视频加载错误
function onVideoError() {
  isVideoLoading.value = false
  isVideoLoaded.value = false
  videoLoadProgress.value = 0
  console.warn('视频加载失败')
}

// 视频加载进度 - 简化处理
function onVideoProgress(e: any) {
  // uni-app 的视频进度事件可能数据结构不同，暂时依赖模拟进度
  if (isVideoLoading.value && e.detail) {
    console.log('视频进度事件:', e.detail)
  }
} // 长按开始 - 播放视频
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

  // 长按时才开始加载视频（如果还未加载）
  if (!isVideoLoaded.value) {
    startVideoLoad()
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

// 视频结束事件
function onVideoEnded() {
  if (isPressed.value) {
    // 如果还在长按，重新播放
    const videoCtx = getVideoContext()
    if (videoCtx) {
      videoCtx.seek(0)
      videoCtx.play()
    }
  } else if (props.autoplay) {
    // 自动播放模式下，视频结束后停止播放，但保持可交互状态
    isVideoPlaying.value = false
  } else {
    // 手动模式下，视频结束后停止播放
    isVideoPlaying.value = false
  }
  emit('video-ended')
}

// 图片加载成功 - 转发给父组件
function onImageLoad(event: any) {
  emit('load', event)
}

// 图片加载失败 - 转发给父组件
function onImageError(event: any) {
  emit('error', event)
}

// 图片点击事件 - 转发给父组件
function onImageClick(event: any) {
  emit('click', event)
}

// 获取视频封面
function getVideoPoster() {
  return props.src
}

// 暴露给父组件的方法
defineExpose({
  stopVideo: onLongPressEnd,
  isPlaying: () => isVideoPlaying.value,
  reset: () => {
    onLongPressEnd()
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
    <!-- 静态图片层 - 默认显示，使用 up-image 组件 -->
    <view
      class="up-live-photo__image-layer"
      :class="{
        'up-live-photo__image-layer--hidden': isPressed && isVideoPlaying,
        'up-live-photo__image-layer--transitioning': isTransitioning
      }"
    >
      <up-image
        :src="imageProps.src"
        :mode="imageProps.mode"
        :width="imageProps.width"
        :height="imageProps.height"
        :radius="imageProps.radius"
        :round="imageProps.round"
        :lazy-load="imageProps.lazyLoad"
        :enable-preview="imageProps.enablePreview"
        :preview-src="imageProps.previewSrc"
        :placeholder-src="imageProps.placeholderSrc"
        :filter="imageProps.filter"
        :delay="imageProps.delay"
        :min-height="imageProps.minHeight"
        :custom-style="imageProps.customStyle"
        :custom-class="imageProps.customClass"
        class="up-live-photo__image"
        @load="onImageLoad"
        @error="onImageError"
        @click="onImageClick"
      >
        <!-- 转发所有插槽 -->
        <template #loading>
          <slot name="loading">
            <view class="up-live-photo__loading">
              <view class="up-live-photo__loading-bg" />
            </view>
          </slot>
        </template>
        <template #error>
          <slot name="error"></slot>
        </template>
      </up-image>
    </view>

    <!-- 视频层 - 长按时显示或自动播放时显示 -->
    <view
      class="up-live-photo__video-layer"
      :class="{
        'up-live-photo__video-layer--visible': (isPressed && isVideoPlaying) || (autoplay && isVideoPlaying),
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
        @loadeddata="onVideoLoadedData"
        @error="onVideoError"
        @progress="onVideoProgress"
        @timeupdate="onVideoProgress"
      />
    </view>

    <!-- Live Photo 指示器 - 独立于交互层，避免动画影响 -->
    <view v-if="showIndicator" class="up-live-photo__indicator" :class="{ 'up-live-photo__indicator--active': isPressed }">
      <view class="up-live-photo__indicator-icon">
        <!-- 纯 CSS 图标 - 兼容所有平台 -->
        <view class="up-live-photo__indicator-css">
          <!-- 中心圆点 -->
          <view class="up-live-photo__indicator-center"></view>
          <!-- 内圆环 -->
          <view class="up-live-photo__indicator-inner-ring"></view>
          <!-- 外围进度圆点 -->
          <view class="up-live-photo__indicator-dots">
            <view
              v-for="(dot, index) in 12"
              :key="index"
              class="up-live-photo__indicator-progress-dot"
              :class="{ 'up-live-photo__indicator-progress-dot--active': (isVideoLoading && index / 12 <= videoLoadProgress / 100) || isVideoLoaded }"
              :style="getDotPosition(index)"
            ></view>
          </view>
        </view>
        <!-- LIVE 文字 -->
        <text class="up-live-photo__indicator-text">LIVE</text>
      </view>
    </view>

    <!-- 交互层 - 处理长按事件 -->
    <view
      class="up-live-photo__interaction"
      :class="{ 'up-live-photo__interaction--pressing': isPressed }"
      @touchstart="onLongPressStart"
      @touchend="onLongPressEnd"
      @touchcancel="onLongPressEnd"
    />
  </view>
</template>

<style lang="scss" scoped>
@use './index' as *;
</style>
