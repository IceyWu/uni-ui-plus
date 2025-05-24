export type Position = 'center' | 'top' | 'bottom' | 'left' | 'right'

export const animationName: Record<Position, any> = {
  center: 'fade',
  top: 'slide-down',
  bottom: 'slide-up',
  left: 'slide-left',
  right: 'slide-right'
}
