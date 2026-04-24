# @ldkj/web-ui

由 shadcn-ui, Tailwind CSS 和 VitePress 构建的 React 组件库.

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
import "@ldkj/web-ui/style.css";
import { Button, Chip } from "@ldkj/web-ui";

export default function App() {
  return (
    <div className="p-4">
      <Button variant="primary">Hello World</Button>
      <Chip variant="success" size="sm">
        Ready
      </Chip>
    </div>
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
- `pnpm build:lib`: 构建生产包到 `dist/`.
- `pnpm build:docs`: 构建 VitePress 静态文档到 `docs/.vitepress/dist/`.
- `pnpm build`: 构建生产包和文档.
- `pnpm typecheck`: 运行 TypeScript 类型检查.

## Build

```bash
pnpm build
```
