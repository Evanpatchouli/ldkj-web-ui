# v0.15.0

- 发布日期: 2026-05-17
- 版本: `0.15.0`

## 新增

- 新增 `Typography` 排版组件文档与示例，补齐布局组件展示入口。
- 新增 `Badge`、`List`、`Empty`、`Image` 等数据展示组件与对应文档 Demo。

## 新增草稿

- 新增 `InputNumber`、`InputOPT`、`AutoComplete`、`Rate`、`Cascader`、`SliderV2`、`Required`、`FormV2`、`Uploader` 等表单组件。
- 新增 `Notification`、`Spin`、`Loading`、`Drawer`、`Alert`、`Progress` 等反馈与弹层组件。
- `Image` 增强加载占位、失败回退、重试、响应式资源协商、OSS 裁剪、状态渲染与预览交互能力。

## 优化

- 更新组件库统一导出入口，新增组件可直接从 `@ldkj/web-ui` 引入。
- 扩展 VitePress 侧边栏与 Demo 注册，确保新增组件文档可访问、可渲染。
- 同步组件建设待办状态，标记本轮已完成组件。

## 修复

- 暂无。

## 文档

- 补充项目组件文档与 Demo 编写规范。
- 为新增组件补充 API 表格、使用说明、注意事项与真实使用场景 Demo。

## 验证

- `pnpm.cmd -s tsc --noEmit --ignoreDeprecations 5.0` 通过。
- `pnpm.cmd -s build:docs` 通过。
