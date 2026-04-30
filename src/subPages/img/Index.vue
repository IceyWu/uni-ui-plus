<template>
  <page-wraper>
    <view class="page-img">
      <demo-group title="基本用法">
        <demo-group-item title="基本用法"> <up-image :width="100" :height="100" :src="imgURL" /> </demo-group-item>
      </demo-group>

      <demo-group title="延时加载">
        <demo-group-item title="延时加载"> <up-image :width="100" :height="100" :src="imgURL" :delay="2000" /> </demo-group-item>
      </demo-group>

      <demo-group title="预加载占位图">
        <demo-group-item title="预加载占位图">
          <up-image :width="120" :height="120" :src="imgURL" :placeholder-src="imgURL + '?x-oss-process=image/resize,p_50'" :delay="2000" />
        </demo-group-item>
      </demo-group>

      <demo-group title="图片加载滤镜">
        <demo-group-item title="图片加载滤镜">
          <up-image
            :width="120"
            :height="120"
            :src="imgURL"
            :placeholder-src="imgURL + '?x-oss-process=image/resize,p_50'"
            :delay="40_000"
            :filter="30"
          />
        </demo-group-item>
      </demo-group>

      <demo-group title="自定义圆角">
        <demo-group-item title="圆角">
          <view class="page-img__grid">
            <view class="page-img__col" v-for="mode in modes.slice(0, 6)" :key="`radius-${mode}`">
              <up-image width="100%" height="27vw" :radius="8" :src="imgURL" :mode="mode" />
              <view class="page-img__text">{{ mode }}</view>
            </view>
          </view>
        </demo-group-item>
        <demo-group-item title="圆形">
          <view class="page-img__grid">
            <view class="page-img__col" v-for="mode in modes.slice(0, 6)" :key="`round-${mode}`">
              <up-image round width="100%" height="27vw" :src="imgURL" :mode="mode" />
              <view class="page-img__text">{{ mode }}</view>
            </view>
          </view>
        </demo-group-item>
      </demo-group>

      <demo-group title="填充模式">
        <demo-group-item title="填充模式">
          <view class="page-img__grid">
            <view class="page-img__col" v-for="mode in modes" :key="mode">
              <up-image width="100%" height="27vw" :src="imgURL" :mode="mode" />
              <view class="page-img__text">{{ mode }}</view>
            </view>
          </view>
        </demo-group-item>
      </demo-group>

      <demo-group title="图片预览">
        <demo-group-item title="图片预览"> <up-image width="100%" mode="widthFix" :src="imgURL" :enable-preview="true" /> </demo-group-item>
      </demo-group>

      <demo-group title="自定义插槽">
        <demo-group-item title="加载失败">
          <view class="page-img__grid page-img__grid--two">
            <view class="page-img__col">
              <up-image width="100%" height="27vw" src="https://www.invalid-url.com/a.jpg" />
              <view class="page-img__text">默认提示</view>
            </view>
            <view class="page-img__col">
              <up-image width="100%" height="27vw" src="https://www.invalid-url.com/a.jpg">
                <template #error> <view class="page-img__error">加载失败</view> </template>
              </up-image>
              <view class="page-img__text">自定义提示</view>
            </view>
          </view>
        </demo-group-item>
      </demo-group>
    </view>
  </page-wraper>
</template>

<script lang="ts" setup>
  import UpImage from '@/uni_modules/uni-ui-plus/components/up-image/up-image.vue'

  const imgURL = 'https://oss-console-img-demo-cn-hangzhou-3az.oss-cn-hangzhou.aliyuncs.com/example1.jpg'

  const modes = [
    'scaleToFill',
    'aspectFit',
    'aspectFill',
    'heightFix',
    'widthFix',
    'top left',
    'top right',
    'bottom left',
    'bottom right',
    'right',
    'left',
    'center',
    'bottom',
    'top'
  ] as const
</script>

<style lang="scss" scoped>
.page-img {
  &__grid { display: flex; flex-wrap: wrap; }
  &__grid--two .page-img__col { width: 50%; }
  &__col { box-sizing: border-box; width: 33.3333%; min-height: 1px; padding: 0 12rpx 24rpx; }
  &__text { margin-top: 8rpx; text-align: center; font-size: 24rpx; color: #666; }
  &__error { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; color: #fff; background-color: #fa5151; }
}
</style>
