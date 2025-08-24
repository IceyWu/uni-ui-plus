<template>
  <page-wraper>
    <!-- 基本用法 -->
    <demo-block title="基本用法">
      <view class="demo-item">
        <up-live-photo :video-src="demoData.videoSrc" :src="demoData.imageSrc" width="300" height="200" radius="12" />
      </view>
    </demo-block>

    <!-- 自定义圆角 -->
    <demo-block title="自定义圆角">
      <view class="demo-item">
        <text>圆角：{{ customRadius }} rpx</text>
        <slider @change="onRadiusChange" :min="0" :max="100" :step="10" :value="customRadius" show-value style="width: 300px; margin: 20rpx 0" />
      </view>
      <view class="demo-item">
        <up-live-photo :video-src="demoData.videoSrc" :src="demoData.imageSrc" width="300" height="200" :radius="customRadius" />
      </view>
    </demo-block>

    <!-- 不同尺寸 -->
    <demo-block title="自动播放">
      <view class="demo-item">
        <text>自动播放模式，视频会自动开始播放，结束后仍可手动交互</text>
        <up-live-photo :video-src="demoData.videoSrc" :src="demoData.imageSrc" width="300" height="200" radius="12" :autoplay="true" />
      </view>
    </demo-block>

    <!-- 隐藏指示器 -->
    <demo-block title="隐藏指示器">
      <view class="demo-item">
        <up-live-photo :video-src="demoData.videoSrc" :src="demoData.imageSrc" width="300" height="200" radius="12" :show-indicator="false" />
      </view>
    </demo-block>

    <!-- 事件监听 -->
    <demo-block title="事件监听">
      <view class="demo-item">
        <up-live-photo
          :video-src="demoData.videoSrc"
          :src="demoData.imageSrc"
          width="300"
          height="200"
          radius="12"
          @press-start="onPressStart"
          @press-end="onPressEnd"
          @video-play="onVideoPlay"
          @video-pause="onVideoPause"
        />
      </view>
      <view class="event-log">
        <text class="event-title">事件日志：</text>
        <view class="event-list">
          <text v-for="(log, index) in eventLogs" :key="index" class="event-item">
            {{ log }}
          </text>
        </view>
      </view>
    </demo-block>

    <!-- 组件方法调用 -->
    <demo-block title="组件方法">
      <view class="demo-item">
        <up-live-photo ref="livePhotoRef" :video-src="demoData.videoSrc" :src="demoData.imageSrc" width="300" height="200" radius="12" />
      </view>
      <view class="demo-buttons">
        <button @click="stopVideo" size="mini" type="primary">停止播放</button>
        <button @click="checkIsPlaying" size="mini" type="default">检查播放状态</button>
        <button @click="resetComponent" size="mini" type="warn">重置组件</button>
      </view>
      <view v-if="playingStatus !== null" class="status-info">
        <text>播放状态：{{ playingStatus ? '播放中' : '已停止' }}</text>
      </view>
    </demo-block>

    <!-- 自定义插槽 -->
    <demo-block title="自定义插槽">
      <view class="demo-item">
        <up-live-photo :video-src="demoData.videoSrc" :src="'invalid-url'" width="300" height="200" radius="12">
          <template #loading>
            <view class="custom-loading">
              <text class="loading-text">正在加载...</text>
              <view class="loading-spinner"></view>
            </view>
          </template>
          <template #error>
            <view class="custom-error">
              <text class="error-text">图片加载失败</text>
              <text class="error-desc">请检查网络连接</text>
            </view>
          </template>
        </up-live-photo>
      </view>
    </demo-block>

    <!-- 展示模式 -->
    <demo-block title="展示模式">
      <view class="demo-item">
        <text>展示模式下只显示图片和指示器，不支持视频交互</text>
        <up-live-photo :video-src="demoData.videoSrc" :src="demoData.imageSrc" width="300" height="200" radius="12" :display-only="true" />
      </view>
    </demo-block>

    <!-- 自定义指示器位置 -->
    <demo-block title="自定义指示器位置">
      <view class="demo-item">
        <text>自定义指示器的位置</text>
        <view class="position-controls">
          <view class="control-item">
            <text>Left: {{ indicatorLeft }}rpx</text>
            <slider @change="onIndicatorLeftChange" :min="0" :max="200" :step="10" :value="indicatorLeft" show-value style="width: 250px" />
          </view>
          <view class="control-item">
            <text>Top: {{ indicatorTop }}rpx</text>
            <slider @change="onIndicatorTopChange" :min="0" :max="150" :step="10" :value="indicatorTop" show-value style="width: 250px" />
          </view>
        </view>
        <up-live-photo
          :video-src="demoData.videoSrc"
          :src="demoData.imageSrc"
          width="300"
          height="200"
          radius="12"
          :indicator-left="indicatorLeft"
          :indicator-top="indicatorTop"
        />
      </view>
    </demo-block>

    <!-- 自定义图片插槽 -->
    <demo-block title="自定义图片插槽">
      <view class="demo-item">
        <text>使用插槽自定义图片内容</text>
        <up-live-photo :video-src="demoData.videoSrc" :src="demoData.imageSrc" width="300" height="200" radius="12">
          <template #image="{ src }">
            <view class="custom-image-container">
              <image :src="src" mode="aspectFill" class="custom-image" @load="onCustomImageLoad" @error="onCustomImageError" />
              <view class="custom-overlay">
                <text class="overlay-text">自定义图片</text>
              </view>
            </view>
          </template>
        </up-live-photo>
      </view>
    </demo-block>
  </page-wraper>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { LivePhotoInstance } from '@/uni_modules/uni-ui-plus/components/livephoto/type'
import UpLivePhoto from '@/uni_modules/uni-ui-plus/components/livephoto/livephoto.vue'

// 引用
const livePhotoRef = ref<LivePhotoInstance>()

// 演示数据
const demoData = reactive({
  // 这里使用示例的视频和图片链接，实际使用时请替换为真实的资源
  videoSrc: 'https://nest-js.oss-accelerate.aliyuncs.com/nestTest/1/1733058160657.MOV',
  imageSrc: 'https://nest-js.oss-accelerate.aliyuncs.com/nestTest/1/1733058160256.JPEG'
})

// 自定义圆角
const customRadius = ref(20)

// 自定义指示器位置
const indicatorLeft = ref(20)
const indicatorTop = ref(20)

// 播放状态
const playingStatus = ref<boolean | null>(null)

// 事件日志
const eventLogs = ref<string[]>([])

// 添加事件日志
function addEventLog(event: string) {
  const timestamp = new Date().toLocaleTimeString()
  eventLogs.value.unshift(`${timestamp} - ${event}`)
  // 保持最新的10条记录
  if (eventLogs.value.length > 10) {
    eventLogs.value.splice(10)
  }
}

// 圆角变化
function onRadiusChange(e: any) {
  customRadius.value = e.detail.value
}

// 指示器位置变化
function onIndicatorLeftChange(e: any) {
  indicatorLeft.value = e.detail.value
}

function onIndicatorTopChange(e: any) {
  indicatorTop.value = e.detail.value
}

// 事件处理
function onPressStart() {
  addEventLog('开始长按')
}

function onPressEnd() {
  addEventLog('结束长按')
}

function onVideoPlay() {
  addEventLog('视频开始播放')
}

function onVideoPause() {
  addEventLog('视频暂停播放')
}

// 组件方法调用
function stopVideo() {
  if (livePhotoRef.value) {
    livePhotoRef.value.stopVideo()
    addEventLog('手动停止视频')
  }
}

function checkIsPlaying() {
  if (livePhotoRef.value) {
    playingStatus.value = livePhotoRef.value.isPlaying()
    addEventLog(`检查播放状态：${playingStatus.value ? '播放中' : '已停止'}`)
  }
}

function resetComponent() {
  if (livePhotoRef.value) {
    livePhotoRef.value.reset()
    playingStatus.value = null
    addEventLog('重置组件状态')
  }
}

// 自定义图片事件
function onCustomImageLoad() {
  addEventLog('自定义图片加载成功')
}

function onCustomImageError() {
  addEventLog('自定义图片加载失败')
}
</script>

<style lang="scss" scoped>
.demo-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20rpx;
  margin: 20rpx 0;
}

.demo-item text {
  font-size: 28rpx;
  color: #666;
  text-align: center;
  margin-bottom: 16rpx;
}

.event-log {
  margin-top: 30rpx;
  padding: 20rpx;
  background-color: #f8f9fa;
  border-radius: 12rpx;
}

.event-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #333;
  margin-bottom: 16rpx;
}

.event-list {
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}

.event-item {
  font-size: 28rpx;
  color: #666;
  padding: 8rpx 0;
  border-bottom: 1rpx solid #eee;
}

.demo-buttons {
  display: flex;
  gap: 20rpx;
  margin: 20rpx 0;
  flex-wrap: wrap;
  justify-content: center;
}

.status-info {
  margin-top: 20rpx;
  padding: 16rpx;
  background-color: #e7f3ff;
  border-radius: 8rpx;
  text-align: center;
}

.custom-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
}

.loading-text {
  font-size: 28rpx;
  color: #666;
  margin-bottom: 10rpx;
}

.loading-spinner {
  width: 40rpx;
  height: 40rpx;
  border: 4rpx solid #e0e0e0;
  border-top: 4rpx solid #007aff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.custom-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: #fff2f0;
  border: 2rpx solid #ffccc7;
}

.error-text {
  font-size: 30rpx;
  color: #ff4d4f;
  margin-bottom: 8rpx;
}

.error-desc {
  font-size: 24rpx;
  color: #999;
}

.status-info text {
  font-size: 28rpx;
  color: #007aff;
}

.custom-image-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.custom-image {
  width: 100%;
  height: 100%;
}

.custom-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
  padding: 16rpx;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}

.overlay-text {
  color: white;
  font-size: 28rpx;
  font-weight: 500;
}

.position-controls {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
  margin: 20rpx 0;
  padding: 20rpx;
  background-color: #f8f9fa;
  border-radius: 12rpx;
}

.control-item {
  display: flex;
  flex-direction: column;
  gap: 10rpx;
}

.control-item text {
  font-size: 28rpx;
  color: #333;
  margin-bottom: 0 !important;
}
</style>
