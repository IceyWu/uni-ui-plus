import type { ExtractPropTypes, PropType } from 'vue'

export interface WaterfallItem {
  id?: string | number
  index?: number
  [key: string]: any
}

export interface ColumnHeight {
  column: number
  height: number
}

export interface FlowData {
  column: number
  columnSpace: number
  list: WaterfallItem[]
  [key: string]: any
}

export const waterfallProps = {
  /**
   * @description 列数
   * @default 2
   */
  column: {
    default: 2,
    type: Number
  },
  /**
   * @description 列间距(百分比)
   * @default 2
   */
  columnSpace: {
    default: 2,
    type: Number
  },
  /**
   * @description 获取图片源的方法
   * @default undefined
   */
  getImageSrc: {
    default: undefined,
    type: Function as PropType<(item: WaterfallItem) => string>
  },
  /**
   * @description 图片字段名
   * @default 'imgUrl'
   */
  imageField: {
    default: 'imgUrl',
    type: String
  },
  /**
   * @description 瀑布流数据列表
   */
  list: {
    default: () => [],
    type: Array as PropType<WaterfallItem[]>
  },
  /**
   * @description 是否根据图片信息排序
   * @default false
   */
  sortByImgInfo: {
    default: false,
    type: Boolean
  }
}

export type WaterfallProps = ExtractPropTypes<typeof waterfallProps>

export interface WaterfallEmits {
  (e: 'load-complete'): void
  (e: 'item-click', item: WaterfallItem, index: number): void
  (e: 'image-error' | 'image-load', item: WaterfallItem): void
}

export const waterfallEmits = ['load-complete', 'item-click', 'image-load', 'image-error'] as const
