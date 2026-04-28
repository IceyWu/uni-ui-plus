import { onUnmounted, ref } from 'vue'
import { isDef, isH5, isNumber } from '../common/util'

type RafCallback = (time: number) => void

export function useRaf(callback: RafCallback) {
  const requestRef = ref<number | null | ReturnType<typeof setTimeout>>(null)

  const start = () => {
    const handle = (time: number) => {
      callback(time)
    }
    if (isH5) {
      requestRef.value = requestAnimationFrame(handle)
    } else {
      requestRef.value = setTimeout(() => handle(Date.now()), 1000 / 30)
    }
  }

  const cancel = () => {
    if (isH5 && isNumber(requestRef.value)) {
      cancelAnimationFrame(requestRef.value!)
    } else if (isDef(requestRef.value)) {
      clearTimeout(requestRef.value as ReturnType<typeof setTimeout>)
    }
  }

  onUnmounted(() => cancel())

  return { start, cancel }
}
