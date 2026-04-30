# Swiper-Nav 轮播指示器

轮播图指示器组件，通常配合 Swiper 组件使用，也可以独立使用。支持多种指示器类型和样式自定义。

## 基本用法

独立使用指示器，展示当前位置。

```html
<up-swiper-nav
  :current="currentIndex"
  :total="5"
  type="dots"
/>
```

```ts
import { ref } from 'vue'

const currentIndex = ref(0)
```

## 指示器类型

支持四种指示器类型：圆点(dots)、圆点条(dots-bar)、分式(fraction)、线条(line)。

### 圆点指示器

```html
<up-swiper-nav
  :current="0"
  :total="5"
  type="dots"
/>
```

### 圆点条指示器

```html
<up-swiper-nav
  :current="0"
  :total="5"
  type="dots-bar"
/>
```

### 分式指示器

显示 "1/5" 这样的分数形式。

```html
<up-swiper-nav
  :current="0"
  :total="5"
  type="fraction"
/>
```

### 线条指示器

适合短视频场景，当前项及之前的项都会高亮。

```html
<up-swiper-nav
  :current="0"
  :total="5"
  type="line"
/>
```

## 指示器位置

支持8个位置：左侧、左上、上方、右上、左下、下方、右下、右侧。

```html
<up-swiper-nav
  :current="0"
  :total="5"
  type="dots"
  indicator-position="top-right"
/>
```

可选值：

- `'left'` - 左侧
- `'top-left'` - 左上
- `'top'` - 上方
- `'top-right'` - 右上
- `'bottom-left'` - 左下
- `'bottom'` - 下方（默认）
- `'bottom-right'` - 右下
- `'right'` - 右侧

## 控制按钮

显示左右控制按钮。

```html
<up-swiper-nav
  :current="currentIndex"
  :total="5"
  type="dots"
  :show-controls="true"
  @prev="handlePrev"
  @next="handleNext"
/>
```

```ts
const handlePrev = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
  }
}

const handleNext = () => {
  if (currentIndex.value < 4) {
    currentIndex.value++
  }
}
```

## 垂直方向

支持垂直方向的指示器。

```html
<up-swiper-nav
  :current="0"
  :total="5"
  type="dots"
  direction="vertical"
  indicator-position="right"
/>
```

## 最小显示数量

当总数少于设定值时不显示指示器。

```html
<up-swiper-nav
  :current="0"
  :total="1"
  type="dots"
  :min-show-num="2"
/>
<!-- 因为 total(1) < minShowNum(2)，指示器不会显示 -->
```

## 配合 Swiper 使用

Swiper-Nav 通常作为 Swiper 组件的内部指示器，但也支持外部独立使用。

```html
<up-swiper
  :list="swiperList"
  :height="200"
  :indicator="{
    type: 'dots',
    indicatorPosition: 'bottom',
    showControls: true,
    minShowNum: 2
  }"
/>
```

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| current | 当前激活项的索引 | `number` | `0` |
| total | 总项数 | `number` | `0` |
| type | 指示器类型 | `'dots' \| 'dots-bar' \| 'fraction' \| 'line'` | `'dots'` |

> `line` 类型为 `0.0.70` 新增。
| direction | 指示器方向 | `'horizontal' \| 'vertical'` | `'horizontal'` |
| indicator-position | 指示器位置 | `'left' \| 'top-left' \| 'top' \| 'top-right' \| 'bottom-left' \| 'bottom' \| 'bottom-right' \| 'right'` | `'bottom'` |
| min-show-num | 小于此数量时不显示指示器 | `number` | `2` |
| show-controls | 是否显示控制按钮 | `boolean` | `false` |

## Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| change | 点击控制按钮时触发 | `{ dir: 'prev' \| 'next', source: 'nav' }` |

## 外部样式类

| 类名 | 说明 |
| ------------ | ---------- |
| custom-class | 根节点样式 |

## 样式定制

### 线条指示器特点

- 支持进度式高亮：当前激活项及之前的所有项都会高亮
- 适合展示播放进度，如短视频应用
- 可设置为撑满容器底部

### 样式变量

可通过 CSS 变量自定义指示器样式：

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

## 示例

Swiper-Nav 组件通常在 Swiper 组件内部使用，更多用法请参考 `src/subPages/swiper/Index.vue` 示例页面。
