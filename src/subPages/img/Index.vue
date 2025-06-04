<template>
  <page-wraper>
    <demo-block :title="$t('jiBenYongFa')">
      <up-image
        :src="demoSource.src"
        :placeholder-src="demoSource.placeholderSrc"
        mode="scaleToFill"
        width="120"
        height="120"
        radius="8"
        :lazy-load="true"
        :enable-preview="true"
      />
    </demo-block>
    <!-- 延时 -->
    <demo-block :title="$t('image-delay')">
      <up-image :src="demoSource.src" width="120" height="120" :delay="2000" />
    </demo-block>
    <!-- 预加载占位图 -->
    <demo-block :title="$t('image-placeholder')">
      <up-image :src="demoSource.src" :placeholder-src="demoSource.placeholderSrc" mode="scaleToFill" width="120" height="120" :delay="2000" />
    </demo-block>
    <!-- 图片加载过程中的滤镜 -->
    <demo-block :title="$t('image-filter')">
      <up-image :src="demoSource.src" :placeholder-src="demoSource.placeholderSrc" :delay="40000" :filter="30" width="120" height="120" radius="8" />
    </demo-block>
    <!-- 自定义圆角 -->
    <demo-block :title="$t('image-raduis')">
      <view class="demo-item">
        <text>圆角：{{ choosedRadius }} px</text>
        <slider @change="sliderChange" :min="0" :max="60" :step="1" show-value style="width: 200px; margin-left: 20rpx" />
      </view>
      <view class="demo-item">
        <up-image :src="demoSource.src" :placeholder-src="demoSource.placeholderSrc" width="120" height="120" :radius="choosedRadius" />
      </view>
      <view class="demo-item">
        <text>圆角 round</text>
      </view>
      <view class="demo-item">
        <up-image :src="demoSource.src" :placeholder-src="demoSource.placeholderSrc" width="120" height="120" round />
      </view>
    </demo-block>
    <!-- 图片填充方式 -->
    <demo-block :title="$t('image-mode')">
      <view class="demo-item">
        <view v-for="mode in modes" :key="mode" class="mode-btn" :class="{ active: choosedModel === mode }" @click="choosedModel = mode">
          {{ mode }}
        </view>
      </view>
      <view class="demo-item">
        <up-image
          :src="demoSource.src"
          :placeholder-src="demoSource.placeholderSrc"
          width="120"
          height="120"
          :mode="choosedModel"
          :lazy-load="true"
        />
      </view>
    </demo-block>
    <!-- 自定义图片加载插槽-加载中 -->
    <demo-block :title="$t('image-slot')">
      <up-image :src="demoSource.src" :placeholder-src="demoSource.placeholderSrc" :delay="40000" width="120" height="120">
        <template #loading>
          <view class="custom-loading">加载中自定义</view>
        </template>
      </up-image>
    </demo-block>
    <!-- 自定义图片加载插槽-异常 -->
    <demo-block :title="$t('image-slot-error')">
      <up-image src="1" width="120" height="120" radius="8">
        <template #error>
          <view class="custom-error">加载异常自定义</view>
        </template>
      </up-image>
    </demo-block>
  </page-wraper>
</template>
<script lang="ts" setup>
import UpImage from '@/uni_modules/uni-ui-plus/components/image/image.vue'
import { ref } from 'vue'
const demoSource = {
  src: 'https://oss-console-img-demo-cn-hangzhou-3az.oss-cn-hangzhou.aliyuncs.com/example1.jpg',
  placeholderSrc: 'https://oss-console-img-demo-cn-hangzhou-3az.oss-cn-hangzhou.aliyuncs.com/example1.jpg?x-oss-process=image/resize,p_50'
}
const choosedRadius = ref(8)
function sliderChange(e: any) {
  choosedRadius.value = e.detail.value
}
const modes: any = [
  'scaleToFill',
  'aspectFit',
  'aspectFill',
  'heightFix',
  'widthFix',
  'top left',
  'top right',
  'bottom left',
  'bottom right',
  'right',
  'left',
  'center',
  'bottom',
  'top'
]
const choosedModel = ref(modes[0])
</script>

<style lang="scss" scoped>
.demo-item {
  margin-bottom: 20rpx;
  &:last-child {
    margin-bottom: 0;
  }
}
.custom-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  background-color: #f5f5f5;
}
.custom-error {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  background-color: #f5f5f5;
}
.mode-btn {
  display: inline-block;
  padding: 8rpx 16rpx;
  margin: 0 8rpx 8rpx 0;
  border: 1px solid #ccc;
  border-radius: 6rpx;
  background: #fafafa;
  cursor: pointer;
  font-size: 24rpx;
  &.active {
    border-color: #007aff;
    background: #e6f7ff;
    color: #007aff;
  }
}
</style>
