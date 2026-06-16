# @ldkj/web-ui

由 shadcn-ui, Tailwind CSS 和 VitePress 构建的企业级 React 组件库.

## 立即开始

```bash
pnpm add @ldkj/web-ui
```

## 使用示例

```tsx
// 可选：如需启用页面级 normalize，应放在 style.css 之前引入
// import "@ldkj/web-ui/reset.css";
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

`style.css` 是组件样式必需入口。`reset.css` 仅提供页面级基础重置，Button 等组件自身外观不依赖它。

