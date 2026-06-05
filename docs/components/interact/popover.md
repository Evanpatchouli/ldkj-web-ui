# Popover

轻量级浮层组件。适合展示补充说明、快捷表单、筛选条件等与触发元素强相关的临时内容。

底层保留 Radix Popover 的组合式 API，同时为内容面板接入本库的 `className`、`class`、`style`、`sx`、`width`、`rounded` 与 `shadow` 能力。

## Basic

最小可用场景：点击触发器后展示一段补充说明。

<PopoverBasicDemo />

## 常见场景

### 状态说明

适合放置同步状态、审批状态、辅助解释等短信息。

<PopoverControlledDemo />

### 定位与锚点

`PopoverContent` 继承 Radix 的定位能力，可通过 `side`、`align`、`sideOffset` 调整位置；当触发元素与锚点不是同一个元素时，可以显式使用 `PopoverAnchor`。

<PopoverPlacementDemo />

### 自定义面板

适合筛选器、快捷操作面板这类需要更细粒度视觉控制的场景，可配合 `width`、`rounded`、`shadow` 与 `sx` 定制内容容器。

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

当触发元素本身不支持 `forwardRef` 时，`PopoverTrigger asChild` 也可以直接包裹业务组件；本库会自动生成一层包装元素承接 Radix 的 ref 和事件。

## API

### 导出项

| 名称 | 说明 |
| --- | --- |
| `Popover` | 根组件，支持 `open`、`defaultOpen`、`onOpenChange`、`modal`。 |
| `PopoverTrigger` | 触发器，支持 `asChild` 与 `asChildWrapper`。 |
| `PopoverAnchor` | 锚点组件，用于显式指定定位参考元素。 |
| `PopoverContent` | 内容面板，支持本库样式能力与定位属性。 |
| `PopoverClose` | 关闭控件，支持 `asChild` 与 `asChildWrapper`。 |

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
| `asChildWrapper` | `asChild` 模式下承接 Radix ref 与事件的包装元素 | `React.ElementType` | `"span"` |

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
| `asChildWrapper` | `asChild` 模式下承接 Radix ref 与事件的包装元素 | `React.ElementType` | `"span"` |

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

## 行为规则 / 优先级

1. `open` 与 `onOpenChange` 的优先级最高。只要传了 `open`，Popover 就是受控模式，所有打开和关闭都由外部状态决定。
2. `PopoverTrigger` 默认切换打开状态，`PopoverClose` 会请求关闭；点击外部区域、按 `Esc` 也会走同一条状态变化链路。
3. `PopoverTrigger asChild` 和 `PopoverClose asChild` 默认都会额外包一层 `span` 承接 Radix 的 ref 和事件，因此可直接包裹本库 `Button` 或普通业务组件。
4. `PopoverContent` 默认通过 Portal 渲染到 `body`，避免被父级 `overflow` 裁剪，也意味着它不依赖触发器所在容器的层级上下文。
5. `PopoverContent` 的内联样式合并顺序是 `style` -> `width/rounded/shadow` -> `sx`，因此最终由 `sx` 覆盖同名内联样式；类名层面则是 `sx` 生成类、`className`、`class` 共同参与合并。
6. `modal` 默认是 `false`。只有在你需要更强的模态语义时，才显式开启。

## Notes

- `PopoverContent` 适合短内容，不建议塞入长篇正文；复杂交互内容更适合用 `Dialog`、`Drawer` 或专门的表单面板。
- 触发器文案应足够明确，避免用户点开后还需要猜当前浮层的用途。
- 如果内容区宽度不固定，优先传入响应式 `width`，例如 `width="min(360px, calc(100vw - 32px))"`，避免小屏幕下溢出。
- 需要与指定元素对齐时，优先使用 `PopoverAnchor`，不要依赖容器布局去“碰运气”。
- `asChildWrapper` 只在你需要替换默认包装元素语义时使用；常规业务场景保持默认 `span` 即可。
