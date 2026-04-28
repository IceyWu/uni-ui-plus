<template>
  <page-wraper>
    <view class="page-list">
      <demo-group title="组件类型">
        <demo-group-item title="基本使用" :no-padding="true">
          <view class="page-list__box">
            <up-list
              v-model:list-obj="result"
              :scroll-view-props="{ refresherEnabled: true, scrollY: true }"
              @on-load="onLoadMore"
              @on-refresh="onRefresh"
            >
              <template #default="{ data: { list } }">
                <view v-for="(item, index) in list" :key="index" class="page-list__item">
                  <image :src="item.cover" class="page-list__cover" mode="aspectFill" />
                  <view class="page-list__content">
                    <view class="page-list__title">{{ item.title }}</view>
                    <view class="page-list__desc">{{ item.desc }}</view>
                  </view>
                </view>
              </template>
            </up-list>
          </view>
        </demo-group-item>
      </demo-group>
    </view>
  </page-wraper>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import UpList from '@/uni_modules/uni-ui-plus/components/up-list/up-list.vue'
import { getObjVal, list, sleep } from '@iceywu/utils'
import { useRequest } from 'vue-hooks-pure'

interface ListFetchParams {
  page?: number
  size?: number
  maxPage?: number
}

async function getTestApi(params: ListFetchParams) {
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
    result: { content: data, last: page + 1 === maxPage, total: 100 }
  }
}

const {
  onRefresh,
  onLoad: onLoadMore,
  result
} = useRequest(getTestApi, {
  target: 'list',
  loadingDelay: 300,
  getVal: (res) => getObjVal(res, 'result.content', []),
  listOptions: {
    defaultPageKey: 'page',
    defaultSizeKey: 'size',
    defaultDataKey: 'list',
    defaultPage: -1,
    getTotal: (data) => getObjVal(data, 'result.total', 0)
  }
})

onMounted(() => {
  onRefresh()
})
</script>

<style lang="scss" scoped>
.page-list {
  &__box {
    height: calc(80vh - 200rpx);
    background: #f7f8fa;
  }
  &__item {
    display: flex;
    align-items: flex-start;
    background: #fff;
    border-radius: 16rpx;
    box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.06);
    margin: 0 24rpx 24rpx;
    padding: 20rpx 24rpx;
  }
  &__cover {
    width: 140rpx;
    height: 140rpx;
    border-radius: 12rpx;
    margin-right: 24rpx;
    flex-shrink: 0;
  }
  &__content {
    flex: 1;
    min-width: 0;
  }
  &__title {
    font-size: 30rpx;
    color: #222;
    font-weight: 600;
    margin-bottom: 12rpx;
  }
  &__desc {
    font-size: 26rpx;
    color: #888;
    line-height: 1.5;
  }
}
</style>
