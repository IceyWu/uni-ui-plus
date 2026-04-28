import { AbortablePromise } from './AbortablePromise'

// ==================== Type Guards ====================

const toString = Object.prototype.toString

export function is(val: unknown, type: string) {
  return toString.call(val) === `[object ${type}]`
}

export function isDef<T>(value: T): value is NonNullable<T> {
  return value !== undefined && value !== null
}

export function isUndefined(value: any): value is undefined {
  return typeof value === 'undefined'
}

export function isObj(value: any): value is object {
  return toString.call(value) === '[object Object]' || typeof value === 'object'
}

export function isObject(val: any): val is Record<any, any> {
  return val !== null && is(val, 'Object')
}

export function isEmpty<T = unknown>(val: T): val is T {
  if (isArray(val) || isString(val)) return val.length === 0
  if (val instanceof Map || val instanceof Set) return val.size === 0
  if (isObject(val)) return Object.keys(val).length === 0
  return false
}

export function isArray(value: any): value is Array<any> {
  return Array.isArray(value)
}

export function isFunction<T extends (...args: any[]) => any>(value: any): value is T {
  return typeof value === 'function'
}

export function isString(value: unknown): value is string {
  return is(value, 'String')
}

export function isNumber(value: any): value is number {
  return is(value, 'Number')
}

export function isBoolean(value: any): value is boolean {
  return typeof value === 'boolean'
}

export function isDate(val: unknown): val is Date {
  return is(val, 'Date') && !Number.isNaN((val as Date).getTime())
}

export function isPromise(value: unknown): value is Promise<any> {
  if (isObj(value) && isDef(value)) {
    return isFunction((value as Promise<any>).then) && isFunction((value as Promise<any>).catch)
  }
  return false
}

export function isNull(val: unknown): val is null {
  return val === null
}

export function isNullOrUnDef(val: unknown): val is null | undefined {
  return isUndefined(val) || isNull(val)
}

export function isRegExp(val: unknown): val is RegExp {
  return is(val, 'RegExp')
}

export function isUrl(path: string): boolean {
  return /^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?/.test(path)
}

export function isBase64Image(url: string) {
  return /^data:image\/(png|jpg|jpeg|gif|bmp);base64,/.test(url)
}

export function isVideoUrl(url: string): boolean {
  return /\.(mp4|mpg|mpeg|dat|asf|avi|rm|rmvb|mov|wmv|flv|mkv|video)/i.test(url)
}

export function isImageUrl(url: string): boolean {
  return /\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg|image)/i.test(url)
}

export function isOdd(value: number): boolean {
  if (typeof value !== 'number') throw new Error('输入必须为数字')
  return value % 2 === 1
}

// ==================== String Helpers ====================

export function getType(target: unknown): string {
  const typeStr = toString.call(target)
  const match = typeStr.match(/\[object (\w+)\]/)
  return match && match.length ? match[1].toLowerCase() : ''
}

export function kebabCase(word: string): string {
  return word.replace(/[A-Z]/g, (match) => `-${match}`).toLowerCase()
}

export function camelCase(word: string): string {
  return word.replace(/-(\w)/g, (_, c) => c.toUpperCase())
}

export const padZero = (number: number | string, length: number = 2): string => {
  let numStr = number.toString()
  while (numStr.length < length) numStr = '0' + numStr
  return numStr
}

// ==================== Number Helpers ====================

export function addUnit(num: number | string) {
  return Number.isNaN(Number(num)) ? `${num}` : `${num}px`
}

export function pxCheck(value: string | number): string {
  return Number.isNaN(Number(value)) ? String(value) : `${value}px`
}

export const range = (num: number, min: number, max: number): number => Math.min(Math.max(num, min), max)

export const clamp = (num: number, min: number, max: number): number => Math.min(Math.max(num, min), max)

export const checkNumRange = (num: number, label: string = 'value'): void => {
  if (num < 0) throw new Error(`${label} shouldn't be less than zero`)
}

export const checkPixelRange = (num: number, label: string = 'value'): void => {
  if (num <= 0) throw new Error(`${label} should be greater than zero`)
}

export function closest(arr: number[], target: number) {
  return arr.reduce((prev, curr) => (Math.abs(curr - target) < Math.abs(prev - target) ? curr : prev))
}

export function easingFn(t: number = 0, b: number = 0, c: number = 0, d: number = 0): number {
  return (c * (-Math.pow(2, (-10 * t) / d) + 1) * 1024) / 1023 + b
}

// ==================== UUID / Random ====================

export function uuid() {
  const s4 = () =>
    Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)
  return s4() + s4() + s4() + s4() + s4() + s4() + s4() + s4()
}

export function getRandomId() {
  return Math.random().toString(36).slice(-8)
}

export const context = { id: 1000 }

// ==================== Object Helpers ====================

export function deepClone<T>(obj: T, cache: Map<any, any> = new Map()): T {
  if (obj === null || typeof obj !== 'object') return obj
  if (isDate(obj)) return new Date(obj.getTime()) as any
  if (obj instanceof RegExp) return new RegExp(obj.source, obj.flags) as any
  if (obj instanceof Error) {
    const errorCopy = new Error(obj.message) as any
    errorCopy.stack = obj.stack
    return errorCopy
  }
  if (cache.has(obj)) return cache.get(obj)
  const copy: any = Array.isArray(obj) ? [] : {}
  cache.set(obj, copy)
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      copy[key] = deepClone(obj[key], cache)
    }
  }
  return copy as T
}

export function deepMerge<T extends Record<string, any>>(target: T, source: Record<string, any>): T {
  target = deepClone(target)
  if (typeof target !== 'object' || typeof source !== 'object') {
    throw new Error('Both target and source must be objects.')
  }
  for (const prop in source) {
    if (!Object.prototype.hasOwnProperty.call(source, prop)) continue
    ;(target as Record<string, any>)[prop] = source[prop]
  }
  return target
}

export function deepAssign(target: Record<string, any>, source: Record<string, any>): Record<string, any> {
  Object.keys(source).forEach((key) => {
    const targetValue = target[key]
    const newObjValue = source[key]
    if (isObj(targetValue) && isObj(newObjValue)) {
      deepAssign(targetValue, newObjValue)
    } else {
      target[key] = newObjValue
    }
  })
  return target
}

export const isEqual = (value1: any, value2: any): boolean => {
  if (value1 === value2) return true
  if (!Array.isArray(value1) || !Array.isArray(value2)) return false
  if (value1.length !== value2.length) return false
  for (let i = 0; i < value1.length; ++i) {
    if (value1[i] !== value2[i]) return false
  }
  return true
}

export function hasFields(obj: unknown): boolean {
  if (!isObj(obj) || obj === null) return false
  return Object.keys(obj).length > 0
}

export function isEmptyObj(obj: unknown): boolean {
  return !hasFields(obj)
}

export const getPropByPath = (obj: any, path: string): any => {
  try {
    return path.split('.').reduce((acc, key) => (acc !== undefined && acc !== null ? acc[key] : undefined), obj)
  } catch {
    return undefined
  }
}

export function omitBy<O extends Record<string, any>>(obj: O, predicate: (value: any, key: keyof O) => boolean): Partial<O> {
  const newObj = deepClone(obj)
  Object.keys(newObj).forEach((key) => predicate(newObj[key], key) && delete newObj[key])
  return newObj
}

export function toArray<T>(value?: T | T[]): T[] {
  if (!value) return []
  return Array.isArray(value) ? value : [value]
}

export function noop() {}

// ==================== Color Helpers ====================

export function rgbToHex(r: number, g: number, b: number): string {
  const hex = ((r << 16) | (g << 8) | b).toString(16)
  return '#' + '0'.repeat(Math.max(0, 6 - hex.length)) + hex
}

export function hexToRgb(hex: string): number[] {
  const rgb: number[] = []
  for (let i = 1; i < 7; i += 2) {
    rgb.push(parseInt('0x' + hex.slice(i, i + 2), 16))
  }
  return rgb
}

export const gradient = (startColor: string, endColor: string, step: number = 2): string[] => {
  const sColor = hexToRgb(startColor)
  const eColor = hexToRgb(endColor)
  const rStep = (eColor[0] - sColor[0]) / step
  const gStep = (eColor[1] - sColor[1]) / step
  const bStep = (eColor[2] - sColor[2]) / step
  const gradientColorArr: string[] = []
  for (let i = 0; i < step; i++) {
    gradientColorArr.push(
      rgbToHex(parseInt(String(rStep * i + sColor[0])), parseInt(String(gStep * i + sColor[1])), parseInt(String(bStep * i + sColor[2])))
    )
  }
  return gradientColorArr
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

// ==================== DOM Helpers ====================

export type RectResultType<T extends boolean> = T extends true ? UniApp.NodeInfo[] : UniApp.NodeInfo

export function getRect<T extends boolean>(selector: string, all: T, scope?: any, useFields?: boolean): Promise<RectResultType<T>> {
  return new Promise<RectResultType<T>>((resolve, reject) => {
    let query: UniNamespace.SelectorQuery | null = null
    if (scope) {
      query = uni.createSelectorQuery().in(scope)
    } else {
      query = uni.createSelectorQuery()
    }
    const method = all ? 'selectAll' : 'select'
    const callback = (rect: UniApp.NodeInfo | UniApp.NodeInfo[]) => {
      if (all && isArray(rect) && rect.length > 0) {
        resolve(rect as RectResultType<T>)
      } else if (!all && rect) {
        resolve(rect as RectResultType<T>)
      } else {
        reject(new Error('No nodes found'))
      }
    }
    if (useFields) {
      query[method](selector).fields({ size: true, node: true }, callback).exec()
    } else {
      query[method](selector).boundingClientRect(callback).exec()
    }
  })
}

// ==================== Async Helpers ====================

export const requestAnimationFrame = (cb = () => {}) => {
  return new AbortablePromise((resolve) => {
    const timer = setInterval(() => {
      clearInterval(timer)
      resolve(true)
      cb()
    }, 1000 / 30)
  })
}

export const pause = (ms: number = 1000 / 30) => {
  return new AbortablePromise((resolve) => {
    const timer = setTimeout(() => {
      clearTimeout(timer)
      resolve(true)
    }, ms)
  })
}

// ==================== Function Helpers ====================

type DebounceOptions = {
  leading?: boolean
  trailing?: boolean
}

export function debounce<T extends (...args: any[]) => any>(func: T, wait: number, options: DebounceOptions = {}): T {
  let timeoutId: ReturnType<typeof setTimeout> | null = null
  let lastArgs: any[] | undefined
  let lastThis: any
  let result: ReturnType<T> | undefined
  const leading = isDef(options.leading) ? options.leading : false
  const trailing = isDef(options.trailing) ? options.trailing : true

  function invokeFunc() {
    if (lastArgs !== undefined) {
      result = func.apply(lastThis, lastArgs)
      lastArgs = undefined
    }
  }

  function startTimer() {
    timeoutId = setTimeout(() => {
      timeoutId = null
      if (trailing) invokeFunc()
    }, wait)
  }

  function cancelTimer() {
    if (timeoutId !== null) {
      clearTimeout(timeoutId)
      timeoutId = null
    }
  }

  function debounced(this: any, ...args: Parameters<T>): ReturnType<T> | undefined {
    lastArgs = args
    lastThis = this
    if (timeoutId === null) {
      if (leading) invokeFunc()
      startTimer()
    } else if (trailing) {
      cancelTimer()
      startTimer()
    }
    return result
  }

  return debounced as T
}

export function throttle(func: (...args: any[]) => any, wait: number) {
  let timeout: ReturnType<typeof setTimeout> | null = null
  let previous: number = 0

  const throttled = function (this: any, ...args: any[]) {
    const now = Date.now()
    const remaining = wait - (now - previous)
    if (remaining <= 0) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now
      func.apply(this, args)
    } else if (!timeout) {
      timeout = setTimeout(() => {
        previous = Date.now()
        timeout = null
        func.apply(this, args)
      }, remaining)
    }
  }

  return throttled
}

export function buildUrlWithParams(baseUrl: string, params: Record<string, string>) {
  const queryString = Object.entries(params)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&')
  const separator = baseUrl.includes('?') ? '&' : '?'
  return `${baseUrl}${separator}${queryString}`
}

export const defaultDisplayFormat = function (items: any[] | Record<string, any>, kv?: { labelKey?: string }): string {
  const labelKey = kv?.labelKey || 'value'
  if (Array.isArray(items)) return items.map((item) => item[labelKey]).join(', ')
  return items[labelKey]
}

export const defaultFunction = <T>(value: T): T => value

// ==================== Style Helpers (from style.ts) ====================

import type { CSSProperties } from 'vue'
import type { BaseProps } from './props'

export type NormalizedStyle = Record<string, string | number>

const listDelimiterRE = /;(?![^(]*\))/g
const propertyDelimiterRE = /:([\s\S]+)/
const styleCommentRE = /\/\*.*?\*\//g

export function parseStringStyle(cssText: string): NormalizedStyle {
  const ret: NormalizedStyle = {}
  for (const item of cssText.replace(styleCommentRE, '').split(listDelimiterRE)) {
    if (item) {
      const tmp = item.split(propertyDelimiterRE)
      if (tmp.length > 1) ret[tmp[0].trim()] = tmp[1].trim()
    }
  }
  return ret
}

export function stringifyStyle(styles: NormalizedStyle | string | undefined): string {
  let ret = ''
  if (!styles || isString(styles)) return ret
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
          if (!isEmpty(normalized[key])) res[key] = normalized[key]
        }
      }
    }
    return res
  }
  if (isString(value)) return value
  if (isObject(value)) return value
}

export function normalizeClass(value: unknown): string {
  let res = ''
  if (isString(value)) {
    res = value
  } else if (isArray(value)) {
    for (const element_ of value) {
      const normalized = normalizeClass(element_)
      if (normalized) res += `${normalized} `
    }
  } else if (isObject(value)) {
    for (const name in value) {
      if (value[name]) res += `${name} `
    }
  }
  return res.trim()
}

export function getMainClass(props: BaseProps, componentName: string, cls?: object) {
  return normalizeClass([props.customClass, { [componentName]: true }, cls])
}

export function getMainStyle(props: BaseProps, style?: CSSProperties) {
  return stringifyStyle(normalizeStyle([props.customStyle, style]))
}

export function getPx(value: string | number, unit = false) {
  if (isNumber(value)) return unit ? `${value}px` : Number(value)
  return unit ? `${Number.parseInt(value)}px` : Number.parseInt(value)
}

// ==================== Platform Env ====================

/** 枚举EPlatform */
enum EPlatform {
  AppPlus = 'APP-PLUS',
  AppPlusNvue = 'APP-PLUS-NVUE',
  H5 = 'H5',
  MpWeixin = 'MP-WEIXIN',
  MpAlipay = 'MP-ALIPAY',
  MpBaidu = 'MP-BAIDU',
  MpToutiao = 'MP-TOUTIAO',
  MpQq = 'MP-QQ',
  Mp360 = 'MP-360',
  Mp = 'MP',
  QuickappWebview = 'quickapp-webview',
  QuickappWebviewUnion = 'quickapp-webview-union',
  QuickappWebviewHuawei = 'quickapp-webview-huawei'
}

function ifDefPlatform(): EPlatform {
  let platform: EPlatform
  // #ifdef APP-PLUS
  platform = EPlatform.AppPlus
  // #endif
  // #ifdef APP-PLUS-NVUE
  platform = EPlatform.AppPlusNvue
  // #endif
  // #ifdef H5
  platform = EPlatform.H5
  // #endif
  // #ifdef MP-WEIXIN
  platform = EPlatform.MpWeixin
  // #endif
  // #ifdef MP-ALIPAY
  platform = EPlatform.MpAlipay
  // #endif
  // #ifdef MP-BAIDU
  platform = EPlatform.MpBaidu
  // #endif
  // #ifdef MP-TOUTIAO
  platform = EPlatform.MpToutiao
  // #endif
  // #ifdef MP-QQ
  platform = EPlatform.MpQq
  // #endif
  // #ifdef MP-360
  platform = EPlatform.Mp360
  // #endif
  // #ifdef MP
  platform = EPlatform.Mp
  // #endif
  // #ifdef quickapp-webview
  platform = EPlatform.QuickappWebview
  // #endif
  // #ifdef quickapp-webview-union
  platform = EPlatform.QuickappWebviewUnion
  // #endif
  // #ifdef quickapp-webview-huawei
  platform = EPlatform.QuickappWebviewHuawei
  // #endif
  return platform
}

export const platform: EPlatform = ifDefPlatform()

export const isH5 = platform === EPlatform.H5
export const isMpWeixin = platform === EPlatform.MpWeixin
export const isMpAlipay = platform === EPlatform.MpAlipay
export const isMpBaidu = platform === EPlatform.MpBaidu
export const isMpToutiao = platform === EPlatform.MpToutiao
export const isMpQq = platform === EPlatform.MpQq
export const isMp360 = platform === EPlatform.Mp360
export const isMp = platform === EPlatform.Mp
export const isQuickappWebview = platform === EPlatform.QuickappWebview
export const isQuickappWebviewUnion = platform === EPlatform.QuickappWebviewUnion
export const isQuickappWebviewHuawei = platform === EPlatform.QuickappWebviewHuawei
