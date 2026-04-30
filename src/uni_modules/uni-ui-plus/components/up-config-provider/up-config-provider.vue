<script lang="ts" setup>
  import { computed, defineComponent } from 'vue'
  import { kebabCase } from '../../common/util'
  import { configProviderProps } from './types'

  const props = defineProps(configProviderProps)

  const themeStyle = computed(() => {
    const styles: string[] = []
    if (props.themeVars) {
      for (const [key, value] of Object.entries(props.themeVars)) {
        if (value) {
          styles.push(`--up-${kebabCase(key)}: ${value}`)
        }
      }
    }
    return styles.join(';')
  })

  const themeClass = computed(() => (props.theme === 'dark' ? 'up-theme-dark' : 'up-theme-light'))
</script>

<script lang="ts">
  import { PREFIX } from '../../common/event'

  const componentName = `${PREFIX}-config-provider`

  export default defineComponent({
    name: componentName,
    options: {
      virtualHost: true,
      addGlobalClass: true,
      // #ifndef H5
      styleIsolation: 'shared'
      // #endif
    }
  })
</script>

<template>
  <view :class="themeClass" :style="themeStyle"><slot /></view>
</template>
