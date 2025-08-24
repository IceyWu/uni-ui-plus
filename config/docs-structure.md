# 文档结构优化建议

## 当前结构问题
```
docs/
├── component/           # 组件文档
├── guide/              # 中文指南
├── en-US/              # 英文文档
└── public/             # 静态资源
```

## 建议的新结构
```
docs/
├── .vitepress/         # VitePress 配置
├── zh-CN/              # 中文文档
│   ├── guide/          # 指南
│   │   ├── introduction.md
│   │   ├── quick-start.md
│   │   └── changelog.md
│   └── components/     # 组件文档
│       ├── button.md
│       ├── input.md
│       └── ...
├── en-US/              # 英文文档
│   ├── guide/
│   └── components/
├── public/             # 静态资源
└── index.md           # 首页
```

## 优势
1. 语言分类更清晰
2. 避免中英文混合
3. 便于国际化维护
4. 结构更规范
