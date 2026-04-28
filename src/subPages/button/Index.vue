<template>
  <page-wraper>
    <view class="page-button">
      <demo-group title="组件类型">
        <demo-group-item title="基本使用">
          <view class="page-button__grid">
            <up-button>默认按钮</up-button>
            <up-button type="success">成功按钮</up-button>
            <up-button type="info">信息按钮</up-button>
            <up-button type="warning">警告按钮</up-button>
            <up-button type="error">危险按钮</up-button>
          </view>
        </demo-group-item>
      </demo-group>
    </view>
  </page-wraper>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.page-button {
  &__grid {
    display: flex;
    flex-wrap: wrap;
    gap: 16rpx;
  }
}
</style>
