<script lang="ts" setup>
import type { CSSProperties } from "vue";
import { computed, defineComponent } from "vue";
import { PREFIX } from "../_constants";
</script>

<script lang="ts">
const componentName = `${PREFIX}-button`;

export default defineComponent({
  name: componentName,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    // #ifndef H5
    styleIsolation: "shared",
    // #endif
  },
});
</script>

<template>
  <button>
    <view class="up-button__wrap">
      <slot> 按钮 </slot>
    </view>
  </button>
</template>

<style lang="scss">
@use "./index" as *;
</style>
