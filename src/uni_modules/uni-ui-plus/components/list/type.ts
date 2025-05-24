export const listType = ['default', 'primary', 'info', 'success', 'warning', 'danger'] as const
export type ListType = (typeof listType)[number]

export interface ListInst extends HTMLElement {
  stopRefresh: () => void
}
