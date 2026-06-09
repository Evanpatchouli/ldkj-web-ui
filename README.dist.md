# @ldkj/web-ui

由 shadcn-ui, Tailwind CSS 和 VitePress 构建的企业级 React 组件库.

## 立即开始

```bash
pnpm add @ldkj/web-ui
```

## 使用示例

```tsx
import "@ldkj/web-ui/style.css";
import { Button, Chip } from "@ldkj/web-ui";

// 可选：如需启用设计系统基础重置（全局样式），再额外引入
// import "@ldkj/web-ui/reset.css";

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

