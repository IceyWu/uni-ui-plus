<template>
  <view class="up-comment-list">
    <!-- 加载状态 -->
    <view v-if="loading && comments.length === 0" class="up-comment-list__loading">
      <text class="up-comment-list__loading-text">{{ translate('loading') }}</text>
    </view>

    <!-- 空状态 -->
    <view v-else-if="comments.length === 0" class="up-comment-list__empty">
      <text class="up-comment-list__empty-text">{{ translate('empty') }}</text>
    </view>

    <!-- 评论列表 -->
    <view v-else class="up-comment-list__content">
      <CommentItem
        v-for="comment in processedComments"
        :key="comment.id"
        :comment="comment"
        :show-reply="showReply"
        :max-level="maxLevel"
        :show-like="showLike"
        :show-time="showTime"
        :time-format="timeFormat"
        @like="handleLike"
        @reply="handleReply"
        @delete="handleDelete"
        @report="handleReport"
      />

      <!-- 加载更多 -->
      <view v-if="loading && comments.length > 0" class="up-comment-list__load-more">
        <text class="up-comment-list__load-more-text">{{ translate('loading') }}</text>
      </view>

      <!-- 没有更多 -->
      <view v-if="finished && comments.length > 0" class="up-comment-list__finished">
        <text class="up-comment-list__finished-text">{{ translate('noMore') }}</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { CommentItem as CommentItemType } from '../comment'
import { buildCommentTree } from '../utils'
import { useTranslate } from '../../composables-fn/useTranslate'
import CommentItem from './CommentItem.vue'

const { translate } = useTranslate('comment')

interface CommentListProps {
  comments: CommentItemType[]
  loading?: boolean
  finished?: boolean
  showReply?: boolean
  maxLevel?: number
  showLike?: boolean
  showTime?: boolean
  timeFormat?: string
}

interface Props extends CommentListProps {
  comments: CommentItemType[]
}

interface Emits {
  like: [comment: CommentItemType]
  reply: [comment: CommentItemType]
  delete: [comment: CommentItemType]
  report: [comment: CommentItemType]
  loadMore: []
}

const props = withDefaults(defineProps<Props>(), {
  comments: () => [],
  loading: false,
  finished: false,
  showReply: true,
  maxLevel: 3,
  showLike: true,
  showTime: true,
  timeFormat: 'YYYY-MM-DD HH:mm'
})

const emit = defineEmits<Emits>()

// 处理评论数据，构建树结构
const processedComments = computed(() => {
  return buildCommentTree(props.comments)
})

const handleLike = (comment: CommentItemType) => {
  emit('like', comment)
}

const handleReply = (comment: CommentItemType) => {
  emit('reply', comment)
}

const handleDelete = (comment: CommentItemType) => {
  emit('delete', comment)
}

const handleReport = (comment: CommentItemType) => {
  emit('report', comment)
}
</script>

<style lang="scss" scoped>
.up-comment-list {
  &__loading,
  &__empty,
  &__load-more,
  &__finished {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
  }

  &__loading-text,
  &__empty-text,
  &__load-more-text,
  &__finished-text {
    font-size: 14px;
    color: #999;
  }

  &__empty {
    padding: 40px 20px;

    &-text {
      font-size: 16px;
    }
  }

  &__content {
    .up-comment-item:not(:last-child) {
      border-bottom: 1px solid #f0f0f0;
    }
  }
}
</style>
