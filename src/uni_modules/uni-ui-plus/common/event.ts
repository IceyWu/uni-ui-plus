export const UPDATE_MODEL_EVENT = 'update:modelValue'
export const CHANGE_EVENT = 'change'
export const INPUT_EVENT = 'input'
export const CLICK_EVENT = 'click'
export const CLOSE_EVENT = 'close'
export const OPEN_EVENT = 'open'
export const CONFIRM_EVENT = 'confirm'
export const CANCEL_EVENT = 'cancel'
export const CLEAR_EVENT = 'clear'

export const PREFIX = 'up'

export type Position = 'center' | 'top' | 'bottom' | 'left' | 'right'

export const animationName: Record<Position, any> = {
  center: 'fade',
  top: 'slide-down',
  bottom: 'slide-up',
  left: 'slide-left',
  right: 'slide-right'
}
