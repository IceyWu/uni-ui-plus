<script lang="ts" setup>
  import { computed, onUnmounted, ref } from 'vue'
  import { addUnit, isDef, objToStyle } from '../../common/util'
  import { type ImageEmits, imageProps } from './types'

  const props = defineProps(imageProps)
  const emit = defineEmits<ImageEmits>()

  const status = ref<'loading' | 'error' | 'success'>('loading')
  let delayTimer: ReturnType<typeof setTimeout> | null = null

  function handleLoad(e: any) {
    if (delayTimer) {
      clearTimeout(delayTimer)
      delayTimer = null
    }
    if (props.delay) {
      delayTimer = setTimeout(() => {
        delayTimer = null
        status.value = 'success'
        emit('load', e)
      }, props.delay)
      return
    }
    status.value = 'success'
    emit('load', e)
  }
  function handleError(e: any) {
    if (delayTimer) {
      clearTimeout(delayTimer)
      delayTimer = null
    }
    status.value = 'error'
    emit('error', e)
  }
  const rootStyle = computed(() => {
    const style: Record<string, string | number> = {}
    if (isDef(props.height)) {
      style.height = addUnit(props.height)
    }
    if (isDef(props.width)) {
      style.width = addUnit(props.width)
    }
    if (isDef(props.minHeight)) {
      style.minHeight = addUnit(props.minHeight)
    }
    if (isDef(props.radius)) {
      style['border-radius'] = addUnit(props.radius)
      style.overflow = 'hidden'
    }
    return `${objToStyle(style)}${props.customStyle}`
  })
  const rootClass = computed(() => `up-img ${props.round ? 'up-img--round' : ''} ${props.customClass}`)
  const filterStyle = computed(() => {
    const style: Record<string, string | number> = {}
    if (isDef(props.filter)) {
      style.filter = `blur(${addUnit(props.filter)})`
    }
    return objToStyle(style)
  })
  function handleClick(event: MouseEvent) {
    if (props.enablePreview && props.src && status.value == 'success') {
      uni.previewImage({
        urls: [props.previewSrc || props.src]
      })
    }
    emit('click', event)
  }

  onUnmounted(() => {
    if (delayTimer) {
      clearTimeout(delayTimer)
    }
  })
</script>

<script lang="ts">
  import { PREFIX } from '../../common/event'

  const componentName = `${PREFIX}-image`
  export default {
    name: componentName,
    options: {
      addGlobalClass: true,
      // #ifndef H5
      styleIsolation: 'shared',
      virtualHost: true
      // #endif
    }
  }
</script>

<template>
  <view :class="rootClass" :style="rootStyle" @click="handleClick">
    <!-- 主图片 -->
    <image
      class="up-img--success"
      :lazy-load="lazyLoad"
      :mode="mode"
      :src="src"
      :style="status !== 'success' ? 'width:0;height:0;' : ``"
      @error="handleError"
      @load="handleLoad"
    />

    <!-- loading 占位插槽 -->
    <slot name="loading" v-if="status === 'loading'">
      <view class="up-img--loading">
        <template v-if="!placeholderSrc">{{ loadingText }}</template>
        <image class="up-img--placeholder" :mode="mode" :src="placeholderSrc" :style="filterStyle" />
      </view>
    </slot>

    <!-- error 插槽 -->
    <slot name="error" v-if="status === 'error'"> <view class="up-img--error">{{ errorText }}</view> </slot>
  </view>
</template>

<style lang="scss">
@use './index' as *;
</style>
