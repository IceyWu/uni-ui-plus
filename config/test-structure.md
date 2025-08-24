# 测试结构优化

## 建议的测试目录结构

```
tests/
├── __fixtures__/       # 测试固定数据
├── __mocks__/          # Mock 文件
├── e2e/               # 端到端测试
├── unit/              # 单元测试
│   ├── components/    # 组件测试
│   ├── composables/   # 组合函数测试
│   └── utils/         # 工具函数测试
├── setup.ts           # 测试环境配置
└── vitest.config.ts   # 测试配置
```

## 配置文件合并建议

可以将以下配置合并到一个测试配置文件中：
- vitest.config.ts
- tests/setup.ts
- tests/suppress-warnings.ts

## 测试脚本简化

```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:run": "vitest run",
    "test:coverage": "vitest run --coverage",
    "test:watch": "vitest --watch"
  }
}
```
