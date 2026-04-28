<template>
  <page-wraper>
    <view class="page-livephoto">
      <demo-group title="组件类型">
        <demo-group-item title="基本使用">
          <up-live-photo :video-src="demoData.videoSrc" :src="demoData.imageSrc" width="300" height="200" radius="12" />
        </demo-group-item>

        <demo-group-item title="自动播放">
          <up-live-photo :video-src="demoData.videoSrc" :src="demoData.imageSrc" width="300" height="200" radius="12" :autoplay="true" />
        </demo-group-item>
      </demo-group>

      <demo-group title="组件样式">
        <demo-group-item title="自定义圆角">
          <view class="page-livephoto__slider">
            <text>圆角：{{ customRadius }} rpx</text>
            <slider @change="onRadiusChange" :min="0" :max="100" :step="10" :value="customRadius" show-value />
          </view>
          <up-live-photo :video-src="demoData.videoSrc" :src="demoData.imageSrc" width="300" height="200" :radius="customRadius" />
        </demo-group-item>

        <demo-group-item title="隐藏指示器">
          <up-live-photo :video-src="demoData.videoSrc" :src="demoData.imageSrc" width="300" height="200" radius="12" :show-indicator="false" />
        </demo-group-item>

        <demo-group-item title="展示模式">
          <up-live-photo :video-src="demoData.videoSrc" :src="demoData.imageSrc" width="300" height="200" radius="12" :display-only="true" />
        </demo-group-item>
      </demo-group>

      <demo-group title="自定义">
        <demo-group-item title="自定义插槽">
          <up-live-photo :video-src="demoData.videoSrc" :src="'invalid-url'" width="300" height="200" radius="12">
            <template #error>
              <view class="page-livephoto__error">
                <text>图片加载失败</text>
              </view>
            </template>
          </up-live-photo>
        </demo-group-item>
      </demo-group>
    </view>
  </page-wraper>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import UpLivePhoto from '@/uni_modules/uni-ui-plus/components/up-livephoto/up-livephoto.vue'

const demoData = reactive({
  videoSrc: 'https://nest-js.oss-accelerate.aliyuncs.com/nestTest/1/1733058160657.MOV',
  imageSrc: 'https://nest-js.oss-accelerate.aliyuncs.com/nestTest/1/1733058160256.JPEG'
})

const customRadius = ref(20)

function onRadiusChange(e: any) {
  customRadius.value = e.detail.value
}
</script>

<style lang="scss" scoped>
.page-livephoto {
  &__slider {
    display: flex;
    flex-direction: column;
    gap: 12rpx;
    margin-bottom: 24rpx;
  }
  &__error {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff2f0;
    color: #ff4d4f;
  }
}
</style>
