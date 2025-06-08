# Waterfall 瀑布流

瀑布流布局组件，适用于图片展示、商品列表等场景。组件会自动根据内容高度将数据分配到不同列中，实现瀑布流效果。

## 基础用法

不使用插槽时，组件会根据 `imageField` 属性自动渲染图片。

```vue
<template>
  <up-waterfall
    :list="waterfallList"
    :column="2"
    @item-click="handleItemClick"
    @load-complete="handleLoadComplete"
  />
</template>

<script setup>
import { ref } from 'vue'
const waterfallList = ref([
  {
    id: 1,
    imgUrl: 'https://picsum.photos/300/400?random=1',
    title: '瀑布流项目 1'
  },
  {
    id: 2,
    imgUrl: 'https://picsum.photos/300/600?random=2',
    title: '瀑布流项目 2'
  }
])

function handleItemClick(item, index) {
  console.log('点击了项目：', item, index)
}

function handleLoadComplete() {
  console.log('瀑布流加载完成')
}
</script>
```

<script setup>
  import { ref } from 'vue'
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

## 自定义内容渲染

```vue
<template>
  <up-waterfall
    :list="waterfallList"
    :column="2"
  >
    <template #default="{ item }">
      <view class="item-content">
        <text class="item-title">{{ item.title }}</text>
        <text class="item-desc">{{ item.desc }}</text>
      </view>
    </template>
  </up-waterfall>
</template>
```

## 自定义列数

```vue
<template>
  <up-waterfall
    :list="waterfallList"
    :column="3"
    :column-space="1"
    :sort-by-img-info="false"
  />
</template>
```

## 自定义渲染

完全自定义每个项目的渲染内容，包括图片和内容。

```vue
<template>
  <up-waterfall
    :list="customImageList"
    :column="2"
  >
    <template #default="{ item, onLoad, onError }">
      <image 
        :src="item.imgUrl" 
        mode="aspectFill" 
        class="custom-image" 
        @load="onLoad" 
        @error="onError" 
      />
      <view class="item-content">
        <text class="item-title">{{ item.title }}</text>
        <text class="item-price">¥{{ item.price }}</text>
      </view>
    </template>
  </up-waterfall>
</template>

<style>
.custom-image {
  width: 100%;
  height: 200rpx;
}
</style>
```

## 自定义图片源获取方法

通过 `getImageSrc` 属性可以自定义获取图片源的方法，这在需要对图片 URL 进行特殊处理时很有用。

```vue
<template>
  <up-waterfall
    :list="waterfallList"
    :column="2"
    :get-image-src="getCustomImageSrc"
  >
  </up-waterfall>
</template>

<script setup>
const waterfallList = ref([
  {
    id: 1,
    imgUrl: 'https://picsum.photos/300/400?random=1',
    title: '瀑布流项目 1'
  },
  {
    id: 2,
    imgUrl: 'https://picsum.photos/300/600?random=2',
    title: '瀑布流项目 2'
  }
])

// 自定义图片源获取方法 - 简单示例
const getCustomImageSrc = (data) => {
  return data.imgUrl || ''
}

// 自定义图片源获取方法 - 复杂示例
const getCustomImageSrc = (item) => {
  // 可以根据不同的字段获取图片
  if (item.images && item.images.length > 0) {
    return `https://cdn.example.com/${item.images[0]}`
  }
  if (item.thumbnail) {
    return `https://cdn.example.com/${item.thumbnail}`
  }
  if (item.cover) {
    return item.cover
  }
  // 添加默认图片或返回空字符串
  return item.imgUrl || 'https://via.placeholder.com/300x400'
}
</script>
```

### 使用场景

1. **统一图片域名**：为所有图片添加 CDN 前缀
2. **多字段支持**：根据不同的数据结构获取图片
3. **默认图片**：当没有图片时显示占位图
4. **图片处理**：添加图片尺寸、质量等参数

## 注意事项

- 当传入 `getImageSrc` 方法时，会优先使用该方法获取图片源，忽略 `imageField` 属性
- 开启 `sortByImgInfo` 后会根据图片高度逐一加载项目，适用于图片高度差异较大的场景
- 不使用插槽时，组件只会渲染图片，如需显示其他内容请使用默认插槽

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
| getImageSrc | 获取图片源的方法 | `(item: WaterfallItem) => string` | `undefined` |
| sortByImgInfo | 是否根据图片信息排序 | `boolean` | `false` |

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
| default | 自定义项目渲染 | `{ item, index, onLoad, onError }` |

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
