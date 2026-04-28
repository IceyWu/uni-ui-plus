import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import vitePluginUniConditionalCompile from './vite-plugins/vite-plugin-uni-conditional-compile'

// 获取当前测试平台
const platform = process.env.UNI_PLATFORM || 'h5'

export default defineConfig({
  plugins: [
    vitePluginUniConditionalCompile({
      platform
    }) as any,
    vue()
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@vite-plugins': resolve(__dirname, './vite-plugins')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler'
      }
    }
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    include: ['tests/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'json-summary'],
      include: ['src/uni_modules/uni-ui-plus/components/**/*.{vue,ts}'],
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
      thresholds:
        process.env.COMPONENT_TEST === 'true'
          ? undefined
          : {
              statements: 70,
              branches: 70,
              functions: 70,
              lines: 70
            },
      all: false
    },
    deps: {
      inline: ['vue-i18n']
    }
  }
})
