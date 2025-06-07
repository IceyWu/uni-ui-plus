# Waterfall 瀑布流

瀑布流布局组件，适用于图片展示、商品列表等场景。

## 基础用法

```vue
<template>
  <up-waterfall
    :list="waterfallList"
    :column="2"
    @item-click="handleItemClick"
  >
    <template #item-content="{ item }">
      <view class="item-content">
        <text>{{ item.title }}</text>
      </view>
    </template>
  </up-waterfall>
</template>

<script setup>
const waterfallList = ref([
  {
    id: 1,
    imgUrl: 'https://example.com/image1.jpg',
    title: '标题1'
  },
  {
    id: 2,
    imgUrl: 'https://example.com/image2.jpg',
    title: '标题2'
  }
])

function handleItemClick(item, index) {
  console.log('点击了项目：', item, index)
}
</script>
```

## 自定义列数

```vue
<template>
  <up-waterfall
    :list="waterfallList"
    :column="3"
    :column-space="1"
  >
    <template #item-content="{ item }">
      <view class="item-content">
        <text>{{ item.title }}</text>
      </view>
    </template>
  </up-waterfall>
</template>
```

## 自定义图片渲染

```vue
<template>
  <up-waterfall
    :list="waterfallList"
    :column="2"
  >
    <template #item-image="{ item, onLoad, onError }">
      <image
        :src="item.imgUrl"
        mode="aspectFill"
        @load="onLoad"
        @error="onError"
        style="width: 100%; height: 200rpx;"
      />
    </template>
    <template #item-content="{ item }">
      <view class="item-content">
        <text>{{ item.title }}</text>
      </view>
    </template>
  </up-waterfall>
</template>
```

## 是否开启sortByImgInfo

开启 `sortByImgInfo` 后会根据图片的高度和宽度信息对列表进行排序，确保瀑布流布局的美观，与此同时页面也会产生逐条加载的效果。

```vue
<template>
  <up-waterfall
    :list="waterfallList"
    :column="2"
    :sort-by-img-info="true"
  >
  </up-waterfall>
</template>

```

## Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| list | 瀑布流数据列表 | `WaterfallItem[]` | `[]` |
| column | 列数 | `number` | `2` |
| columnSpace | 列间距(百分比) | `number` | `2` |
| imageField | 图片字段名 | `string` | `'imgUrl'` |
| sortByImgInfo | 是否根据图片信息排序 | `boolean` | `true` |

## Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| load-complete | 加载完成时触发 | - |
| item-click | 点击项目时触发 | `(item: WaterfallItem, index: number)` |
| image-load | 图片加载成功时触发 | `(item: WaterfallItem)` |
| image-error | 图片加载失败时触发 | `(item: WaterfallItem)` |

## Slots

| 插槽名 | 说明 | 参数 |
|--------|------|------|
| item-image | 自定义图片渲染 | `{ item, index, onLoad, onError }` |
| item-content | 自定义内容渲染 | `{ item, index }` |

## 类型定义

```typescript
interface WaterfallItem {
  [key: string]: any
  index?: number
  id?: string | number
}
```

## 方法

通过 ref 可以访问到组件实例并调用实例方法。

| 方法名 | 说明 | 参数 |
|--------|------|------|
| resetWaterfall | 重置瀑布流 | `(list: WaterfallItem[])` |
| appendNewData | 追加新数据 | `(newItems: WaterfallItem[])` |

## 样式变量

组件提供了下列 CSS 变量，可用于自定义样式。

| 名称 | 默认值 | 描述 |
|------|--------|------|
| --up-waterfall-item-margin | `30rpx` | 项目间距 |
| --up-waterfall-item-radius | `12rpx` | 项目圆角 |
| --up-waterfall-item-shadow | `0rpx 3rpx 6rpx rgba(0, 46, 37, 0.08)` | 项目阴影 |
