import { onMounted } from 'vue'

interface IframeMessageOptions {
  /**
   * 语言变更处理函数
   * @param locale 语言代码
   */
  onLocaleChange?: (locale: string) => void

  /**
   * 主题变更处理函数
   * @param isDark 是否为暗色主题
   */
  onThemeChange?: (isDark: boolean) => void
}

/**
 * iframe消息处理hook
 * @param options 配置选项
 */
export function useIframeMessage(options: IframeMessageOptions = {}) {
  const { onLocaleChange, onThemeChange } = options

  // 支持的语言列表
  const SUPPORTED_LOCALES = ['zh-CN', 'en-US']

  // 处理接收到的消息
  function handleMessage(event: MessageEvent) {
    // 确保消息来源是父窗口
    if (event.source !== parent) {
      return
    }

    const data = event.data

    // 处理语言切换消息
    if (typeof data === 'string' && SUPPORTED_LOCALES.includes(data)) {
      onLocaleChange?.(data)
    }

    // 处理主题切换消息
    if (typeof data === 'boolean') {
      onThemeChange?.(data)
    }

    // 处理滚动联动消息
    if (typeof data === 'object' && data?.type === 'scroll-to' && data?.title) {
      scrollToTitle(data.title)
    }
  }

  /**
   * 根据标题文字滚动到对应的 demo-group 或 demo-group-item
   * 优先精确匹配，其次模糊匹配（包含关系）
   */
  function scrollToTitle(title: string) {
    // #ifdef H5
    const titleElements = document.querySelectorAll('.demo-group__title, .demo-group-item__title')
    // 精确匹配
    for (const el of titleElements) {
      if (el.textContent?.trim() === title) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }
    // 模糊匹配：标题包含目标文字，或目标文字包含标题
    for (const el of titleElements) {
      const text = el.textContent?.trim() || ''
      if (text.includes(title) || title.includes(text)) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }
    // #endif
  }

  // 设置消息监听
  function setupMessageListener() {
    // 仅在H5环境下执行
    // #ifdef H5
    window.addEventListener('message', handleMessage)
    // #endif
  }

  // 移除消息监听
  function removeMessageListener() {
    // 仅在H5环境下执行
    // #ifdef H5
    window.removeEventListener('message', handleMessage)
    // #endif
  }

  onMounted(() => {
    setupMessageListener()
  })

  return {
    setupMessageListener,
    removeMessageListener
  }
}
