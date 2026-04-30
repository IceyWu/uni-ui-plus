<template>
  <page-wraper>
    <view class="page-about">
      <view class="page-about__header">
        <image class="page-about__logo" src="/static/icon/logo.png" mode="aspectFit" />
        <text class="page-about__name">uni-ui-plus</text>
        <text class="page-about__version">v0.0.70</text>
        <text class="page-about__desc">基于 Vue3+TS 的 uni-app 组件库</text>
      </view>

      <view class="page-about__links">
        <view class="page-about__link-item" @click="copyLink('https://github.com/iceywu/uni-ui-plus')">
          <text class="page-about__link-label">GitHub</text>
          <text class="page-about__link-value">github.com/iceywu/uni-ui-plus</text>
        </view>
      </view>
    </view>
  </page-wraper>
</template>

<script lang="ts" setup>
  function copyLink(url: string) {
    uni.setClipboardData({ data: url })
  }
</script>

<style lang="scss" scoped>
.page-about {
  &__header {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 60rpx 0 40rpx;
  }
  &__logo {
    width: 120rpx;
    height: 120rpx;
    margin-bottom: 20rpx;
  }
  &__name {
    font-size: 36rpx;
    font-weight: 600;
    color: var(--up-text-main, #18181B);
  }
  &__version {
    font-size: 24rpx;
    color: var(--up-text-secondary, #71717A);
    margin-top: 8rpx;
  }
  &__desc {
    font-size: 26rpx;
    color: var(--up-text-secondary, #71717A);
    margin-top: 16rpx;
  }
  &__links {
    margin: 40rpx 24rpx;
    background: var(--up-filled-oppo, #ffffff);
    border-radius: 16rpx;
    overflow: hidden;
  }
  &__link-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24rpx 32rpx;
    border-bottom: 1rpx solid var(--up-border-light, #F4F4F5);
    &:last-child {
      border-bottom: none;
    }
  }
  &__link-label {
    font-size: 28rpx;
    color: var(--up-text-main, #18181B);
  }
  &__link-value {
    font-size: 24rpx;
    color: var(--up-text-secondary, #71717A);
  }
}
</style>
