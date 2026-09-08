import type { ExtractPropTypes, PropType, StyleValue } from 'vue'

export const unknownProp = null as unknown as PropType<unknown>

export const numericProp = [Number, String]

export const truthProp = {
  default: true as const,
  type: Boolean
}

export const nullableBooleanProp = {
  default: undefined,
  type: Boolean as PropType<boolean | undefined>
}

export const makeRequiredProp = <T>(type: T) => ({
  required: true as const,
  type
})

export const makeArrayProp = <T>(defaultVal: T[] = []) => ({
  default: () => defaultVal,
  type: Array as PropType<T[]>
})

export const makeObjectProp = <T>(defaultVal: T) => ({
  default: () => defaultVal,
  type: Object as PropType<T>
})

export const makeBooleanProp = <T>(defaultVal: T) => ({
  default: defaultVal,
  type: Boolean
})

export const makeNumberProp = <T>(defaultVal: T) => ({
  default: defaultVal,
  type: Number
})

export const makeNumericProp = <T>(defaultVal: T) => ({
  default: defaultVal,
  type: numericProp
})

export const makeStringProp = <T>(defaultVal: T) => ({
  default: defaultVal,
  type: String as unknown as PropType<T>
})

export type ClassType = string | object | Array<ClassType>

export const baseProps = {
  /**
   * 自定义根节点样式类
   */
  customClass: {
    default: '',
    type: [String, Object, Array] as PropType<ClassType>
  },
  /**
   * 自定义根节点样式
   */
  customStyle: {
    default: '',
    type: [String, Object, Array] as PropType<StyleValue>
  }
}

export type BaseProps = ExtractPropTypes<typeof baseProps>
