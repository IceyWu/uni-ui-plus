<script setup lang="ts">
  import { computed, defineComponent } from 'vue'
  import { PREFIX } from '../../common/event'
  import { getMainClass, pxCheck } from '../../common/util'
  import { type EmptyImageMap, emptyProps } from './types'

  const props = defineProps(emptyProps)

  const DEFAULT_IMAGES: EmptyImageMap = {
    empty:
      'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="160" height="160" fill="none"%3E%3Ccircle cx="80" cy="80" r="60" fill="%23F5F5F5"/%3E%3Cpath d="M60 90h40M70 75h20" stroke="%23BFBFBF" stroke-width="3" stroke-linecap="round"/%3E%3C/svg%3E',
    error:
      'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="160" height="160" fill="none"%3E%3Ccircle cx="80" cy="80" r="60" fill="%23FFF1F0"/%3E%3Cpath d="M65 65l30 30M95 65L65 95" stroke="%23FF4D4F" stroke-width="3" stroke-linecap="round"/%3E%3C/svg%3E',
    network:
      'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="160" height="160" fill="none"%3E%3Ccircle cx="80" cy="80" r="60" fill="%23FFF7E6"/%3E%3Cpath d="M60 85a28 28 0 0140 0M67 78a20 20 0 0126 0M74 71a12 12 0 0112 0" stroke="%23FAAD14" stroke-width="3" stroke-linecap="round"/%3E%3Ccircle cx="80" cy="92" r="3" fill="%23FAAD14"/%3E%3C/svg%3E'
  }

  const classes = computed(() => getMainClass(props, componentName))
  const style = computed(() => {
    if (props.imageSize) {
      return {
        width: pxCheck(props.imageSize),
        height: pxCheck(props.imageSize)
      }
    }
    return {}
  })

  const src = computed(() => {
    const image = props.image
    if (image.startsWith('https://') || image.startsWith('http://') || image.startsWith('//') || image.startsWith('data:')) {
      return image
    }
    return DEFAULT_IMAGES[image] || DEFAULT_IMAGES.empty
  })
</script>

<script lang="ts">
  const componentName = `${PREFIX}-empty`

  export default defineComponent({
    name: componentName,
    options: {
      virtualHost: true,
      addGlobalClass: true,
      styleIsolation: 'shared'
    }
  })
</script>

<template>
  <view :class="classes" :style="customStyle">
    <view class="up-empty__box" :style="style">
      <slot name="image"> <image v-if="src" class="up-empty__box--img" :src="src" /> </slot>
    </view>

    <slot name="description"> <view class="up-empty__description">{{ description }}</view> </slot>

    <slot />
  </view>
</template>

<style lang="scss">
@use './index' as *;
</style>
