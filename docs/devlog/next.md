# Next

- 状态: 未发行
- 记录范围: 下一版本发布前的所有未发行变更

## 新增

- 新增 `Pagination` 导航组件，支持配置式分页与组合式子组件用法。
- `Pagination` 支持 `sx/className/class/style`，并接入本库 `Button` 与 `Icon` 体系。

## 优化

- `Pagination` 新增配置式分页能力，支持 `count/page/defaultPage/onPageChange`、省略号生成和上一页/下一页边界禁用。
- `Pagination` 新增 `variant`，支持 `outline` 与 `filled` 两种当前页样式。
- `Pagination` 支持 `siblingCount/boundaryCount/showPreviousNext/disabled/getItemHref/renderItem/contentProps`，覆盖受控分页、路由链接、自定义渲染和禁用态等常见场景。

## 修复

- 修复 `Pagination` 在文档站或业务全局列表样式下出现 `ul/li` 小圆点的问题。
- 修复 `Pagination variant="filled"` 当前页文本色被全局链接样式覆盖的问题，确保选中页码文字为白色。

## 文档

- 新增 `Pagination` 文档页，并接入导航侧边栏。
- 新增 `Pagination` Demo：Basic、Controlled、Ellipsis、Boundary、Previous / Next、Disabled、Custom Href、Render Item、Variant、SX Styling。
- 更新 `Pagination` API 文档，补充配置式分页、组合式用法、`variant`、自定义链接与自定义渲染说明。

## 验证

- `pnpm -s tsc --noEmit --ignoreDeprecations 5.0` 通过。
- `pnpm -s build:docs` 通过。
