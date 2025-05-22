<script lang="ts" setup>
import {
  computed,
  defineComponent,
  onMounted,
  ref,
  reactive,
  watch,
} from "vue";
import type {
  ScrollViewOnRefresherrefresh,
  ScrollViewOnScrolltolower,
  ScrollViewProps,
  ScrollViewOnRefresherpulling,
} from "@uni-helper/uni-app-types";
import { listProps, type ListEmits } from "./list";
import type { ListInst } from "./type";
import UpSkeleton from "../skeleton/skeleton.vue";

const props = defineProps(listProps);
const emit = defineEmits<ListEmits>();

// 虚拟列表相关
const state = reactive({
  startOffset: 0,
  start: 0,
  list: computed(() => props.listObj?.list || []).value.slice(),
});
const clientHeight = uni.getSystemInfoSync().windowHeight || 667;
const getContainerHeight = computed(() => {
  return (
    props.virtualListProps.containerHeight ||
    Math.min(clientHeight, (props.virtualListProps.itemHeight ?? 50) * 10)
  );
});
const visibleCount = computed(() => {
  return Math.ceil(
    getContainerHeight.value / (props.virtualListProps.itemHeight ?? 50),
  );
});
const end = computed(() => {
  return state.start + visibleCount.value;
});
const getTransform = computed(() => {
  return `translate3d(0, ${state.startOffset}px, 0)`;
});

const listHeight = computed(() => {
  return state.list.length * (props.virtualListProps.itemHeight ?? 50);
});
const phantomHeight = computed(() => {
  return props.listObj?.loading
    ? listHeight.value + (props.virtualListProps.loadingHeight ?? 0)
    : listHeight.value;
});
const visibleData = computed(() => {
  return state.list.slice(state.start, Math.min(end.value, state.list.length));
});
function handleScrollEvent(e: any) {
  const { scrollTop } = e.detail;
  const itemHeight = props.virtualListProps.itemHeight ?? 50;
  state.start = Math.floor(scrollTop / itemHeight);
  state.startOffset = scrollTop - (scrollTop % itemHeight);
  if (end.value > state.list.length) emit("onLoad");
  emit("onScroll", e);
}
watch(
  () => props.listObj?.list,
  () => {
    state.list = (props.listObj?.list || []).slice();
  },
);

// 普通列表相关
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
    class="up-list"
    :class="[virtualListProps.enabled ? 'up-list-virtual' : '']"
    :scroll-y="scrollViewProps.scrollY"
    :scroll-x="scrollViewProps.scrollX"
    :refresher-enabled="scrollViewProps.refresherEnabled"
    :refresher-triggered="triggered"
    :refresher-threshold="scrollViewProps.refresherThreshold"
    :refresher-background="scrollViewProps.refresherBackground"
    @refresherpulling="onPulling"
    @refresherrefresh="onRefresh"
    @refresherrestore="onRestore"
    @refresherabort="onAbort"
    @scrolltolower="onLowerBottom"
    @scroll="
      (e) =>
        virtualListProps.enabled ? handleScrollEvent(e) : emit('onScroll', e)
    "
    :style="
      virtualListProps.enabled
        ? { height: getContainerHeight + 'px' }
        : isNeedHFull
          ? { height: '100%' }
          : undefined
    "
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
      <template v-if="virtualListProps.enabled">
        <div
          class="up-list-phantom"
          :style="{ height: `${phantomHeight}px` }"
        />
        <div class="up-list-container" :style="{ transform: getTransform }">
          <div
            v-for="(item, index) in visibleData"
            :id="`list-item-${Number(index + state.start)}`"
            :key="index"
            :style="{ height: `${virtualListProps.itemHeight}px` }"
            class="up-list-item"
          >
            <slot :item="item" :index="index + state.start" />
          </div>
        </div>
        <!-- 虚拟列表模式下的底部 loading -->
        <div
          v-if="listObj?.loading"
          class="virtual-loading-box"
          :style="{
            top: `${listHeight + 60 + 0}px`,
            position: 'absolute',
            left: 0,
            right: 0,
            width: '100%',
            height: virtualListProps.loadingHeight + 'px',
          }"
        >
          <slot name="loading">
            <UpSkeleton />
          </slot>
        </div>
      </template>
      <template v-else>
        <template v-if="isListMode">
          <div
            v-for="(item, index) in listObj.list"
            :key="index"
            class="up-list-item"
          >
            <slot :item="item" :index="index + state.start" />
          </div>
        </template>
        <template v-else>
          <slot :data="listObj" />
        </template>
      </template>
    </template>
    <template v-if="listObj?.loading">
      <view :class="scrollViewProps.scrollX ? 'loading-box' : ''">
        <!-- 骨架屏 -->
        <slot name="loading">
          <UpSkeleton />
        </slot>
      </view>
    </template>
  </scroll-view>
</template>

<style lang="scss">
@use "./index" as *;
</style>
