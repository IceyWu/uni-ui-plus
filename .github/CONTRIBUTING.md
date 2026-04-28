# 贡献指南

感谢你对 uni-ui-plus 的贡献！

## 开发环境

- Node.js >= 20
- pnpm >= 9

## 开始开发

```bash
# 安装依赖
pnpm install

# 启动 H5 开发服务
pnpm dev:h5

# 启动文档开发服务
pnpm dev:docs
```

## 提交规范

使用 `pnpm commit` 进行提交，遵循 Conventional Commits 规范。

## 目录结构

```
src/uni_modules/uni-ui-plus/
 common/          # 公共工具函数
    AbortablePromise.ts
    canvasHelper.ts
    clickoutside.ts
    event.ts
    interceptor.ts
    props.ts
    util.ts
 composables/     # 组合式函数
 components/      # 组件源码
    <component>/
        types.ts         # Props/Emits 类型定义
        up-<name>.vue    # 组件模板
        index.scss       # 组件样式
 locale/          # 国际化
 styles/          # 设计系统
     mixin/       # BEM mixin
     theme/       # 主题变量（light/dark）
     variable.scss # 全局 SCSS 变量
```

## 组件开发规范

### 文件命名

- 组件目录：`<name>/`（如 `button/`、`swiper-nav/`）
- Vue 文件：`up-<name>.vue`（如 `up-button.vue`）
- 类型文件：`types.ts`
- 样式文件：`index.scss`

### SCSS 规范

每个组件的 `index.scss` 必须以以下引用开头：

```scss
@use '../../styles/mixin/mixin.scss' as *;
@use '../../styles/variable.scss' as *;
```

使用 BEM mixin 编写样式：

```scss
@include b(button) {
  // .up-button
  @include e(text) {
    // .up-button__text
  }
  @include m(primary) {
    // .up-button--primary
  }
  @include when(disabled) {
    // .up-button.is-disabled
  }
}
```

### Props 定义

使用 `common/props.ts` 中的工具函数：

```ts
import { baseProps, makeStringProp, makeBooleanProp } from '../../common/props'

export const buttonProps = {
  ...baseProps,
  type: makeStringProp<ButtonType>('primary'),
  disabled: makeBooleanProp(false)
}
```