<template>
  <view class="custom-segmented-control">
    <view v-for="(item, idx) in items" :key="idx" :class="['seg-item', { active: modelValue === idx }]" @click="onClickItem(idx)">
      <span class="seg-label">{{ item }}</span>
      <view v-if="modelValue === idx" class="seg-underline"></view>
    </view>
  </view>
</template>

<script lang="ts" setup>
interface Props {
  items: string[]
  modelValue: number
}

interface Emits {
  (e: 'update:modelValue', value: number): void
  (e: 'change', value: number): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const onClickItem = (index: number) => {
  emit('update:modelValue', index)
  emit('change', index)
}
</script>

<style lang="scss" scoped>
/* 美化分段器 */
.custom-segmented-control {
  display: flex;
  border-radius: 24px;
  overflow: hidden;
  border: 1.5px solid #e5e5e5;
  margin: 16rpx 20rpx;
  background: #f9f9f9;
  box-shadow: 0 2px 8px rgba(76, 217, 100, 0.04);
  height: 48px;
  align-items: center;
  position: relative;
  justify-content: space-around;
}

.seg-item {
  // flex: 1;
  text-align: center;
  position: relative;
  padding: 0;
  flex-shrink: 0;
  background: transparent;
  color: #666;
  font-size: 30rpx;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.2s;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .seg-label {
    // padding: 0 8px;
    height: 48px;
    line-height: 48px;
    // display: inline-block;
    letter-spacing: 1px;
    z-index: 1;
    position: relative;
  }
}

.seg-item.active {
  color: #4cd964;
  background: linear-gradient(90deg, #eaffea 0%, #f7fff7 100%);

  .seg-label {
    font-weight: 700;
  }
}

.seg-underline {
  width: 32px;
  height: 4px;
  background: #4cd964;
  border-radius: 2px;
  position: absolute;
  left: 50%;
  bottom: 6px;
  transform: translateX(-50%);
  transition: all 0.2s;
  z-index: 2;
}
</style>
