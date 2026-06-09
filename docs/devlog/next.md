# Next

- 状态: 未发行
- 记录范围: 下一版本发布前的所有未发行变更

## 新增

- 新增 `Collapse` 数据展示组件，支持 `items` 数据式 API 与 `Collapse.Item/Header/Trigger/Content/Actions` 组合式 API。
- `Collapse` 支持 `activeKey/defaultActiveKey/onChange`、`accordion`、`multiple`、`collapsible`、禁用、额外操作、自定义展开图标、尺寸、变体、`sx`、懒挂载和隐藏销毁。

## 优化

- 记录已有能力的体验优化、内部重构、API 增强等。
- 示例: `ComponentName` 底层复用 `Box`，保持原 API 并继承通用容器能力。

## 修复

- 记录 bug 修复、行为纠正、边界情况补齐等。
- 示例: 修复 `ComponentName` 在 `condition` 场景下的渲染异常。

## 文档

- 新增 `docs/components/data-display/collapse.md`，覆盖 Basic、Accordion、Multiple、Controlled、Items API、Compound API、Extra Actions、Lazy / Destroy、Variants / Sizes、SX、Nested / FAQ 等示例。
- 在组件侧边栏和 VitePress React Demo 注册中接入 `Collapse`。

## 验证

- `npx tsc --noEmit --ignoreDeprecations 5.0` 通过。
- `pnpm build:docs` 通过。
