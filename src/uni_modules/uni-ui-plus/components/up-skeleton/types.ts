import type { ExtractPropTypes, PropType } from 'vue'
import { makeStringProp } from '../../common/props.ts'

export type SkeletonType = 'title' | 'avatar' | 'paragraph' | 'image'
export type AvatarShapeType = 'circle' | 'square'

// 定义 props
export const skeletonProps = {
  /**
   * @description 是否开启骨架屏
   * @default false
   */
  animate: {
    default: true,
    type: Boolean
  },
  /**
   * @description 头像形状
   * @default "circle"
   */
  avatarShape: makeStringProp<AvatarShapeType>('circle'),
  /**
   * @description 头像大小
   * @default 60
   */
  avatarSize: {
    default: 60,
    type: [Number, String] as PropType<number | string>
  },
  /**
   * @description 是否禁用刷新功能
   * @default false
   */
  loading: {
    default: true,
    type: Boolean
  },
  /**
   * @description 行数
   * @default 3
   */
  rows: {
    default: 3,
    type: Number
  },
  /**
   * @description 标题高度
   * @default 36
   */
  titleHeight: {
    default: 36,
    type: [Number, String] as PropType<number | string>
  },
  /**
   * @description 标题宽度
   * @default "100%"
   */
  titleWidth: {
    default: '100%',
    type: [Number, String] as PropType<number | string>
  },
  /**
   * @description 骨架屏类型
   */
  type: makeStringProp<SkeletonType>('title')
} as const

export type SkeletonProps = ExtractPropTypes<typeof skeletonProps>
