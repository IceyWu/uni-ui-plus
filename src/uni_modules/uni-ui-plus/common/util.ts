import type { BaseProps } from './props.ts'

// ==================== Type Guards ====================

const toString = Object.prototype.toString

export function is(val: unknown, type: string) {
  return toString.call(val) === `[object ${type}]`
}

export function isDef<T>(value: T): value is NonNullable<T> {
  return value !== undefined && value !== null
}

export function isObj(value: any): value is object {
  return toString.call(value) === '[object Object]' || typeof value === 'object'
}

export function isObject(val: any): val is Record<any, any> {
  return val !== null && is(val, 'Object')
}

export function isEmpty<T = unknown>(val: T): val is T {
  if (isArray(val) || isString(val)) {
    return val.length === 0
  }
  if (val instanceof Map || val instanceof Set) {
    return val.size === 0
  }
  if (isObject(val)) {
    return Object.keys(val).length === 0
  }
  return false
}

export function isArray(value: any): value is Array<any> {
  return Array.isArray(value)
}

export function isString(value: unknown): value is string {
  return is(value, 'String')
}

export function isNumber(value: any): value is number {
  return is(value, 'Number')
}

export function isVideoUrl(url: string): boolean {
  return /\.(mp4|mpg|mpeg|dat|asf|avi|rm|rmvb|mov|wmv|flv|mkv|video)/i.test(url)
}

export function isImageUrl(url: string): boolean {
  return /\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg|image)/i.test(url)
}

// ==================== String Helpers ====================

export function kebabCase(word: string): string {
  return word.replace(/[A-Z]/g, (match) => `-${match}`).toLowerCase()
}

export function camelCase(word: string): string {
  return word.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())
}

// ==================== Number Helpers ====================

export function addUnit(num: number | string) {
  return Number.isNaN(Number(num)) ? `${num}` : `${num}px`
}

export function pxCheck(value: string | number): string {
  return Number.isNaN(Number(value)) ? String(value) : `${value}px`
}

// ==================== UUID ====================

export function uuid() {
  const s4 = () =>
    Math.floor((1 + Math.random()) * 0x1_00_00)
      .toString(16)
      .substring(1)
  return s4() + s4() + s4() + s4() + s4() + s4() + s4() + s4()
}

// ==================== Style Helpers ====================

export function objToStyle(styles: Record<string, any> | Record<string, any>[]): string {
  if (isArray(styles)) {
    const result = styles
      .filter((item) => item != null && item !== '')
      .map((item) => objToStyle(item))
      .join(';')
    return result ? (result.endsWith(';') ? result : `${result};`) : ''
  }
  if (isString(styles)) {
    return styles ? (styles.endsWith(';') ? styles : `${styles};`) : ''
  }
  if (isObj(styles)) {
    const result = Object.keys(styles)
      .filter((key) => styles[key] != null && styles[key] !== '')
      .map((key) => [kebabCase(key), styles[key]].join(':'))
      .join(';')
    return result ? (result.endsWith(';') ? result : `${result};`) : ''
  }
  return ''
}

export type NormalizedStyle = Record<string, string | number>

const listDelimiterRE = /;(?![^(]*\))/g
const propertyDelimiterRE = /:([\s\S]+)/
const styleCommentRE = /\/\*.*?\*\//g

export function parseStringStyle(cssText: string): NormalizedStyle {
  const ret: NormalizedStyle = {}
  for (const item of cssText.replace(styleCommentRE, '').split(listDelimiterRE)) {
    if (item) {
      const tmp = item.split(propertyDelimiterRE)
      if (tmp.length > 1) {
        ret[tmp[0].trim()] = tmp[1].trim()
      }
    }
  }
  return ret
}

export function stringifyStyle(styles: NormalizedStyle | string | undefined): string {
  let ret = ''
  if (!styles || isString(styles)) {
    return ret
  }
  for (const key in styles) {
    const value = styles[key]
    const normalizedKey = key.startsWith('--') ? key : kebabCase(key)
    if (isString(value) || typeof value === 'number') {
      ret += `${normalizedKey}:${value};`
    }
  }
  return ret
}

export function normalizeStyle(value: unknown): NormalizedStyle | string | undefined {
  if (isArray(value)) {
    const res: NormalizedStyle = {}
    for (const item of value) {
      const normalized = isString(item) ? parseStringStyle(item) : (normalizeStyle(item) as NormalizedStyle)
      if (normalized) {
        for (const key in normalized) {
          if (!isEmpty(normalized[key])) {
            res[key] = normalized[key]
          }
        }
      }
    }
    return res
  }
  if (isString(value)) {
    return value
  }
  if (isObject(value)) {
    return value
  }
}

export function normalizeClass(value: unknown): string {
  let res = ''
  if (isString(value)) {
    res = value
  } else if (isArray(value)) {
    for (const element_ of value) {
      const normalized = normalizeClass(element_)
      if (normalized) {
        res += `${normalized} `
      }
    }
  } else if (isObject(value)) {
    for (const name in value) {
      if (value[name]) {
        res += `${name} `
      }
    }
  }
  return res.trim()
}

export function getMainClass(props: BaseProps, componentName: string, cls?: object) {
  return normalizeClass([props.customClass, { [componentName]: true }, cls])
}
