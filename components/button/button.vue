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
    <view class="up-button__wrap"> 11 </view>
  </button>
</template>

<style lang="scss">
@import "./index";
</style>
