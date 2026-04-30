import type { ExtractPropTypes, PropType } from 'vue'
import { imageProps } from '../up-image/types'

// 定义 LivePhoto 特有的 props
const livePhotoSpecificProps = {
  /**
   * @description 视频源地址
   */
  videoSrc: {
    type: String,
    required: true
  },
  /**
   * @description 静态图片源地址
   */
  src: {
    type: String,
    required: true
  },
  /**
   * @description 是否显示 Live Photo 指示器
   */
  showIndicator: {
    type: Boolean,
    default: true
  },
  /**
   * @description 是否自动播放视频
   */
  autoplay: {
    type: Boolean,
    default: false
  },
  /**
   * @description 是否启用振动反馈
   */
  enableVibration: {
    type: Boolean,
    default: true
  },
  /**
   * @description 是否静音播放
   */
  muted: {
    type: Boolean,
    default: true
  },
  /**
   * @description 是否显示静音控制按钮
   */
  showMuteButton: {
    type: Boolean,
    default: true
  },
  /**
   * @description 是否仅展示模式（只显示图片和指示器，不支持交互和视频播放）
   */
  displayOnly: {
    type: Boolean,
    default: false
  },
  /**
   * @description 指示器水平位置（距离左边的距离）
   */
  indicatorLeft: {
    type: [String, Number] as PropType<string | number>,
    default: '20rpx'
  },
  /**
   * @description 指示器垂直位置（距离顶部的距离）
   */
  indicatorTop: {
    type: [String, Number] as PropType<string | number>,
    default: '20rpx'
  },
  /**
   * @description 长按触发延迟时间（单位 ms），区分短按（点击）与长按
   */
  longPressDelay: {
    type: Number,
    default: 150
  }
} as const

// 合并 image props 和 LivePhoto 特有的 props
export const livePhotoProps = {
  ...imageProps,
  ...livePhotoSpecificProps,
  enablePreview: {
    type: Boolean,
    default: false
  }
} as const

export type LivePhotoProps = ExtractPropTypes<typeof livePhotoProps>

export interface LivePhotoEmits {
  (e: 'error' | 'load' | 'click' | 'video-progress', event: Event): void
  (e: 'video-loaded' | 'video-ended' | 'press-end' | 'press-start' | 'video-pause' | 'video-play'): void
  (e: 'update:muted', value: boolean): void
}
