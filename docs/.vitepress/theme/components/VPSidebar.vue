<script lang="ts" setup>
  import { useScrollLock } from '@vueuse/core'
  import { inBrowser } from 'vitepress'
  import VPSidebarGroup from 'vitepress/dist/client/theme-default/components/VPSidebarGroup.vue'
  import { useSidebar } from 'vitepress/theme'
  import { ref, watch } from 'vue'
  import SidebarAds from './SidebarAds.vue'

  const { sidebarGroups, hasSidebar } = useSidebar()

  const props = defineProps<{
    open: boolean
  }>()

  // a11y: focus Nav element when menu has opened
  const navEl = ref<HTMLElement | null>(null)
  const isLocked = useScrollLock(inBrowser ? document.body : null)

  watch(
    [props, navEl],
    () => {
      if (props.open) {
        isLocked.value = true
        navEl.value?.focus()
      } else {
        isLocked.value = false
      }
    },
    { immediate: true, flush: 'post' }
  )

  const key = ref(0)

  watch(
    sidebarGroups,
    () => {
      key.value += 1
    },
    { deep: true }
  )
</script>

<template>
  <aside v-if="hasSidebar" class="VPSidebar" :class="{ open }" ref="navEl" @click.stop>
    <div class="curtain" />

    <nav class="nav" id="VPSidebarNav" aria-labelledby="sidebar-aria-label" tabindex="-1">
      <span class="visually-hidden" id="sidebar-aria-label"> Sidebar Navigation </span>

      <slot name="sidebar-nav-before" />
      <!-- 添加广告位插槽 -->
      <slot name="sidebar-ad"> <SidebarAds /> </slot>
      <VPSidebarGroup :items="sidebarGroups" :key="key" />
      <slot name="sidebar-nav-after" />
    </nav>
  </aside>
</template>

<style scoped>
  .VPSidebar {
    position: fixed;
    top: var(--vp-layout-top-height, 0px);
    bottom: 0;
    left: 0;
    z-index: var(--vp-z-index-sidebar);
    width: var(--vp-sidebar-width);
    padding: 32px 32px 96px;
    overflow-x: hidden;
    overflow-y: auto;
    scrollbar-gutter: stable both-edges;
    overscroll-behavior: contain;
    background-color: var(--vp-sidebar-bg-color);
    box-shadow: var(--vp-c-shadow-3);
    opacity: 0;
    transform: translateX(-100%);
    transition:
      opacity 0.5s,
      transform 0.25s ease;
  }

  .VPSidebar.open {
    visibility: visible;
    opacity: 1;
    transform: translateX(0);
    transition:
      opacity 0.25s,
      transform 0.5s cubic-bezier(0.19, 1, 0.22, 1);
  }

  .dark .VPSidebar {
    box-shadow: var(--vp-shadow-1);
  }

  @media (min-width: 960px) {
    .VPSidebar {
      visibility: visible;
      width: var(--vp-sidebar-width);
      max-width: 100%;
      padding-top: var(--vp-nav-height);
      background-color: var(--vp-sidebar-bg-color);
      box-shadow: none;
      opacity: 1;
      transform: translateX(0);
    }
  }

  @media (min-width: 960px) {
    .curtain {
      position: sticky;
      top: -64px;
      left: 0;
      z-index: 1;
      height: var(--vp-nav-height);
      margin-top: calc(var(--vp-nav-height) * -1);
      margin-right: -32px;
      margin-left: -32px;
      background-color: var(--vp-sidebar-bg-color);
    }
  }

  .nav {
    outline: 0;
  }
</style>
