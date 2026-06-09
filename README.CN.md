# @ldkj/web-ui

由 shadcn-ui, Tailwind CSS 和 VitePress 构建的企业级 React 组件库.

## 开发

```bash
pnpm install
pnpm dev
```

## 在其他项目中使用

```bash
pnpm add @ldkj/web-ui
```

```tsx
// 可选：如需启用设计系统基础重置（全局样式），先引入 reset
// import "@ldkj/web-ui/reset.css";
import "@ldkj/web-ui/style.css";
import {
  Anchor,
  Button,
  Chip,
  Dialog,
  Icon,
  Select,
  SkeletonText,
  Switch,
  ToastProvider,
  toast,
  registerIconLoaders,
} from "@ldkj/web-ui";

registerIconLoaders({
  brand_logo: {
    outlined: () => import("./icons/brand-logo.svg?react"),
  },
});

export default function App() {
  return (
    <ToastProvider>
      <div className="p-4">
        <Button variant="primary" onClick={() => toast.success("保存成功")}>
          Hello World
        </Button>
        <Anchor id="target" className="text-blue-600">
          跳转到目标区块
        </Anchor>
        <Chip variant="success" size="sm">
          Ready
        </Chip>
        <Icon name="brand_logo" />
        <Icon name="check_circle" color="#16a34a" />
        <Select defaultValue="pro">
          <Select.Trigger className="mt-3 w-40">
            <Select.Value placeholder="选择版本" />
          </Select.Trigger>
          <Select.Content>
            <Select.Item value="standard">标准版</Select.Item>
            <Select.Item value="pro">专业版</Select.Item>
          </Select.Content>
        </Select>
        <Switch className="mt-3" label="启用通知" defaultChecked />
        <SkeletonText className="mt-3 w-64" rows={2} />
        <div id="target">目标区块</div>
      </div>
    </ToastProvider>
  );
}
```

## Theme

```tsx
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

## Sx (CSS-in-JS)

```tsx
import "@ldkj/web-ui/style.css";
import { Button, SxProvider, createTheme } from "@ldkj/web-ui";

const theme = createTheme({
  palette: {
    primary: "#2563eb",
  },
});

export default function App() {
  return (
    <SxProvider theme={theme}>
      <Button
        sx={(t) => ({
          backgroundColor: (t.palette as { primary: string }).primary,
          "&:hover": { opacity: 0.9 },
          "@media (max-width: 768px)": { width: "100%" },
        })}
      >
        Styled By SX
      </Button>
    </SxProvider>
  );
}
```

## Scripts

- `pnpm dev`: 启动 VitePress 开发服务器查看文档和 Demo.
- `pnpm icons:gen`: 扫描 `@material-symbols/svg-400` 并生成全量 Icon loaders.
- `pnpm build:lib`: 构建生产包到 `dist/`.
- `pnpm build:docs`: 构建 VitePress 静态文档到 `docs/.vitepress/dist/`.
- `pnpm build`: 构建生产包和文档.
- `pnpm typecheck`: 运行 TypeScript 类型检查.

## Build

```bash
pnpm build
```

