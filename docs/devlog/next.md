# Next

- 状态: 未发行
- 记录范围: 下一版本发布前的所有未发行变更

## 新增

- 新增 `Columns` 固定分栏组件，支持列数、统一间距和 `Box` 通用样式能力。
- 记录新增组件、能力、API、文档栏目等。
- 示例: 新增 `ComponentName` 组件，支持 `propName` 配置。

## 优化

- 记录已有能力的体验优化、内部重构、API 增强等。
- 示例: `ComponentName` 底层复用 `Box`，保持原 API 并继承通用容器能力。

## 修复

- 记录 bug 修复、行为纠正、边界情况补齐等。
- 示例: 修复 `ComponentName` 在 `condition` 场景下的渲染异常。

## 文档

- 补充 `Columns` 的使用说明、业务化 Demo、行为规则、可访问性与性能建议。
- 记录文档页、示例、侧边栏、开发日志等说明性变更。
- 示例: 补充 `ComponentName` API 表格与基础示例。

## 验证

- `npx tsc --noEmit --ignoreDeprecations 5.0` 通过。
- `pnpm build:docs` 通过。
