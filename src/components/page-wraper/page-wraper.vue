<template>
  <view class="page-wraper" @click="handleClick"><slot /></view>
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
    safeAreaInsetBottom?: boolean
  }

  withDefaults(defineProps<Props>(), {
    safeAreaInsetBottom: true
  })

  function handleClick() {}
</script>
<style lang="scss" scoped>
.page-wraper {
  min-height: calc(100vh - var(--window-top) - var(--window-bottom));
  box-sizing: border-box;
  background: var(--up-filled-bottom, #ffffff);
}
</style>
