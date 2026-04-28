<script lang="ts" setup>
  import { useWindowScroll } from '@vueuse/core'
  import { onContentUpdated, useData } from 'vitepress'
  import VPLocalNavOutlineDropdown from 'vitepress/dist/client/theme-default/components/VPLocalNavOutlineDropdown.vue'
  import { getHeaders } from 'vitepress/dist/client/theme-default/composables/outline.js'
  import { useLocalNav, useSidebar } from 'vitepress/theme'
  import { computed, onMounted, ref } from 'vue'

  defineProps<{
    open: boolean
  }>()

  defineEmits<(e: 'open-menu') => void>()

  const { theme, frontmatter }: any = useData()
  const { hasSidebar } = useSidebar()
  const { headers } = useLocalNav()
  const { y } = useWindowScroll()

  const navHeight = ref(0)

  onMounted(() => {
    navHeight.value = Number.parseInt(getComputedStyle(document.documentElement).getPropertyValue('--vp-nav-height'), 10)
  })

  onContentUpdated(() => {
    headers.value = getHeaders(frontmatter.value.outline ?? theme.value.outline)
  })

  const empty = computed(() => headers.value.length === 0)

  const emptyAndNoSidebar = computed(() => empty.value && !hasSidebar.value)

  const classes = computed(() => ({
    VPLocalNav: true,
    'has-sidebar': hasSidebar.value,
    empty: empty.value,
    fixed: emptyAndNoSidebar.value
  }))
</script>

<template>
  <div v-if="frontmatter.layout !== 'home' && (!emptyAndNoSidebar || y >= navHeight)" :class="classes">
    <div class="container">
      <button v-if="hasSidebar" class="menu" :aria-expanded="open" aria-controls="VPSidebarNav" @click="$emit('open-menu')">
        <span class="vpi-align-left menu-icon"></span>
        <span class="menu-text"> {{ theme.sidebarMenuLabel || 'Menu' }} </span>
      </button>

      <VPLocalNavOutlineDropdown :headers="headers" :navHeight="navHeight" />
    </div>
  </div>
</template>

<style scoped>
  .VPLocalNav {
    position: sticky;
    top: 0;
    /*rtl:ignore*/
    left: 0;
    z-index: var(--vp-z-index-local-nav);
    width: 100%;
    padding-top: var(--vp-layout-top-height, 0px);
    background-color: var(--vp-local-nav-bg-color);
    border-bottom: 1px solid var(--vp-c-gutter);
  }

  .VPLocalNav.fixed {
    position: fixed;
  }

  @media (min-width: 960px) {
    .VPLocalNav {
      top: var(--vp-nav-height);
    }

    .VPLocalNav.has-sidebar {
      padding-left: var(--vp-sidebar-width);
    }

    .VPLocalNav.empty {
      display: none;
    }
  }

  @media (min-width: 1280px) {
    .VPLocalNav {
      display: none;
    }
  }

  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .menu {
    display: flex;
    align-items: center;
    padding: 12px 24px 11px;
    font-size: 12px;
    font-weight: 500;
    line-height: 24px;
    color: var(--vp-c-text-2);
    transition: color 0.5s;
  }

  .menu:hover {
    color: var(--vp-c-text-1);
    transition: color 0.25s;
  }

  @media (min-width: 768px) {
    .menu {
      padding: 0 32px;
    }
  }

  @media (min-width: 960px) {
    .menu {
      display: none;
    }
  }

  .menu-icon {
    margin-right: 8px;
    font-size: 14px;
  }

  .VPOutlineDropdown {
    padding: 12px 24px 11px;
  }

  @media (min-width: 768px) {
    .VPOutlineDropdown {
      padding: 12px 32px 11px;
    }
  }
</style>
