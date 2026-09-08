// 从根目录下的 package.json 中获取版本号

import type { ReAttribute, ReComponentName, ReDocUrl, ReWebTypesSource, ReWebTypesType } from 'components-helper'
import { arrayToRegExp, getTypeSymbol, hyphenate, isCommonType, isUnionType } from 'components-helper'
import os from 'os'
import path from 'path'
import { fileURLToPath } from 'url'
import { name, version } from '../package.json'
import { generateWebTypes } from './component-helper'

// 定义类型映射
const typeMap: any = {
  vue: ['Component', 'VNode', 'CSSProperties', 'StyleValue']
}

// 移除HTML标签、非英文字符和数字的函数
const removeHtmlTagsAndNonEnglish = (str: string) =>
  str
    .replace(/<\/?[^>]+(>|$)/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\d+/g, '')
    .trim()

// 重新定义组件名称的函数
const reComponentName: ReComponentName = (title: string) => `up-${hyphenate(removeHtmlTagsAndNonEnglish(title)).replace(/[ ]+/g, '-')}`

// 重新定义文档 URL 的函数
const reDocUrl: ReDocUrl = (fileName, header) => {
  const docs = 'haaaaaaaaaaaaa-uni.cn/component/'
  const _header = header ? removeHtmlTagsAndNonEnglish(header).replace(/\s+/g, '-').toLowerCase() : ''

  return `${docs}${fileName}.html${_header ? '#' : ''}${_header}`
}

// 重新定义 WebTypes 源的函数
const reWebTypesSource: ReWebTypesSource = (title) => {
  const symbol = `Wd${removeHtmlTagsAndNonEnglish(title)
    .replace(/-/g, ' ')
    .replace(/^\w|\s+\w/g, (item: string) => item.trim().toUpperCase())}`
  return { symbol }
}

// 获取纯净值（移除所有反引号和星号以及首尾的单双引号）
const getPureValue = (value: string) =>
  value
    .replace(/[`*]/g, '')
    .replace(/^['"]|['"]$/g, '')
    .trim()

// 重新定义 WebTypes 类型的函数
const reWebTypesType: ReWebTypesType = (type) => {
  const _type = getPureValue(type)

  const isPublicType = isCommonType(_type)
  const isNumber = /^\d+$/.test(_type)
  const symbol = getTypeSymbol(_type)
  const isUnion = isUnionType(symbol)
  const module = findModule(symbol)

  return isPublicType || isNumber || !symbol || isUnion ? _type : { name: _type, source: { module, symbol } }
}

// 查找模块的函数
const findModule = (type: string) => {
  for (const key in typeMap) {
    const regExp = arrayToRegExp(typeMap[key])
    if (regExp.test(getTypeSymbol(type))) {
      return key
    }
  }
}

// 将驼峰写法转换为短横线连接的写法的函数
const toKebabCase = (str: string) => str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()

// 重新定义属性名称的函数
const reAttribute: ReAttribute = (value, key, _row, title) => {
  if (title.includes('Attributes')) {
    if (key === '参数') {
      if (value.includes('v-model:')) {
        const part = value.split(/[\s/|]/).find((segment) => segment.startsWith('v-model:'))
        if (part) {
          const suffix = toKebabCase(part.split(':')[1].split(/[\s\W]/)[0])
          return `v-model:${suffix}`
        }
      } else if (value.includes('v-model')) {
        return 'v-model'
      }
      return toKebabCase(value.replace(/[^\w\s-]/g, ''))
    }
    if (key === '可选值' || key === '默认值') {
      const pureValue = getPureValue(value)

      if (['', '-', '—'].includes(pureValue)) {
        return
      }
      return pureValue
    }
  }
  return value
}

// 定义文档目录
const scriptDir = path.dirname(fileURLToPath(import.meta.url))
let entry = path.resolve(scriptDir, '../docs/component/*.md')

if (os.platform() === 'win32') {
  entry = entry.replace(/\\/g, '/')
}

generateWebTypes({
  entry,
  events: 'Events',
  eventsDescription: '说明',
  eventsName: '事件名称',
  name,
  outDir: path.resolve(scriptDir, '../src/uni_modules/uni-ui-plus'),
  props: 'Attributes',
  propsDefault: '默认值',
  propsDescription: '说明',
  propsName: '参数',
  propsOptions: '可选值',
  propsType: '类型',
  reAttribute,
  reComponentName,
  reDocUrl,
  reWebTypesSource,
  reWebTypesType,
  slots: 'Slots',
  slotsDescription: '说明',
  slotsName: '名称',
  tableRegExp: /#+\s+(.*\s*Attributes|.*\s*Events|.*\s*Slots|.*\s*Directives)\s*\n+(\|?.+\|.+)\n\|?\s*:?-+:?\s*\|.+((\n\|?.+\|.+)+)/g,
  version
})
