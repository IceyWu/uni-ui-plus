<script lang="ts" setup>
  import type {
    ScrollViewOnRefresherpulling,
    ScrollViewOnRefresherrefresh,
    ScrollViewOnScrolltolower,
    ScrollViewProps
  } from '@uni-helper/uni-app-types'
  import { computed, defineComponent, nextTick, onMounted, reactive, ref, watch } from 'vue'
  import UpSkeleton from '../up-skeleton/up-skeleton.vue'
  import { type ListEmits, listProps } from './types'

  const props = defineProps(listProps)
  const emit = defineEmits<ListEmits>()

  // 虚拟列表相关
  const state = reactive({
    startOffset: 0,
    start: 0,
    list: computed(() => props.listObj?.list || []).value.slice()
  })
  const clientHeight = uni.getSystemInfoSync().windowHeight || 667
  const getContainerHeight = computed(
    () => props.virtualListProps.containerHeight || Math.min(clientHeight, (props.virtualListProps.itemHeight ?? 50) * 10)
  )
  const visibleCount = computed(() => Math.ceil(getContainerHeight.value / (props.virtualListProps.itemHeight ?? 50)))
  const end = computed(() => state.start + visibleCount.value)
  const getTransform = computed(() => `translate3d(0, ${state.startOffset}px, 0)`)

  const listHeight = computed(() => state.list.length * (props.virtualListProps.itemHeight ?? 50))
  const phantomHeight = computed(() => (props.listObj?.loading ? listHeight.value + (props.virtualListProps.loadingHeight ?? 0) : listHeight.value))
  const visibleData = computed(() => state.list.slice(state.start, Math.min(end.value, state.list.length)))
  function handleScrollEvent(e: any) {
    const { scrollTop } = e.detail
    const itemHeight = props.virtualListProps.itemHeight ?? 50
    state.start = Math.floor(scrollTop / itemHeight)
    state.startOffset = scrollTop - (scrollTop % itemHeight)
    if (end.value > state.list.length) {
      emit('onLoad')
    }
    emit('onScroll', e)
  }
  const setTriggered = (value: boolean | 'restore' = false) => {
    triggered.value = value
  }

  function stopRefresh() {
    setTriggered(false)
  }
  watch(
    () => props.listObj?.list,
    () => {
      state.list = (props.listObj?.list || []).slice()
    }
  )

  // 普通列表相关
  const onRefresh: ScrollViewOnRefresherrefresh = (_event) => {
    const tempData = { ...props.listObj }
    tempData.finished = false
    setTriggered(true)
    emit('update:listObj', tempData)
    emit('onRefresh')
  }
  const listRef = ref<any>(null)
  const onLowerBottom: ScrollViewOnScrolltolower = (_event) => {
    emit('onLoad')
  }
  const triggered = ref<any>(false)

  function onPulling(e: any) {
    emit('onPulling', e)
  }
  function onRestore() {
    setTriggered('restore')
  }
  function onAbort() {
    // 下拉刷新被中止时的回调，预留扩展
  }

  watch(
    () => props.listObj,
    (newListObj, oldListObj) => {
      if (!props.autoSetTriggered) {
        return
      }
      if (!oldListObj) {
        return
      }
      if (triggered.value === false) {
        return
      }
      if (typeof newListObj?.loading !== 'undefined' && newListObj.loading) {
        return
      }
      nextTick(() => {
        setTriggered(false)
      })
    },
    { deep: true }
  )
  defineExpose({
    stopRefresh
  })
</script>

<script lang="ts">
  import { PREFIX } from '../../common/event'

  const componentName = `${PREFIX}-list`

  export default {
    name: componentName,
    options: {
      virtualHost: true,
      addGlobalClass: true,
      // #ifndef H5
      styleIsolation: 'shared'
      // #endif
    }
  }
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
    @scroll="(e) => (virtualListProps.enabled ? handleScrollEvent(e) : emit('onScroll', e))"
    :style="virtualListProps.enabled ? { height: getContainerHeight + 'px' } : isNeedHFull ? { height: '100%' } : undefined"
  >
    <template v-if="!listObj?.list?.length && !listObj?.loading">
      <view
        class="empty-box"
        :class="[isNeedEmptyCenter ? 'up-center-empty' : '', isNeedEmptyPb ? '' : 'up-no-padding-bottom']"
        :style="{
          paddingTop: emptyTop || '0'
        }"
      >
        <slot name="empty">empty</slot>
      </view>
    </template>
    <template v-else-if="listObj?.list?.length">
      <template v-if="virtualListProps.enabled">
        <view class="up-list-phantom" :style="{ height: `${phantomHeight}px` }" />
        <view class="up-list-container" :style="{ transform: getTransform }">
          <view
            v-for="(item, index) in visibleData"
            :id="`list-item-${Number(index + state.start)}`"
            :key="index"
            :style="{ height: `${virtualListProps.itemHeight}px` }"
            class="up-list-item"
          >
            <slot :item="item" :index="index + state.start" />
          </view>
        </view>
        <!-- 虚拟列表模式下的底部 loading -->
        <view
          v-if="listObj?.loading"
          class="up-virtual-loading-box"
          :style="{
            top: `${listHeight + 60 + 0}px`,
            position: 'absolute',
            left: 0,
            right: 0,
            width: '100%',
            height: virtualListProps.loadingHeight + 'px'
          }"
        >
          <slot name="loading"> <UpSkeleton /> </slot>
        </view>
      </template>
      <template v-else>
        <template v-if="isListMode">
          <view v-for="(item, index) in listObj.list" :key="index" class="up-list-item"><slot :item="item" :index="index + state.start" /></view>
        </template>
        <template v-else> <slot :data="listObj" /> </template>
      </template>
    </template>
    <template v-if="listObj?.loading">
      <view :class="scrollViewProps.scrollX ? 'up-loading-box' : ''">
        <!-- 骨架屏 -->
        <slot name="loading"> <UpSkeleton /> </slot>
      </view>
    </template>
  </scroll-view>
</template>

<style lang="scss">
@use './index' as *;
</style>
