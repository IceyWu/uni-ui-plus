import type { ImageMode } from '@uni-helper/uni-app-types'
import type { ExtractPropTypes, PropType } from 'vue'
import { makeNumericProp } from '../../common/props.ts'

// 定义 props
export const imageProps = {
  customClass: {
    default: '',
    type: String
  },
  customStyle: {
    default: '',
    type: String
  },
  delay: {
    default: 0,
    type: Number
  },
  enablePreview: {
    default: false,
    type: Boolean
  },
  /**
   * @description 加载失败提示文字
   */
  errorText: {
    default: '加载异常',
    type: String
  },
  filter: {
    default: '',
    type: [Number, String] as PropType<number | string>
  },
  height: {
    type: [Number, String] as PropType<number | string>
  },
  lazyLoad: {
    default: true,
    type: Boolean
  },
  /**
   * @description 加载中提示文字
   */
  loadingText: {
    default: '加载中...',
    type: String
  },
  minHeight: makeNumericProp('200rpx'),
  mode: {
    default: 'scaleToFill',
    type: String as PropType<ImageMode>
  } as const,
  placeholderSrc: {
    default: '',
    type: String
  },
  previewSrc: {
    default: '',
    type: String
  },
  radius: {
    default: 0,
    type: [Number, String] as PropType<number | string>
  },
  round: {
    default: false,
    type: Boolean
  },

  src: {
    default: '',
    type: String
  },
  width: {
    type: [Number, String] as PropType<number | string>
  }
} as const

export type ImageProps = ExtractPropTypes<typeof imageProps>

export interface ImageEmits {
  (e: 'load', event: Event): void
  (e: 'error', event: Event): void
  (e: 'click', event: MouseEvent): void
}
