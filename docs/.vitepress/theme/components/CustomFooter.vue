<script setup lang="ts">
  import { useData } from 'vitepress'
  import { useSidebar } from 'vitepress/theme'
  import { computed, onMounted, ref } from 'vue'

  const { theme }: any = useData()
  const { hasSidebar } = useSidebar()

  const isNetlify = ref<boolean>(false)

  const copyright = computed(() => {
    if (isNetlify.value) {
      return `${theme.value.footer.copyright} | <a style="text-decoration: none;" href="https://www.netlify.com">This site is powered by Netlify</a>`
    }
    return theme.value.footer.copyright
  })

  onMounted(() => {
    isNetlify.value = typeof window !== 'undefined' ? window.location.href.includes('netlify') : false
  })
</script>

<template>
  <footer v-if="theme.footer" class="VPFooter" :class="{ 'has-sidebar': hasSidebar }">
    <div class="container">
      <p v-if="theme.footer.message" class="message" v-html="theme.footer.message"></p>
      <p v-if="copyright" class="copyright" v-html="copyright"></p>
    </div>
  </footer>
</template>

<style scoped>
  .VPFooter {
    position: relative;
    z-index: var(--vp-z-index-footer);
    padding: 32px 24px;
    background-color: var(--vp-c-bg);
    border-top: 1px solid var(--vp-c-gutter);
  }

  .VPFooter.has-sidebar {
    display: none;
  }

  .VPFooter :deep(a) {
    text-decoration-line: underline;
    text-underline-offset: 2px;
    transition: color 0.25s;
  }

  .VPFooter :deep(a:hover) {
    color: var(--vp-c-text-1);
  }

  @media (min-width: 768px) {
    .VPFooter {
      padding: 32px;
    }
  }

  .container {
    max-width: var(--vp-layout-max-width);
    margin: 0 auto;
    text-align: center;
  }

  .message,
  .copyright {
    font-size: 14px;
    font-weight: 500;
    line-height: 24px;
    color: var(--vp-c-text-2);
  }
</style>
