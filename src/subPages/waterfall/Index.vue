<template>
  <page-wraper>
    <view class="page-waterfall">
      <demo-group title="基础用法">
        <demo-group-item title="基础用法" :no-padding="true">
          <view class="page-waterfall__box"><up-waterfall :column="2" :list="basicList" @item-click="handleItemClick" /></view>
        </demo-group-item>
      </demo-group>

      <demo-group title="自定义列数">
        <demo-group-item title="自定义列数" :no-padding="true">
          <view class="page-waterfall__box"><up-waterfall :column="3" :column-space="1" :list="threeColumnList" :sort-by-img-info="false" /></view>
        </demo-group-item>
      </demo-group>

      <demo-group title="自定义渲染">
        <demo-group-item title="自定义渲染" :no-padding="true">
          <view class="page-waterfall__box">
            <up-waterfall :column="2" :list="customList">
              <template #default="{ item, onError, onLoad }">
                <image class="page-waterfall__img" mode="aspectFill" :src="item.imgUrl" @error="onError" @load="onLoad" />
                <view class="page-waterfall__info">
                  <text class="page-waterfall__title">{{ item.title }}</text>
                  <text class="page-waterfall__price">¥{{ item.price }}</text>
                </view>
              </template>
            </up-waterfall>
          </view>
        </demo-group-item>
      </demo-group>
    </view>
  </page-wraper>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import UpWaterfall from '@/uni_modules/uni-ui-plus/components/up-waterfall/up-waterfall.vue'

  const basicList = ref([
    { id: 1, imgUrl: 'https://picsum.photos/300/400?random=1', title: '瀑布流 1' },
    { id: 2, imgUrl: 'https://picsum.photos/300/600?random=2', title: '瀑布流 2' },
    { id: 3, imgUrl: 'https://picsum.photos/300/350?random=3', title: '瀑布流 3' },
    { id: 4, imgUrl: 'https://picsum.photos/300/500?random=4', title: '瀑布流 4' },
    { id: 5, imgUrl: 'https://picsum.photos/300/450?random=5', title: '瀑布流 5' },
    { id: 6, imgUrl: 'https://picsum.photos/300/550?random=6', title: '瀑布流 6' }
  ])

  const threeColumnList = ref([
    { id: 1, imgUrl: 'https://picsum.photos/200/300?random=11', title: '商品 1' },
    { id: 2, imgUrl: 'https://picsum.photos/200/250?random=12', title: '商品 2' },
    { id: 3, imgUrl: 'https://picsum.photos/200/400?random=13', title: '商品 3' },
    { id: 4, imgUrl: 'https://picsum.photos/200/320?random=14', title: '商品 4' },
    { id: 5, imgUrl: 'https://picsum.photos/200/280?random=15', title: '商品 5' },
    { id: 6, imgUrl: 'https://picsum.photos/200/360?random=16', title: '商品 6' }
  ])

  const customList = ref([
    { id: 1, imgUrl: 'https://picsum.photos/300/200?random=21', price: 99.9, title: '特价商品 1' },
    { id: 2, imgUrl: 'https://picsum.photos/300/250?random=22', price: 199.9, title: '特价商品 2' },
    { id: 3, imgUrl: 'https://picsum.photos/300/180?random=23', price: 299.9, title: '特价商品 3' },
    { id: 4, imgUrl: 'https://picsum.photos/300/220?random=24', price: 399.9, title: '特价商品 4' }
  ])

  function handleItemClick(item: any, _index: number) {
    uni.showToast({ icon: 'none', title: `点击了 ${item.title}` })
  }
</script>

<style lang="scss" scoped>
.page-waterfall {
  &__box { min-height: 400rpx; padding: 0 24rpx; }
  &__img { width: 100%; height: 200rpx; }
  &__info { padding: 16rpx; }
  &__title { font-size: 28rpx; font-weight: 500; color: var(--up-text-main); display: block; margin-bottom: 8rpx; }
  &__price { font-size: 32rpx; font-weight: 600; color: #ff4757; display: block; }
}
</style>
