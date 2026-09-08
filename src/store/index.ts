import { ref } from 'vue'

const isDark = ref<boolean>(false)
let initialized = false

function setDark(dark: boolean) {
  isDark.value = dark
  uni.setTabBarStyle({
    backgroundColor: dark ? '#111318' : '#ffffff',
    borderStyle: dark ? 'black' : 'white',
    color: dark ? '#8b8f98' : '#7a7e83',
    selectedColor: dark ? '#60a5fa' : '#1c64fd'
  })
  uni.setStorageSync('isDark', dark)
}

export function useDark() {
  if (!initialized) {
    initialized = true
    setDark(Boolean(uni.getStorageSync('isDark')))
  }
  return { isDark, setDark }
}
