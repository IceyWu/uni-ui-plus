import type { ExtractPropTypes, PropType } from 'vue'
import { imageProps } from '../up-image/types.ts'

// 定义 LivePhoto 特有的 props
const livePhotoSpecificProps = {
  /**
   * @description 是否自动播放视频
   */
  autoplay: {
    default: false,
    type: Boolean
  },
  /**
   * @description 是否仅展示模式（只显示图片和指示器，不支持交互和视频播放）
   */
  displayOnly: {
    default: false,
    type: Boolean
  },
  /**
   * @description 是否启用振动反馈
   */
  enableVibration: {
    default: true,
    type: Boolean
  },
  /**
   * @description 指示器水平位置（距离左边的距离）
   */
  indicatorLeft: {
    default: '20rpx',
    type: [String, Number] as PropType<string | number>
  },
  /**
   * @description 指示器垂直位置（距离顶部的距离）
   */
  indicatorTop: {
    default: '20rpx',
    type: [String, Number] as PropType<string | number>
  },
  /**
   * @description 长按触发延迟时间（单位 ms），区分短按（点击）与长按
   */
  longPressDelay: {
    default: 150,
    type: Number
  },
  /**
   * @description 是否静音播放
   */
  muted: {
    default: true,
    type: Boolean
  },
  /**
   * @description 是否显示 Live Photo 指示器
   */
  showIndicator: {
    default: true,
    type: Boolean
  },
  /**
   * @description 是否显示静音控制按钮
   */
  showMuteButton: {
    default: true,
    type: Boolean
  },
  /**
   * @description 静态图片源地址
   */
  src: {
    required: true,
    type: String
  },
  /**
   * @description 视频源地址
   */
  videoSrc: {
    required: true,
    type: String
  }
} as const

// 合并 image props 和 LivePhoto 特有的 props
export const livePhotoProps = {
  ...imageProps,
  ...livePhotoSpecificProps,
  enablePreview: {
    default: false,
    type: Boolean
  }
} as const

export type LivePhotoProps = ExtractPropTypes<typeof livePhotoProps>

export interface LivePhotoEmits {
  (e: 'error' | 'load' | 'click' | 'video-progress', event: Event): void
  (e: 'video-loaded' | 'video-ended' | 'press-end' | 'press-start' | 'video-pause' | 'video-play'): void
  (e: 'update:muted', value: boolean): void
}
