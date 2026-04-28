<template>
  <view :class="['demo-group-item', customClass, noPadding ? 'is-no-padding' : '']">
    <view class="demo-group-item__title">{{ title }}</view>
    <view class="demo-group-item__container"><slot /></view>
  </view>
</template>
<script lang="ts">
  export default {
    options: {
      addGlobalClass: true,
      virtualHost: true,
      styleIsolation: 'shared'
    }
  }
</script>
<script lang="ts" setup>
  interface Props {
    customClass?: string
    noPadding?: boolean
    title?: string
  }

  withDefaults(defineProps<Props>(), {
    title: '',
    customClass: '',
    noPadding: false
  })
</script>
<style lang="scss" scoped>
.demo-group-item {
  position: relative;

  &__title {
    padding: 24rpx 32rpx;
    font-size: 28rpx;
    font-weight: 500;
    color: var(--up-text-main, #18181B);
    line-height: 40rpx;
  }

  &__container {
    padding: 0 32rpx;
  }

  &.is-no-padding {
    .demo-group-item__container {
      padding: 0;
    }
  }
}
</style>
