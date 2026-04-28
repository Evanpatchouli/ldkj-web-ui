# Next

- 状态: 未发布
- 记录范围: 下一版本发布前的所有未发行变更

## 新增

- 新增 `Breadcrumb` 导航组件，支持 compose 形式的 `BreadcrumbList`、`BreadcrumbItem`、`BreadcrumbLink`、`BreadcrumbPage`、`BreadcrumbSeparator` 与 `BreadcrumbEllipsis`。
- `Breadcrumb` 根节点新增 `items` 快捷 API，可直接传入数组生成面包屑，并支持 `listProps`、单项 `separator`、`ellipsis`、`itemProps`、`linkProps` 与 `pageProps` 配置。

## 优化

- `Breadcrumb` 同时提供 compose 与简化 `items` 两种使用方式，兼顾页面快速搭建与细粒度结构控制。
- `Breadcrumb` 调整到 `navigation` 分类，与组件语义更加一致。

## 修复

- 修复 `Breadcrumb` 在文档环境下的 `ol/li` 默认样式干扰，避免出现列表序号、缩进与内容不对齐问题。
- 修复 `Breadcrumb.separator` 仅在根节点声明但未真正生效的问题，现在会作为后代 `BreadcrumbSeparator` 的默认分隔符。

## 文档

- 新增 `Breadcrumb` 文档页与 4 个 Demo：基础 compose 用法、`items` 快捷用法、自定义分隔符与折叠路径，以及 `sx` 样式示例。
- 更新 VitePress 侧边栏与 React Demo 注册，将 `Breadcrumb` 收入 `navigation` 分组。

## 验证

- `npm run typecheck` 通过。
- `npm run build:docs` 通过。
