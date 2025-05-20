import type { ExtractPropTypes, PropType } from "vue";
import type { SkeletonType, AvatarShapeType } from "./type";
import { makeStringProp } from "../_utils";

// 定义 props
export const skeletonProps = {
  /**
   * @description 骨架屏类型
   */
  type: makeStringProp<SkeletonType>("title"),
  /**
   * @description 是否禁用刷新功能
   * @default false
   */
  loading: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 是否开启骨架屏
   * @default false
   */
  animate: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 头像形状
   * @default "circle"
   */
  avatarShape: makeStringProp<AvatarShapeType>("circle"),
  /**
   * @description 头像大小
   * @default 60
   */
  avatarSize: {
    type: [Number, String] as PropType<number | string>,
    default: 60,
  },
  /**
   * @description 标题高度
   * @default 36
   */
  titleHeight: {
    type: [Number, String] as PropType<number | string>,
    default: 36,
  },
  /**
   * @description 标题宽度
   * @default "100%"
   */
  titleWidth: {
    type: [Number, String] as PropType<number | string>,
    default: "100%",
  },
  /**
   * @description 行数
   * @default 3
   */
  rows: {
    type: Number,
    default: 3,
  },
} as const;

export type SkeletonProps = ExtractPropTypes<typeof skeletonProps>;
