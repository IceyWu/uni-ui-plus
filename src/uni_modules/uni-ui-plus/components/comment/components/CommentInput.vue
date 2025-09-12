<template>
  <view class="up-comment-input">
    <view class="up-comment-input__container">
      <view v-if="showAvatar" class="up-comment-input__avatar">
        <image :src="computedAvatar" class="up-comment-input__avatar-img" mode="aspectFill" />
      </view>
      <view class="up-comment-input__content">
        <textarea
          v-model="inputValue"
          :placeholder="computedPlaceholder"
          :maxlength="maxLength"
          :auto-focus="autoFocus"
          :disabled="disabled"
          class="up-comment-input__textarea"
          placeholder-class="up-comment-input__placeholder"
          @input="handleInput"
          @focus="handleFocus"
          @blur="handleBlur"
        />
        <view v-if="showCounter" class="up-comment-input__counter">{{ inputValue.length }}/{{ maxLength }}</view>
      </view>
    </view>

    <view class="up-comment-input__footer">
      <view class="up-comment-input__tools">
        <view v-if="showEmotion" class="up-comment-input__tool" @click="handleEmotionClick">
          <text class="up-comment-input__tool-icon">😊</text>
        </view>
      </view>
      <button
        :disabled="!canSubmit"
        class="up-comment-input__submit"
        :class="{ 'up-comment-input__submit--disabled': !canSubmit }"
        @click="handleSubmit"
      >
        {{ computedButtonText }}
      </button>
    </view>

    <!-- 表情面板 -->
    <view v-if="showEmotionPanel" class="up-comment-input__emotion-panel">
      <view class="up-comment-input__emotion-list">
        <text v-for="emotion in emotions" :key="emotion" class="up-comment-input__emotion-item" @click="insertEmotion(emotion)">
          {{ emotion }}
        </text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { getDefaultAvatar } from '../utils'
import { useTranslate } from '../../composables-fn/useTranslate'

const { translate } = useTranslate('comment')

interface CommentInputProps {
  placeholder?: string
  maxLength?: number
  showAvatar?: boolean
  avatar?: string
  buttonText?: string
  autoFocus?: boolean
  showEmotion?: boolean
  disabled?: boolean
}

interface Props extends CommentInputProps {
  modelValue?: string
  replyTo?: string
  parentId?: string | number
}

interface Emits {
  'update:modelValue': [value: string]
  submit: [content: string, parentId?: string | number, replyTo?: string]
  focus: []
  blur: []
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '',
  maxLength: 500,
  showAvatar: true,
  avatar: '',
  buttonText: '',
  autoFocus: false,
  showEmotion: true,
  disabled: false,
  modelValue: ''
})

// 计算默认占位符和按钮文本
const computedPlaceholder = computed(() => props.placeholder || translate('placeholder'))
const computedButtonText = computed(() => props.buttonText || translate('submit'))

const emit = defineEmits<Emits>()

const inputValue = ref(props.modelValue)
const showEmotionPanel = ref(false)
const isFocused = ref(false)

const emotions = [
  '😀',
  '😃',
  '😄',
  '😁',
  '😆',
  '😅',
  '😂',
  '🤣',
  '😊',
  '😇',
  '🙂',
  '🙃',
  '😉',
  '😌',
  '😍',
  '🥰',
  '😘',
  '😗',
  '😙',
  '😚',
  '😋',
  '😛',
  '😝',
  '😜',
  '🤪',
  '🤨',
  '🧐',
  '🤓',
  '😎',
  '🤩'
]

const computedAvatar = computed(() => {
  return props.avatar || getDefaultAvatar('用户')
})

const canSubmit = computed(() => {
  return !props.disabled && inputValue.value.trim().length > 0
})

const showCounter = computed(() => {
  return isFocused.value || inputValue.value.length > 0
})

watch(
  () => props.modelValue,
  (newValue) => {
    inputValue.value = newValue
  }
)

watch(inputValue, (newValue) => {
  emit('update:modelValue', newValue)
})

const handleInput = (e: any) => {
  inputValue.value = e.detail.value
}

const handleFocus = () => {
  isFocused.value = true
  emit('focus')
}

const handleBlur = () => {
  isFocused.value = false
  emit('blur')
}

const handleSubmit = () => {
  if (!canSubmit.value) return

  const content = inputValue.value.trim()
  if (content) {
    emit('submit', content, props.parentId, props.replyTo)
    inputValue.value = ''
  }
}

const handleEmotionClick = () => {
  showEmotionPanel.value = !showEmotionPanel.value
}

const insertEmotion = (emotion: string) => {
  inputValue.value += emotion
  showEmotionPanel.value = false
}
</script>

<style lang="scss" scoped>
.up-comment-input {
  background-color: #fff;
  border-radius: 8px;
  padding: 16px;

  &__container {
    display: flex;
    align-items: flex-start;
    gap: 12px;
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
    position: relative;
  }

  &__textarea {
    width: 100%;
    min-height: 80px;
    padding: 12px;
    border: 1px solid #e5e5e5;
    border-radius: 6px;
    font-size: 14px;
    line-height: 1.5;
    resize: none;
    box-sizing: border-box;

    &:focus {
      border-color: #007aff;
      outline: none;
    }
  }

  &__placeholder {
    color: #999;
  }

  &__counter {
    position: absolute;
    bottom: 8px;
    right: 8px;
    font-size: 12px;
    color: #999;
    background-color: rgba(255, 255, 255, 0.8);
    padding: 2px 4px;
    border-radius: 4px;
  }

  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 12px;
  }

  &__tools {
    display: flex;
    gap: 12px;
  }

  &__tool {
    padding: 8px;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: #f5f5f5;
    }

    &-icon {
      font-size: 18px;
    }
  }

  &__submit {
    padding: 8px 16px;
    background-color: #007aff;
    color: #fff;
    border: none;
    border-radius: 6px;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover:not(&--disabled) {
      background-color: #0056cc;
    }

    &--disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  }

  &__emotion-panel {
    margin-top: 12px;
    padding: 12px;
    border: 1px solid #e5e5e5;
    border-radius: 6px;
    background-color: #fafafa;
  }

  &__emotion-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  &__emotion-item {
    padding: 6px;
    font-size: 20px;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.2s;

    &:hover {
      background-color: #e5e5e5;
    }
  }
}
</style>
