# SafeArea

`SafeArea` 用于适配移动端刘海屏、灵动岛、手势条等安全区域。

## Usage

```tsx
import { SafeArea, SafeAreaTop, SafeAreaBottom } from "@ldkj/web-ui";

export function Example() {
  return (
    <>
      <SafeAreaTop component="header">Header</SafeAreaTop>

      <SafeArea component="main" position="both" horizontal>
        Content
      </SafeArea>

      <SafeAreaBottom component="footer">Footer</SafeAreaBottom>
    </>
  );
}
```

## API

`SafeArea`、`SafeAreaTop`、`SafeAreaBottom` 继承 <a href="/components/layout/box" target="_blank" rel="noreferrer">Box</a> 的基础能力，支持 `class`、`loading`、`loadingContent`、`modal`、`modalContent`、`onModalMaskClick` 以及原生属性透传。

### `SafeArea`

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `component` | 指定渲染元素或组件 | `React.ElementType` | `'div'` |
| `position` | 安全区方向 | `'top' \| 'bottom' \| 'both' \| 'none'` | `'both'` |
| `horizontal` | 是否应用左右安全区 | `boolean` | `false` |
| `className` | 追加类名 | `string` | - |
| `style` | 内联样式 | `React.CSSProperties` | - |
| `sx` | CSS-in-JS 样式入口 | `SxProps`（支持对象/数组/函数，支持伪类、选择器、媒体查询） | - |
| `children` | 内容 | `React.ReactNode` | - |

### `SafeAreaTop`

`SafeAreaTop` 是 `SafeArea` 的便捷封装，固定 `position="top"`，其余属性与 `SafeArea` 一致。

### `SafeAreaBottom`

`SafeAreaBottom` 是 `SafeArea` 的便捷封装，固定 `position="bottom"`，其余属性与 `SafeArea` 一致。
