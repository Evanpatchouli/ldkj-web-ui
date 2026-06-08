# Pagination

`Pagination` 用于分页导航，适合列表、表格、搜索结果等需要切换页码的场景。

## Basic

传入 `count` 后，`Pagination` 会自动生成上一页、页码、下一页，并在非受控模式下维护当前页。

<PaginationBasicDemo />

## Controlled

传入 `page` 和 `onPageChange` 后进入受控模式，适合与表格、请求参数或路由状态同步。

<PaginationControlledDemo />

## Ellipsis

页码较多时会根据当前页、边界页数和相邻页数自动生成省略号。

<PaginationEllipsisDemo />

## Boundary

通过 `boundaryCount` 和 `siblingCount` 可以控制首尾页与当前页相邻页的展示数量。

<PaginationBoundaryDemo />

## Previous / Next

如果页面空间有限，可以关闭上一页和下一页按钮，只保留页码块。

<PaginationPreviousNextDemo />

## Disabled

`disabled` 会禁用所有自动生成的分页项。

<PaginationDisabledDemo />

## Custom Href

`getItemHref` 可以为自动生成项提供链接地址，便于和路由或 URL 查询参数衔接。

<PaginationHrefDemo />

## Render Item

`renderItem` 可以接管每一个自动生成项的渲染，适合自定义上一页、下一页文案或特殊页码样式。

<PaginationRenderItemDemo />

## Variant

`variant` 支持 `outline` 和 `filled`，用于控制当前页的视觉强调方式。

<PaginationVariantDemo />

## SX Styling

`Pagination`、`PaginationContent`、`PaginationItem`、`PaginationLink` 与 `PaginationEllipsis` 都支持 `sx`。

<PaginationSxDemo />

## 常见场景

### 基础导航

用于页面跳转、层级定位或内容切换，帮助用户理解当前位置。

### 受控状态

当前项、展开项、页码或激活项需要和路由/查询参数同步时，使用受控模式。

### 可访问操作

导航项应保持可聚焦、可读，并在禁用或当前状态时给出明确语义。

## Usage

配置式：

```tsx
import * as React from "react";
import { Pagination } from "@ldkj/web-ui";

export function Example() {
  const [page, setPage] = React.useState(1);

  return (
    <Pagination
      count={12}
      page={page}
      onPageChange={(_, nextPage) => setPage(nextPage)}
    />
  );
}
```

组合式：

```tsx
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@ldkj/web-ui";

export function CompositionExample() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#previous" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#page-1">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#page-2" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#next" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
```

## API

### Pagination

| 属性               | 说明                                       | 类型                                              | 默认值      |
| ------------------ | ------------------------------------------ | ------------------------------------------------- | ----------- |
| `count`            | 总页数，传入后启用配置式渲染               | `number`                                          | -           |
| `page`             | 当前页，受控模式                           | `number`                                          | -           |
| `defaultPage`      | 默认当前页，非受控模式                     | `number`                                          | `1`         |
| `onPageChange`     | 页码变化回调                               | `(event, page) => void`                           | -           |
| `siblingCount`     | 当前页两侧展示的相邻页数                   | `number`                                          | `1`         |
| `boundaryCount`    | 首尾边界展示页数                           | `number`                                          | `1`         |
| `variant`          | 当前页视觉样式                             | `"outline" \| "filled"`                           | `"outline"` |
| `showPreviousNext` | 是否展示上一页和下一页                     | `boolean`                                         | `true`      |
| `disabled`         | 是否禁用全部自动生成的页码项               | `boolean`                                         | `false`     |
| `getItemHref`      | 生成自动页码链接地址                       | `(page, type) => string`                          | -           |
| `renderItem`       | 自定义自动生成项渲染                       | `(item: PaginationRenderItem) => React.ReactNode` | -           |
| `contentProps`     | 配置式渲染时透传给内部 `PaginationContent` | `React.ComponentProps<typeof PaginationContent>`  | -           |
| `className`        | 追加类名                                   | `string`                                          | -           |
| `class`            | 历史类名别名                               | `string`                                          | -           |
| `style`            | 内联样式                                   | `React.CSSProperties`                             | -           |
| `sx`               | CSS-in-JS 样式入口                         | `SxProps`                                         | -           |
| `children`         | 组合式内容                                 | `React.ReactNode`                                 | -           |
| `...rest`          | 原生 `nav` 属性                            | `React.ComponentProps<"nav">`                     | -           |

### PaginationContent

| 属性        | 说明               | 类型                         | 默认值 |
| ----------- | ------------------ | ---------------------------- | ------ |
| `className` | 追加类名           | `string`                     | -      |
| `class`     | 历史类名别名       | `string`                     | -      |
| `style`     | 内联样式           | `React.CSSProperties`        | -      |
| `sx`        | CSS-in-JS 样式入口 | `SxProps`                    | -      |
| `children`  | 分页项             | `React.ReactNode`            | -      |
| `...rest`   | 原生 `ul` 属性     | `React.ComponentProps<"ul">` | -      |

### PaginationItem

| 属性        | 说明               | 类型                         | 默认值 |
| ----------- | ------------------ | ---------------------------- | ------ |
| `className` | 追加类名           | `string`                     | -      |
| `class`     | 历史类名别名       | `string`                     | -      |
| `style`     | 内联样式           | `React.CSSProperties`        | -      |
| `sx`        | CSS-in-JS 样式入口 | `SxProps`                    | -      |
| `children`  | 分页链接或省略号   | `React.ReactNode`            | -      |
| `...rest`   | 原生 `li` 属性     | `React.ComponentProps<"li">` | -      |

### PaginationLink

| 属性        | 说明                             | 类型                          | 默认值      |
| ----------- | -------------------------------- | ----------------------------- | ----------- |
| `isActive`  | 是否为当前页                     | `boolean`                     | `false`     |
| `disabled`  | 是否禁用链接                     | `boolean`                     | `false`     |
| `variant`   | 当前页视觉样式                   | `"outline" \| "filled"`       | `"outline"` |
| `size`      | 按钮尺寸                         | `ButtonProps<"a">["size"]`    | `"icon"`    |
| `className` | 追加类名                         | `string`                      | -           |
| `class`     | 历史类名别名                     | `string`                      | -           |
| `style`     | 内联样式                         | `React.CSSProperties`         | -           |
| `sx`        | CSS-in-JS 样式入口               | `SxProps`                     | -           |
| `children`  | 链接内容                         | `React.ReactNode`             | -           |
| `...rest`   | 本库 `Button component="a"` 属性 | `Omit<ButtonProps<"a">, ...>` | -           |

### PaginationPrevious / PaginationNext

| 属性        | 说明                                 | 类型                  | 默认值 |
| ----------- | ------------------------------------ | --------------------- | ------ |
| `children`  | 自定义内容，传入后覆盖默认图标和文字 | `React.ReactNode`     | -      |
| `className` | 追加类名                             | `string`              | -      |
| `class`     | 历史类名别名                         | `string`              | -      |
| `style`     | 内联样式                             | `React.CSSProperties` | -      |
| `sx`        | CSS-in-JS 样式入口                   | `SxProps`             | -      |
| `...rest`   | `PaginationLink` 属性透传            | `PaginationLinkProps` | -      |

### PaginationEllipsis

| 属性        | 说明               | 类型                           | 默认值 |
| ----------- | ------------------ | ------------------------------ | ------ |
| `className` | 追加类名           | `string`                       | -      |
| `class`     | 历史类名别名       | `string`                       | -      |
| `style`     | 内联样式           | `React.CSSProperties`          | -      |
| `sx`        | CSS-in-JS 样式入口 | `SxProps`                      | -      |
| `...rest`   | 原生 `span` 属性   | `React.ComponentProps<"span">` | -      |

### PaginationRenderItem

| 属性       | 说明                      | 类型                                           |
| ---------- | ------------------------- | ---------------------------------------------- |
| `type`     | 自动生成项类型            | `"page" \| "previous" \| "next" \| "ellipsis"` |
| `page`     | 目标页码，省略号为 `null` | `number \| null`                               |
| `selected` | 是否为当前页              | `boolean`                                      |
| `disabled` | 是否禁用                  | `boolean`                                      |
| `href`     | 自动生成链接地址          | `string \| undefined`                          |
| `onClick`  | 自动生成点击处理器        | `React.MouseEventHandler<HTMLAnchorElement>`   |

## 行为规则 / 优先级

- 导航组件应让当前项、禁用项和跳转目标保持一致。
- `className` 与 `class` 用于追加类名；如同时传入原生 `style`，内联样式会按 React 规则覆盖同名 CSS。
- 复杂内容优先通过组合能力传入，避免在组件内部硬编码业务文案。
- Pagination 的默认值应服务于最常见场景，特殊场景通过显式 props 覆盖。

## Notes

- `count` 未传入时，`Pagination` 保持组合式渲染，只输出 `children`。
- `count` 传入后，点击自动生成的页码会阻止默认链接跳转，并触发内部页码更新或 `onPageChange`。
- 受控模式请同时传入 `page` 与 `onPageChange`；非受控模式可使用 `defaultPage`。
- `PaginationLink` 默认渲染为链接语义，当前页会设置 `aria-current="page"`。
- `PaginationPrevious` 与 `PaginationNext` 默认提供中文可访问性文案，也可以通过 `children` 自定义内容。
