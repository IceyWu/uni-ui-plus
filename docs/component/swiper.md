# Swiper 轮播图

轮播图组件，支持图片和视频播放，内置多种指示器样式。

## 基本用法

基本的图片轮播功能。

```html
<up-swiper :list="swiperList" :height="200" />
```

## 指示器配置

### 指示器类型

支持四种指示器类型：圆点(dots)、圆点条(dots-bar)、分式(fraction)、线条(line)。

```html
<!-- 圆点指示器 -->
<up-swiper :list="swiperList" :height="200" :indicator="{ type: 'dots' }" />

<!-- 圆点条指示器 -->
<up-swiper :list="swiperList" :height="200" :indicator="{ type: 'dots-bar' }" />

<!-- 分式指示器 -->
<up-swiper :list="swiperList" :height="200" :indicator="{ type: 'fraction' }" />

<!-- 线条指示器 -->
<up-swiper :list="swiperList" :height="200" :indicator="{ type: 'line' }" />
```

### 指示器位置

支持8个位置：左侧、左上、上方、右上、左下、下方、右下、右侧。

```html
<up-swiper 
  :list="swiperList" 
  :height="200" 
  :indicator="{ type: 'dots', indicatorPosition: 'top-right' }" 
/>
```

### 控制按钮

显示左右控制按钮。

```html
<up-swiper 
  :list="swiperList" 
  :height="200" 
  :indicator="{ type: 'dots', showControls: true }" 
/>
```

## 垂直方向

支持垂直方向的轮播。

```html
<up-swiper 
  :list="swiperList" 
  :height="300" 
  direction="vertical" 
  :indicator="{ type: 'dots', direction: 'vertical', indicatorPosition: 'right' }" 
/>
```

## 自定义内容

通过插槽自定义轮播内容。

```html
<up-swiper :list="customList" :height="160" :indicator="true" :autoplay="false">
  <template #default="{ item, index }">
    <view class="custom-item">
      <view class="custom-content" :style="{ background: item.color }">
        <text class="custom-title">{{ item.title }}</text>
        <text class="custom-desc">{{ item.description }}</text>
        <view class="custom-index">{{ index + 1 }}</view>
      </view>
    </view>
  </template>
</up-swiper>
```

## 最小显示数量

当轮播项数量少于设定值时不显示指示器。

```html
<up-swiper 
  :list="singleItemList" 
  :height="200" 
  :indicator="{ type: 'dots', minShowNum: 2 }" 
/>
```

## Attributes

### 基础属性

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| list | 轮播数据列表，可以是字符串数组或对象数组 | `Array<string \| SwiperList>` | `[]` |
| current | 当前轮播在哪一项（下标） | `number` | `0` |
| height | 轮播图高度 | `string \| number` | `192` |
| direction | 轮播滑动方向 | `'horizontal' \| 'vertical'` | `'horizontal'` |
| autoplay | 是否自动播放 | `boolean` | `true` |
| interval | 轮播间隔时间，单位 ms | `number` | `5000` |
| duration | 滑动动画时长，单位 ms | `number` | `300` |
| loop | 是否循环播放 | `boolean` | `true` |
| display-multiple-items | 同时显示的滑块数量 | `number` | `1` |
| easing-function | 指定 swiper 切换缓动动画类型 | `'default' \| 'linear' \| 'easeInCubic' \| 'easeOutCubic' \| 'easeInOutCubic'` | `'default'` |
| previous-margin | 前边距，可用于露出前一项的一小部分 | `string \| number` | `'0'` |
| next-margin | 后边距，可用于露出后一项的一小部分 | `string \| number` | `'0'` |
| snap-to-edge | 当 swiper-item 的个数大于等于 2，关闭时会将当前 item 居中 | `boolean` | `false` |

### 指示器属性

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| indicator | 指示器配置，可以是布尔值或配置对象 | `boolean \| IndicatorConfig` | `true` |
| indicator-position | 指示器位置（快捷方式，也可通过 indicator 对象配置） | `IndicatorPositionType` | `'bottom'` |

### 图片/内容属性

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| image-mode | 图片裁剪、缩放的模式 | `ImageMode` | `'aspectFill'` |
| value-key | 选项对象中，value 对应的 key | `string` | `'value'` |
| text-key | 选项对象中，标题 text 对应的 key | `string` | `'text'` |

### 视频播放属性

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| video-loop | 视频是否循环播放 | `boolean` | `true` |
| muted | 是否静音播放 | `boolean` | `true` |
| autoplay-video | 视频是否自动播放 | `boolean` | `true` |
| stop-previous-video | 切换轮播项时是否停止上一个视频的播放 | `boolean` | `true` |
| stop-autoplay-when-video-play | 视频播放时是否停止自动轮播 | `boolean` | `false` |

### 高度调整属性（支付宝小程序）

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| adjust-height | 自动以指定滑块的高度为整个容器的高度 | `'first' \| 'current' \| 'highest' \| 'none'` | `'highest'` |
| adjust-vertical-height | vertical 为 true 时强制使 adjust-height 生效 | `boolean` | `false` |

### 自定义样式类

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| custom-indicator-class | 自定义指示器类名 | `string` | `''` |
| custom-image-class | 自定义图片类名 | `string` | `''` |
| custom-prev-image-class | 自定义上一个图片类名 | `string` | `''` |
| custom-next-image-class | 自定义下一个图片类名 | `string` | `''` |
| custom-item-class | 自定义 swiper 子项类名 | `string` | `''` |
| custom-prev-class | 自定义上一个子项类名 | `string` | `''` |
| custom-next-class | 自定义下一个子项类名 | `string` | `''` |
| custom-text-class | 自定义文字标题类名 | `string` | `''` |
| custom-text-style | 自定义文字标题样式 | `string` | `''` |

### IndicatorConfig

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| type | 指示器类型 | `'dots' \| 'dots-bar' \| 'fraction' \| 'line'` | `'dots'` |
| indicatorPosition | 指示器位置 | `'left' \| 'top-left' \| 'top' \| 'top-right' \| 'bottom-left' \| 'bottom' \| 'bottom-right' \| 'right'` | `'bottom'` |
| direction | 指示器方向 | `'horizontal' \| 'vertical'` | `'horizontal'` |
| minShowNum | 最小显示数量 | `number` | `2` |
| showControls | 是否显示控制按钮 | `boolean` | `false` |

### SwiperList

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| [valueKey] | 图片/视频地址 | `string` | - |
| type | 媒体类型 | `'image' \| 'video'` | - |
| poster | 视频封面 | `string` | - |
| [textKey] | 文本内容 | `string` | - |

## Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| click | 点击轮播项时触发 | `(item: any, index: number)` |
| change | 轮播切换时触发 | `(current: number, source: string)` |

## Slots

| 名称 | 说明 | 参数 |
|------|------|------|
| default | 自定义轮播内容 | `{ item: any, index: number }` |
| indicator | 自定义指示器 | `{ current: number, total: number }` |

## 外部样式类

| 类名         | 说明       |
| ------------ | ---------- |
| custom-class | 根节点样式 |

## 示例

更多用法请参考 `src/subPages/swiper/Index.vue` 示例页面。

## 指示器样式定制

### 线条指示器特点

- 支持进度式高亮：当前激活项及之前的所有项都会高亮
- 适合展示播放进度，如短视频应用
- 可设置为撑满容器底部

### 样式变量

可通过CSS变量自定义指示器样式：

```scss
:root {
  --swiper-nav-dot-size: 12rpx;
  --swiper-nav-dot-color: rgba(255, 255, 255, 0.5);
  --swiper-nav-dot-active-color: rgba(255, 255, 255, 0.9);
  --swiper-nav-btn-size: 60rpx;
  --swiper-nav-btn-bg-color: rgba(0, 0, 0, 0.3);
  --swiper-nav-btn-color: #ffffff;
}
```
