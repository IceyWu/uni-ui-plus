<template>
  <page-wraper>
    <demo-block :title="$t('jiBenYongFa')">
      <up-empty description="无数据" />
    </demo-block>
    <demo-block :title="$t('empty-image')">
      <view class="demo-item">
        <up-empty image="empty" description="无内容" />
      </view>
      <view class="demo-item">
        <up-empty image="error" description="加载失败/错误" />
      </view>
      <view class="demo-item">
        <up-empty image="network" description="无网络" />
      </view>
    </demo-block>
    <demo-block :title="$t('empty-image-custom')">
      <up-empty description="描述文字" image="https://oss-console-img-demo-cn-hangzhou-3az.oss-cn-hangzhou.aliyuncs.com/example1.jpg" />
    </demo-block>
    <demo-block :title="$t('empty-slot')">
      <up-empty image="error" description="加载失败">
        <div style="margin-top: 10px">
          <button icon="refresh" type="primary">重试</button>
        </div>
      </up-empty>
    </demo-block>
  </page-wraper>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import UpEmpty from '@/uni_modules/uni-ui-plus/components/empty/empty.vue'
</script>

<style lang="scss" scoped>
.demo-item {
  margin-bottom: 20rpx;
  &:last-child {
    margin-bottom: 0;
  }
}
</style>
