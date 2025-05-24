<template>
  <page-wraper>
    <view class="page-button">
      <demo-block :title="$t('jiBenYongFa')">
        <up-button>{{ $t('zhu-yao-an-niu') }}</up-button>
        <up-button>{{ $t('zhu-yao-an-niu') }}</up-button>
        <up-button type="success">{{ $t('cheng-gong-an-niu-0') }}</up-button>
        <up-button type="info">{{ $t('xin-xi-an-niu') }}</up-button>
        <up-button type="warning">{{ $t('jing-gao-an-niu-0') }}</up-button>
        <up-button type="error">{{ $t('wei-xian-an-niu') }}</up-button>
      </demo-block>
    </view>
  </page-wraper>
</template>
<script lang="ts" setup>
function handleGetuserinfo(event: any) {
  // TODO
  console.log(event)
}
</script>
<style lang="scss" scoped>
.page-button {
  :deep(button) {
    margin: 0 10px 10px 0;
  }

  :deep() {
    .custom-shadow {
      box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%);
    }
  }
  .button-block {
    margin-right: 0;
  }
}
</style>
