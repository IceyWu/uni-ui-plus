<template>
  <page-wraper>
    <view class="page-waterfall">
      <demo-group title="组件类型">
        <demo-group-item title="基本使用" :no-padding="true">
          <view class="page-waterfall__box"><up-waterfall :list="basicList" :column="2" @item-click="handleItemClick" /></view>
        </demo-group-item>
      </demo-group>

      <demo-group title="组件样式">
        <demo-group-item title="三列布局" :no-padding="true">
          <view class="page-waterfall__box"><up-waterfall :list="threeColumnList" :column="3" :column-space="1" :sortByImgInfo="false" /></view>
        </demo-group-item>

        <demo-group-item title="自定义内容" :no-padding="true">
          <view class="page-waterfall__box">
            <up-waterfall :list="customList" :column="2">
              <template #default="{ item, onLoad, onError }">
                <image :src="item.imgUrl" mode="aspectFill" class="page-waterfall__img" @load="onLoad" @error="onError" />
                <view class="page-waterfall__info">
                  <text class="page-waterfall__title">{{ item.title }}</text>
                  <text class="page-waterfall__price">{{ item.price }}</text>
                </view>
              </template>
            </up-waterfall>
          </view>
        </demo-group-item>
      </demo-group>
    </view>
  </page-wraper>
</template>

<script setup lang="ts">
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
    { id: 1, imgUrl: 'https://picsum.photos/300/200?random=21', title: '特价商品 1', price: 99.9 },
    { id: 2, imgUrl: 'https://picsum.photos/300/250?random=22', title: '特价商品 2', price: 199.9 },
    { id: 3, imgUrl: 'https://picsum.photos/300/180?random=23', title: '特价商品 3', price: 299.9 },
    { id: 4, imgUrl: 'https://picsum.photos/300/220?random=24', title: '特价商品 4', price: 399.9 }
  ])

  function handleItemClick(item: any, index: number) {
    uni.showToast({ title: `点击了 ${item.title}`, icon: 'none' })
  }
</script>

<style lang="scss" scoped>
.page-waterfall {
  &__box {
    min-height: 400rpx;
    padding: 0 24rpx;
  }
  &__img {
    width: 100%;
    height: 200rpx;
  }
  &__info {
    padding: 16rpx;
  }
  &__title {
    font-size: 28rpx;
    font-weight: 500;
    color: #333;
    display: block;
    margin-bottom: 8rpx;
  }
  &__price {
    font-size: 32rpx;
    font-weight: 600;
    color: #ff4757;
    display: block;
  }
}
</style>
