# uni-ui-plus Skills

本目录用于存放 uni-ui-plus 项目的专用 Skills。

这些 Skills 的目标是把组件开发、文档维护、Demo 组织、测试补齐、样式变量和主题生成等高频任务沉淀为稳定工作流。

## 设计目标

- 单一职责：每个 Skill 只负责一类工作流
- 可组合：多个 Skill 可以围绕同一组件任务组合使用
- 可维护：共享规则尽量上收，避免在多个 Skill 中重复维护
- 可发现：通过清晰 description 让 Agent 能正确命中对应 Skill

## 项目结构参考

```
src/uni_modules/uni-ui-plus/
 common/          # 工具函数（7 个文件）
 composables/     # 组合式函数（11 个）
 components/      # 组件源码
    <name>/
        types.ts
        up-<name>.vue
        index.scss
 locale/          # 国际化
 styles/          # 设计系统（BEM namespace: 'up'）
```

## 组件命名规范

- 目录名：短横线命名（如 `swiper-nav`）
- Vue 文件：`up-` 前缀（如 `up-swiper-nav.vue`）
- CSS 类名：`up-` 前缀 + BEM（如 `.up-swiper-nav__dot`）
- CSS 变量：`--up-` 前缀（如 `--up-button-primary-bg`）