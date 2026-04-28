import type { ExtractPropTypes, PropType, StyleValue } from 'vue'

export const unknownProp = null as unknown as PropType<unknown>

export const numericProp = [Number, String]

export const truthProp = {
  type: Boolean,
  default: true as const
}

export const nullableBooleanProp = {
  type: Boolean as PropType<boolean | undefined>,
  default: undefined
}

export const makeRequiredProp = <T>(type: T) => ({
  type,
  required: true as const
})

export const makeArrayProp = <T>(defaultVal: T[] = []) => ({
  type: Array as PropType<T[]>,
  default: () => defaultVal
})

export const makeObjectProp = <T>(defaultVal: T) => ({
  type: Object as PropType<T>,
  default: () => defaultVal
})

export const makeBooleanProp = <T>(defaultVal: T) => ({
  type: Boolean,
  default: defaultVal
})

export const makeNumberProp = <T>(defaultVal: T) => ({
  type: Number,
  default: defaultVal
})

export const makeNumericProp = <T>(defaultVal: T) => ({
  type: numericProp,
  default: defaultVal
})

export const makeStringProp = <T>(defaultVal: T) => ({
  type: String as unknown as PropType<T>,
  default: defaultVal
})

export type ClassType = string | object | Array<ClassType>

export const baseProps = {
  /**
   * 自定义根节点样式
   */
  customStyle: {
    type: [String, Object, Array] as PropType<StyleValue>,
    default: ''
  },
  /**
   * 自定义根节点样式类
   */
  customClass: {
    type: [String, Object, Array] as PropType<ClassType>,
    default: ''
  }
}

export type BaseProps = ExtractPropTypes<typeof baseProps>
