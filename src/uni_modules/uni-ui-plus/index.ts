// 组件类型导出

// 工具函数
export * as CommonUtil from './common/util'
export * from './components/index'
// 主题配置类型
export type { ConfigProviderThemeVars } from './components/up-config-provider/types'

// 国际化
export { Locale, useCurrentLang } from './locale'
