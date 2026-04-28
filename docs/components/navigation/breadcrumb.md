# Breadcrumb

`Breadcrumb` 用于展示当前页面在信息层级中的位置，适合详情页、配置页、控制台等路径导航场景。

## Basic

传递 `items` 属性可以快速创建面包屑，也可以通过 `listProps` 进一步定制内部 `BreadcrumbList` 的属性。

<BreadcrumbItemsDemo />

## Compose API

如果你需要更细粒度地控制结构、插入自定义节点，仍然可以使用组合式 API。

<BreadcrumbBasicDemo />

## Custom Separator + Ellipsis

根节点的 `separator` 会作为默认分隔符传递给 `BreadcrumbSeparator`，也可以和 `BreadcrumbEllipsis` 配合展示折叠路径。

<BreadcrumbSeparatorDemo />

## SX Styling

`Breadcrumb` 以及 `BreadcrumbList`、`BreadcrumbItem`、`BreadcrumbLink`、`BreadcrumbPage`、`BreadcrumbSeparator`、`BreadcrumbEllipsis` 都支持 `sx`。

<BreadcrumbSxDemo />

## Usage

组合模式：
```tsx
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@ldkj/web-ui";

export function Example() {
  return (
    <Breadcrumb separator="/">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">首页</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/docs">文档</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>当前页面</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
```
选项模式：
```tsx
import { Breadcrumb } from "@ldkj/web-ui";

export function SimpleExample() {
  return (
    <Breadcrumb
      items={[
        { label: "首页", href: "/" },
        { label: "文档", href: "/docs" },
        { label: "当前页面", current: true },
      ]}
    />
  );
}
```

## API

### Breadcrumb

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `separator` | 默认分隔符，会传递给后代 `BreadcrumbSeparator` | `React.ReactNode` | `Icon("chevron_right")` |
| `items` | 快捷创建面包屑的配置数组 | `BreadcrumbItemConfig[]` | - |
| `listProps` | `items` 模式下透传给内部 `BreadcrumbList` 的属性 | `BreadcrumbListProps` | - |
| `className` | 追加类名 | `string` | - |
| `class` | 历史类名别名 | `string` | - |
| `style` | 内联样式 | `React.CSSProperties` | - |
| `sx` | CSS-in-JS 样式入口 | `SxProps` | - |
| `children` | 内容 | `React.ReactNode` | - |
| `...rest` | 原生 `nav` 属性透传 | `React.ComponentPropsWithoutRef<"nav">` | - |

### BreadcrumbList

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `className` | 追加类名 | `string` | - |
| `class` | 历史类名别名 | `string` | - |
| `style` | 内联样式 | `React.CSSProperties` | - |
| `sx` | CSS-in-JS 样式入口 | `SxProps` | - |
| `...rest` | 原生 `ol` 属性透传 | `React.ComponentPropsWithoutRef<"ol">` | - |

### BreadcrumbItemConfig

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `key` | 列表 key | `React.Key` | 索引 |
| `label` | 文本或节点内容 | `React.ReactNode` | - |
| `href` | 链接地址；未命中当前页时用于生成 `BreadcrumbLink` | `string` | - |
| `current` | 是否作为当前页渲染 | `boolean` | 最后一项为 `true` |
| `separator` | 当前项后面的分隔符 | `React.ReactNode` | 继承 `Breadcrumb.separator` |
| `ellipsis` | 是否将当前项渲染为省略号 | `boolean` | `false` |
| `itemProps` | 透传给 `BreadcrumbItem` | `BreadcrumbItemProps` | - |
| `linkProps` | 透传给 `BreadcrumbLink` | `Omit<BreadcrumbLinkProps, "children" \| "href">` | - |
| `pageProps` | 透传给 `BreadcrumbPage` | `Omit<BreadcrumbPageProps, "children">` | - |

### BreadcrumbItem / BreadcrumbSeparator

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `className` | 追加类名 | `string` | - |
| `class` | 历史类名别名 | `string` | - |
| `style` | 内联样式 | `React.CSSProperties` | - |
| `sx` | CSS-in-JS 样式入口 | `SxProps` | - |
| `children` | 内容节点 | `React.ReactNode` | - |
| `...rest` | 原生 `li` 属性透传 | `React.ComponentPropsWithoutRef<"li">` | - |

### BreadcrumbLink

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `component` | 自定义渲染标签或组件 | `React.ElementType` | `"a"` |
| `className` | 追加类名 | `string` | - |
| `class` | 历史类名别名 | `string` | - |
| `style` | 内联样式 | `React.CSSProperties` | - |
| `sx` | CSS-in-JS 样式入口 | `SxProps` | - |
| `...rest` | 原生 `a` 属性透传 | `React.ComponentPropsWithoutRef<"a">` | - |

### BreadcrumbPage / BreadcrumbEllipsis

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `className` | 追加类名 | `string` | - |
| `class` | 历史类名别名 | `string` | - |
| `style` | 内联样式 | `React.CSSProperties` | - |
| `sx` | CSS-in-JS 样式入口 | `SxProps` | - |
| `children` | 内容节点 | `React.ReactNode` | - |
| `...rest` | 原生元素属性透传 | `React.ComponentPropsWithoutRef<"span">` | - |
