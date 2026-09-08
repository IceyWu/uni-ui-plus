<template>
  <page-wraper>
    <view class="page-livephoto">
      <demo-group title="基本用法">
        <demo-group-item title="基本用法">
          <up-live-photo height="200" radius="12" width="300" :src="demoData.imageSrc" :video-src="demoData.videoSrc" />
        </demo-group-item>
      </demo-group>

      <demo-group title="自定义圆角">
        <demo-group-item title="自定义圆角">
          <view class="page-livephoto__slider">
            <text>圆角：{{ customRadius }} rpx</text>
            <slider show-value :max="100" :min="0" :step="10" :value="customRadius" @change="onRadiusChange" />
          </view>
          <up-live-photo height="200" width="300" :radius="customRadius" :src="demoData.imageSrc" :video-src="demoData.videoSrc" />
        </demo-group-item>
      </demo-group>

      <demo-group title="自动播放">
        <demo-group-item title="自动播放">
          <up-live-photo height="200" radius="12" width="300" :autoplay="true" :src="demoData.imageSrc" :video-src="demoData.videoSrc" />
        </demo-group-item>
      </demo-group>

      <demo-group title="隐藏指示器">
        <demo-group-item title="隐藏指示器">
          <up-live-photo height="200" radius="12" width="300" :show-indicator="false" :src="demoData.imageSrc" :video-src="demoData.videoSrc" />
        </demo-group-item>
      </demo-group>

      <demo-group title="展示模式">
        <demo-group-item title="展示模式">
          <up-live-photo height="200" radius="12" width="300" :display-only="true" :src="demoData.imageSrc" :video-src="demoData.videoSrc" />
        </demo-group-item>
      </demo-group>

      <demo-group title="自定义指示器位置">
        <demo-group-item title="自定义指示器位置">
          <up-live-photo
            height="200"
            indicator-left="50"
            indicator-top="30"
            radius="12"
            width="300"
            :src="demoData.imageSrc"
            :video-src="demoData.videoSrc"
          />
        </demo-group-item>
      </demo-group>

      <demo-group title="自定义图片插槽">
        <demo-group-item title="自定义图片插槽">
          <up-live-photo height="200" radius="12" width="300" :src="'invalid-url'" :video-src="demoData.videoSrc">
            <template #error>
              <view class="page-livephoto__error">
                <text>图片加载失败</text>
              </view>
            </template>
          </up-live-photo>
        </demo-group-item>
      </demo-group>

      <demo-group title="事件监听">
        <demo-group-item title="带静音控制">
          <up-live-photo
            height="200"
            radius="12"
            width="300"
            :autoplay="true"
            :muted="isMuted"
            :show-mute-button="true"
            :src="demoData.imageSrc"
            :video-src="demoData.videoSrc"
            @update:muted="(val) => (isMuted = val)"
          />
        </demo-group-item>
      </demo-group>
    </view>
  </page-wraper>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue'
  import UpLivePhoto from '@/uni_modules/uni-ui-plus/components/up-live-photo/up-live-photo.vue'

  const demoData = reactive({
    imageSrc: 'https://nest-js.oss-accelerate.aliyuncs.com/nestTest/1/1733058160256.JPEG',
    videoSrc: 'https://nest-js.oss-accelerate.aliyuncs.com/nestTest/1/1733058160657.MOV'
  })

  const customRadius = ref(20)
  const isMuted = ref(false)

  function onRadiusChange(e: { detail: { value: number } }) {
    customRadius.value = e.detail.value
  }
</script>

<style lang="scss" scoped>
.page-livephoto {
  &__slider { display: flex; flex-direction: column; gap: 12rpx; margin-bottom: 24rpx; }
  &__error { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background-color: var(--up-danger-surface, #fff2f0); color: var(--up-danger-main, #ff4d4f); }
}
</style>
