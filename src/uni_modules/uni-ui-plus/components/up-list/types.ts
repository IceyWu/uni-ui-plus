import type { ScrollViewOnRefresherpulling, ScrollViewOnScrollEvent, ScrollViewProps } from '@uni-helper/uni-app-types'
import type { ExtractPropTypes, PropType } from 'vue'

// 定义接口
interface ListObj<T> {
  finished: boolean
  list: T[]
  loading: boolean
  refreshing: boolean
  total?: number
}

interface SkeletonObj {
  gridCol?: number
  num?: number
  rows?: number
}

// 定义 props
export const listProps = {
  /**
   * @description 列表对象更新时是否自动重置 refresher 状态
   * @default true
   */
  autoSetTriggered: {
    default: true,
    type: Boolean
  },
  /**
   * @description 空状态对象
   * @default undefined
   */
  emptyObj: {
    default: undefined,
    type: Object as PropType<any>
  },
  /**
   * @description 空状态的顶部内边距
   * @default undefined
   */
  emptyTop: {
    default: undefined,
    type: String
  },
  /**
   * @description 是否启默认列表模式（只针对非虚拟列表）
   * @default false
   */
  isListMode: {
    default: false,
    type: Boolean
  },
  /**
   * @description 是否需要显示空状态
   * @default true
   */
  isNeedEmpty: {
    default: true,
    type: Boolean
  },
  /**
   * @description 空状态是否需要居中显示
   * @default true
   */
  isNeedEmptyCenter: {
    default: true,
    type: Boolean
  },
  /**
   * @description 空状态是否需要底部内边距
   * @default true
   */
  isNeedEmptyPb: {
    default: true,
    type: Boolean
  },
  /**
   * @description 是否需要设置高度为全屏
   * @default false
   */
  isNeedHFull: {
    default: true,
    type: Boolean
  },
  /**
   * @description 列表数据对象，包含加载状态、完成状态、刷新状态、列表数据和总数等信息
   * @required
   */
  listObj: {
    required: true,
    type: Object as PropType<ListObj<any>>
  },
  /**
   * @description 滚动视图的属性配置，排除了 'loading'、'finished' 和 'onLoad' 属性
   * @default { scrollY: true, scrollX: false, refresherEnabled: true, refresherThreshold: 100, refresherBackground: "transparent" }
   */
  scrollViewProps: {
    default: () => ({
      refresherBackground: 'transparent',
      refresherThreshold: 100,
      scrollX: false,
      scrollY: true
    }),
    type: Object as PropType<Partial<Omit<ScrollViewProps, 'loading' | 'finished' | 'onLoad'>>>
  },
  /**
   * @description 骨架屏配置对象，包含骨架屏数量、行数和网格列数等信息
   * @default { num: 1, rows: 3, gridCol: 1 }
   */
  skeletonObj: {
    default: () => ({
      gridCol: 1,
      num: 1,
      rows: 3
    }),
    type: Object as PropType<SkeletonObj>
  },
  /**
   * @description 虚拟列表配置对象，包含是否启用虚拟列表、项高度、容器高度、底部 loading 骨架高度等
   * @default { enabled: false, itemHeight: 50, containerHeight: undefined, loadingHeight: 100 }
   */
  virtualListProps: {
    default: () => ({
      containerHeight: undefined,
      enabled: false,
      itemHeight: 50,
      loadingHeight: 100
    }),
    type: Object as PropType<{
      enabled?: boolean
      itemHeight?: number
      containerHeight?: number
      loadingHeight?: number
    }>
  }
} as const

export type ListProps = ExtractPropTypes<typeof listProps>

// 定义 emits
// ...existing code...
export type ListEmits = {
  (e: 'update:listObj', data: ListObj<any>): void
  (e: 'onLoad' | 'onRefresh'): void
  (e: 'onPulling', data: ScrollViewOnRefresherpulling): void
  (e: 'onScroll', data: ScrollViewOnScrollEvent): void
}
