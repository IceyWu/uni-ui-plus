<script setup lang="ts">
  import { computed, getCurrentInstance, nextTick, onUnmounted, ref, watch } from 'vue'
  import { addUnit, isDef, objToStyle } from '../../common/util'
  import { t } from '../../locale'
  import UpImage from '../up-image/up-image.vue'
  import { indicatorBrightSvg, indicatorDimSvg, muteOffSvg, muteOnSvg } from './icons'
  import type { LivePhotoEmits } from './types'
  import { livePhotoProps } from './types'

  const props = defineProps(livePhotoProps)
  const emit = defineEmits<LivePhotoEmits>()

  // 唯一 ID（不会变化，无需响应式）
  const componentId = Math.random().toString(36).substring(2, 15)

  // 状态
  const isPressed = ref(false)
  const isVideoPlaying = ref(false)
  const isTransitioning = ref(false)
  const videoLoadProgress = ref(0)
  const isVideoLoaded = ref(false)
  const isVideoLoading = ref(false)
  const isMuted = ref(props.muted)
  // 标记组件是否已卸载，防止卸载后 setTimeout 回调操作已销毁的上下文
  let isUnmounted = false

  const instance = getCurrentInstance()

  // 定时器引用，统一管理生命周期
  let progressTimer: ReturnType<typeof setInterval> | null = null
  let progressTimeout: ReturnType<typeof setTimeout> | null = null
  let transitionTimer: ReturnType<typeof setTimeout> | null = null
  let pressTimer: ReturnType<typeof setTimeout> | null = null

  // 同步外部 muted prop
  watch(
    () => props.muted,
    (val) => {
      isMuted.value = val
    }
  )

  // 传递给 up-image 的 props（排除 livephoto 特有的）
  const imageProps = computed(() => {
    const {
      videoSrc,
      showIndicator,
      autoplay,
      enableVibration,
      muted,
      showMuteButton,
      displayOnly,
      indicatorLeft,
      indicatorTop,
      longPressDelay,
      width,
      height,
      radius,
      customStyle,
      customClass,
      ...restProps
    } = props
    return {
      ...restProps,
      width: '100%',
      height: '100%',
      radius: 0,
      customStyle: '',
      customClass: ''
    }
  })

  // 容器样式
  const containerStyle = computed(() => {
    const styles: Record<string, string> = {}
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

  const rootClass = computed(() => `up-live-photo ${props.customClass}`)

  // 指示器位置
  const indicatorPositionStyle = computed(() => {
    const styles: Record<string, string> = {}
    if (isDef(props.indicatorLeft)) {
      styles.left = addUnit(props.indicatorLeft)
    }
    if (isDef(props.indicatorTop)) {
      styles.top = addUnit(props.indicatorTop)
    }
    return objToStyle(styles)
  })

  // 亮图层的裁剪高度百分比（从顶部往下露出）
  const brightClipHeight = computed(() => {
    if (isVideoLoaded.value) {
      return '100%'
    }
    if (!isVideoLoading.value) {
      return '0%'
    }
    return `${Math.min(videoLoadProgress.value, 100)}%`
  })

  // 监听视频源变化，重置加载状态
  watch(
    () => props.videoSrc,
    () => {
      clearLoadTimers()
      isVideoLoaded.value = false
      isVideoLoading.value = false
      videoLoadProgress.value = 0
    }
  )

  // 自动播放
  watch(
    () => props.autoplay,
    (newAutoplay) => {
      if (newAutoplay && !isVideoLoaded.value && !isVideoLoading.value && !isPressed.value) {
        startVideoLoad()
        nextTick(() => {
          const videoCtx = getVideoContext()
          if (videoCtx) {
            videoCtx.play()
            isVideoPlaying.value = true
          }
        })
      } else if (!newAutoplay && isVideoPlaying.value && !isPressed.value) {
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

  function getVideoContext() {
    return uni.createVideoContext(`live-photo-video-${componentId}`, instance)
  }

  /** 清理模拟进度的定时器 */
  function clearLoadTimers() {
    if (progressTimer) {
      clearInterval(progressTimer)
      progressTimer = null
    }
    if (progressTimeout) {
      clearTimeout(progressTimeout)
      progressTimeout = null
    }
  }

  /** 清理过渡动画定时器 */
  function clearTransitionTimer() {
    if (transitionTimer) {
      clearTimeout(transitionTimer)
      transitionTimer = null
    }
  }

  /**
   * 开始模拟视频加载进度。
   * 小程序 video 的 progress 事件不可靠，这里用模拟进度兜底，
   * 真正加载完成由 onVideoLoadedData 触发。
   */
  function startVideoLoad() {
    if (isVideoLoading.value || isVideoLoaded.value) {
      return
    }

    isVideoLoading.value = true
    videoLoadProgress.value = 0

    progressTimer = setInterval(() => {
      if (isVideoLoaded.value) {
        clearLoadTimers()
        return
      }
      if (videoLoadProgress.value < 90) {
        videoLoadProgress.value += Math.random() * 10 + 5
      }
    }, 200)

    // 兜底：5 秒后如果还没加载完，强制标记完成
    progressTimeout = setTimeout(() => {
      clearLoadTimers()
      if (!isVideoLoaded.value) {
        isVideoLoaded.value = true
        isVideoLoading.value = false
        videoLoadProgress.value = 100
      }
    }, 5000)
  }

  // 静音切换
  function toggleMute() {
    isMuted.value = !isMuted.value
    emit('update:muted', isMuted.value)
  }

  // 视频事件
  function onVideoLoadedData() {
    clearLoadTimers()
    isVideoLoaded.value = true
    isVideoLoading.value = false
    videoLoadProgress.value = 100
    emit('video-loaded')
  }

  function onVideoError() {
    clearLoadTimers()
    isVideoLoading.value = false
    isVideoLoaded.value = false
    videoLoadProgress.value = 0
  }

  function onVideoProgress(e: unknown) {
    if (isVideoLoading.value) {
      emit('video-progress', e as Event)
    }
  }

  function onVideoEnded() {
    if (isPressed.value) {
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

  // 长按交互
  function onLongPressStart() {
    if (props.displayOnly || isPressed.value) {
      return
    }

    isPressed.value = true
    isTransitioning.value = true
    clearTransitionTimer()

    if (props.enableVibration) {
      try {
        uni.vibrateShort({ type: 'light' })
      } catch {
        // 振动反馈不可用
      }
    }

    if (!isVideoLoaded.value) {
      startVideoLoad()
    }

    nextTick(() => {
      if (isUnmounted) {
        return
      }
      const videoCtx = getVideoContext()
      if (videoCtx) {
        videoCtx.play()
        setTimeout(() => {
          if (isUnmounted) {
            return
          }
          isVideoPlaying.value = true
          transitionTimer = setTimeout(() => {
            isTransitioning.value = false
          }, 300)
        }, 50)
      }
    })

    emit('press-start')
    emit('video-play')
  }

  function onLongPressEnd() {
    if (props.displayOnly || !isPressed.value) {
      return
    }

    isPressed.value = false
    isTransitioning.value = true
    clearTransitionTimer()

    setTimeout(() => {
      if (isUnmounted) {
        return
      }
      isVideoPlaying.value = false
      const videoCtx = getVideoContext()
      if (videoCtx) {
        videoCtx.pause()
        videoCtx.seek(0)
      }
      transitionTimer = setTimeout(() => {
        isTransitioning.value = false
      }, 300)
    }, 50)

    emit('press-end')
    emit('video-pause')
  }

  function onInteractionStart() {
    if (props.displayOnly || pressTimer) {
      return
    }

    pressTimer = setTimeout(() => {
      pressTimer = null
      onLongPressStart()
    }, props.longPressDelay)
  }

  function onInteractionEnd(e: Event) {
    if (props.displayOnly) {
      return
    }

    if (pressTimer) {
      clearTimeout(pressTimer)
      pressTimer = null
      emit('click', e)
    } else {
      onLongPressEnd()
    }
  }

  // 图片事件转发
  function onImageLoad(event: Event) {
    emit('load', event)
  }
  function onImageError(event: Event) {
    emit('error', event)
  }

  defineExpose({
    stopVideo: onLongPressEnd,
    toggleMute,
    isPlaying: () => isVideoPlaying.value,
    isMuted: () => isMuted.value
  })

  onUnmounted(() => {
    isUnmounted = true
    clearLoadTimers()
    clearTransitionTimer()
    if (pressTimer) {
      clearTimeout(pressTimer)
      pressTimer = null
    }
  })
</script>

<script lang="ts">
  import { PREFIX } from '../../common/event'

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
    <!-- 静态图片层 -->
    <view
      class="up-live-photo__image-layer"
      :class="{
        'up-live-photo__image-layer--hidden': !props.displayOnly && isPressed && isVideoPlaying,
        'up-live-photo__image-layer--transitioning': !props.displayOnly && isTransitioning,
      }"
    >
      <slot name="image" :src="props.src" :image-props="imageProps">
        <up-image v-bind="imageProps" class="up-live-photo__image" @load="onImageLoad" @error="onImageError">
          <template #loading>
            <slot name="loading">
              <view class="up-live-photo__loading">
                <view class="up-live-photo__loading-bg" />
              </view>
            </slot>
          </template>
          <template #error> <slot name="error" /> </template>
        </up-image>
      </slot>
    </view>

    <!-- 视频层 -->
    <view
      v-if="!props.displayOnly"
      class="up-live-photo__video-layer"
      :class="{
        'up-live-photo__video-layer--visible': (isPressed && isVideoPlaying) || (props.autoplay && isVideoPlaying),
        'up-live-photo__video-layer--transitioning': isTransitioning,
      }"
    >
      <video
        :id="`live-photo-video-${componentId}`"
        :src="props.videoSrc"
        class="up-live-photo__video"
        :controls="false"
        :show-play-btn="false"
        :show-fullscreen-btn="false"
        :show-progress="false"
        :show-center-play-btn="false"
        :show-loading="false"
        :muted="isMuted"
        :poster="props.src"
        object-fit="cover"
        @play="() => { isVideoPlaying = true; emit('video-play') }"
        @pause="() => { isVideoPlaying = false; emit('video-pause') }"
        @ended="onVideoEnded"
        @loadeddata="onVideoLoadedData"
        @error="onVideoError"
        @progress="onVideoProgress"
        @timeupdate="onVideoProgress"
      />
    </view>

    <!-- Live Photo 指示器 -->
    <view
      v-if="props.showIndicator"
      class="up-live-photo__indicator"
      :class="{ 'up-live-photo__indicator--active': !props.displayOnly && isPressed }"
      :style="indicatorPositionStyle"
    >
      <view class="up-live-photo__indicator-icon">
        <view class="up-live-photo__indicator-svg-wrap">
          <!-- 底层：暗淡版图标 -->
          <image class="up-live-photo__indicator-svg" :src="indicatorDimSvg" />
          <!-- 上层：全亮版图标，通过 height 裁剪显示加载进度 -->
          <view class="up-live-photo__indicator-svg-bright" :style="`height:${brightClipHeight}`">
            <image class="up-live-photo__indicator-svg" :src="indicatorBrightSvg" />
          </view>
        </view>
        <text class="up-live-photo__indicator-text">{{ t('livephoto.indicator') }}</text>
      </view>
    </view>

    <!-- 静音按钮 -->
    <view v-if="props.showMuteButton && !props.displayOnly" class="up-live-photo__mute-btn" @touchstart.stop="toggleMute">
      <image class="up-live-photo__mute-btn-img" :src="isMuted ? muteOnSvg : muteOffSvg" />
    </view>

    <!-- 交互层 -->
    <view
      v-if="!props.displayOnly"
      class="up-live-photo__interaction"
      :class="{ 'up-live-photo__interaction--pressing': isPressed }"
      @touchstart.prevent="onInteractionStart"
      @touchend.prevent="onInteractionEnd"
      @touchcancel="onInteractionEnd"
      @contextmenu.prevent
    />
  </view>
</template>

<style lang="scss" scoped>
@use './index' as *;
</style>
