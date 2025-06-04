<template>
  <page-wraper>
    <demo-block :title="$t('jiBenYongFa')">
      <up-skeleton />
    </demo-block>
    <demo-block :title="$t('skeleton-animate')">
      <view class="demo-skeleton">
        <view class="demo-item">
          <switch checked @change="switchChange" />
        </view>
        <view class="demo-item">
          <up-skeleton :animate="isShowLoading" />
        </view>
        <view class="demo-item">
          <up-skeleton :animate="isShowLoading" type="avatar" :avatarSize="80" avatarShape="circle" />
        </view>
      </view>
    </demo-block>
    <demo-block :title="$t('skeleton-title-rows')">
      <up-skeleton :rows="1" />
    </demo-block>
    <demo-block :title="$t('skeleton-title-width')">
      <up-skeleton titleWidth="50%" />
    </demo-block>
    <demo-block :title="$t('skeleton-avatar')">
      <up-skeleton type="avatar" :avatarSize="80" avatarShape="circle" />
    </demo-block>
  </page-wraper>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import UpSkeleton from '@/uni_modules/uni-ui-plus/components/skeleton/skeleton.vue'
const isShowLoading = ref(true)
const switchChange = (e: any) => {
  isShowLoading.value = e.detail.value
}
</script>

<style lang="scss" scoped>
.demo-item {
  margin-bottom: 20rpx;
  &:last-child {
    margin-bottom: 0;
  }
}
</style>
