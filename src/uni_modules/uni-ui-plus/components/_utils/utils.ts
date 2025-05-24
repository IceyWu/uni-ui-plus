import { isArray, isObj, isString } from './is'
/**
 * @description 对num自动填充px
 * @param {number} num
 * @return {string} num+px
 */
export function addUnit(num: number | string) {
  return Number.isNaN(Number(num)) ? `${num}` : `${num}px`
}

/**
 * 将驼峰命名转换为短横线命名。
 * @param {string} word 待转换的词条
 * @returns {string} 转换后的结果
 */
export function kebabCase(word: string): string {
  // 使用正则表达式匹配所有大写字母，并在前面加上短横线，然后转换为小写
  const newWord: string = word
    .replace(/[A-Z]/g, (match) => {
      return `-${match}`
    })
    .toLowerCase()

  return newWord
}

/**
 * 将外部传入的样式格式化为可读的 CSS 样式。
 * @param {object | object[]} styles 外部传入的样式对象或数组
 * @returns {string} 格式化后的 CSS 样式字符串
 */
export function objToStyle(styles: Record<string, any> | Record<string, any>[]): string {
  // 如果 styles 是数组类型
  if (isArray(styles)) {
    // 使用过滤函数去除空值和 null 值的元素
    // 对每个非空元素递归调用 objToStyle，然后通过分号连接
    const result = styles
      .filter((item) => {
        return item != null && item !== ''
      })
      .map((item) => {
        return objToStyle(item)
      })
      .join(';')

    // 如果结果不为空，确保末尾有分号
    return result ? (result.endsWith(';') ? result : `${result};`) : ''
  }

  if (isString(styles)) {
    // 如果是字符串且不为空，确保末尾有分号
    return styles ? (styles.endsWith(';') ? styles : `${styles};`) : ''
  }

  // 如果 styles 是对象类型
  if (isObj(styles)) {
    // 使用 Object.keys 获取所有属性名
    // 使用过滤函数去除值为 null 或空字符串的属性
    // 对每个属性名和属性值进行格式化，通过分号连接
    const result = Object.keys(styles)
      .filter((key) => {
        return styles[key] != null && styles[key] !== ''
      })
      .map((key) => {
        // 使用 kebabCase 函数将属性名转换为 kebab-case 格式
        // 将属性名和属性值格式化为 CSS 样式的键值对
        return [kebabCase(key), styles[key]].join(':')
      })
      .join(';')

    // 如果结果不为空，确保末尾有分号
    return result ? (result.endsWith(';') ? result : `${result};`) : ''
  }
  // 如果 styles 不是对象也不是数组，则直接返回
  return ''
}
