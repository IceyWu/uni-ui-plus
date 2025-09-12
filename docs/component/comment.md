# Comment 评论

评论组件，支持多级回复、点赞、表情等功能。

## 基础用法

```vue
<template>
  <wd-comment
    :comments="comments"
    @submit="handleSubmit"
    @like="handleLike"
    @reply="handleReply"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { CommentItem } from 'uni-ui-plus'

const comments = ref<CommentItem[]>([
  {
    id: 1,
    content: '这是一条评论',
    username: '用户A',
    avatar: 'https://example.com/avatar1.jpg',
    createTime: new Date(),
    likeCount: 5,
    isLiked: false
  },
  {
    id: 2,
    content: '这是一条回复',
    username: '用户B',
    avatar: 'https://example.com/avatar2.jpg',
    createTime: new Date(),
    parentId: 1,
    replyTo: '用户A'
  }
])

const handleSubmit = (content: string, parentId?: string | number, replyTo?: string) => {
  // 处理评论提交
  const newComment: CommentItem = {
    id: Date.now(),
    content,
    username: '当前用户',
    createTime: new Date(),
    parentId,
    replyTo
  }
  comments.value.push(newComment)
}

const handleLike = (comment: CommentItem) => {
  // 处理点赞
  comment.isLiked = !comment.isLiked
  comment.likeCount = (comment.likeCount || 0) + (comment.isLiked ? 1 : -1)
}

const handleReply = (comment: CommentItem) => {
  // 处理回复逻辑
  console.log('回复评论:', comment)
}
</script>
```

## 只显示评论列表

```vue
<template>
  <wd-comment
    :comments="comments"
    :show-input="false"
    @like="handleLike"
  />
</template>
```

## 自定义配置

```vue
<template>
  <wd-comment
    :comments="comments"
    :max-level="2"
    :show-emotion="false"
    :max-length="200"
    input-placeholder="说点什么吧..."
    button-text="发送"
    time-format="MM-DD HH:mm"
    @submit="handleSubmit"
  />
</template>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| comments | 评论数据 | `CommentItem[]` | `[]` |
| loading | 加载状态 | `boolean` | `false` |
| finished | 是否已加载完成 | `boolean` | `false` |
| show-input | 是否显示输入框 | `boolean` | `true` |
| show-count | 是否显示评论统计 | `boolean` | `true` |
| show-reply | 是否显示回复功能 | `boolean` | `true` |
| max-level | 最大回复层级 | `number` | `3` |
| show-like | 是否显示点赞功能 | `boolean` | `true` |
| show-time | 是否显示时间 | `boolean` | `true` |
| time-format | 时间格式 | `string` | `'YYYY-MM-DD HH:mm'` |
| input-placeholder | 输入框占位文本 | `string` | `'请输入评论内容...'` |
| max-length | 最大输入长度 | `number` | `500` |
| show-avatar | 是否显示头像 | `boolean` | `true` |
| avatar | 当前用户头像 | `string` | `''` |
| button-text | 发布按钮文本 | `string` | `'发布'` |
| auto-focus | 是否自动聚焦 | `boolean` | `false` |
| show-emotion | 是否显示表情 | `boolean` | `true` |
| disabled | 是否禁用输入 | `boolean` | `false` |

### Events

| 事件名 | 说明 | 参数 |
|--------|------|------|
| submit | 提交评论 | `(content: string, parentId?: string \| number, replyTo?: string)` |
| like | 点赞评论 | `(comment: CommentItem)` |
| reply | 回复评论 | `(comment: CommentItem)` |
| delete | 删除评论 | `(comment: CommentItem)` |
| report | 举报评论 | `(comment: CommentItem)` |
| load-more | 加载更多 | `()` |
| input-focus | 输入框聚焦 | `()` |
| input-blur | 输入框失焦 | `()` |

### CommentItem 数据结构

```typescript
interface CommentItem {
  id: string | number          // 评论ID
  content: string              // 评论内容
  avatar?: string              // 用户头像
  username: string             // 用户名
  createTime: string | Date    // 创建时间
  likeCount?: number           // 点赞数
  isLiked?: boolean            // 是否已点赞
  parentId?: string | number   // 父评论ID
  replyTo?: string             // 回复的用户名
  replies?: CommentItem[]      // 子回复列表
  level?: number               // 回复层级
  showReply?: boolean          // 是否显示回复按钮
}
```

## 样式变量

组件提供了以下 CSS 变量，可用于自定义样式：

```scss
:root {
  --wd-comment-bg-color: #fff;
  --wd-comment-border-color: #f0f0f0;
  --wd-comment-text-color: #333;
  --wd-comment-meta-color: #999;
  --wd-comment-primary-color: #007aff;
  --wd-comment-like-color: #ff3040;
  --wd-comment-avatar-size: 40px;
  --wd-comment-border-radius: 8px;
}
```

## 特性

- ✅ 支持多级嵌套回复
- ✅ 支持点赞功能
- ✅ 支持表情输入
- ✅ 支持时间格式化
- ✅ 支持自定义头像
- ✅ 支持长按菜单（举报、删除）
- ✅ 支持字数统计
- ✅ 响应式设计
- ✅ TypeScript 支持

## 注意事项

1. 评论数据需要按照 `CommentItem` 接口格式提供
2. 组件会自动构建评论的树形结构
3. 删除和举报功能需要开发者自行实现逻辑
4. 默认最大回复层级为 3 层，超过后将平铺显示
5. 时间格式化支持相对时间（如"刚刚"、"5分钟前"）和绝对时间
