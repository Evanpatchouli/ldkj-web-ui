# Next

- 状态: 未发行
- 记录范围: 下一版本发布前的所有未发行变更

## 新增

- 记录新增组件、能力、API、文档栏目等。
- 示例: 新增 `ComponentName` 组件，支持 `propName` 配置。

## 优化

- 记录已有能力的体验优化、内部重构、API 增强等。
- 示例: `ComponentName` 底层复用 `Box`，保持原 API 并继承通用容器能力。
- 重构 `Uploader` 为企业级上传组件，支持自定义请求、上传进度、图片列表、拖拽、受控文件列表、业务值映射和表单集成。
- 新增 `UploaderProvider`，支持在页面或应用边界配置上传默认行为，子级 `Uploader` 自动继承最近 Provider。

## 修复

- 记录 bug 修复、行为纠正、边界情况补齐等。
- 示例: 修复 `ComponentName` 在 `condition` 场景下的渲染异常。

## 文档

- 记录文档页、示例、侧边栏、开发日志等说明性变更。
- 示例: 补充 `ComponentName` API 表格与基础示例。
- 重写 `Uploader` 文档，补充 Basic、图片墙、拖拽校验、业务上传、表单集成和受控列表 Demo。
- 补充 `UploaderProvider` 文档和 Demo，说明 Provider 配置范围与 props 覆盖优先级。
- 扩展 `Uploader` Demo 覆盖矩阵，补充校验、手动上传、默认 XHR、转换映射、自定义渲染、交互入口、预览下载删除和列表类型示例。

## 验证

- `npx tsc --noEmit --ignoreDeprecations 5.0` 通过。
- `pnpm build:docs` 通过。
