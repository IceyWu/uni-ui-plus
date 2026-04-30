import type { ImageMode } from '@uni-helper/uni-app-types'
import type { ExtractPropTypes, PropType } from 'vue'
import { makeNumericProp } from '../../common/props.ts'

// 定义 props
export const imageProps = {
  mode: {
    type: String as PropType<ImageMode>,
    default: 'scaleToFill'
  } as const,
  width: {
    type: [Number, String] as PropType<number | string>
  },
  height: {
    type: [Number, String] as PropType<number | string>
  },
  delay: {
    type: Number,
    default: 0
  },
  radius: {
    type: [Number, String] as PropType<number | string>,
    default: 0
  },
  minHeight: makeNumericProp('200rpx'),
  lazyLoad: {
    type: Boolean,
    default: true
  },
  customStyle: {
    type: String,
    default: ''
  },
  round: {
    type: Boolean,
    default: false
  },
  enablePreview: {
    type: Boolean,
    default: false
  },
  customClass: {
    type: String,
    default: ''
  },

  src: {
    type: String,
    default: ''
  },
  previewSrc: {
    type: String,
    default: ''
  },
  placeholderSrc: {
    type: String,
    default: ''
  },
  filter: {
    type: [Number, String] as PropType<number | string>,
    default: ''
  },
  /**
   * @description 加载中提示文字
   */
  loadingText: {
    type: String,
    default: '加载中...'
  },
  /**
   * @description 加载失败提示文字
   */
  errorText: {
    type: String,
    default: '加载异常'
  }
} as const

export type ImageProps = ExtractPropTypes<typeof imageProps>

export interface ImageEmits {
  (e: 'load', event: Event): void
  (e: 'error', event: Event): void
  (e: 'click', event: MouseEvent): void
}
