<template>
  <page-wraper>
    <!-- 分段器 -->
    <segmented-control v-model="activeTab" :items="tabList" @change="onTabChange" />

    <!-- 基础用法 -->
    <demo-block v-if="activeTab === 0" title="基础用法">
      <view class="demo-box">
        <up-waterfall :list="basicList" :column="2" @item-click="handleItemClick" @load-complete="handleLoadComplete"></up-waterfall>
      </view>
    </demo-block>

    <!-- 三列布局 -->
    <demo-block v-else-if="activeTab === 1" title="三列布局-配合sortByImgInfo使用">
      <view class="demo-box">
        <up-waterfall :list="threeColumnList" :column="3" :column-space="1" :sortByImgInfo="false" @item-click="handleItemClick"></up-waterfall>
      </view>
    </demo-block>

    <!-- 自定义图片 -->
    <demo-block v-else-if="activeTab === 2" title="自定义图片与内容">
      <view class="demo-box">
        <up-waterfall :list="customImageList" :column="2" @item-click="handleItemClick">
          <template #default="{ item, onLoad, onError }">
            <image :src="item.imgUrl" mode="aspectFill" class="custom-image" @load="onLoad" @error="onError" />
            <view class="item-content">
              <text class="item-title">{{ item.title }}</text>
              <text class="item-price">¥{{ item.price }}</text>
            </view>
          </template>
        </up-waterfall>
      </view>
    </demo-block>

    <!-- 自定义获取图片方法 -->
    <demo-block v-else title="自定义获取图片方法">
      <view class="demo-box">
        <up-waterfall :list="customFuncList" :column="2" :get-image-src="getCustomImageSrc" @item-click="handleItemClick"></up-waterfall>
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
const tabList = ['基础用法', '多列', '自定义', '自定义图片获取']

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

// 自定义获取图片方法的数据
const customFuncList = ref([
  {
    id: 1,
    images: ['https://picsum.photos/300/400?random=31', 'https://picsum.photos/300/500?random=32'],
    title: '多图商品 1',
    desc: '使用images数组的第一张图片'
  },
  {
    id: 2,
    thumbnail: 'https://picsum.photos/300/350?random=33',
    title: '缩略图商品 2',
    desc: '使用thumbnail字段'
  },
  {
    id: 3,
    cover: 'https://picsum.photos/300/450?random=34',
    title: '封面图商品 3',
    desc: '使用cover字段'
  },
  {
    id: 4,
    images: ['https://picsum.photos/300/300?random=35'],
    title: '单图商品 4',
    desc: '使用images数组的唯一图片'
  },
  {
    id: 5,
    pic: 'https://picsum.photos/300/520?random=36',
    title: '图片商品 5',
    desc: '使用pic字段'
  }
])

// 自定义图片源获取方法
function getCustomImageSrc(item: any): string {
  // 优先级：images数组 > thumbnail > cover > pic
  if (item.images && item.images.length > 0) {
    return item.images[0]
  }
  if (item.thumbnail) {
    return item.thumbnail
  }
  if (item.cover) {
    return item.cover
  }
  if (item.pic) {
    return item.pic
  }
  return ''
}

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
