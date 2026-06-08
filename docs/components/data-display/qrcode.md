# QRCode

`QRCode` 用于生成二维码，支持图片模式与 Canvas 模式。

## Basic

默认渲染为图片模式（`canvas=false`）。

<QRCodeBasicDemo />

## Canvas

通过 `canvas` 切换为 Canvas 渲染模式。

<QRCodeCanvasDemo />

## Size

`size` 支持 `number` 与 `string`（如 `180px`）。

<QRCodeSizeDemo />

## Status Overlay

通过 `useful`、`uselessElem`、`uselessProps` 可实现失效态遮罩。

<QRCodeStatusDemo />

## Style

支持颜色、留白和纠错级别等配置。

<QRCodeStyleDemo />

## 常见场景

### 基础展示

用于页面主体、列表项或卡片中直接展示 QRCode 的默认形态。

### 状态与数据驱动

当内容来自接口或业务状态时，优先把状态转换为组件 props，再交给 QRCode 渲染。

### 样式组合

需要贴近业务页面时，通过 `className`、`class`、`style` 或 `sx` 做局部覆盖。

## Usage

```tsx
import { QRCode } from "@ldkj/web-ui";

export function Example() {
  return (
    <QRCode
      value="https://ldkj.com"
      size={160}
      foregroundColor="#000000"
      backgroundColor="#ffffff"
    />
  );
}
```

## Q & A

**Q: 我是否应该启用 canvas 模式？**

**A**: 更推荐启用 **canvas** 模式，因为支持高清重绘

## API

### `QRCode`

| 属性                   | 说明                       | 类型                                        | 默认值      |
| ---------------------- | -------------------------- | ------------------------------------------- | ----------- |
| `canvas`               | 是否使用 Canvas 模式       | `boolean`                                   | `false`     |
| `value`                | 二维码内容                 | `string`                                    | -           |
| `size`                 | 二维码尺寸                 | `number \| string`                          | 200         |
| `useful`               | 是否可用态                 | `boolean`                                   | `true`      |
| `uselessElem`          | 不可用态遮罩内容           | `React.ReactNode`                           | -           |
| `uselessProps`         | 不可用态遮罩属性           | `React.HTMLAttributes<HTMLDivElement>`      | -           |
| `foregroundColor`      | 前景色                     | `string`                                    | `'#000000'` |
| `backgroundColor`      | 背景色                     | `string`                                    | `'#ffffff'` |
| `margin`               | 二维码留白（px）           | `number`                                    | `4`         |
| `errorCorrectionLevel` | 容错等级                   | `'low' \| 'medium' \| 'quartile' \| 'high'` | `'medium'`  |
| `fullWidth`            | 是否撑满宽度               | `boolean`                                   | -           |
| `sx`                   | CSS-in-JS 样式入口（容器/图像根节点） | `SxProps`（支持对象/数组/函数，支持伪类、选择器、媒体查询） | - |
| `unload`               | 加载中占位内容（图片模式） | `React.ReactNode`                           | -           |

### `QRCodeCanvas`

当 `canvas=true` 时使用的底层组件，使用 canvas 渲染，支持动态高清重绘。

### `QRCodeSizable`

默认图片渲染组件，支持 `size` 的 `number | string` 输入。

## 行为规则 / 优先级

- 数据展示组件只负责渲染当前输入，不在内部请求数据。
- `className` 与 `class` 用于追加类名；如同时传入原生 `style`，内联样式会按 React 规则覆盖同名 CSS。
- 复杂内容优先通过组合能力传入，避免在组件内部硬编码业务文案。
- QRCode 的默认值应服务于最常见场景，特殊场景通过显式 props 覆盖。

## Notes

- 注意空态、长文本、加载中和错误态，必要时配合 Skeleton、Empty 或 Alert。
- 文档 demo 展示的是推荐组合方式；生产代码中可按业务密度调整间距和尺寸。
- 修改组件能力时需要同步更新本页 Demo、Usage、API 与行为规则。
