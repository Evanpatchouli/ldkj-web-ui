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

当 `canvas=true` 时使用的底层组件，额外支持 `fullWidth` 与 `div` 容器属性。

### `QRCodeSizable`

默认图片渲染组件，支持 `size` 的 `number | string` 输入。
