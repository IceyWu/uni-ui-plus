import type { ExtractPropTypes, PropType } from 'vue'
import { makeNumericProp } from '../_utils'
import { imageProps } from '../image/image'

// 定义 LivePhoto 特有的 props
const livePhotoSpecificProps = {
  // 视频源
  videoSrc: {
    type: String,
    required: true
  },
  // 静态图片源 - 重命名为 src 以与 image 组件保持一致
  src: {
    type: String,
    required: true
  },
  // 是否显示 Live Photo 指示器
  showIndicator: {
    type: Boolean,
    default: true
  },
  // 是否自动播放视频
  autoplay: {
    type: Boolean,
    default: false
  },
  // 是否启用振动反馈
  enableVibration: {
    type: Boolean,
    default: true
  },
  // 是否静音播放
  muted: {
    type: Boolean,
    default: true
  },
  // 是否仅展示模式（只显示图片和指示器，不支持交互和视频播放）
  displayOnly: {
    type: Boolean,
    default: false
  },
  // 指示器水平位置（距离左边的距离）
  indicatorLeft: {
    type: [String, Number] as PropType<string | number>,
    default: '20rpx'
  },
  // 指示器垂直位置（距离顶部的距离）
  indicatorTop: {
    type: [String, Number] as PropType<string | number>,
    default: '20rpx'
  }
} as const

// 合并 image props 和 LivePhoto 特有的 props
export const livePhotoProps = {
  ...imageProps,
  ...livePhotoSpecificProps,
  // 覆盖一些默认值以适应 LivePhoto 的需求
  enablePreview: {
    type: Boolean,
    default: false // LivePhoto 不应该启用预览
  }
} as const

export type LivePhotoProps = ExtractPropTypes<typeof livePhotoProps>

// 定义 emits - 包含 image 组件的 emits 和 LivePhoto 特有的 emits
export interface LivePhotoEmits {
  // 继承自 image 组件的事件
  (e: 'load', event: any): void
  (e: 'error', event: any): void
  (e: 'click', event: any): void
  // LivePhoto 特有的事件
  (e: 'video-play'): void
  (e: 'video-pause'): void
  (e: 'press-start'): void
  (e: 'press-end'): void
  (e: 'video-ended'): void
  (e: 'video-loaded'): void
  (e: 'video-progress', progress: number): void
}
