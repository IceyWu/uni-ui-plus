import { computed } from 'vue'
import { useParent } from './useParent'

export const CELL_GROUP_KEY: any = Symbol('wd-cell-group')

export function useCell() {
  const { parent: cellGroup, index } = useParent(CELL_GROUP_KEY)

  const border = computed(() => {
    return cellGroup && cellGroup.props.border && index.value
  })

  return { border }
}
