<template>
  <page-wraper>
    <!-- 分段器 -->
    <segmented-control v-model="activeTab" :items="tabList" @change="onTabChange" />

    <!-- 普通列表demo -->
    <demo-block v-if="activeTab === 0" :title="$t('jiBenYongFa')">
      <view class="demo-box">
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
            <view v-for="(item, index) in list" :key="index" class="list-item-box">
              <image :src="item.cover" class="cover" mode="aspectFill" />
              <view class="content">
                <view class="title">{{ item.title }}</view>
                <view class="desc">{{ item.desc }}</view>
              </view>
            </view>
          </template>
        </up-list>
      </view>
    </demo-block>

    <!-- 虚拟列表demo -->
    <demo-block v-else :title="'虚拟列表'">
      <view class="demo-box virtual-box">
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
          <template #default="{ item }">
            <view class="list-item-box" :key="item.id">
              <image :src="item.cover" class="cover" mode="aspectFill" />
              <view class="content">
                <view class="title">{{ item.title }}</view>
                <view class="desc">{{ item.desc }}</view>
              </view>
            </view>
          </template>
        </up-list>
      </view>
    </demo-block>
  </page-wraper>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import UpList from '@/uni_modules/uni-ui-plus/components/list/list.vue'
import SegmentedControl from '@/components/segmented-control/segmented-control.vue'
import { getObjVal, list, sleep } from '@iceywu/utils'
import { useRequest } from 'vue-hooks-pure'

const activeTab = ref(0)
const tabList = ['普通列表', '虚拟列表']

const onTabChange = (index: number) => {
  console.log('切换到：', tabList[index])
}

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

// 虚拟列表数据
const virtualListObj = ref({
  loading: false,
  finished: false,
  refreshing: false,
  list: []
})
onMounted(() => {
  onRefresh()
  // 生成虚拟列表数据
  virtualListObj.value.list = list(0, 10000, (index) => ({
    id: index,
    cover: `https://picsum.photos/id/${index}/200/300`,
    title: `title ${index}`,
    desc: `desc ${index}`
  }))
})
</script>

<style lang="scss" scoped>
.demo-box {
  height: calc(85vh - 200rpx);
  padding: 24rpx 0;
  background: #f7f8fa;
}
.list-item-box {
  display: flex;
  align-items: flex-start;
  background: #fff;
  border-radius: 16rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.06);
  margin-bottom: 24rpx;
  padding: 20rpx 24rpx;
  transition: box-shadow 0.2s;
  border: none;

  &:hover {
    box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.12);
  }

  .cover {
    width: 160rpx;
    height: 160rpx;
    border-radius: 12rpx;
    margin-right: 24rpx;
    object-fit: cover;
    box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.08);
    border: 1rpx solid #f0f0f0;
    background: #f5f5f5;
    flex-shrink: 0;
  }
  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-width: 0;
  }
  .title {
    font-size: 32rpx;
    color: #222;
    font-weight: 600;
    letter-spacing: 1rpx;
    margin-bottom: 12rpx;
    word-break: break-all;
  }
  .desc {
    font-size: 26rpx;
    color: #888;
    line-height: 1.5;
    word-break: break-all;
  }
}
</style>
