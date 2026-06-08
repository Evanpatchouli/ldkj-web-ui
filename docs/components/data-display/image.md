# Image

`Image` 是增强型图片组件：在保留原生 `img` 语义和事件能力的基础上，补齐了加载占位、失败回退、响应式资源协商、裁剪参数拼接、预览交互和状态渲染。

## Basic

<ImageBasicDemo />

## Size & Fit

通过 `aspectRatio` 锁定容器比例，配合 `fit` / `position` 控制图片裁剪策略，减少布局偏移。
<ImageFitDemo />

## Fallback

主图失败时可先尝试 `fallbackSrc`，最终再回退到 `fallback` 节点。
<ImageFallbackDemo />

## SX Custom

`sx` 作用于外层容器，可统一控制边框、圆角、阴影、尺寸与比例。
<ImageSxDemo />

## Preview

开启 `preview` 后支持：

- 点击图片打开预览
- 遮罩点击关闭
- `ESC` 关闭
- 滚轮缩放
- `+` / `-` / `0` 键盘缩放与重置
- 预览内拖拽平移（放大后）

<ImagePreviewDemo />

## Render State

通过 `children(state)` 可读取组件状态（如 `loading/error/loaded`）并渲染叠加层。
<ImageStateDemo />

## Responsive Sources

通过 `sources + formats + responsiveWidths + loader` 输出 `<picture>`，覆盖媒体条件和格式优先级场景。
<ImagePictureDemo />

## OSS Crop

开启 `crop` 且传入数值 `width/height` 时，若未传 `loader`，组件会自动拼接 OSS 裁剪参数。
<ImageCropDemo />

## 常见场景

### 基础展示

用于页面主体、列表项或卡片中直接展示 Image 的默认形态。

### 状态与数据驱动

当内容来自接口或业务状态时，优先把状态转换为组件 props，再交给 Image 渲染。

### 样式组合

需要贴近业务页面时，通过 `className`、`class`、`style` 或 `sx` 做局部覆盖。

## Usage

```tsx
import { Image } from "@ldkj/web-ui";

export function Example() {
  return (
    <Image
      src="/cover.jpg"
      alt="产品封面"
      aspectRatio="16/9"
      fit="cover"
      sizes="(max-width: 768px) 100vw, 640px"
      formats={["avif", "webp"]}
      responsiveWidths={[360, 640, 960, 1360]}
      loader={(src, options) => {
        const params = new URLSearchParams();
        if (options.width) params.set("w", String(options.width));
        if (options.quality) params.set("q", String(options.quality));
        if (options.format) params.set("fmt", options.format);
        return params.size ? `${src}?${params.toString()}` : src;
      }}
      sources={[
        {
          media: "(min-width: 1024px)",
          srcSet: "/cover-desktop.webp 1x, /cover-desktop@2x.webp 2x",
          type: "image/webp",
        },
      ]}
      crop
      width={640}
      height={360}
      fallbackSrc="/cover-fallback.jpg"
      loadingFallback={<div>加载中...</div>}
      fallback={<div>图片加载失败</div>}
      preview
    >
      {({ loading, error }) =>
        loading ? <div>loading...</div> : error ? <div>error</div> : null
      }
    </Image>
  );
}
```

## API

`Image` 继承原生 `img` 属性，并通过 `forwardRef` 将 `ref` 指向内部 `img` 节点。

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `src` | 图片地址 | `string` | - |
| `alt` | 替代文本 | `string` | - |
| `fallback` | 最终回退内容 | `React.ReactNode` | - |
| `fallbackSrc` | 主图失败后的备用地址 | `string` | - |
| `loadingFallback` | 加载中占位内容 | `React.ReactNode` | - |
| `fit` | 对应 `object-fit` | `React.CSSProperties["objectFit"]` | - |
| `position` | 对应 `object-position` | `React.CSSProperties["objectPosition"]` | - |
| `aspectRatio` | 外层容器比例 | `number \| string` | - |
| `placeholder` | 占位模式 | `"blur"` | - |
| `blurDataURL` | 模糊占位背景图 | `string` | - |
| `retry` | 失败重试次数 | `number` | `0` |
| `retryDelay` | 重试延迟（ms） | `number` | `800` |
| `onLoadingChange` | loading 状态变更回调 | `(loading: boolean) => void` | - |
| `loader` | 地址转换函数 | `(src, options) => string` | - |
| `quality` | 传给 `loader` 的质量参数 | `number` | - |
| `format` | 传给 `loader` 的单图格式参数 | `string` | - |
| `crop` | 开启默认 OSS 裁剪参数拼接（需数值 `width/height`） | `boolean` | `false` |
| `sources` | 自定义 `<source>` 列表 | `{ media?: string; srcSet: string; type?: string; sizes?: string }[]` | - |
| `formats` | 自动格式候选列表 | `("webp" \| "avif")[]` | - |
| `responsiveWidths` | 配合 `loader` 生成 `w` 描述的 `srcSet` | `number[]` | - |
| `sizes` | 响应式资源尺寸提示 | `string` | - |
| `preview` | 是否启用预览 | `boolean` | `false` |
| `children` | 状态渲染函数 | `(state) => React.ReactNode` | - |
| `className` | 追加类名 | `string` | - |
| `class` | 历史类名别名 | `string` | - |
| `style` | 外层容器内联样式 | `React.CSSProperties` | - |
| `sx` | 外层容器样式入口 | `SxProps` | - |
| `onError` | 加载失败回调 | `React.ReactEventHandler<HTMLImageElement>` | - |
| `...rest` | 其他原生 `img` 属性透传 | `React.ImgHTMLAttributes<HTMLImageElement>` | - |

## 行为规则 / 优先级
1. 主图失败后先走 `retry`
2. 重试结束后尝试 `fallbackSrc`
3. `fallbackSrc` 失败后渲染 `fallback`

说明：`fallback` 不是第一优先级，而是最终兜底。

## 资源协商规则

- 传入 `sources` 或 `formats` 时，组件渲染 `<picture>`
- `formats` 会基于 `src` 扩展名推导候选格式资源
- `loader + responsiveWidths` 会生成 `... 360w, ... 640w` 这类 `srcSet`
- `sizes` 会同时传给 `source/img`
- 预览始终基于最终 `img src`（不直接读取 `source` 命中项）

## Preview 交互与可访问性

- 弹层使用 `role="dialog"` + `aria-modal="true"`
- 打开预览后聚焦关闭按钮，关闭后焦点回到触发前元素
- 预览开启时锁定页面滚动
- 关闭按钮和弹层均提供可访问名称

## Notes
- 内容图必须提供有意义 `alt`
- 装饰图使用 `alt=""`
- 在卡片/列表中优先设置 `aspectRatio + fit="cover"`，避免 CLS
- 有 CDN 时优先提供 `loader + responsiveWidths + sizes`
- 无 CDN 但使用 OSS 时可直接用 `crop + width + height`

## 常见问题

- `formats` 对 `data:` / `blob:` 地址不生效：这类地址不会自动改写扩展名
- `sx/style/className` 作用于外层容器，不是 `img` 本体
- 传了 `loader` 后，`crop` 的默认拼接逻辑会交给 `loader` 接管

## Notes

- `src` 变化会自动重置状态，避免旧状态污染新图
- 默认 `loading="lazy"`、`decoding="async"`，可按需覆盖
- 开发环境下未传 `alt` 会输出告警
