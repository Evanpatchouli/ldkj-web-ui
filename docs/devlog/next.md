# Next

- 状态: 未发行
- 记录范围: 下一版本发布前的所有未发行变更

## 新增

- 新增场景组件分类与 `RacingChips` 多轨道滚动 Chip 组件，支持任意 React 内容、轨道分配、错峰时间、运动方向、暂停和样式扩展。
- 记录新增组件、能力、API、文档栏目等。
- 示例: 新增 `ComponentName` 组件，支持 `propName` 配置。

## 优化

- 记录已有能力的体验优化、内部重构、API 增强等。
- 示例: `ComponentName` 底层复用 `Box`，保持原 API 并继承通用容器能力。

## 修复

- 记录 bug 修复、行为纠正、边界情况补齐等。
- 示例: 修复 `ComponentName` 在 `condition` 场景下的渲染异常。

## 文档

- 新增 `RacingChips` 基础、脱敏手机号营销场景和自定义业务内容 Demo，并补齐 API、行为规则、A11Y 与性能说明。
- 记录文档页、示例、侧边栏、开发日志等说明性变更。
- 示例: 补充 `ComponentName` API 表格与基础示例。

## 验证

- `npx tsc --noEmit --ignoreDeprecations 5.0` 通过。
- `pnpm build:docs` 通过。
