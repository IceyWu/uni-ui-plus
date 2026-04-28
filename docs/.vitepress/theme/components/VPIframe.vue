<template>
  <!-- 主容器：根据展开状态和过渡状态添加对应类名 -->
  <div
    v-if="href"
    class="demo-model"
    :class="{
    'collapsed': !expanded,
    'transition-end': transitionEnd
  }"
    @transitionend="onTransitionEnd"
  >
    <!-- 头部控制栏 -->
    <div class="demo-header">
      <ExternalLink :href="href" class="demo-link" :style="`${expanded ? '' : 'height:0;width:0;opacity:0'}`"> </ExternalLink>
      <QrCode class="demo-qrcode" :src="qrcode" v-if="expanded&&qrcode"></QrCode>
      <el-icon class="expand-icon" style="cursor: pointer;" @click="toggleExpand"> <component :is="expanded ? Fold : Expand" /> </el-icon>
    </div>
    <!-- iframe 容器 -->
    <div class="iframe-container">
      <iframe v-if="expanded&&transitionEnd" ref="iframe" id="demo" class="iframe" scrolling="auto" frameborder="0" :src="href" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { Expand, Fold } from '@element-plus/icons-vue'
  import { useData, useRoute } from 'vitepress'
  import { computed, onMounted, ref, watch } from 'vue'
  import QrCode from './QrCode.vue'

  interface Props {
    /** 是否展开状态 */
    expanded?: boolean
  }

  const props = withDefaults(defineProps<Props>(), {
    expanded: true
  })

  // 状态管理
  const baseUrl = ref('')
  const iframe = ref<HTMLIFrameElement | null>(null)
  const transitionEnd = ref(true)

  const emit = defineEmits<{
    'update:expanded': [boolean] // 更新展开状态
    'state-change': [boolean] // 状态变化通知
  }>()

  const route = useRoute()
  const vitepressData = useData()

  const href = computed(() => {
    const path = route.path
    const paths = path ? path.split('.')[0].split('/') : []

    if (!paths.length) {
      return baseUrl.value
    }

    return baseUrl.value + `subPages/${kebabToCamel(paths.at(-1))}/Index`
  })

  const qrcode = computed(() => {
    const path = route.path
    const paths = path ? path.split('.')[0].split('/') : []
    if (!paths.length) {
      return ''
    }
    return `/wxqrcode/${paths.at(-1)}.png`
  })

  // 工具函数：转换 kebab-case 为 camelCase
  function kebabToCamel(input: string): string {
    return input.replace(/-([a-z])/g, (match, group) => group.toUpperCase())
  }

  // 监听 props.expanded 变化
  watch(
    () => props.expanded,
    (newVal) => {
      if (newVal) {
        transitionEnd.value = false
      }
    }
  )

  // 展开/收起控制
  function toggleExpand() {
    // 触发事件通知父组件
    emit('update:expanded', !props.expanded)
    emit('state-change', !props.expanded)
    transitionEnd.value = false
  }

  // 过渡结束处理
  function onTransitionEnd() {
    transitionEnd.value = true
  }

  // iframe 消息通信
  function sendMessage() {
    if (iframe.value?.contentWindow) {
      iframe.value.contentWindow.postMessage(vitepressData.isDark.value, href.value)
    }
  }

  // 发送语言信息给iframe
  function sendLanguageMessage() {
    if (iframe.value?.contentWindow) {
      iframe.value.contentWindow.postMessage(vitepressData.lang.value, href.value)
    }
  }

  onMounted(() => {
    baseUrl.value =
      process.env.NODE_ENV === 'production' ? `https://uni-ui-plus-docs.netlify.app/demo/?timestamp=${Date.now()}#/` : 'http://localhost:5173/demo/#/'

    // 监听 iframe 加载完成事件
    iframe.value?.addEventListener('load', () => {
      sendMessage()
      sendLanguageMessage()
    })
  })

  watch(() => vitepressData.isDark.value, sendMessage)

  // 监听语言变化
  watch(() => vitepressData.lang.value, sendLanguageMessage)
</script>

<style scoped>
  ::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  .demo-model {
    position: fixed;
    top: calc(var(--vp-nav-height) + 32px);
    right: 32px;
    z-index: 10;
    width: 330px;
    overflow: hidden;
    font-size: 16px;
    background: var(--vp-c-bg-alt);
    border-radius: 12px;
    box-shadow: var(--vp-shadow-4);
    transition: all 0.3s ease-in-out;
  }

  .iframe-container {
    height: calc(100% - 56px);
    overflow: hidden;
    transition: all 0.3s ease-in-out;
  }

  .collapsed .iframe-container {
    height: 0;
  }

  .fade-enter-active,
  .fade-leave-active,
  .fade-enter,
  .fade-leave-to {
    display: none;
  }

  .dark .demo-model {
    background: #1b1b1b;
  }

  .iframe {
    width: 100%;
    height: 100%;
  }

  .demo-header {
    position: relative;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    width: 100%;
    height: 48px;
    padding: 8px 12px;
    margin-bottom: 8px;
    font-size: 28px;
    cursor: pointer;
    background: var(--vp-sidebar-bg-color);
    border-radius: 6px 6px 0px 0px;
  }

  .demo-link {
    --color: inherit;
    position: absolute;
    left: 0;
    font-size: 28px !important;
    color: var(--color);
    fill: currentColor;
    transition: all 0.3s ease-in-out;
  }

  .demo-qrcode {
    --color: inherit;
    position: absolute;
    left: calc(50% - 14px);
    font-size: 28px !important;
    color: var(--color);
    fill: currentColor;
    transition: all 0.3s ease-in-out;
  }

  .expand-icon {
    position: absolute;
    right: 8px;
    cursor: pointer;
  }

  .collapsed {
    width: 48px !important;
    height: 48px;
    border-radius: 12px;
  }

  .collapsed.transition-end .demo-header {
    justify-content: center;
    /* 动画结束后居中对齐 */
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s;
  }

  .fade-enter,
  .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0;
  }

  @media screen and (min-width: 1280px) {
    .demo-model {
      right: 48px;
      width: 310px;
      height: calc(310px * 143.6 / 70.9 + 56px);
    }

    .collapsed {
      height: 48px;
    }
  }

  @media screen and (min-width: 1440px) {
    .demo-model {
      right: 64px;
      width: 360px;
      height: calc(360px * 143.6 / 70.9 + 56px);
    }

    .collapsed {
      height: 48px;
    }
  }

  @media (max-width: 1279px) {
    .demo-model {
      display: none;
    }
  }
</style>
