<template>
  <page-wraper>
    <view class="page-skeleton">
      <demo-group title="组件类型">
        <demo-group-item title="基本使用">
          <up-skeleton />
        </demo-group-item>

        <demo-group-item title="头像骨架">
          <up-skeleton type="avatar" :avatarSize="80" avatarShape="circle" />
        </demo-group-item>
      </demo-group>

      <demo-group title="组件样式">
        <demo-group-item title="动画效果">
          <view class="page-skeleton__switch">
            <text>动画开关</text>
            <switch :checked="isAnimate" @change="switchChange" />
          </view>
          <up-skeleton :animate="isAnimate" />
          <view style="margin-top: 24rpx">
            <up-skeleton :animate="isAnimate" type="avatar" :avatarSize="80" avatarShape="circle" />
          </view>
        </demo-group-item>

        <demo-group-item title="自定义行数">
          <up-skeleton :rows="1" />
        </demo-group-item>

        <demo-group-item title="自定义宽度">
          <up-skeleton titleWidth="50%" />
        </demo-group-item>
      </demo-group>
    </view>
  </page-wraper>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import UpSkeleton from '@/uni_modules/uni-ui-plus/components/up-skeleton/up-skeleton.vue'

const isAnimate = ref(true)
const switchChange = (e: any) => {
  isAnimate.value = e.detail.value
}
</script>

<style lang="scss" scoped>
.page-skeleton {
  &__switch {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24rpx;
  }
}
</style>
