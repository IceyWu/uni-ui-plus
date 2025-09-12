import type { CommentItem } from './types'

/**
 * 格式化时间
 */
export function formatTime(time: string | Date, format = 'YYYY-MM-DD HH:mm'): string {
  const date = new Date(time)

  if (isNaN(date.getTime())) {
    return ''
  }

  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const minute = 60 * 1000
  const hour = minute * 60
  const day = hour * 24

  if (diff < minute) {
    return '刚刚'
  } else if (diff < hour) {
    return `${Math.floor(diff / minute)}分钟前`
  } else if (diff < day) {
    return `${Math.floor(diff / hour)}小时前`
  } else if (diff < day * 7) {
    return `${Math.floor(diff / day)}天前`
  } else {
    // 格式化日期
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const dayStr = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')

    return format.replace('YYYY', String(year)).replace('MM', month).replace('DD', dayStr).replace('HH', hours).replace('mm', minutes)
  }
}

/**
 * 构建评论树结构
 */
export function buildCommentTree(comments: CommentItem[]): CommentItem[] {
  const commentMap = new Map<string | number, CommentItem>()
  const rootComments: CommentItem[] = []

  // 创建评论映射
  comments.forEach((comment) => {
    commentMap.set(comment.id, { ...comment, replies: [] })
  })

  // 构建树结构
  commentMap.forEach((comment) => {
    if (comment.parentId && commentMap.has(comment.parentId)) {
      const parent = commentMap.get(comment.parentId)!
      parent.replies = parent.replies || []
      parent.replies.push(comment)
    } else {
      rootComments.push(comment)
    }
  })

  return rootComments
}

/**
 * 扁平化评论树
 */
export function flattenComments(comments: CommentItem[], level = 0): CommentItem[] {
  const result: CommentItem[] = []

  comments.forEach((comment) => {
    result.push({ ...comment, level })
    if (comment.replies && comment.replies.length > 0) {
      result.push(...flattenComments(comment.replies, level + 1))
    }
  })

  return result
}

/**
 * 生成默认头像
 */
export function getDefaultAvatar(username: string): string {
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F']
  const index = username.charCodeAt(0) % colors.length
  return `data:image/svg+xml,${encodeURIComponent(`
    <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="20" fill="${colors[index]}"/>
      <text x="20" y="26" text-anchor="middle" fill="white" font-size="16" font-weight="bold">
        ${username.charAt(0).toUpperCase()}
      </text>
    </svg>
  `)}`
}

/**
 * 防抖函数
 */
export function debounce<T extends (...args: any[]) => any>(func: T, delay: number): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>

  return function (...args: Parameters<T>) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func.apply(this, args), delay)
  }
}

/**
 * 节流函数
 */
export function throttle<T extends (...args: any[]) => any>(func: T, delay: number): (...args: Parameters<T>) => void {
  let lastExecTime = 0

  return function (...args: Parameters<T>) {
    const currentTime = Date.now()

    if (currentTime - lastExecTime >= delay) {
      func.apply(this, args)
      lastExecTime = currentTime
    }
  }
}
