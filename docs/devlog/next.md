# Next

- 状态: 未发行
- 记录范围: 下一版本发布前的所有未发行变更

## 新增

- 记录新增组件、能力、API、文档栏目等。
- 示例: 新增 `ComponentName` 组件，支持 `propName` 配置。
- 新增 `Label` 表单标注组件，支持必填星号、冒号、标签宽度、标签对齐、左右/上下布局和 `sx` 样式入口。
- 新增 `Radio` 与 `RadioGroup` 表单组件，支持组合式用法、配置式选项、原生表单提交与 `sx` 样式入口。

## 优化

- 记录已有能力的体验优化、内部重构、API 增强等。
- 示例: `ComponentName` 底层复用 `Box`，保持原 API 并继承通用容器能力。
- `CheckboxGroup` 与 `RadioGroup` 内部选项改用本库 `Label`，保留点击文本切换控件的原生语义。

## 修复

- 记录 bug 修复、行为纠正、边界情况补齐等。
- 示例: 修复 `ComponentName` 在 `condition` 场景下的渲染异常。

## 文档

- 记录文档页、示例、侧边栏、开发日志等说明性变更。
- 示例: 补充 `ComponentName` API 表格与基础示例。
- 新增 `Label` 文档页与 Basic、Required / Colon、Layout、SX Styling 示例，并接入表单与输入侧边栏。
- 新增 `Radio` 文档页与 Basic、Controlled、Form Submit、SX Styling 示例，并接入表单与输入侧边栏。

## 验证

- `npx tsc --noEmit --ignoreDeprecations 5.0` 通过。
- `pnpm build:docs` 通过。
