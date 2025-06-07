import type { ExtractPropTypes, PropType } from 'vue'

export interface WaterfallItem {
  [key: string]: any
  index?: number
  id?: string | number
}

export interface ColumnHeight {
  column: number
  height: number
}

export interface FlowData {
  list: WaterfallItem[]
  column: number
  columnSpace: number
  [key: string]: any
}

export const waterfallProps = {
  /**
   * @description 瀑布流数据列表
   */
  list: {
    type: Array as PropType<WaterfallItem[]>,
    default: () => []
  },
  /**
   * @description 列数
   * @default 2
   */
  column: {
    type: Number,
    default: 2
  },
  /**
   * @description 列间距(百分比)
   * @default 2
   */
  columnSpace: {
    type: Number,
    default: 2
  },
  /**
   * @description 图片字段名
   * @default 'imgUrl'
   */
  imageField: {
    type: String,
    default: 'imgUrl'
  },
  /**
   * @description 是否根据图片信息排序
   * @default true
   */
  sortByImgInfo: {
    type: Boolean,
    default: true
  }
}

export type WaterfallProps = ExtractPropTypes<typeof waterfallProps>

export interface WaterfallEmits {
  (e: 'load-complete'): void
  (e: 'item-click', item: WaterfallItem, index: number): void
  (e: 'image-load', item: WaterfallItem): void
  (e: 'image-error', item: WaterfallItem): void
}

export const waterfallEmits = ['load-complete', 'item-click', 'image-load', 'image-error'] as const
