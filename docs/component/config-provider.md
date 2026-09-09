# ConfigProvider 全局配置

用于为组件提供主题模式和主题变量配置。

## 深色模式

```html
<up-config-provider theme="dark">
  <up-empty description="暂无数据" />
</up-config-provider>
```

## 自定义主题变量

```html
<up-config-provider :theme-vars="{ emptyDescriptionColor: '#999999' }">
  <up-empty description="暂无数据" />
</up-config-provider>
```

## Attributes

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| theme | 主题风格 | `'light' \| 'dark'` | `'light'` |
| theme-vars | 自定义主题变量 | `ConfigProviderThemeVars` | `{}` |

## Slots

| 名称 | 说明 |
| --- | --- |
| default | 组件内容 |

## 类型定义

`ConfigProviderThemeVars` 包含基础色、空状态、骨架屏、轮播图和轮播指示器的主题变量。
