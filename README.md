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
