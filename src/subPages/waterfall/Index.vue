<template>
  <page-wraper>
    <!-- 分段器 -->
    <segmented-control v-model="activeTab" :items="tabList" @change="onTabChange" />

    <!-- 基础用法 -->
    <demo-block v-if="activeTab === 0" title="基础用法">
      <view class="demo-box">
        <up-waterfall :list="basicList" :column="2" @item-click="handleItemClick" @load-complete="handleLoadComplete">
          <template #item-content="{ item }">
            <view class="item-content">
              <text class="item-title">{{ item.title }}</text>
              <text class="item-desc">{{ item.desc }}</text>
            </view>
          </template>
        </up-waterfall>
      </view>
    </demo-block>

    <!-- 三列布局 -->
    <demo-block v-else-if="activeTab === 1" title="三列布局-配合sortByImgInfo使用">
      <view class="demo-box">
        <up-waterfall :list="threeColumnList" :column="3" :column-space="1" :sortByImgInfo="false" @item-click="handleItemClick">
          <template #item-content="{ item }">
            <view class="item-content">
              <text class="item-title">{{ item.title }}</text>
            </view>
          </template>
        </up-waterfall>
      </view>
    </demo-block>

    <!-- 自定义图片 -->
    <demo-block v-else title="自定义图片">
      <view class="demo-box">
        <up-waterfall :list="customImageList" :column="2" @item-click="handleItemClick">
          <template #item-image="{ item, onLoad, onError }">
            <image :src="item.imgUrl" mode="aspectFill" class="custom-image" @load="onLoad" @error="onError" />
          </template>
          <template #item-content="{ item }">
            <view class="item-content">
              <text class="item-title">{{ item.title }}</text>
              <text class="item-price">¥{{ item.price }}</text>
            </view>
          </template>
        </up-waterfall>
      </view>
    </demo-block>
  </page-wraper>
</template>

<script setup lang="ts">
import UpWaterfall from '@/uni_modules/uni-ui-plus/components/waterfall/waterfall.vue'
import SegmentedControl from '@/components/segmented-control/segmented-control.vue'
import { ref } from 'vue'

// 分段器相关
const activeTab = ref(0)
const tabList = ['基础用法', '三列布局', '自定义图片']

const onTabChange = (index: number) => {
  console.log('切换到：', tabList[index])
}

// 基础用法数据
const basicList = ref([
  {
    id: 1,
    imgUrl: 'https://picsum.photos/300/400?random=1',
    title: '瀑布流项目 1',
    desc: '这是一个瀑布流项目的描述信息'
  },
  {
    id: 2,
    imgUrl: 'https://picsum.photos/300/600?random=2',
    title: '瀑布流项目 2',
    desc: '这是另一个瀑布流项目的描述'
  },
  {
    id: 3,
    imgUrl: 'https://picsum.photos/300/350?random=3',
    title: '瀑布流项目 3',
    desc: '第三个瀑布流项目'
  },
  {
    id: 4,
    imgUrl: 'https://picsum.photos/300/500?random=4',
    title: '瀑布流项目 4',
    desc: '第四个瀑布流项目'
  },
  {
    id: 5,
    imgUrl: 'https://picsum.photos/300/450?random=5',
    title: '瀑布流项目 5',
    desc: '第五个瀑布流项目'
  },
  {
    id: 6,
    imgUrl: 'https://picsum.photos/300/550?random=6',
    title: '瀑布流项目 6',
    desc: '第六个瀑布流项目'
  }
])

// 三列布局数据
const threeColumnList = ref([
  {
    id: 1,
    imgUrl: 'https://picsum.photos/200/300?random=11',
    title: '商品 1'
  },
  {
    id: 2,
    imgUrl: 'https://picsum.photos/200/250?random=12',
    title: '商品 2'
  },
  {
    id: 3,
    imgUrl: 'https://picsum.photos/200/400?random=13',
    title: '商品 3'
  },
  {
    id: 4,
    imgUrl: 'https://picsum.photos/200/320?random=14',
    title: '商品 4'
  },
  {
    id: 5,
    imgUrl: 'https://picsum.photos/200/280?random=15',
    title: '商品 5'
  },
  {
    id: 6,
    imgUrl: 'https://picsum.photos/200/360?random=16',
    title: '商品 6'
  }
])

// 自定义图片数据
const customImageList = ref([
  {
    id: 1,
    imgUrl: 'https://picsum.photos/300/200?random=21',
    title: '特价商品 1',
    price: 99.9
  },
  {
    id: 2,
    imgUrl: 'https://picsum.photos/300/250?random=22',
    title: '特价商品 2',
    price: 199.9
  },
  {
    id: 3,
    imgUrl: 'https://picsum.photos/300/180?random=23',
    title: '特价商品 3',
    price: 299.9
  },
  {
    id: 4,
    imgUrl: 'https://picsum.photos/300/220?random=24',
    title: '特价商品 4',
    price: 399.9
  }
])

function handleItemClick(item: any, index: number) {
  console.log('点击了项目：', item, index)
  uni.showToast({
    title: `点击了 ${item.title}`,
    icon: 'none'
  })
}

function handleLoadComplete() {
  console.log('瀑布流加载完成')
}
</script>

<style lang="scss" scoped>
.demo-box {
  height: calc(85vh - 250rpx);
  overflow: auto;
  padding: 24rpx 0;
  background: #f7f8fa;
}

.item-content {
  padding: 24rpx;

  .item-title {
    font-size: 28rpx;
    font-weight: 500;
    color: #333;
    margin-bottom: 16rpx;
    display: block;
  }

  .item-desc {
    font-size: 24rpx;
    color: #666;
    line-height: 1.4;
    display: block;
  }

  .item-price {
    font-size: 32rpx;
    font-weight: 600;
    color: #ff4757;
    margin-top: 16rpx;
    display: block;
  }
}

.custom-image {
  width: 100%;
  height: 200rpx;
}
</style>
