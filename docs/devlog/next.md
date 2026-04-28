# Next

- 状态: 未发布
- 记录范围: 下一版本发布前的所有未发版变更

## 新增

- 新增 `Icon` 组件，基于 `@material-symbols/svg-400` 提供按名称与变体的动态加载能力。
- 新增 `Toast` 体系：`ToastProvider`、`useToast` 与静态 `toast` facade。

## 优化

- Toast 动画风格对齐轻量入场/离场反馈，支持 `placement`、`duration`、`queueLimit`、`reverse`。
- 静态 `toast` 提供 `config/resetConfig`，可统一默认位置与时长。

## 修复

- Toast 补齐 A11y：按消息类型自动设置 `role` 与 `aria-live`，并提供可键盘访问的关闭按钮。

## 文档

- 新增 `Icon` 文档页与示例。
- 新增 `Toast` 文档页与示例。
- 更新侧边栏组件目录与主题 Demo 注册。

## 验证

- 待执行。
