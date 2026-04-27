# Next

- 状态: 未发布
- 记录范围: 下一版本发布前的所有未发版变更

## 新增

- 新增 `GhostButton` 组件，默认 `position="fixed"`、`right={16}`、`bottom={16}`，默认在右下角悬浮显示为圆形按钮。
- `GhostButton` 支持 5 档预设尺寸 `xs | sm | md | lg | xl`，同时支持 `number` 和任意 CSS 尺寸字符串。
- `GhostButton` 底层复用 `Button`，同步 `variant`、`rounded`、`shadow`、`bounce`、`splash`、`sx`、`component` 以及原生按钮属性。

## 优化

- `GhostButton` 的定位 API 调整为直接支持 `position`，同时移除单独的 `display`。
- `GhostButton` 的默认定位方式从写死 `className` 收口到 `style` 层，使 `position="absolute" | "static" | "sticky"` 等覆盖更直观。

## 修复

- 修复 `GhostButton` 在文档示例与局部容器场景下仍然受到写死 `fixed` 类名影响的行为。

## 文档

- 新增 `GhostButton` 文档页，包含基础用法、尺寸、定位、Button API 对齐、局部容器使用示例。
- 为 `GhostButton` 补充 3 个 React demo：基础用法、尺寸展示与定位示例。
- 组件侧边栏新增 `GhostButton` 入口，并同步文档页中的 API 表格与示例代码。

## 验证

- `npm run typecheck` 通过。
- `npm run build:types` 通过。
- `npm run build:docs` 通过。
