<template>
  <view v-if="showControls" class="up-swiper-nav__btn">
    <view class="up-swiper-nav__btn--prev" @click="handleNav('prev')" />
    <view class="up-swiper-nav__btn--next" @click="handleNav('next')" />
  </view>
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
    <block v-if="type === 'fraction'">{{ current + 1 }}/{{ total }}</block>
    <block v-if="type === 'line'">
      <view
        v-for="(_, index) in total"
        :key="index"
        :class="`up-swiper-nav__item--line ${index <= current ? 'is-active' : ''} is-${direction}`"
      ></view>
    </block>
  </view>
</template>

<script lang="ts" setup>
import { swiperNavprops } from './types'

defineProps(swiperNavprops)

const emit = defineEmits(['change'])

function handleNav(dir: 'prev' | 'next') {
  const source: string = 'nav'
  emit('change', { dir, source })
}
</script>

<style lang="scss" scoped>
@use './index.scss';
</style>
