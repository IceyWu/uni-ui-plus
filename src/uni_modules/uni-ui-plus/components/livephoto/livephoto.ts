import type { ExtractPropTypes, PropType } from 'vue'
import { makeNumericProp } from '../_utils'

// 定义 props
export const livePhotoProps = {
  // 视频源
  videoSrc: {
    type: String,
    required: true
  },
  // 静态图片源
  imageSrc: {
    type: String,
    required: true
  },
  // 视频封面
  poster: {
    type: String,
    default: ''
  },
  // 默认图片源
  defaultImageSrc: {
    type: String,
    default: ''
  },
  // 宽度
  width: {
    type: [Number, String] as PropType<number | string>,
    default: '100%'
  },
  // 高度
  height: {
    type: [Number, String] as PropType<number | string>,
    default: '100%'
  },
  // 圆角
  radius: {
    type: [Number, String] as PropType<number | string>,
    default: 0
  },
  // 是否圆形
  round: {
    type: Boolean,
    default: false
  },
  // 自定义样式
  customStyle: {
    type: String,
    default: ''
  },
  // 自定义类名
  customClass: {
    type: String,
    default: ''
  },
  // 填充模式
  mode: {
    type: String,
    default: 'aspectFill'
  },
  // 是否显示 Live Photo 指示器
  showIndicator: {
    type: Boolean,
    default: true
  },
  // 是否显示长按提示
  showHint: {
    type: Boolean,
    default: true
  },
  // 提示文本
  hintText: {
    type: String,
    default: '长按查看实况'
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
  }
} as const

export type LivePhotoProps = ExtractPropTypes<typeof livePhotoProps>

// 定义 emits
export interface LivePhotoEmits {
  (e: 'video-play'): void
  (e: 'video-pause'): void
  (e: 'press-start'): void
  (e: 'press-end'): void
  (e: 'video-ended'): void
  (e: 'image-load'): void
  (e: 'image-error'): void
}
