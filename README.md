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

- `pnpm dev`: start VitePress development server for docs and demos.
- `pnpm build:lib`: build component library bundle to `dist/`.
- `pnpm build:docs`: build VitePress static docs.
- `pnpm build`: run both library and docs builds.
- `pnpm typecheck`: run TypeScript checks.

## Build

```bash
pnpm build
```
