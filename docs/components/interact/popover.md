# Popover

轻量级浮层组件。适合展示补充说明、快捷表单、筛选条件等与触发元素强相关的临时内容。

底层保留 Radix Popover 的组合式 API，同时为内容面板接入本库的 `className`、`class`、`style`、`sx`、`width`、`rounded` 与 `shadow` 能力。

## Basic

<PopoverBasicDemo />

## Controlled

通过 `open` 与 `onOpenChange` 可以完全控制弹层状态。

<PopoverControlledDemo />

## Placement

`PopoverContent` 继承 Radix Content 的定位能力，可使用 `side`、`align`、`sideOffset` 等属性调整位置。

<PopoverPlacementDemo />

## SX / Custom Content

`width`、`rounded`、`shadow` 用于常见视觉定制；更细的样式可以通过 `sx`、`className` 或 `style` 传入。

<PopoverCustomContentDemo />

## Usage

```tsx
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@ldkj/web-ui";

export function Example() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">打开</Button>
      </PopoverTrigger>
      <PopoverContent width={320}>
        <p>这里是弹层内容。</p>
      </PopoverContent>
    </Popover>
  );
}
```

## API

### Exports

- `Popover`
- `PopoverTrigger`
- `PopoverAnchor`
- `PopoverContent`
- `PopoverClose`

### Popover

继承 `@radix-ui/react-popover` 的 `Root` 属性。

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `defaultOpen` | 非受控默认打开状态 | `boolean` | - |
| `open` | 受控打开状态 | `boolean` | - |
| `onOpenChange` | 打开状态变化回调 | `(open: boolean) => void` | - |
| `modal` | 是否启用模态交互语义 | `boolean` | `false` |

### PopoverTrigger

继承 `@radix-ui/react-popover` 的 `Trigger` 属性。推荐使用 `asChild` 复用业务按钮；本库会自动生成一层触发容器承接 Radix 的 ref 和事件，子组件不需要 `forwardRef`。

额外支持：

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `className` | 自定义类名 | `string` | - |
| `class` | 兼容历史 class 写法 | `string` | - |
| `style` | 原生行内样式 | `React.CSSProperties` | - |
| `sx` | 本库 sx 样式入口 | `SxProps` | - |

### PopoverAnchor

继承 `@radix-ui/react-popover` 的 `Anchor` 属性，用于显式指定定位锚点。

### PopoverClose

继承 `@radix-ui/react-popover` 的 `Close` 属性。推荐使用 `asChild` 复用业务按钮或菜单项；本库会自动生成一层关闭容器承接 Radix 的 ref 和事件，子组件不需要 `forwardRef`。

额外支持：

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `className` | 自定义类名 | `string` | - |
| `class` | 兼容历史 class 写法 | `string` | - |
| `style` | 原生行内样式 | `React.CSSProperties` | - |
| `sx` | 本库 sx 样式入口 | `SxProps` | - |

### PopoverContent

继承 `@radix-ui/react-popover` 的 `Content` 属性，并额外支持以下属性：

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `width` | 内容面板宽度，数字自动转为 px | `number \| string` | `288` |
| `rounded` | 圆角预设或任意 CSS `border-radius` 值 | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full' \| number \| string` | `'lg'` |
| `shadow` | 阴影预设或任意 CSS `box-shadow` 值 | `'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'inner' \| string` | `'md'` |
| `sx` | 本库 sx 样式入口 | `SxProps` | - |
| `className` | 自定义类名 | `string` | - |
| `class` | 兼容历史 class 写法 | `string` | - |
| `style` | 原生行内样式 | `React.CSSProperties` | - |
| `side` | 展开方向 | `'top' \| 'right' \| 'bottom' \| 'left'` | 继承 Radix |
| `align` | 对齐方式 | `'start' \| 'center' \| 'end'` | `'center'` |
| `sideOffset` | 与触发器的距离 | `number` | `6` |

## Notes

- `PopoverContent` 默认使用 Portal 渲染到 `body`，避免被父级 `overflow` 裁剪。
- `PopoverContent` 的样式合并顺序为 `style -> width/rounded/shadow -> sx`，因此 `sx` 中的同名基础样式优先级最高。
- `PopoverTrigger`、`PopoverClose` 与 `PopoverAnchor` 都保留 Radix 组合能力，适合组合本库 `Button` 或业务自定义元素。
- 如果弹层中包含表单或可聚焦内容，请确保触发器文本和内容标题能表达清楚当前操作语义。
