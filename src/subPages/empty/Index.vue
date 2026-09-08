<template>
  <page-wraper>
    <view class="page-empty">
      <demo-group title="基本用法">
        <demo-group-item title="基本用法"> <up-empty description="无数据" /> </demo-group-item>
      </demo-group>

      <demo-group title="不同图片类型">
        <demo-group-item title="不同图片类型">
          <view class="page-empty__grid">
            <view class="page-empty__col"><up-empty description="无内容" image="empty" /></view>
            <view class="page-empty__col"><up-empty description="加载失败" image="error" /></view>
            <view class="page-empty__col"><up-empty description="无网络" image="network" /></view>
          </view>
        </demo-group-item>
      </demo-group>

      <demo-group title="自定义图片">
        <demo-group-item title="自定义图片">
          <up-empty description="描述文字" image="https://oss-console-img-demo-cn-hangzhou-3az.oss-cn-hangzhou.aliyuncs.com/example1.jpg" />
        </demo-group-item>
      </demo-group>

      <demo-group title="自定义内容">
        <demo-group-item title="自定义内容">
          <up-empty description="加载失败" image="error">
            <view style="margin-top: 20rpx"><button size="mini" type="primary">重试</button></view>
          </up-empty>
        </demo-group-item>
      </demo-group>

      <demo-group title="图片大小">
        <demo-group-item title="图片大小"> <up-empty description="自定义图片大小" image-size="120" /> </demo-group-item>
      </demo-group>
    </view>
  </page-wraper>
</template>

<script lang="ts" setup>
  import UpEmpty from '@/uni_modules/uni-ui-plus/components/up-empty/up-empty.vue'
</script>

<style lang="scss" scoped>
.page-empty {
  &__grid { display: flex; flex-wrap: wrap; }
  &__col { width: 33.333%; box-sizing: border-box; padding: 0 12rpx 24rpx; }
}
</style>
