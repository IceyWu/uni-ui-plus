// 组件类型导出

// 工具函数
export * as CommonUtil from './common/util.ts'
export * from './components/index.ts'
// 主题配置类型
export type { ConfigProviderThemeVars } from './components/up-config-provider/types.ts'

// 国际化
export { Locale, useCurrentLang } from './locale/index.ts'

// 组件自动导入 resolver
export { UpResolver } from './resolver.ts'
