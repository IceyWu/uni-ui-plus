<template>
  <view class="up-comment">
    <!-- 评论输入框 -->
    <view v-if="showInput" class="up-comment__input">
      <up-comment-input
        v-model="inputValue"
        :placeholder="inputPlaceholder"
        :max-length="maxLength"
        :show-avatar="showAvatar"
        :avatar="avatar"
        :button-text="buttonText"
        :auto-focus="autoFocus"
        :show-emotion="showEmotion"
        :disabled="disabled"
        @submit="handleSubmit"
        @focus="handleInputFocus"
        @blur="handleInputBlur"
      />
    </view>

    <!-- 评论统计 -->
    <view v-if="showCount" class="up-comment__count">
      <text class="up-comment__count-text">共 {{ totalCount }} 条评论</text>
    </view>

    <!-- 评论列表 -->
    <up-comment-list
      :comments="comments"
      :loading="loading"
      :finished="finished"
      :show-reply="showReply"
      :max-level="maxLevel"
      :show-like="showLike"
      :show-time="showTime"
      :time-format="timeFormat"
      @like="handleLike"
      @reply="handleReply"
      @delete="handleDelete"
      @report="handleReport"
      @load-more="handleLoadMore"
    />
  </view>
</template>

<script setup lang="ts">
import { ref, computed, defineExpose } from 'vue'
import { commentProps, type CommentEmits, type CommentItem, type CommentInst } from './comment'
import UpCommentInput from './components/CommentInput.vue'
import UpCommentList from './components/CommentList.vue'

defineOptions({
  name: 'UpComment'
})

const props = defineProps(commentProps)
const emit = defineEmits<CommentEmits>()

const inputValue = ref('')

const totalCount = computed(() => {
  const countReplies = (comments: CommentItem[]): number => {
    return comments.reduce((count, comment) => {
      return count + 1 + (comment.replies ? countReplies(comment.replies) : 0)
    }, 0)
  }
  return countReplies(props.comments)
})

const handleSubmit = (content: string, parentId?: string | number, replyTo?: string) => {
  emit('submit', content, parentId, replyTo)
  inputValue.value = ''
}

const handleLike = (comment: CommentItem) => {
  emit('like', comment)
}

const handleReply = (comment: CommentItem) => {
  emit('reply', comment)
}

const handleDelete = (comment: CommentItem) => {
  emit('delete', comment)
}

const handleReport = (comment: CommentItem) => {
  emit('report', comment)
}

const handleLoadMore = () => {
  emit('loadMore')
}

const handleInputFocus = () => {
  emit('inputFocus')
}

const handleInputBlur = () => {
  emit('inputBlur')
}

// 暴露实例方法
const focus = () => {
  // TODO: 实现聚焦逻辑
}

const blur = () => {
  // TODO: 实现失焦逻辑
}

const clear = () => {
  inputValue.value = ''
}

const commentInst: CommentInst = {
  focus,
  blur,
  clear
}

defineExpose(commentInst)
</script>

<script lang="ts">
import { PREFIX } from '../_constants'
const componentName = `${PREFIX}-comment`

export default {
  name: componentName,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    // #ifndef H5
    styleIsolation: 'shared'
    // #endif
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
