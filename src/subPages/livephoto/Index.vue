<template>
  <page-wraper>
    <!-- 基本用法 -->
    <demo-block title="基本用法">
      <view class="demo-item">
        <up-live-photo :video-src="demoData.videoSrc" :image-src="demoData.imageSrc" width="300" height="200" radius="12" />
      </view>
    </demo-block>

    <!-- 自定义圆角 -->
    <demo-block title="自定义圆角">
      <view class="demo-item">
        <text>圆角：{{ customRadius }} rpx</text>
        <slider @change="onRadiusChange" :min="0" :max="100" :step="10" :value="customRadius" show-value style="width: 300px; margin: 20rpx 0" />
      </view>
      <view class="demo-item">
        <up-live-photo :video-src="demoData.videoSrc" :image-src="demoData.imageSrc" width="300" height="200" :radius="customRadius" />
      </view>
    </demo-block>

    <!-- 不同尺寸 -->
    <demo-block title="不同尺寸">
      <view class="demo-grid">
        <view class="demo-grid-item">
          <text class="size-label">小</text>
          <up-live-photo :video-src="demoData.videoSrc" :image-src="demoData.imageSrc" width="120" height="80" radius="8" />
        </view>
        <view class="demo-grid-item">
          <text class="size-label">中</text>
          <up-live-photo :video-src="demoData.videoSrc" :image-src="demoData.imageSrc" width="180" height="120" radius="12" />
        </view>
        <view class="demo-grid-item">
          <text class="size-label">大</text>
          <up-live-photo :video-src="demoData.videoSrc" :image-src="demoData.imageSrc" width="240" height="160" radius="16" />
        </view>
      </view>
    </demo-block>

    <!-- 自定义提示文本 -->
    <demo-block title="自定义提示文本">
      <view class="demo-item">
        <up-live-photo
          :video-src="demoData.videoSrc"
          :image-src="demoData.imageSrc"
          width="300"
          height="200"
          radius="12"
          hint-text="按住播放动态效果"
        />
      </view>
    </demo-block>

    <!-- 隐藏指示器和提示 -->
    <demo-block title="隐藏指示器和提示">
      <view class="demo-item">
        <up-live-photo
          :video-src="demoData.videoSrc"
          :image-src="demoData.imageSrc"
          width="300"
          height="200"
          radius="12"
          :show-indicator="false"
          :show-hint="false"
        />
      </view>
    </demo-block>

    <!-- 事件监听 -->
    <demo-block title="事件监听">
      <view class="demo-item">
        <up-live-photo
          :video-src="demoData.videoSrc"
          :image-src="demoData.imageSrc"
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
        <up-live-photo ref="livePhotoRef" :video-src="demoData.videoSrc" :image-src="demoData.imageSrc" width="300" height="200" radius="12" />
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
</script>

<style lang="scss" scoped>
.demo-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20rpx;
  margin: 20rpx 0;
}

.demo-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20rpx;
  justify-content: space-around;
  margin: 20rpx 0;
}

.demo-grid-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10rpx;
}

.size-label {
  font-size: 28rpx;
  color: #666;
  margin-bottom: 10rpx;
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
  background-color: #e8f4fd;
  border-radius: 8rpx;
  text-align: center;
}

.status-info text {
  font-size: 28rpx;
  color: #007aff;
}
</style>
