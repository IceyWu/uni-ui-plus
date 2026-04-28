<template>
  <view :class="['demo-group', customClass]" :style="rootStyle">
    <view class="demo-group__title">{{ title }}</view>
    <view class="demo-group__container">
      <slot />
    </view>
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
  title?: string
  customStyle?: string
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
  background: $filled-oppo;
  &:last-child {
    padding-bottom: $padding-loose;
  }

  &__title {
    box-sizing: border-box;
    font-size: $typography-body-size-extra-large;
    font-weight: $font-weight-medium;
    color: $text-main;
    line-height: $typography-body-line-height-size-large;
    padding: $padding-loose;
  }

  &__container {
    padding-bottom: $padding-loose;
  }
}
</style>
