<template>
  <template v-if="showControls">
    <view class="up-swiper-nav__btn up-swiper-nav__btn--prev" @click="handleNav('prev')">
      <text class="up-swiper-nav__btn-icon">&lt;</text>
    </view>
    <view class="up-swiper-nav__btn up-swiper-nav__btn--next" @click="handleNav('next')">
      <text class="up-swiper-nav__btn-icon">&gt;</text>
    </view>
  </template>
  <view
    v-if="total >= minShowNum"
    :style="customStyle"
    :class="`up-swiper-nav up-swiper-nav--${direction} up-swiper-nav--${type} up-swiper-nav--${indicatorPosition} ${customClass}`"
  >
    <block v-if="type === 'dots' || type === 'dots-bar'">
      <view
        v-for="(_, index) in total"
        :key="index"
        :class="`up-swiper-nav__item--${type} ${current === index ? 'is-active' : ''} is-${direction}`"
      ></view>
    </block>
    <block v-else-if="type === 'line'">
      <view
        v-for="(_, index) in total"
        :key="index"
        :class="`up-swiper-nav__item--line ${index <= current ? 'is-active' : ''} is-${direction}`"
      ></view>
    </block>
    <block v-if="type === 'fraction'">{{ current + 1 }}/{{ total }}</block>
  </view>
</template>

<script lang="ts" setup>
  import { swiperNavprops } from './types'

  defineProps(swiperNavprops)

  const emit = defineEmits(['change'])

  function handleNav(dir: 'prev' | 'next') {
    emit('change', { dir, source: 'nav' })
  }
</script>

<script lang="ts">
  import { PREFIX } from '../../common/event'

  const componentName = `${PREFIX}-swiper-nav`

  export default {
    name: componentName,
    options: {
      virtualHost: true,
      addGlobalClass: true,
      styleIsolation: 'shared'
    }
  }
</script>

<style lang="scss">
@use './index.scss';
</style>
