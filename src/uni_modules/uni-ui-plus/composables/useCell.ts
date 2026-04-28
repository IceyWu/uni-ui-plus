import { computed } from 'vue'
import { useParent } from './useParent'

export const CELL_GROUP_KEY: any = Symbol('wd-cell-group')

export function useCell() {
  const { parent: cellGroup, index } = useParent(CELL_GROUP_KEY)

  const border = computed(() => cellGroup && (cellGroup as any).props.border && index.value)

  return { border }
}
