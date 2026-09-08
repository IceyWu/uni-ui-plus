<script lang="ts" setup>
  import { isString } from '../../common/util'
  import { skeletonProps } from './types'

  defineProps(skeletonProps)

  function getStyleVal(target: number | string) {
    if (isString(target)) {
      return target
    }
    return `${target}rpx`
  }
</script>

<script lang="ts">
  import { PREFIX } from '../../common/event'

  const componentName = `${PREFIX}-skeleton`

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
  <view class="unip-skeleton">
    <view class="unip-skeleton__wrapper" style="display: flex; flex-direction: row" v-if="loading">
      <!-- 头像 -->
      <template v-if="type === 'avatar'">
        <view
          class="unip-skeleton__wrapper__avatar"
          :class="[`unip-skeleton__wrapper__avatar--${avatarShape}`, animate && 'unip-animate']"
          :style="{
            height: getStyleVal(avatarSize),
            width: getStyleVal(avatarSize)
          }"
        />
      </template>
      <!-- 标题 -->
      <template v-else-if="type === 'title'">
        <view class="unip-skeleton__wrapper__title__list">
          <view
            class="unip-skeleton__wrapper__title"
            v-for="idx in rows"
            :key="idx"
            :class="[animate && 'unip-animate']"
            :style="{
              height: getStyleVal(titleHeight),
              width: idx === 1 ? '50%' : getStyleVal(titleWidth)
            }"
          />
        </view>
      </template>
    </view>
  </view>
</template>

<style lang="scss">
@use './index' as *;
</style>
