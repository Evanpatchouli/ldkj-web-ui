# Next

- 状态: 未发行
- 记录范围: 下一版本发布前的所有未发行变更

## 新增

- 新增 `Avatar` 组件到数据展示分组，目录为 `src/components/data-display/avatar`。
- `Avatar` 支持 `size`、`rounded`、`shadow`、`sx`，并支持 `Avatar.Image` / `Avatar.Fallback` 组合式 API。

## 优化

- 删除旧路径 `src/components/ui/avatar.tsx`，统一到语义化分层目录，减少历史路径混用。
- 顶层导出新增 `data-display/avatar`，与现有 `Card/Chip/Icon/Table` 导出结构对齐。

## 修复

- 修复 Avatar 初版迁移时的构建异常，重新落盘组件文件并通过类型与文档构建校验。

## 文档

- 新增 `docs/components/data-display/avatar.md`，补齐 Usage、Accessibility、API、Compound API。
- 新增 8 个 Avatar Demo（Basic、Size、Rounded、Shadow、Image/Fallback、Group、SX、Compound API）。
- VitePress 主题注册与侧边栏新增 Avatar 入口。

## 验证

- `pnpm -s tsc --noEmit --ignoreDeprecations 5.0` 通过。
- `pnpm -s build:docs` 通过。
