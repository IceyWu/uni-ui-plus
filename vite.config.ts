import { defineConfig } from 'vite'
// #ifdef H5
import viteCompression from 'vite-plugin-compression'
// #endif

import uni from '@dcloudio/vite-plugin-uni'
import Components from '@uni-helper/vite-plugin-uni-components'

export default defineConfig({
  base: './',
  plugins: [
    Components(),
    uni(),
    // #ifdef H5
    viteCompression()
    // #endif
  ],
  build: {
    target: 'es2015',
    //   关闭生成map文件 可以达到缩小打包体积
    sourcemap: false // 这个生产环境一定要关闭，不然打包的产物会很大
  }
})
