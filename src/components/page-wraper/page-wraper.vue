<template>
  <view :class="['page-wraper', { 'page-wraper--safe-area': props.safeAreaInsetBottom, 'up-theme-dark': darkMode.isDark.value }]">
    <view class="page-wraper__theme-switch" v-if="props.showDarkMode">
      <text>{{ $t('qie-huan-an-hei') }}</text>
      <switch color="#1989fa" :checked="darkMode.isDark.value" @change="handleDarkModeChange" />
    </view>
    <slot />
  </view>
</template>
<script lang="ts">
  export default {
    options: {
      addGlobalClass: true,
      styleIsolation: 'shared',
      virtualHost: true
    }
  }
</script>
<script lang="ts" setup>
  import { useDark } from '../../store'

  interface Props {
    safeAreaInsetBottom?: boolean
    showDarkMode?: boolean
  }

  const props = withDefaults(defineProps<Props>(), {
    safeAreaInsetBottom: true,
    showDarkMode: false
  })

  const darkMode = useDark()

  function handleDarkModeChange(event: { detail: { value: boolean } }) {
    darkMode.setDark(event.detail.value)
  }
</script>
<style lang="scss" scoped>
.page-wraper {
  min-height: calc(100vh - var(--window-top) - var(--window-bottom));
  box-sizing: border-box;
  background: var(--up-filled-bottom, #ffffff);

  &--safe-area {
    padding-bottom: env(safe-area-inset-bottom);
  }

  &__theme-switch {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 20px;
    color: var(--up-text-main, #333333);
    background: var(--up-filled-oppo, #ffffff);
    font-size: 14px;
  }
}
</style>
