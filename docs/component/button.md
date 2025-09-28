# Button 按钮

按钮用于触发一个操作，如提交表单或打开链接。

## 基本用法

基本按钮。

```html
<up-button>主要按钮</up-button>
<up-button type="success">成功按钮</up-button>
<up-button type="info">信息按钮</up-button>
<up-button type="warning">警告按钮</up-button>
<up-button type="error">危险按钮</up-button>
```

## 不同尺寸

支持通过 `size` 属性设置按钮大小。

```html
<up-button size="mini">迷你按钮</up-button>
<up-button size="small">小型按钮</up-button>
<up-button>默认按钮</up-button>
<up-button size="large">大型按钮</up-button>
```

## 朴素按钮

通过 `plain` 属性设置朴素按钮。

```html
<up-button plain>朴素按钮</up-button>
<up-button type="success" plain>成功按钮</up-button>
```

## 禁用状态

通过 `disabled` 属性设置按钮禁用状态。

```html
<up-button disabled>禁用按钮</up-button>
<up-button type="success" disabled>成功按钮</up-button>
```

## Attributes

| 参数       | 说明         | 类型    | 可选值                                      | 默认值    |
| ---------- | ------------ | ------- | ------------------------------------------- | --------- |
| type       | 按钮类型     | string  | primary / success / info / warning / error  | primary   |
| size       | 按钮尺寸     | string  | mini / small / normal / large               | normal    |
| plain      | 是否朴素按钮 | boolean | -                                           | false     |
| disabled   | 是否禁用     | boolean | -                                           | false     |
| loading    | 是否加载中   | boolean | -                                           | false     |
| form-type  | 表单类型     | string  | submit / reset                              | -         |
| open-type  | 开放能力     | string  | getUserInfo / contact / 等                  | -         |

## Events

| 事件名称 | 说明         | 参数                  |
| -------- | ------------ | --------------------- |
| click    | 点击按钮时触发 | (event: MouseEvent)   |
| touchend | 触摸结束时触发 | (event: TouchEvent)   |

## Slots

| 名称    | 说明         |
| ------- | ------------ |
| default | 按钮内容     |
| loading | 自定义加载图标 |

## 外部样式类

| 类名         | 说明       |
| ------------ | ---------- |
| custom-class | 根节点样式 |

## 示例

更多用法请参考 `src/subPages/button/Index.vue` 示例页面。
