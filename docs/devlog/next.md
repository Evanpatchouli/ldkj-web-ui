# Next

- 状态: 未发行
- 记录范围: 下一版本发布前的所有未发行变更

## 新增

- 新增 `Box` 基座组件，支持 `component` 多态渲染、原生属性透传、`className/class`、`style` 与 `sx`。
- `Box` 新增元素范围内的 `loading` 遮罩能力，支持 `loadingContent` 自定义 loading 内容。
- `Box` 新增元素范围内的 `modal` 遮罩能力，支持 `modalContent` 与 `onModalMaskClick`。
- 新增 `Box` 文档页，包含基础用法、多态渲染、`loading/modal` 示例。

## 优化

- `Flex` 底层容器升级为 `Box`，保持原有布局 API，并继承 `Box` 的 `component`、`loading`、`modal` 等能力。
- `Grid` 底层容器升级为 `Box`，保持原有栅格 API，并继承 `Box` 的 `component`、`loading`、`modal` 等能力。
- `SafeArea`、`SafeAreaTop`、`SafeAreaBottom` 底层容器升级为 `Box`，保持原有安全区 API，并继承 `Box` 的通用能力。
- 容器类组件的样式优先级继续保持 `style -> 组件计算样式 -> sx`。

## 文档

- 组件侧边栏新增 `Box` 入口。
- `Flex`、`Grid`、`SafeArea` 文档补充“继承 Box 能力”的 API 说明。
- `Flex`、`Grid`、`SafeArea` 文档中的 `Box` 说明链接支持新页面打开。
- 新增 `next.md` 作为未发行变更日志入口。
- 文档目录与侧边栏按源码分包调整为 `layout`、`interact`、`data-display`。

## 验证

- `npx tsc --noEmit --ignoreDeprecations 5.0` 通过。
- `pnpm build:docs` 通过。
