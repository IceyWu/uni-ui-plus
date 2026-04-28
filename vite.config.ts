import uni from '@dcloudio/vite-plugin-uni'
import Components from '@uni-helper/vite-plugin-uni-components'
import { defineConfig } from 'vite'

export default defineConfig({
  base: './',
  plugins: [Components(), uni()],
  build: {
    target: 'es2015',
    sourcemap: false
  }
})
