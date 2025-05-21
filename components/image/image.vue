<script lang="ts" setup>
import { computed, ref } from "vue";
import { addUnit, isDef, objToStyle } from "../_utils";
import { imageProps } from "./image";

const props = defineProps(imageProps);
const emit = defineEmits(["load", "error"]);

const status = ref<"loading" | "error" | "success">("loading");

function handleLoad(e: any) {
  if (props.delay) {
    setTimeout(() => {
      status.value = "success";
      emit("load", e);
    }, props.delay);
    return;
  }
  status.value = "success";
  emit("load", e);
}
function handleError(e: any) {
  status.value = "error";
  emit("error", e);
}
const rootStyle = computed(() => {
  const style: Record<string, string | number> = {};
  if (isDef(props.height)) {
    style.height = addUnit(props.height);
  }
  if (isDef(props.width)) {
    style.width = addUnit(props.width);
  }
  if (isDef(props.radius)) {
    style["border-radius"] = addUnit(props.radius);
    style.overflow = "hidden";
  }
  return `${objToStyle(style)}${props.customStyle}`;
});
const rootClass = computed(() => {
  return `up-img  ${props.round ? "is-round" : ""} ${props.customClass}`;
});
const filterStyle = computed(() => {
  const style: Record<string, string | number> = {};
  if (isDef(props.filter)) {
    style.filter = `blur(${addUnit(props.filter)})`;
  }
  return objToStyle(style);
});
</script>

<script lang="ts">
import { PREFIX } from "../_constants";

const componentName = `${PREFIX}-image`;
export default {
  name: componentName,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    // #ifndef H5
    styleIsolation: "shared",
    // #endif
  },
};
</script>

<template>
  <view :class="rootClass" :style="rootStyle">
    <!-- 主图片 -->
    <image
      class="up-img--success"
      :style="status !== 'success' ? 'width:0;height:0;' : ``"
      :src="src"
      :mode="mode"
      :lazy-load="lazyLoad"
      @load="handleLoad"
      @error="handleError"
    />

    <!-- loading 占位插槽 -->
    <slot v-if="status === 'loading'" name="loading">
      <view class="up-img--loading">
        加载中...
        <image
          class="up-img--placeholder"
          :src="placeholderSrc"
          :style="filterStyle"
          mode="aspectFill"
        />
      </view>
    </slot>

    <!-- error 插槽 -->
    <slot v-if="status === 'error'" name="error">
      <view class="up-img--error"> 加载异常 </view>
    </slot>
  </view>
</template>

<style lang="scss">
@import "./index";
</style>
