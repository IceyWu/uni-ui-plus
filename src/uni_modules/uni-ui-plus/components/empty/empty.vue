<script setup lang="ts">
import { computed, defineComponent } from 'vue'
import { PREFIX } from '../_constants'
import { getMainClass, pxCheck } from '../_utils'
import { emptyProps } from './empty'

const props = defineProps(emptyProps)
interface statusOptions {
  [key: string]: string
}

const defaultStatus: statusOptions = {
  empty: 'http://nest-js.oss-accelerate.aliyuncs.com/nestTest/1/1749107561944.svg',
  error: 'http://nest-js.oss-accelerate.aliyuncs.com/nestTest/1/1749107562341.svg',
  network: 'http://nest-js.oss-accelerate.aliyuncs.com/nestTest/1/1749107562606.svg'
}
const classes = computed(() => {
  return getMainClass(props, componentName)
})
const style = computed(() => {
  if (props.imageSize) {
    return {
      width: pxCheck(props.imageSize),
      height: pxCheck(props.imageSize)
    }
  }
  return {}
})
const isHttpUrl = props.image.startsWith('https://') || props.image.startsWith('http://') || props.image.startsWith('//')
const src = isHttpUrl ? props.image : defaultStatus[props.image]
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
      <slot name="image">
        <image v-if="src" class="up-empty__box--img" :src="src" />
      </slot>
    </view>

    <slot name="description">
      <view class="up-empty__description">
        {{ description }}
      </view>
    </slot>

    <slot />
  </view>
</template>

<style lang="scss">
@use './index' as *;
</style>
