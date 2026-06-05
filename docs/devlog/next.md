# Next

- 状态: 未发行
- 记录范围: 下一版本发布前的所有未发行变更

## 新增

- 记录新增组件、能力、API、文档栏目等。
- 示例: 新增 `ComponentName` 组件，支持 `propName` 配置。

## 优化

- 记录已有能力的体验优化、内部重构、API 增强等。
- 示例: `ComponentName` 底层复用 `Box`，保持原 API 并继承通用容器能力。

## 修复

- 记录 bug 修复、行为纠正、边界情况补齐等。
- 示例: 修复 `ComponentName` 在 `condition` 场景下的渲染异常。
- 修复 `Popover` 在 `PopoverTrigger asChild` 组合本库 `Button` 时触发 ref 警告、弹层定位异常的问题，`asChild` 默认改为生成包装元素承接 Radix 的 ref 和事件。

## 文档

- 记录文档页、示例、侧边栏、开发日志等说明性变更。
- 示例: 补充 `ComponentName` API 表格与基础示例。
- 补充 `Popover` 文档的 `Basic`、`常见场景`、`Usage`、`API`、`行为规则 / 优先级` 与 `Notes` 章节，并说明 `asChildWrapper`、定位优先级与样式覆盖规则。

## 验证

- `npx tsc --noEmit --ignoreDeprecations 5.0` 通过。
- `pnpm build:docs` 通过。
