import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { defineConfig } from 'vitest/config'
import vitePluginUniConditionalCompile from './vite-plugins/vite-plugin-uni-conditional-compile'

// 获取当前测试平台
const platform = process.env.UNI_PLATFORM || 'h5'

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler'
      }
    }
  },
  plugins: [
    vitePluginUniConditionalCompile({
      platform
    }) as any,
    vue()
  ],
  resolve: {
    alias: {
      '@': resolve(import.meta.dirname, './src'),
      '@vite-plugins': resolve(import.meta.dirname, './vite-plugins')
    }
  },
  test: {
    coverage: {
      all: false,
      exclude: [
        'node_modules/**',
        'tests/**',
        'src/pages/**',
        'src/static/**',
        'dist/**',
        '**/*.js',
        '**/*.d.ts',
        'src/uni_modules/uni-ui-plus/common/**/*.{vue,ts}'
      ],
      include: ['src/uni_modules/uni-ui-plus/components/**/*.{vue,ts}'],
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'json-summary'],
      thresholds:
        process.env.COMPONENT_TEST === 'true'
          ? undefined
          : {
              branches: 70,
              functions: 70,
              lines: 70,
              statements: 70
            }
    },
    deps: {
      inline: ['vue-i18n']
    },
    environment: 'jsdom',
    globals: true,
    include: ['tests/**/*.test.ts'],
    setupFiles: ['./tests/setup.ts']
  }
})
