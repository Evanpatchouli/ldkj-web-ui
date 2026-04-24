# SX 样式能力

`sx` 是组件库提供的 CSS-in-JS 样式入口，用于在组件上直接编写样式对象。

## 能力概览

- 支持对象写法
- 支持数组合并写法
- 支持函数写法（可读取主题）
- 支持伪类、后代选择器、媒体查询

## 基础用法

```tsx
import { Button } from "@ldkj/web-ui";

export function Example() {
  return (
    <Button
      sx={{
        backgroundColor: "#2563eb",
        color: "#fff",
        "&:hover": { opacity: 0.9 },
      }}
    >
      Click
    </Button>
  );
}
```

## 数组写法

```tsx
import { Chip } from "@ldkj/web-ui";

export function Example() {
  return (
    <Chip
      sx={[
        { fontWeight: 600 },
        { "&:hover": { transform: "translateY(-1px)" } },
        { "@media (max-width: 768px)": { width: "100%" } },
      ]}
    >
      Status
    </Chip>
  );
}
```

## 主题用法

```tsx
import { Button, SxProvider, createTheme } from "@ldkj/web-ui";

const theme = createTheme({
  palette: {
    primary: "#2563eb",
  },
});

export function Example() {
  return (
    <SxProvider theme={theme}>
      <Button
        sx={(t) => ({
          backgroundColor: (t.palette as { primary: string }).primary,
          color: "#fff",
        })}
      >
        Themed Button
      </Button>
    </SxProvider>
  );
}
```

## 优先级说明

统一合并顺序为：`style -> 组件内部计算样式 -> sx`。  
即 `sx` 会作为最终覆盖层。

