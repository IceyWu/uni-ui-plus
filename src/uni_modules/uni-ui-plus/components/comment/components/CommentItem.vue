<template>
  <view class="up-comment-item" :class="{ 'up-comment-item--reply': isReply }">
    <view class="up-comment-item__main">
      <view class="up-comment-item__avatar">
        <image :src="computedAvatar" class="up-comment-item__avatar-img" mode="aspectFill" />
      </view>

      <view class="up-comment-item__content">
        <view class="up-comment-item__header">
          <text class="up-comment-item__username">{{ comment.username }}</text>
          <text v-if="comment.replyTo" class="up-comment-item__reply-to">{{ translate('replyTo') }} @{{ comment.replyTo }}</text>
          <text v-if="showTime" class="up-comment-item__time">
            {{ formattedTime }}
          </text>
        </view>

        <view class="up-comment-item__text">{{ comment.content }}</view>

        <view class="up-comment-item__actions">
          <view v-if="showLike" class="up-comment-item__action" :class="{ 'up-comment-item__action--liked': comment.isLiked }" @click="handleLike">
            <text class="up-comment-item__action-icon">{{ comment.isLiked ? '❤️' : '🤍' }}</text>
            <text v-if="comment.likeCount" class="up-comment-item__action-text">
              {{ comment.likeCount }}
            </text>
          </view>

          <view v-if="showReply && (!maxLevel || (comment.level || 0) < maxLevel)" class="up-comment-item__action" @click="handleReply">
            <text class="up-comment-item__action-icon">💬</text>
            <text class="up-comment-item__action-text">{{ translate('reply') }}</text>
          </view>

          <view class="up-comment-item__action" @click="handleMore">
            <text class="up-comment-item__action-icon">⋯</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 回复输入框 -->
    <view v-if="showReplyInput" class="up-comment-item__reply-input">
      <CommentInput
        v-model="replyContent"
        :placeholder="`${translate('replyTo')} @${comment.username}`"
        :parent-id="comment.parentId || comment.id"
        :reply-to="comment.username"
        :button-text="translate('reply')"
        :show-avatar="false"
        @submit="handleReplySubmit"
      />
      <view class="up-comment-item__reply-actions">
        <button class="up-comment-item__reply-cancel" @click="cancelReply">{{ translate('cancel') }}</button>
      </view>
    </view>

    <!-- 子回复列表 -->
    <view v-if="comment.replies && comment.replies.length > 0" class="up-comment-item__replies">
      <CommentItem
        v-for="reply in comment.replies"
        :key="reply.id"
        :comment="reply"
        :show-reply="showReply"
        :max-level="maxLevel"
        :show-like="showLike"
        :show-time="showTime"
        :time-format="timeFormat"
        @like="$emit('like', $event)"
        @reply="$emit('reply', $event)"
        @delete="$emit('delete', $event)"
        @report="$emit('report', $event)"
      />
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { CommentItem } from '../comment'
import { formatTime, getDefaultAvatar } from '../utils'
import { useTranslate } from '../../composables-fn/useTranslate'
import CommentInput from './CommentInput.vue'

const { translate } = useTranslate('comment')

interface CommentItemProps {
  comment: CommentItem
  showReply?: boolean
  maxLevel?: number
  showLike?: boolean
  showTime?: boolean
  timeFormat?: string
}

interface Props extends CommentItemProps {
  comment: CommentItem
}

interface Emits {
  like: [comment: CommentItem]
  reply: [comment: CommentItem]
  delete: [comment: CommentItem]
  report: [comment: CommentItem]
}

const props = withDefaults(defineProps<Props>(), {
  showReply: true,
  maxLevel: 3,
  showLike: true,
  showTime: true,
  timeFormat: 'YYYY-MM-DD HH:mm'
})

const emit = defineEmits<Emits>()

const showReplyInput = ref(false)
const replyContent = ref('')

const isReply = computed(() => {
  return !!(props.comment.parentId || props.comment.replyTo)
})

const computedAvatar = computed(() => {
  return props.comment.avatar || getDefaultAvatar(props.comment.username)
})

const formattedTime = computed(() => {
  return formatTime(props.comment.createTime, props.timeFormat)
})

const handleLike = () => {
  emit('like', props.comment)
}

const handleReply = () => {
  showReplyInput.value = true
}

const handleReplySubmit = (content: string, parentId?: string | number, replyTo?: string) => {
  console.log('CommentItem handleReplySubmit:', { content, parentId, replyTo, currentComment: props.comment })
  
  const replyComment: CommentItem = {
    id: Date.now(), // 生成新的 id
    content,
    username: '当前用户', // 应该从用户信息获取
    avatar: '',
    createTime: new Date(),
    parentId,
    replyTo,
    likeCount: 0,
    isLiked: false
  }
  
  console.log('发射回复事件:', replyComment)
  emit('reply', replyComment)
  showReplyInput.value = false
  replyContent.value = ''
}

const cancelReply = () => {
  showReplyInput.value = false
  replyContent.value = ''
}

const handleMore = () => {
  // 使用 uni-app 的 API
  uni.showActionSheet({
    itemList: [translate('report'), translate('delete')],
    success: (res: any) => {
      if (res.tapIndex === 0) {
        emit('report', props.comment)
      } else if (res.tapIndex === 1) {
        // 显示确认删除对话框
        uni.showModal({
          title: translate('confirmDelete'),
          showCancel: true,
          cancelText: translate('cancel'),
          confirmText: translate('delete'),
          success: (modalRes: any) => {
            if (modalRes.confirm) {
              emit('delete', props.comment)
            }
          }
        })
      }
    }
  })
}
</script>

<style lang="scss" scoped>
.up-comment-item {
  &--reply {
    margin-left: 52px;

    .up-comment-item__main {
      padding-top: 12px;
      border-top: 1px solid #f5f5f5;
    }
  }

  &__main {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 16px 0;
  }

  &__avatar {
    flex-shrink: 0;

    &-img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }

  &__content {
    flex: 1;
    min-width: 0;
  }

  &__header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
    flex-wrap: wrap;
  }

  &__username {
    font-size: 14px;
    font-weight: 500;
    color: #333;
  }

  &__reply-to {
    font-size: 12px;
    color: #007aff;
  }

  &__time {
    font-size: 12px;
    color: #999;
    margin-left: auto;
  }

  &__text {
    font-size: 14px;
    line-height: 1.5;
    color: #333;
    margin-bottom: 12px;
    word-break: break-word;
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  &__action {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 4px 8px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: #f5f5f5;
    }

    &--liked {
      color: #ff3040;
    }

    &-icon {
      font-size: 14px;
    }

    &-text {
      font-size: 12px;
      color: #666;
    }
  }

  &__reply-input {
    margin: 12px 0 12px 52px;
    padding: 12px;
    background-color: #f8f9fa;
    border-radius: 8px;
  }

  &__reply-actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 8px;
  }

  &__reply-cancel {
    padding: 6px 12px;
    background-color: transparent;
    color: #666;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 12px;
    cursor: pointer;

    &:hover {
      background-color: #f5f5f5;
    }
  }

  &__replies {
    border-left: 2px solid #f0f0f0;
    margin-left: 20px;
  }
}
</style>
