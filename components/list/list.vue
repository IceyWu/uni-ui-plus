<script lang="ts" setup>
import type { CSSProperties } from "vue";
import { computed, defineComponent, onMounted, ref } from "vue";
import { PREFIX } from "../_constants";
import type {
  ScrollViewOnRefresherrefresh,
  ScrollViewOnScrolltolower,
  ScrollViewProps,
} from "@uni-helper/uni-app-types";
import { listProps, ListEmits } from "./list";
import type { ListInst } from "./type";

const props = defineProps(listProps);
const emit = defineEmits<ListEmits>();

const onRefresh: ScrollViewOnRefresherrefresh = (event) => {
  const tempData = { ...props.listObj };

  tempData.finished = false;
  triggered.value = true;

  emit("update:listObj", tempData);
  emit("onRefresh");
};
const listRef = ref<ListInst | null>(null);

const onLowerBottom: ScrollViewOnScrolltolower = (event) => {
  emit("onLoad");
};

onMounted(() => {});

const triggered = ref<any>(false);
function onPulling(e: any) {
  emit("onPulling", e);
}

function onRestore() {
  triggered.value = "restore";
}
function onAbort() {}
function stopRefresh() {
  triggered.value = false;
}

defineExpose({
  stopRefresh,
});
</script>

<script lang="ts">
import { PREFIX } from "../_constants";
const componentName = `${PREFIX}-list`;

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
  <scroll-view
    ref="listRef"
    :scroll-y="scrollViewProps.scrollY"
    :scroll-x="scrollViewProps.scrollX"
    :class="isNeedHFull ? 'h-full' : ''"
    :refresher-enabled="scrollViewProps.refresherEnabled"
    :refresher-triggered="triggered"
    :refresher-threshold="scrollViewProps.refresherThreshold"
    :refresher-background="scrollViewProps.refresherBackground"
    @refresherpulling="onPulling"
    @refresherrefresh="onRefresh"
    @refresherrestore="onRestore"
    @refresherabort="onAbort"
    @scrolltolower="onLowerBottom"
  >
    <template v-if="!listObj?.list?.length && !listObj?.loading">
      <view
        class="empty-box"
        :class="[
          isNeedEmptyCenter ? 'center-empty' : '',
          isNeedEmptyPb ? '' : '!pb-0',
        ]"
        :style="{
          paddingTop: emptyTop || '0',
        }"
      >
        <slot name="empty"> empty </slot>
      </view>
    </template>
    <template v-else-if="listObj?.list?.length">
      <slot :data="listObj" />
    </template>
    <template v-if="listObj?.loading">
      <view :class="scrollViewProps.scrollX ? 'loading-box' : ''">
        <!-- 骨架屏 -->
        <slot name="loading"> loading... </slot>
      </view>
    </template>
  </scroll-view>
</template>

<style lang="scss">
@import "./index";
</style>
