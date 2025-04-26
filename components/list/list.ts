import type {
  ScrollViewOnRefresherrefresh,
  ScrollViewOnScrolltolower,
  ScrollViewOnRefresherpulling,
  ScrollViewProps,
} from "@uni-helper/uni-app-types";
import type { ExtractPropTypes, PropType } from "vue";
import type { ListType } from "./type";
import { makeStringProp } from "../_utils";

// 定义接口
interface ListObj<T> {
  loading: boolean;
  finished: boolean;
  refreshing: boolean;
  list: T[];
  total?: number;
}

interface SkeletonObj {
  num?: number;
  rows?: number;
  gridCol?: number;
}

// 定义 props
export const listProps = {
  /**
   * @description 表单类型，可选值为 `ListType` 类型中定义的值，默认值为 'default'
   */
  formType: makeStringProp<ListType>("default"),
  /**
   * @description 是否禁用刷新功能
   * @default false
   */
  isDisabledRefresh: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 是否需要设置高度为全屏
   * @default false
   */
  isNeedHFull: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 是否需要显示空状态
   * @default true
   */
  isNeedEmpty: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 空状态是否需要居中显示
   * @default true
   */
  isNeedEmptyCenter: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 空状态是否需要底部内边距
   * @default true
   */
  isNeedEmptyPb: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 空状态的顶部内边距
   * @default undefined
   */
  emptyTop: {
    type: String,
    default: undefined,
  },
  /**
   * @description 空状态对象
   * @default undefined
   */
  emptyObj: {
    type: Object as PropType<any>,
    default: undefined,
  },
  /**
   * @description 列表数据对象，包含加载状态、完成状态、刷新状态、列表数据和总数等信息
   * @required
   */
  listObj: {
    type: Object as PropType<ListObj<any>>,
    required: true,
  },
  /**
   * @description 骨架屏配置对象，包含骨架屏数量、行数和网格列数等信息
   * @default { num: 1, rows: 3, gridCol: 1 }
   */
  skeletonObj: {
    type: Object as PropType<SkeletonObj>,
    default: () => ({
      num: 1,
      rows: 3,
      gridCol: 1,
    }),
  },
  /**
   * @description 滚动视图的属性配置，排除了 'loading'、'finished' 和 'onLoad' 属性
   * @default { scrollY: true, scrollX: false, refresherEnabled: true, refresherThreshold: 100, refresherBackground: "transparent" }
   */
  scrollViewProps: {
    type: Object as PropType<
      Partial<Omit<ScrollViewProps, "loading" | "finished" | "onLoad">>
    >,
    default: () => ({
      scrollY: true,
      scrollX: false,
      refresherEnabled: true,
      refresherThreshold: 100,
      refresherBackground: "transparent",
    }),
  },
} as const;

export type ListProps = ExtractPropTypes<typeof listProps>;

// 定义 emits
export type ListEmits = {
  (e: "update:listObj", data: ListObj<any>): void;
  (e: "onRefresh"): ScrollViewOnRefresherrefresh;
  (e: "onLoad"): ScrollViewOnScrolltolower;
  (e: "onPulling"): ScrollViewOnRefresherpulling;
};
