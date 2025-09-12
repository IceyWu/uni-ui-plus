import type { ExtractPropTypes, PropType } from 'vue'
import { makeStringProp, makeNumberProp, truthProp } from '../_utils'

// 评论数据接口
export interface CommentItem {
  id: string | number
  content: string
  avatar?: string
  username: string
  createTime: string | Date
  likeCount?: number
  isLiked?: boolean
  parentId?: string | number
  replyTo?: string
  replies?: CommentItem[]
  level?: number
  showReply?: boolean
}

// Props 定义
export const commentProps = {
  /**
   * @description 评论数据列表
   * @default []
   */
  comments: {
    type: Array as PropType<CommentItem[]>,
    default: () => []
  },
  /**
   * @description 是否显示加载状态
   * @default false
   */
  loading: {
    type: Boolean,
    default: false
  },
  /**
   * @description 是否已加载完成
   * @default false
   */
  finished: {
    type: Boolean,
    default: false
  },
  /**
   * @description 是否显示输入框
   * @default true
   */
  showInput: {
    type: Boolean,
    default: true
  },
  /**
   * @description 是否显示评论统计
   * @default true
   */
  showCount: {
    type: Boolean,
    default: true
  },
  /**
   * @description 是否显示回复功能
   * @default true
   */
  showReply: {
    type: Boolean,
    default: true
  },
  /**
   * @description 最大回复层级
   * @default 3
   */
  maxLevel: makeNumberProp(3),
  /**
   * @description 是否显示点赞功能
   * @default true
   */
  showLike: {
    type: Boolean,
    default: true
  },
  /**
   * @description 是否显示时间
   * @default true
   */
  showTime: {
    type: Boolean,
    default: true
  },
  /**
   * @description 时间格式
   * @default 'YYYY-MM-DD HH:mm'
   */
  timeFormat: makeStringProp('YYYY-MM-DD HH:mm'),
  /**
   * @description 输入框占位文本
   * @default '请输入评论内容...'
   */
  inputPlaceholder: makeStringProp('请输入评论内容...'),
  /**
   * @description 最大输入长度
   * @default 500
   */
  maxLength: makeNumberProp(500),
  /**
   * @description 是否显示头像
   * @default true
   */
  showAvatar: {
    type: Boolean,
    default: true
  },
  /**
   * @description 当前用户头像
   * @default ''
   */
  avatar: makeStringProp(''),
  /**
   * @description 发布按钮文本
   * @default '发布'
   */
  buttonText: makeStringProp('发布'),
  /**
   * @description 是否自动聚焦
   * @default false
   */
  autoFocus: {
    type: Boolean,
    default: false
  },
  /**
   * @description 是否显示表情
   * @default true
   */
  showEmotion: {
    type: Boolean,
    default: true
  },
  /**
   * @description 是否禁用输入
   * @default false
   */
  disabled: {
    type: Boolean,
    default: false
  }
}

// Emits 定义
export interface CommentEmits {
  /**
   * @description 提交评论
   * @param content 评论内容
   * @param parentId 父评论ID
   * @param replyTo 回复的用户名
   */
  submit: [content: string, parentId?: string | number, replyTo?: string]
  /**
   * @description 点赞评论
   * @param comment 评论数据
   */
  like: [comment: CommentItem]
  /**
   * @description 回复评论
   * @param comment 评论数据
   */
  reply: [comment: CommentItem]
  /**
   * @description 删除评论
   * @param comment 评论数据
   */
  delete: [comment: CommentItem]
  /**
   * @description 举报评论
   * @param comment 评论数据
   */
  report: [comment: CommentItem]
  /**
   * @description 加载更多
   */
  loadMore: []
  /**
   * @description 输入框聚焦
   */
  inputFocus: []
  /**
   * @description 输入框失焦
   */
  inputBlur: []
}

export type CommentProps = ExtractPropTypes<typeof commentProps>

// 导出实例类型
export interface CommentInst {
  focus: () => void
  blur: () => void
  clear: () => void
}
