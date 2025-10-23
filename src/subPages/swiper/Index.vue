<template>
  <page-wraper>
    <view class="page-swiper-nav">
      <!-- 基本用法 -->
      <demo-block :title="$t('jiBenYongFa')">
        <up-swiper :list="swiperList" :height="200" :indicator="{ type: 'dots' }" @click="handleClick" @change="handleChange" />
      </demo-block>

      <!-- 指示器类型 -->
      <demo-block title="指示器类型">
        <view class="demo-section">
          <view class="type-selector">
            <text class="selector-label">选择类型：</text>
            <view class="selector-options">
              <view
                v-for="type in indicatorTypes"
                :key="type.value"
                :class="['option-item', { active: selectedType === type.value }]"
                @click="selectedType = type.value"
              >
                {{ type.label }}
              </view>
            </view>
          </view>
          <up-swiper :list="swiperList" :height="200" :indicator="{ type: selectedType }" @click="handleClick" @change="handleChange" />
        </view>
      </demo-block>

      <!-- 指示器位置 -->
      <demo-block title="指示器位置">
        <view class="demo-section">
          <view class="position-selector">
            <text class="selector-label">选择位置：</text>
            <view class="position-grid">
              <view
                v-for="pos in positions"
                :key="pos.value"
                :class="['position-item', { active: selectedPosition === pos.value }]"
                @click="selectedPosition = pos.value"
              >
                {{ pos.label }}
              </view>
            </view>
          </view>
          <up-swiper
            :list="swiperList"
            :height="200"
            :indicator="{ type: 'dots' }"
            :indicator-position="selectedPosition"
            @click="handleClick"
            @change="handleChange"
          />
        </view>
      </demo-block>

      <!-- 垂直方向 -->
      <demo-block title="垂直方向">
        <up-swiper
          :list="swiperList"
          :height="300"
          direction="vertical"
          indicatorPosition="right"
          :indicator="{ type: 'dots' }"
          @click="handleClick"
          @change="handleChange"
        />
      </demo-block>

      <!-- 控制按钮 -->
      <demo-block title="带控制按钮">
        <up-swiper
          :list="swiperList"
          :height="200"
          :indicator="{ type: 'dots-bar', showControls: true }"
          @click="handleClick"
          @change="handleChange"
        />
      </demo-block>

      <!-- 分式指示器 -->
      <demo-block title="分式指示器">
        <up-swiper
          :list="swiperList"
          :height="200"
          :indicator="{ type: 'fraction' }"
          indicator-position="top-right"
          @click="handleClick"
          @change="handleChange"
        />
      </demo-block>

      <!-- 线性进度指示器 -->
      <demo-block title="线性进度指示器">
        <up-swiper :list="swiperList" :height="200" :indicator="{ type: 'line' }" @click="handleClick" @change="handleChange" />
      </demo-block>

      <!-- 最小显示数量 -->
      <demo-block title="最小显示数量">
        <view class="demo-section">
          <text class="section-desc">当轮播项数量少于设定值时不显示导航器</text>
          <up-swiper :list="singleItemList" :height="200" :indicator="{ type: 'dots', minShowNum: 2 }" @click="handleClick" @change="handleChange" />
          <text class="section-note">上方轮播只有1项，设置minShowNum=2，所以不显示导航器</text>
        </view>
      </demo-block>

      <!-- 自定义样式 -->
      <demo-block title="自定义样式">
        <up-swiper
          :list="customList"
          :height="160"
          :indicator="{ type: 'dots' }"
          indicator-position="bottom"
          :autoplay="false"
          @click="handleClick"
          @change="handleChange"
        >
          <template #default="{ item, index }">
            <view class="custom-item">
              <view class="custom-content" :style="{ background: (item as CustomCard).color }">
                <text class="custom-title">{{ (item as CustomCard).title }}</text>
                <text class="custom-desc">{{ (item as CustomCard).description }}</text>
                <view class="custom-index">{{ index + 1 }}</view>
              </view>
            </view>
          </template>
        </up-swiper>
      </demo-block>
    </view>
  </page-wraper>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import UpSwiper from '../../uni_modules/uni-ui-plus/components/swiper/swiper.vue'
import type { SwiperIndicatorType } from '../../uni_modules/uni-ui-plus/components/swiper-nav/types'
import type { IndicatorPositionType } from '../../uni_modules/uni-ui-plus/components/swiper/swiper'

// 轮播数据
const swiperList = ref([
  'https://picsum.photos/400/200?random=1',
  'https://picsum.photos/400/200?random=2',
  'https://picsum.photos/400/200?random=3',
  'https://picsum.photos/400/200?random=4',
  'https://picsum.photos/400/200?random=5'
])

// 单项数据用于测试最小显示数量
const singleItemList = ref(['https://picsum.photos/400/200?random=6'])

// 自定义卡片类型
interface CustomCard {
  id: number
  title: string
  description: string
  color: string
  value?: string
}

// 自定义内容数据
const customList = ref<CustomCard[]>([
  {
    id: 1,
    title: '自定义卡片1',
    description: '这是一个自定义的轮播内容',
    color: '#FF6B6B'
  },
  {
    id: 2,
    title: '自定义卡片2',
    description: '你可以完全自定义轮播项的样式',
    color: '#4ECDC4'
  },
  {
    id: 3,
    title: '自定义卡片3',
    description: '支持插槽来展示任意内容',
    color: '#45B7D1'
  }
])

// 指示器类型选项
const indicatorTypes = ref<{ label: string; value: SwiperIndicatorType }[]>([
  { label: '圆点', value: 'dots' },
  { label: '圆点条', value: 'dots-bar' },
  { label: '分式', value: 'fraction' },
  { label: '线条', value: 'line' }
])

const selectedType = ref<SwiperIndicatorType>('dots')

// 位置选项
const positions = ref<{ label: string; value: IndicatorPositionType }[]>([
  { label: '左侧', value: 'left' },
  { label: '左上', value: 'top-left' },
  { label: '上方', value: 'top' },
  { label: '右上', value: 'top-right' },
  { label: '左下', value: 'bottom-left' },
  { label: '下方', value: 'bottom' },
  { label: '右下', value: 'bottom-right' },
  { label: '右侧', value: 'right' }
])

const selectedPosition = ref<IndicatorPositionType>('bottom')

// 事件处理
function handleClick(item: any, index: number) {
  uni.showToast({
    title: `点击了第 ${index + 1} 项`,
    icon: 'none'
  })
  console.log('swiper item clicked:', item, index)
}

function handleChange(current: number, source: string) {
  console.log('swiper changed:', current, source)
}
</script>

<style lang="scss" scoped>
.page-swiper-nav {
  padding: 0;

  .demo-section {
    margin-bottom: 20rpx;

    .section-desc {
      display: block;
      font-size: 28rpx;
      color: #666;
      margin-bottom: 20rpx;
      padding: 0 30rpx;
    }

    .section-note {
      display: block;
      font-size: 24rpx;
      color: #999;
      margin-top: 10rpx;
      padding: 0 30rpx;
    }
  }

  .swiper-container {
    position: relative;
    border-radius: 12rpx;
    overflow: hidden;
    margin: 0 30rpx;

    &.vertical-container {
      height: 300px;
    }
  }

  .demo-swiper {
    width: 100%;
    border-radius: 12rpx;

    &.vertical-swiper {
      height: 300px !important;
    }
  }

  .swiper-item {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .swiper-text {
      color: white;
      font-size: 32rpx;
      font-weight: bold;
    }
  }

  .type-selector {
    padding: 0 30rpx 20rpx;

    .selector-label {
      display: block;
      font-size: 28rpx;
      color: #333;
      margin-bottom: 16rpx;
    }

    .selector-options {
      display: flex;
      flex-wrap: wrap;
      gap: 16rpx;
    }

    .option-item {
      padding: 12rpx 24rpx;
      background: #f5f5f5;
      border-radius: 40rpx;
      font-size: 26rpx;
      color: #666;
      transition: all 0.3s ease;

      &.active {
        background: #007aff;
        color: white;
      }
    }
  }

  .position-selector {
    padding: 0 30rpx 20rpx;

    .selector-label {
      display: block;
      font-size: 28rpx;
      color: #333;
      margin-bottom: 16rpx;
    }

    .position-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12rpx;
    }

    .position-item {
      padding: 16rpx 12rpx;
      background: #f5f5f5;
      border-radius: 8rpx;
      font-size: 24rpx;
      color: #666;
      text-align: center;
      transition: all 0.3s ease;

      &.active {
        background: #007aff;
        color: white;
      }
    }
  }

  :deep(.up-demo-block) {
    margin-bottom: 40rpx;
  }

  // 自定义轮播项样式
  .custom-item {
    width: 100%;
    height: 100%;
    padding: 20rpx;
    box-sizing: border-box;

    .custom-content {
      width: 100%;
      height: 100%;
      border-radius: 16rpx;
      padding: 40rpx;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: relative;
      overflow: hidden;
      box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;

      // 添加渐变光效
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 50%);
        pointer-events: none;
      }

      .custom-title {
        font-size: 40rpx;
        font-weight: bold;
        color: #ffffff;
        text-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.2);
        margin-bottom: 16rpx;
        z-index: 1;
        letter-spacing: 1rpx;
      }

      .custom-desc {
        font-size: 26rpx;
        color: rgba(255, 255, 255, 0.9);
        text-align: center;
        line-height: 1.6;
        z-index: 1;
        max-width: 500rpx;
        text-shadow: 0 1rpx 4rpx rgba(0, 0, 0, 0.15);
      }

      .custom-index {
        position: absolute;
        top: 24rpx;
        right: 24rpx;
        width: 60rpx;
        height: 60rpx;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.25);
        backdrop-filter: blur(10rpx);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 28rpx;
        font-weight: bold;
        color: #ffffff;
        border: 2rpx solid rgba(255, 255, 255, 0.3);
        box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.1);
        z-index: 1;
      }

      // 添加底部装饰线
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 80%;
        height: 6rpx;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 3rpx;
      }
    }
  }
}
</style>
