<script lang="ts" setup>
  import { buttonEmits, buttonProps } from './types'

  defineProps(buttonProps)
  defineEmits(buttonEmits)
</script>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { PREFIX } from '../../common/event'

  const componentName = `${PREFIX}-button`

  export default defineComponent({
    name: componentName,
    options: {
      virtualHost: true,
      addGlobalClass: true,
      // #ifndef H5
      styleIsolation: 'shared'
      // #endif
    }
  })
</script>

<template>
  <button>
    <view class="up-button__wrap"><slot>按钮</slot></view>
  </button>
</template>

<style lang="scss">
@use './index' as *;
</style>
