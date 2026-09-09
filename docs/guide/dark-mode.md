# 深色模式

`uni-ui-plus` 内置了深色模式支持，通过 `up-config-provider` 设置主题即可使用。

## 开启深色模式

将 `theme` 设置为 `dark`，即可让当前 `up-config-provider` 包裹范围内的组件切换为深色风格。

::: warning 注意
使用深色模式前，需要在入口文件（如 `App.vue`）中引入主题变量文件：

- npm 安装：`@use 'uni-ui-plus/styles/theme/index.scss' as *;`
- uni_modules 安装：`@use '@/uni_modules/uni-ui-plus/styles/theme/index.scss' as *;`
:::

::: code-group

```html [页面]
<up-config-provider theme="dark">
  <up-empty description="暂无数据" />
</up-config-provider>
```

```scss [App.vue - npm]
@use 'uni-ui-plus/styles/theme/index.scss' as *;
```

```scss [App.vue - uni_modules]
@use '@/uni_modules/uni-ui-plus/styles/theme/index.scss' as *;
```

:::

## 自定义主题变量

通过 `theme-vars` 可以覆盖当前组件范围内的主题变量：

```html
<up-config-provider
  theme="dark"
  :theme-vars="{ emptyDescriptionColor: '#999999' }"
>
  <up-empty description="暂无数据" />
</up-config-provider>
```

更多配置请参见 [ConfigProvider](/component/config-provider) 组件文档。
