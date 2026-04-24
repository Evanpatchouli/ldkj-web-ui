# @ldkj/web-ui

由 shadcn-ui, Tailwind CSS 和 VitePress 构建的 React 组件库.

## 使用者

### 通用能力

- [SX 样式能力](/general/sx)

### 快速开始

安装代码包：

```bash
npm install @ldkj/web-ui
```

引入样式和组件：

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

## 开发者

### 安装运行

```bash
pnpm install
pnpm dev
```

然后访问 `http://localhost:5173`。

### 构建

```bash
pnpm build
```

这个指令会同时构建组件库和文档。
