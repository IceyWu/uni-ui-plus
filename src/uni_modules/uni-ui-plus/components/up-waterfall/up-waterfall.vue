<template>
  <view class="up-waterfall">
    <view
      class="up-waterfall__column"
      v-for="(numVal, index) in flowData.column"
      :key="numVal"
      :id="`up-waterfall-cont-${index + 1}`"
      :style="{ 'margin-left': index === 0 ? 0 : marginCalc, width: widthCalc }"
    >
      <view
        class="up-waterfall__item"
        v-for="(item, j) in flowData[`column_${index + 1}`]"
        :key="item.id || `${item.index}-${j}`"
        @click="handleItemClick(item, Number(j))"
      >
        <slot :index="j" :item="item" :on-error="() => handleImageError(item)" :on-load="() => handleImageLoad(item)">
          <template v-if="getImageSrcForItem(item)">
            <image
              class="up-waterfall__image"
              lazy-load
              mode="widthFix"
              :src="getImageSrcForItem(item)"
              @error="handleImageError(item)"
              @load="handleImageLoad(item)"
            />
          </template>
        </slot>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
  import type { ComponentInternalInstance } from 'vue'
  import { computed, getCurrentInstance, nextTick, onMounted, reactive, ref, watch } from 'vue'
  import type { ColumnHeight, FlowData, WaterfallEmits, WaterfallItem } from './types'
  import { waterfallProps } from './types'

  const props = defineProps(waterfallProps)

  const emit = defineEmits<WaterfallEmits>()

  const _this = getCurrentInstance() as ComponentInternalInstance

  const flowData = reactive<FlowData>({
    column: props.column,
    columnSpace: props.columnSpace,
    list: []
  })

  const isInitializing = ref(false)

  watch(
    () => props.list,
    async (newList: WaterfallItem[], oldList: WaterfallItem[]) => {
      if (newList.length === 0) {
        resetWaterfall([])
        return
      }

      if (newList.length > oldList.length && oldList.length > 0) {
        await appendNewData(newList.slice(oldList.length))
      } else {
        resetWaterfall(newList)
      }
    }
  )

  watch(
    () => props.column,
    (newColumn: number) => {
      flowData.column = newColumn
      resetWaterfall(props.list)
    }
  )

  watch(
    () => props.sortByImgInfo,
    () => {
      resetWaterfall(props.list)
    }
  )

  function resetWaterfall(list: WaterfallItem[]): void {
    flowData.list = [...list]
    for (let i = 1; i <= flowData.column; i += 1) {
      flowData[`column_${i}`] = []
    }

    if (list.length > 0) {
      if (props.sortByImgInfo) {
        nextTick(() => {
          initValue(0)
        })
      } else {
        distributeDataSequentially(list)
      }
    } else {
      emit('load-complete')
    }
  }

  async function appendNewData(newItems: WaterfallItem[]): Promise<void> {
    if (isInitializing.value || newItems.length === 0) {
      return
    }

    const startIndex = flowData.list.length
    flowData.list = [...flowData.list, ...newItems]

    if (props.sortByImgInfo) {
      await nextTick()
      initValue(startIndex)
    } else {
      distributeNewDataSequentially(newItems, startIndex)
    }
  }

  function distributeDataSequentially(list: WaterfallItem[]): void {
    list.forEach((item, index) => {
      const columnIndex = (index % flowData.column) + 1
      const columnKey = `column_${columnIndex}`

      if (!flowData[columnKey]) {
        flowData[columnKey] = []
      }

      flowData[columnKey].push({
        ...item,
        index
      })
    })

    emit('load-complete')
  }

  function distributeNewDataSequentially(newItems: WaterfallItem[], startIndex: number): void {
    newItems.forEach((item, index) => {
      const actualIndex = startIndex + index
      const columnIndex = (actualIndex % flowData.column) + 1
      const columnKey = `column_${columnIndex}`

      if (!flowData[columnKey]) {
        flowData[columnKey] = []
      }

      flowData[columnKey].push({
        ...item,
        index: actualIndex
      })
    })

    emit('load-complete')
  }

  for (let i = 1; i <= props.column; i += 1) {
    flowData[`column_${i}`] = []
  }

  onMounted(() => {
    resetWaterfall(props.list)
  })

  const widthCalc = computed((): string => `${100 / flowData.column - flowData.columnSpace}%`)

  const marginCalc = computed((): string => {
    const columnWidth = 100 / flowData.column - flowData.columnSpace
    const columnWidthFixed = Number(columnWidth.toFixed(5))
    return `${(100 - columnWidthFixed * flowData.column) / (flowData.column - 1)}%`
  })

  function getMinObj(a: ColumnHeight[], s: keyof ColumnHeight): ColumnHeight {
    if (!a || a.length === 0) {
      return { column: 1, height: 0 }
    }

    const [first] = a
    let m = first[s]
    let mo = first
    for (let i = a.length - 1; i >= 0; i -= 1) {
      if (a[i][s] < m) {
        m = a[i][s]
        mo = a[i]
      }
    }
    return mo
  }

  function getMinColumnHeight(): Promise<ColumnHeight> {
    return new Promise((resolve) => {
      uni
        .createSelectorQuery()
        .in(_this)
        .selectAll('.up-waterfall__column')
        .boundingClientRect((result) => {
          const rects = Array.isArray(result) ? result : [result]
          const heights = rects.map((rect, index) => ({
            column: index + 1,
            height: rect?.height || 0
          }))
          resolve(getMinObj(heights, 'height'))
        })
        .exec()
    })
  }

  async function initValue(i: number): Promise<void> {
    if (i >= flowData.list.length) {
      isInitializing.value = false
      emit('load-complete')
      return
    }

    isInitializing.value = true
    try {
      const minHeightRes = await getMinColumnHeight()
      const columnKey = `column_${minHeightRes.column}`

      if (!flowData[columnKey]) {
        flowData[columnKey] = []
      }

      flowData[columnKey].push({
        ...flowData.list[i],
        index: i
      })
    } catch (error) {
      console.error('初始化瀑布流数据失败:', error)
      if (!flowData.column_1) {
        flowData.column_1 = []
      }
      flowData.column_1.push({
        ...flowData.list[i],
        index: i
      })
    }
  }

  function handleImageLoad(item: WaterfallItem): void {
    emit('image-load', item)
    if (!props.sortByImgInfo) {
      return
    }

    const i = item.index
    if (typeof i === 'number') {
      nextTick(() => {
        initValue(i + 1)
      })
    }
  }

  function handleImageError(item: WaterfallItem): void {
    emit('image-error', item)
    if (!props.sortByImgInfo) {
      return
    }

    const i = item.index
    if (typeof i === 'number') {
      nextTick(() => {
        initValue(i + 1)
      })
    }
  }

  function handleItemClick(item: WaterfallItem, index: number): void {
    emit('item-click', item, index)
  }

  // 获取图片源的统一方法
  function getImageSrcForItem(item: WaterfallItem): string {
    return props.getImageSrc ? props.getImageSrc(item) : item[props.imageField]
  }

  defineExpose({
    appendNewData,
    resetWaterfall
  })
</script>

<style lang="scss" scoped>
@use './index' as *;
</style>
