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

## 按需导入与 tree-shaking

根入口的命名导入支持 tree-shaking。对包体积敏感的应用也可以使用稳定的组件级入口：

```tsx
import { Button } from "@ldkj/web-ui/button";
import { Select, SelectTrigger, SelectContent, SelectItems } from "@ldkj/web-ui/select";
import { ThemeProvider, createTheme } from "@ldkj/web-ui/theme";
```

可用的组件级入口包括 `button`、`ghost-button`、`select`、`theme` 和 `icon`。未使用图标的 Button consumer 不会携带图标模块。

