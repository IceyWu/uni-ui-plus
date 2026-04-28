<template>
  <page-wraper>
    <view class="page-swiper">
      <demo-group title="组件类型">
        <demo-group-item title="基本使用" :no-padding="true">
          <view class="page-swiper__container">
            <up-swiper :list="swiperList" height="200" @click="handleClick" @change="handleChange" />
          </view>
        </demo-group-item>
      </demo-group>

      <demo-group title="指示器类型">
        <demo-group-item title="选择类型">
          <view class="page-swiper__types">
            <view
              v-for="item in indicatorTypes"
              :key="item.value"
              class="page-swiper__type-btn"
              :class="{ active: selectedType === item.value }"
              @click="selectedType = item.value"
            >
              {{ item.label }}
            </view>
          </view>
        </demo-group-item>
        <demo-group-item :title="selectedType" :no-padding="true">
          <view class="page-swiper__container">
            <up-swiper :list="swiperList" height="200" :indicator-type="selectedType" />
          </view>
        </demo-group-item>
      </demo-group>

      <demo-group title="自定义内容">
        <demo-group-item title="自定义卡片" :no-padding="true">
          <view class="page-swiper__container">
            <up-swiper :list="customList" height="200">
              <template #default="{ item }">
                <view class="page-swiper__custom" :style="{ background: item.color }">
                  <text class="page-swiper__custom-title">{{ item.title }}</text>
                  <text class="page-swiper__custom-desc">{{ item.description }}</text>
                </view>
              </template>
            </up-swiper>
          </view>
        </demo-group-item>
      </demo-group>
    </view>
  </page-wraper>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import UpSwiper from '@/uni_modules/uni-ui-plus/components/up-swiper/up-swiper.vue'
import type { SwiperIndicatorType } from '@/uni_modules/uni-ui-plus/components/up-swiper-nav/types'

const swiperList = ref([
  'https://picsum.photos/400/200?random=1',
  'https://picsum.photos/400/200?random=2',
  'https://picsum.photos/400/200?random=3',
  'https://picsum.photos/400/200?random=4'
])

const indicatorTypes = ref<{ label: string; value: SwiperIndicatorType }[]>([
  { label: '圆点', value: 'dots' },
  { label: '圆点条', value: 'dots-bar' },
  { label: '分式', value: 'fraction' },
  { label: '线条', value: 'line' }
])

const selectedType = ref<SwiperIndicatorType>('dots')

const customList = ref([
  { id: 1, title: '自定义卡片 1', description: '自定义轮播内容', color: '#FF6B6B' },
  { id: 2, title: '自定义卡片 2', description: '完全自定义样式', color: '#4ECDC4' },
  { id: 3, title: '自定义卡片 3', description: '支持插槽展示', color: '#45B7D1' }
])

function handleClick(item: any, index: number) {
  uni.showToast({ title: `点击了第 ${index + 1} 项`, icon: 'none' })
}

function handleChange(current: number, source: string) {
  console.log('swiper changed:', current, source)
}
</script>

<style lang="scss" scoped>
.page-swiper {
  &__container {
    margin: 0 24rpx;
    border-radius: 16rpx;
    overflow: hidden;
  }
  &__types {
    display: flex;
    flex-wrap: wrap;
    gap: 16rpx;
  }
  &__type-btn {
    padding: 12rpx 24rpx;
    background: #f5f5f5;
    border-radius: 40rpx;
    font-size: 26rpx;
    color: #666;
    &.active {
      background: #007aff;
      color: white;
    }
  }
  &__custom {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 16rpx;
  }
  &__custom-title {
    font-size: 36rpx;
    font-weight: bold;
    color: #fff;
    margin-bottom: 12rpx;
  }
  &__custom-desc {
    font-size: 26rpx;
    color: rgba(255, 255, 255, 0.9);
  }
}
</style>
