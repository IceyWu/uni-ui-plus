<template>
  <page-wraper>
    <wd-navbar :title="$t('comment')" left-arrow @click-left="handleBack"></wd-navbar>

    <view class="demo-container">
      <!-- 基础用法 -->
      <demo-block :title="$t('jiBenYongFa')">
        <up-comment
          :comments="basicComments"
          :loading="loading"
          @submit="handleSubmit"
          @like="handleLike"
          @reply="handleReply"
          @delete="handleDelete"
          @report="handleReport"
        />
      </demo-block>

      <!-- 自定义配置 -->
      <demo-block :title="$t('ziDingYiPeiZhi')">
        <up-comment
          :comments="customComments"
          :max-level="2"
          :show-emotion="false"
          :max-length="200"
          :input-placeholder="$t('comment-custom-placeholder')"
          :button-text="$t('comment-send')"
          time-format="MM-DD HH:mm"
          @submit="handleCustomSubmit"
          @like="handleLike"
        />
      </demo-block>

      <!-- 只显示列表 -->
      <demo-block :title="$t('comment-list-only')">
        <up-comment :comments="listOnlyComments" :show-input="false" :show-count="false" @like="handleLike" />
      </demo-block>
    </view>
  </page-wraper>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import UpComment from '@/uni_modules/uni-ui-plus/components//comment/comment.vue'
import type { CommentItem } from '../../uni_modules/uni-ui-plus/components/comment/comment'

const { t } = useI18n()
const loading = ref(false)

// 基础评论数据
const basicComments = ref<CommentItem[]>([
  {
    id: 1,
    content: '这是一条很棒的评论！我觉得这个功能很实用 👍',
    username: '张三',
    avatar: '',
    createTime: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2小时前
    likeCount: 12,
    isLiked: false
  },
  {
    id: 2,
    content: '同意楼上的观点',
    username: '李四',
    avatar: '',
    createTime: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1小时前
    parentId: 1,
    replyTo: '张三',
    likeCount: 3,
    isLiked: true
  },
  {
    id: 3,
    content: '我也来试试这个评论功能，感觉还不错呢！支持表情和多级回复真的很棒 😊',
    username: '王五',
    avatar: '',
    createTime: new Date(Date.now() - 30 * 60 * 1000), // 30分钟前
    likeCount: 5,
    isLiked: false
  },
  {
    id: 4,
    content: '确实很好用',
    username: '赵六',
    avatar: '',
    createTime: new Date(Date.now() - 15 * 60 * 1000), // 15分钟前
    parentId: 3,
    replyTo: '王五',
    likeCount: 1,
    isLiked: false
  },
  {
    id: 5,
    content: '我觉得可以再优化一下界面',
    username: '孙七',
    avatar: '',
    createTime: new Date(Date.now() - 5 * 60 * 1000), // 5分钟前
    likeCount: 0,
    isLiked: false
  }
])

// 自定义配置的评论数据
const customComments = ref<CommentItem[]>([
  {
    id: 10,
    content: '这里是自定义配置的评论',
    username: '用户A',
    avatar: '',
    createTime: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1天前
    likeCount: 8,
    isLiked: false
  },
  {
    id: 11,
    content: '最大层级限制为2层',
    username: '用户B',
    avatar: '',
    createTime: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12小时前
    parentId: 10,
    replyTo: '用户A',
    likeCount: 2,
    isLiked: true
  }
])

// 只显示列表的评论数据
const listOnlyComments = ref<CommentItem[]>([
  {
    id: 20,
    content: '这里只显示评论列表，没有输入框',
    username: '观察者',
    avatar: '',
    createTime: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3小时前
    likeCount: 6,
    isLiked: false
  },
  {
    id: 21,
    content: '适合用于展示历史评论',
    username: '路人甲',
    avatar: '',
    createTime: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2小时前
    parentId: 20,
    replyTo: '观察者',
    likeCount: 1,
    isLiked: false
  }
])

const handleBack = () => {
  uni.navigateBack()
}

const handleSubmit = (content: string, parentId?: string | number, replyTo?: string) => {
  loading.value = true

  // 模拟网络请求
  setTimeout(() => {
    const newComment: CommentItem = {
      id: Date.now(),
      content,
      username: '当前用户',
      avatar: '',
      createTime: new Date(),
      parentId,
      replyTo,
      likeCount: 0,
      isLiked: false
    }

    basicComments.value.push(newComment)
    loading.value = false

    uni.showToast({
      title: '评论成功',
      icon: 'success'
    })
  }, 1000)
}

const handleCustomSubmit = (content: string, parentId?: string | number, replyTo?: string) => {
  const newComment: CommentItem = {
    id: Date.now(),
    content,
    username: '当前用户',
    avatar: '',
    createTime: new Date(),
    parentId,
    replyTo,
    likeCount: 0,
    isLiked: false
  }

  customComments.value.push(newComment)

  uni.showToast({
    title: '发送成功',
    icon: 'success'
  })
}

const handleLike = (comment: CommentItem) => {
  comment.isLiked = !comment.isLiked
  comment.likeCount = (comment.likeCount || 0) + (comment.isLiked ? 1 : -1)

  uni.showToast({
    title: comment.isLiked ? '点赞成功' : '取消点赞',
    icon: 'success',
    duration: 1000
  })
}

const handleReply = (comment: CommentItem) => {
  console.log('处理回复评论:', comment)

  // 确保 parentId 和 replyTo 正确设置
  if (!comment.parentId || !comment.replyTo) {
    console.error('回复数据不完整:', comment)
    return
  }

  // 使用 push 方法确保 Vue 可以检测到数组变化
  basicComments.value.push({
    ...comment,
    id: Date.now() + Math.random(), // 确保 id 唯一
    createTime: new Date(),
    username: '当前用户',
    avatar: '',
    likeCount: 0,
    isLiked: false
  })

  console.log('更新后的评论列表:', basicComments.value)

  uni.showToast({
    title: '回复成功',
    icon: 'success',
    duration: 1000
  })
}

const handleDelete = (comment: CommentItem) => {
  uni.showModal({
    title: '确认删除',
    content: '确定要删除这条评论吗？',
    success: (res) => {
      if (res.confirm) {
        // 这里应该调用删除接口
        console.log('删除评论:', comment)
        uni.showToast({
          title: '删除成功',
          icon: 'success'
        })
      }
    }
  })
}

const handleReport = (comment: CommentItem) => {
  uni.showModal({
    title: '举报评论',
    content: '确定要举报这条评论吗？',
    success: (res) => {
      if (res.confirm) {
        // 这里应该调用举报接口
        console.log('举报评论:', comment)
        uni.showToast({
          title: '举报成功',
          icon: 'success'
        })
      }
    }
  })
}
</script>

<style lang="scss" scoped>
.demo-container {
  padding: 0 16px;

  :deep(.demo-block) {
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
