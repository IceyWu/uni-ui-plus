<template>
  <page-wraper>
    <view class="page-list">
      <demo-group title="基本用法">
        <demo-group-item title="基本用法" :no-padding="true">
          <view class="page-list__box">
            <up-list
              v-model:list-obj="result"
              :scroll-view-props="{ refresherEnabled: true, scrollY: true }"
              @on-load="onLoadMore"
              @on-refresh="onRefresh"
            >
              <template #default="{ data: { list } }">
                <view class="page-list__item" v-for="(item, index) in list" :key="index">
                  <image class="page-list__cover" mode="aspectFill" :src="item.cover" />
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
  import { get, list, sleep } from '@iceywu/utils'
  import { onMounted, ref } from 'vue'
  import { useRequest } from 'vue-hooks-pure'
  import UpList from '@/uni_modules/uni-ui-plus/components/up-list/up-list.vue'

  interface ListFetchParams {
    maxPage?: number
    page?: number
    size?: number
  }

  async function getTestApi(params: ListFetchParams) {
    await sleep(500)
    const { page = 0, size = 10, maxPage = 3 } = params
    const baseSize = page * size
    const data = list(0, size - 1, (index) => {
      const element = baseSize + index
      return {
        cover: `https://picsum.photos/id/${element}/200/300`,
        desc: `desc ${element}`,
        id: element,
        title: `title ${element}`
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
    getVal: (res) => get(res, 'result.content', []),
    listOptions: {
      defaultDataKey: 'list',
      defaultPage: -1,
      defaultPageKey: 'page',
      defaultSizeKey: 'size',
      getTotal: (data) => get(data, 'result.total', 0)
    },
    loadingDelay: 300,
    target: 'list'
  })

  onMounted(() => {
    onRefresh()
  })
</script>

<style lang="scss" scoped>
.page-list {
  &__box {
    height: calc(80vh - 200rpx);
    background: var(--up-filled-bottom);
  }
  &__item {
    display: flex;
    align-items: flex-start;
    background: var(--up-filled-oppo);
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
    color: var(--up-text-main);
    font-weight: 600;
    margin-bottom: 12rpx;
  }
  &__desc {
    font-size: 26rpx;
    color: var(--up-text-secondary);
    line-height: 1.5;
  }
}
</style>
