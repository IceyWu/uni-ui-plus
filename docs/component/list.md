# List 列表

增强版的列表组件，支持虚拟列表、下拉刷新、上拉加载、骨架屏、空状态等多种功能，适用于大数据量场景。

## 基本用法

最基础的列表用法，支持通过 `v-model:list-obj` 双向绑定列表数据对象。

```vue
<script setup>
import { getObjVal, list, sleep } from '@iceywu/utils'
import { useRequest } from 'vue-hooks-pure'

const scrollListRef = ref()
// 模拟api
async function getTestApi(params) {
  await sleep(500)
  const { page = 0, size = 10, maxPage = 3 } = params
  const baseSize = page * size
  const data = list(0, size - 1, (index) => {
    const element = baseSize + index
    return {
      id: element,
      cover: `https://picsum.photos/id/${element}/200/300`,
      title: `title ${element}`,
      desc: `desc ${element}`
    }
  })
  return {
    code: 200,
    msg: '查询成功',
    result: {
      content: data,
      last: page + 1 === maxPage,
      total: 100
    }
  }
}

const {
  onRefresh,
  onLoad: onLoadMore,
  result
} = useRequest(getTestApi, {
  target: 'list',
  loadingDelay: 300,
  getVal: (res) => {
    const list = getObjVal(res, 'result.content', [])
    return list
  },
  listOptions: {
    defaultPageKey: 'page',
    defaultSizeKey: 'size',
    defaultDataKey: 'list',
    defaultPage: -1,
    getTotal: (data) => {
      const total = getObjVal(data, 'result.total', 0)
      return total
    }
  },
  onRequestEnd: (res) => {
    if (scrollListRef.value) {
      scrollListRef.value.stopRefresh()
    }
  }
})
onMounted(() => {
  onRefresh()
})
</script>

<template>
  <view class="h-50vh">
    <up-list
      ref="scrollListRef"
      v-model:list-obj="result"
      :scroll-view-props="{
        refresherEnabled: true,
        scrollY: true
      }"
      @on-load="onLoadMore"
      @on-refresh="onRefresh"
    >
      <template #default="{ data: { list } }">
        <view v-for="(item, index) in list" :key="index" class="mb-4 flex">
          <image :src="item.cover" class="h-20 w-20" mode="widthFix" />
          <view>{{ item.title }}</view>
        </view>
      </template>
    </up-list>
  </view>
</template>
```

## 虚拟列表

通过 `virtual-list-props.enabled` 开启虚拟列表，适合大数据量渲染，提升性能。你可以通过 `v-model:list-obj` 绑定虚拟列表的数据对象，并设置 `virtual-list-props` 的高度和每项高度。

```vue
<script setup>
import { ref, onMounted } from 'vue'
import { list } from '@iceywu/utils'

const virtualListObj = ref({
  loading: false,
  finished: false,
  refreshing: false,
  list: []
})

onMounted(() => {
  // 生成虚拟列表数据
  virtualListObj.value.list = list(0, 10000, (index) => ({
    id: index,
    cover: `https://picsum.photos/id/${index}/200/300`,
    title: `title ${index}`,
    desc: `desc ${index}`
  }))
})
</script>

<template>
  <up-list
    v-model:list-obj="virtualListObj"
    :scroll-view-props="{
      refresherEnabled: false,
      scrollY: true
    }"
    :virtual-list-props="{
      enabled: true,
      itemHeight: 120,
      containerHeight: 500
    }"
  >
    <template #default="{ item, index }">
      <view class="list-item-box" :key="item.id">
        <image :src="item.cover" class="cover" mode="aspectFill" />
        <view class="content">
          <view class="title">{{ item.title }}</view>
          <view class="desc">{{ item.desc }}</view>
        </view>
      </view>
    </template>
  </up-list>
</template>
```

- `virtual-list-props.itemHeight`：每项的高度（单位 px），需与实际渲染项高度一致。
- `virtual-list-props.containerHeight`：虚拟列表容器高度（单位 px），建议根据页面实际布局设置。
- 虚拟列表插槽参数为 `{ item, index }`，直接渲染每一项内容。

你可以参考 `src/subPages/list/Index.vue` 获取更多虚拟列表的完整用法和样式。

## 下拉刷新与上拉加载

组件内置下拉刷新和上拉加载，分别通过 `@on-refresh` 和 `@on-load` 事件触发。

```vue
<up-list
  v-model:list-obj="result"
  :scroll-view-props="{
    refresherEnabled: true,
    scrollY: true
  }"
  @on-refresh="onRefresh"
  @on-load="onLoadMore"
>
  <template #default="{ data: { list } }">
    <!-- 列表内容 -->
  </template>
</up-list>
```

## 空状态与骨架屏

支持自定义空状态和 loading 骨架屏。

```vue
<up-list v-model:list-obj="result">
  <template #empty>
    <view>暂无数据</view>
  </template>
  <template #loading>
    <up-skeleton :num="3" />
  </template>
</up-list>
```

## Attributes

| 参数                 | 说明                                                                                    | 类型    | 默认值    |
| -------------------- | --------------------------------------------------------------------------------------- | ------- | --------- |
| is-disabled-refresh  | 是否禁用下拉刷新                                                                        | boolean | false     |
| is-need-h-full       | 是否需要设置高度为全屏                                                                  | boolean | true      |
| is-need-empty        | 是否需要显示空状态                                                                      | boolean | true      |
| is-need-empty-center | 空状态是否居中显示                                                                      | boolean | true      |
| is-need-empty-pb     | 空状态是否需要底部内边距                                                                | boolean | true      |
| empty-top            | 空状态顶部内边距                                                                        | string  | -         |
| empty-obj            | 空状态对象                                                                              | object  | -         |
| list-obj             | 列表数据对象，包含 loading/finished/list 等                                             | 见 demo | -（必填） |
| skeleton-obj         | 骨架屏配置                                                                              | 见 demo | 见 demo   |
| scroll-view-props    | scroll-view 属性（[参考文档](https://uniapp.dcloud.net.cn/component/scroll-view.html)） | 见 demo | 见 demo   |
| virtual-list-props   | 虚拟列表配置                                                                            | 见 dem  | 见 demo   |
| is-list-mode         | 是否启用默认列表模式（非虚拟列表时有效）                                                | boolean | false     |

## Events

| 事件名称       | 说明           | 参数                                  |
| -------------- | -------------- | ------------------------------------- |
| update:listObj | 列表数据变更   | (data: ListObj)                       |
| onRefresh      | 下拉刷新       | -                                     |
| onLoad         | 上拉加载       | -                                     |
| onPulling      | 下拉过程中触发 | (event: ScrollViewOnRefresherpulling) |
| onScroll       | 滚动时触发     | (event: ScrollViewOnScrollEvent)      |

## Slots

| 名称    | 说明         |
| ------- | ------------ |
| default | 列表内容     |
| empty   | 空状态内容   |
| loading | 加载中骨架屏 |

## 外部样式类

| 类名         | 说明       |
| ------------ | ---------- |
| custom-class | 根节点样式 |

## 示例

更多用法请参考 `src/subPages/list/Index.vue` 示例页面。
