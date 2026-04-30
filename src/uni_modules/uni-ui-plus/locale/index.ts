import { ref } from 'vue'
import zhCN from './lang/zh-CN.ts'

type Message = Record<string, unknown>
type Messages = Record<string, Message>

const lang = ref<string>('zh-CN')
const messages: Messages = {
  'zh-CN': zhCN
}

export const Locale = {
  messages(): Message {
    return messages[lang.value] || messages['zh-CN']
  },

  use(newLang: string, newMessage?: Message) {
    lang.value = newLang
    if (newMessage) {
      messages[newLang] = newMessage
    }
  },

  add(newMessages: Messages = {}) {
    Object.assign(messages, newMessages)
  }
}

/**
 * 根据 key 路径获取翻译文本
 * @example t('livephoto.indicator') => '实况'
 */
export function t(path: string): string {
  const keys = path.split('.')
  let result: unknown = Locale.messages()
  for (const key of keys) {
    if (result && typeof result === 'object' && key in result) {
      result = (result as Record<string, unknown>)[key]
    } else {
      return path
    }
  }
  return typeof result === 'string' ? result : path
}

export const useCurrentLang = () => lang

export default Locale
