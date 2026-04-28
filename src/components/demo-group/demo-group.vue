<template>
  <view :class="['demo-group', customClass]" :style="rootStyle">
    <view class="demo-group__title">{{ title }}</view>
    <view class="demo-group__container"><slot /></view>
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
  import { computed } from 'vue'

  interface Props {
    customClass?: string
    customStyle?: string
    title?: string
    transparent?: boolean
  }

  const props = withDefaults(defineProps<Props>(), {
    title: '',
    transparent: false,
    customClass: '',
    customStyle: ''
  })

  const rootStyle = computed(() => {
    const transparentStyle = props.transparent ? 'background: transparent;' : ''
    return `${transparentStyle} ${props.customStyle || ''}`.trim()
  })
</script>
<style lang="scss" scoped>
.demo-group {
  width: 100%;
  position: relative;
  background: var(--up-filled-oppo, #ffffff);
  &:last-child {
    padding-bottom: 32rpx;
  }

  &__title {
    box-sizing: border-box;
    font-size: 36rpx;
    font-weight: 500;
    color: var(--up-text-main, #18181B);
    line-height: 48rpx;
    padding: 32rpx;
  }

  &__container {
    padding-bottom: 32rpx;
  }
}
</style>
