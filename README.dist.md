# @ldkj/web-ui

由 shadcn-ui, Tailwind CSS 和 VitePress 构建的 React 组件库.

## 立即开始

```bash
pnpm add @ldkj/web-ui
```

## 使用示例

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
