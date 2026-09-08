<script lang="ts" setup>
  import type {
    ScrollViewOnRefresherpulling,
    ScrollViewOnRefresherrefresh,
    ScrollViewOnScrolltolower,
    ScrollViewProps
  } from '@uni-helper/uni-app-types'
  import { computed, nextTick, reactive, ref, watch } from 'vue'
  import UpSkeleton from '../up-skeleton/up-skeleton.vue'
  import { type ListEmits, listProps } from './types'

  const props = defineProps(listProps)
  const emit = defineEmits<ListEmits>()

  // 虚拟列表相关
  const state = reactive({
    list: computed(() => props.listObj?.list || []).value.slice(),
    start: 0,
    startOffset: 0
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
  let loadRequested = false

  function requestLoad() {
    if (loadRequested || props.listObj?.loading || props.listObj?.finished) {
      return
    }
    loadRequested = true
    emit('onLoad')
  }

  function handleScrollEvent(e: any) {
    const { scrollTop } = e.detail
    const itemHeight = props.virtualListProps.itemHeight ?? 50
    state.start = Math.floor(scrollTop / itemHeight)
    state.startOffset = scrollTop - (scrollTop % itemHeight)
    if (end.value >= state.list.length) {
      requestLoad()
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
    (newList, oldList) => {
      state.list = (props.listObj?.list || []).slice()
      if (newList?.length !== oldList?.length) {
        loadRequested = false
      }
    }
  )

  // 普通列表相关
  const onRefresh: ScrollViewOnRefresherrefresh = (_event) => {
    const tempData = { ...props.listObj }
    tempData.finished = false
    loadRequested = false
    setTriggered(true)
    emit('update:listObj', tempData)
    emit('onRefresh')
  }
  const _listRef = ref<any>(null)
  const onLowerBottom: ScrollViewOnScrolltolower = (_event) => {
    requestLoad()
  }
  const triggered = ref<any>(false)

  function onPulling(e: any) {
    emit('onPulling', e)
  }
  function onRestore() {
    setTriggered('restore')
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
      addGlobalClass: true,
      // #ifndef H5
      styleIsolation: 'shared',
      virtualHost: true
      // #endif
    }
  }
</script>

<template>
  <scroll-view
    class="up-list"
    ref="listRef"
    :class="[virtualListProps.enabled ? 'up-list-virtual' : '']"
    :refresher-background="scrollViewProps.refresherBackground"
    :refresher-enabled="scrollViewProps.refresherEnabled"
    :refresher-threshold="scrollViewProps.refresherThreshold"
    :refresher-triggered="triggered"
    :scroll-x="scrollViewProps.scrollX"
    :scroll-y="scrollViewProps.scrollY"
    :style="virtualListProps.enabled ? { height: getContainerHeight + 'px' } : isNeedHFull ? { height: '100%' } : undefined"
    @refresherpulling="onPulling"
    @refresherrefresh="onRefresh"
    @refresherrestore="onRestore"
    @scroll="(e) => (virtualListProps.enabled ? handleScrollEvent(e) : emit('onScroll', e))"
    @scrolltolower="onLowerBottom"
  >
    <template v-if="isNeedEmpty && !listObj?.list?.length && !listObj?.loading">
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
            class="up-list-item"
            v-for="(item, index) in visibleData"
            :key="item?.id ?? index + state.start"
            :id="`list-item-${Number(index + state.start)}`"
            :style="{ height: `${virtualListProps.itemHeight}px` }"
          >
            <slot :index="index + state.start" :item="item" />
          </view>
        </view>
        <!-- 虚拟列表模式下的底部 loading -->
        <view
          class="up-virtual-loading-box"
          v-if="listObj?.loading"
          :style="{
            height: virtualListProps.loadingHeight + 'px',
            left: 0,
            position: 'absolute',
            right: 0,
            top: `${listHeight + 60 + 0}px`,
            width: '100%'
          }"
        >
          <slot name="loading"> <UpSkeleton /> </slot>
        </view>
      </template>
      <template v-else>
        <template v-if="isListMode">
          <view class="up-list-item" v-for="(item, index) in listObj.list" :key="item?.id ?? index"><slot :index="index" :item="item" /></view>
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
