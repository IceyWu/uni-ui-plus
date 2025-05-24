import * as process from 'node:process'
import type { ComponentResolver } from '@uni-helper/vite-plugin-uni-components'

const processShim: typeof process = process === undefined ? ({} as typeof process) : process
const envShim = processShim.env || ({} as typeof process.env)

type PLATFORM =
  | 'h5'
  | 'app'
  | 'mp-alipay'
  | 'mp-baidu'
  | 'mp-kuaishou'
  | 'mp-lark'
  | 'mp-qq'
  | 'mp-toutiao'
  | 'mp-weixin'
  | 'quickapp-webview'
  | 'quickapp-webview-huawei'
  | 'quickapp-webview-union'

/** Value of `process.env.UNI_PLATFORM` */
const platform = envShim.UNI_PLATFORM as PLATFORM
/** Detect if `process.env.UNI_PLATFORM` is `H5` */
const isH5 = platform === 'h5'

export function UpResolver(): ComponentResolver {
  return {
    type: 'component',
    resolve: (name: string) => {
      if (/^(Up[A-Z]|up-[a-z])/.test(name)) {
        const cName = name
          .slice(2)
          .replace(/([a-z])/, '$1')
          .toLowerCase()
        const component = `uni-ui-plus/components/${cName}/${cName}.vue`
        const style = `uni-ui-plus/components/${cName}/index.scss`

        return {
          name,
          from: component,
          sideEffects: isH5 ? style : ''
        }
      }
    }
  }
}
