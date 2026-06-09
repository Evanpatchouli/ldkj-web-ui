# 主题定制

主题系统通过 CSS Variables 驱动组件默认视觉，`ThemeProvider` 负责把主题 token 注入到局部容器或页面根节点。`sx` 仍然是单个组件的最终覆盖层。

## Basic

<ThemeBasicDemo />

## 常见场景

### 品牌色覆盖

使用 `createTheme` 覆盖 `colors.primary`、`colors.primaryHover`、`colors.ring` 后，Button、Input、Select、Badge、Switch 等组件会同步更新主色、焦点环和激活态。

### 明暗主题

`ThemeProvider` 的 `mode` 支持 `"light"`、`"dark"` 和 `"system"`。深色模式会先载入默认 dark token，再合并业务传入的主题覆盖。

### 局部主题

默认 `scope="local"`，主题变量只影响 Provider 子树。浮层类组件如果通过 Portal 渲染到 `body`，需要把 `ThemeProvider` 放在应用根部，或使用 `scope="root"` 把变量写入 `document.documentElement`。

### 兼容旧 sx

原有 `SxProvider`、`createTheme` 和 `sx={(theme) => ...}` 保留可用。新项目建议直接使用 `ThemeProvider`，旧项目可逐步迁移。

## Usage

```tsx
// import "@ldkj/web-ui/reset.css";
import "@ldkj/web-ui/style.css";
import { Button, ThemeProvider, createTheme } from "@ldkj/web-ui";

const theme = createTheme({
  colors: {
    primary: "#7c3aed",
    primaryHover: "#6d28d9",
    primaryForeground: "#ffffff",
    ring: "#a78bfa",
  },
  radii: {
    md: "10px",
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme} mode="light" scope="root">
      <Button>保存</Button>
    </ThemeProvider>
  );
}
```

## API

### ThemeProvider

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `theme` | `ThemeInput` | - | 主题覆盖对象，支持只传需要修改的 token |
| `mode` | `"light" \| "dark" \| "system"` | `"light"` | 主题模式 |
| `scope` | `"local" \| "root"` | `"local"` | 变量注入到局部容器或 `document.documentElement` |
| `children` | `React.ReactNode` | - | 主题作用域内容 |

### createTheme

`createTheme(theme)` 会保留传入对象的类型，便于业务项目给主题扩展字段。组件库只消费约定 token 和 `cssVars`。

### ThemeInput

| 分组 | 常用 token |
| --- | --- |
| `colors` | `background`、`foreground`、`surface`、`muted`、`border`、`input`、`ring`、`primary`、`success`、`warning`、`danger`、`overlay` |
| `radii` | `xs`、`sm`、`md`、`lg`、`xl`、`full` |
| `shadows` | `xs`、`sm`、`md`、`lg`、`xl`、`popover`、`modal` |
| `zIndex` | `dropdown`、`sticky`、`drawer`、`modal`、`notification`、`toast` |
| `cssVars` | 任意 `--*` CSS 变量，用于高级覆盖 |

## 行为规则 / 优先级

1. `style.css` 中的 `:root` token 提供默认主题。
2. `.dark` 或 `ThemeProvider mode="dark"` 提供深色默认值。
3. `ThemeProvider theme` 覆盖默认 token。
4. 组件自身 `style` 覆盖默认布局或局部样式。
5. 组件 `sx` 最终覆盖，优先级高于组件内部计算样式。

## Notes

- 不包 `ThemeProvider` 时，组件仍使用 `style.css` 默认主题。
- `reset.css` 仍是可选全局重置，不是主题系统的必要条件；如需引入，应放在 `style.css` 之前。
- `scope="local"` 会渲染一层主题容器，用于可靠承载 CSS 变量。
- Portal 浮层默认挂到 `body`，局部主题不会自动穿透到外部 DOM。
- SSR 场景建议在首屏 HTML 上提前写入关键 `--ldkj-*` 变量，避免主题闪烁。
- 高级业务可以通过 `cssVars` 直接覆盖底层 CSS 变量，但稳定公共 API 仍以 `colors/radii/shadows/zIndex` 为准。
