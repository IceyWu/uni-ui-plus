<script lang="ts" setup>
import { onMounted } from "vue";
import { skeletonProps } from "./skeleton";
import { isString } from "../_utils";

defineProps(skeletonProps);

onMounted(() => {});
function getStyleVal(target: number | string) {
  if (isString(target)) {
    return target;
  }
  return `${target}rpx`;
}
</script>

<script lang="ts">
import { PREFIX } from "../_constants";
const componentName = `${PREFIX}-skeleton`;

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
  <view class="unip-skeleton">
    <view
      v-if="loading"
      class="unip-skeleton__wrapper"
      style="display: flex; flex-direction: row"
    >
      <!-- 头像 -->
      <template v-if="type === 'avatar'">
        <view
          class="unip-skeleton__wrapper__avatar"
          :class="[
            `unip-skeleton__wrapper__avatar--${avatarShape}`,
            animate && 'animate',
          ]"
          :style="{
            width: getStyleVal(avatarSize),
            height: getStyleVal(avatarSize),
          }"
        />
      </template>
      <!-- 标题 -->
      <template v-else-if="type === 'title'">
        <view class="unip-skeleton__wrapper__title__list">
          <view
            v-for="idx in rows"
            :key="idx"
            class="unip-skeleton__wrapper__title"
            :class="[animate && 'animate']"
            :style="{
              height: getStyleVal(titleHeight),
              width: idx === 1 ? '50%' : getStyleVal(titleWidth),
            }"
          />
        </view>
      </template>
    </view>
  </view>
</template>

<style lang="scss">
@import "./index";
</style>
