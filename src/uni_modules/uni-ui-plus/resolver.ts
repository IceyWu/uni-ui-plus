/**
 * uni-ui-plus 组件自动导入 resolver
 * 配合 @uni-helper/vite-plugin-uni-components 使用
 *
 * @example
 * ```ts
 * // vite.config.ts
 * import Components from '@uni-helper/vite-plugin-uni-components'
 * import { UpResolver } from 'uni-ui-plus'
 *
 * export default defineConfig({
 *   plugins: [
 *     Components({ resolvers: [UpResolver()] }),
 *     uni()
 *   ]
 * })
 * ```
 */
export function UpResolver() {
  return {
    type: 'component' as const,
    resolve: (name: string) => {
      if (name.match(/^Up[A-Z]/)) {
        const compName = name
          .replace(/^Up/, '')
          .replace(/([a-z])([A-Z])/g, '$1-$2')
          .toLowerCase()
        const kebabName = `up-${compName}`
        return {
          name,
          from: `uni-ui-plus/components/${kebabName}/${kebabName}.vue`
        }
      }
    }
  }
}
