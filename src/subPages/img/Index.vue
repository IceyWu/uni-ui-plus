<template>
  <page-wraper>
    <demo-block :title="$t('jiBenYongFa')">
      <up-image
        src="http://nest-js.oss-accelerate.aliyuncs.com/nestTest/1/1746282136181.JPG"
        placeholder-src="http://nest-js.oss-accelerate.aliyuncs.com/nestTest/1/1746282136181.JPG?x-oss-process=image/resize,l_100"
        width="120"
        height="120"
        radius="8"
        :lazy-load="true"
      />
      <wd-img :width="100" :height="100" :src="joy" />
      <!-- 以组件位置为定位原点 -->
      <wd-img :width="100" :height="100" :src="img" custom-class="border" />
    </demo-block>
  </page-wraper>
</template>
<script lang="ts" setup>
import { joy } from '../../pages/images/joy'
import img from '../../pages/images/jd.png'
import type { ImageMode } from '@/uni_modules/uni-ui-plus/components/wd-img/types'
import UpImage from '@/uni_modules/uni-ui-plus/components/image/image.vue'

const modes: ImageMode[] = [
  'top left',
  'top right',
  'bottom left',
  'bottom right',
  'right',
  'left',
  'center',
  'bottom',
  'top',
  'heightFix',
  'widthFix',
  'scaleToFill',
  'aspectFit',
  'aspectFill'
]
</script>

<style lang="scss" scoped>
.col {
  display: inline-block;
  width: 33.333%;
  box-sizing: border-box;
  min-height: 1px;
  padding-left: 10px;
  padding-right: 10px;
  margin-bottom: 20px;
}
.center {
  text-align: center;
}
:deep(.border) {
  border: 1px solid red;
  margin: 0 10px;
}

.error-wrap {
  width: 100%;
  height: 100%;
  background-color: red;
  color: white;
  line-height: 100px;
  text-align: center;
}

.loading-wrap {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
