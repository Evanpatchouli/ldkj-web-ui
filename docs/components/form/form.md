# Form

`Form` 用于将表单信息组织在一个原生 `form` 容器中。它保留了原生 form 标签的提交、系统校验、标准语义和可访问性，同时统一提供默认的纵向布局间距，方便在表单场景中快速上手。

## Basic

最小可用模式：原生 `form` 提交、标签关联和基础输入控件。

<FormBasicDemo />

## 常见场景

### 登录表单

`Form` 用于登录、后台信息录入、账户编辑等单表单场景，可结合 `sx` 或 `className` 做出模块化容器框架。

<FormLoginDemo />

### 筛选搜索

在搜索条、过滤区、架构化搜索或控制面板中，可以通过 `className="space-y-0"` 把自带的垂直间距切掉，再用 `sx` 给容器加上精简视觉层。

<FormInlineDemo />

## Usage

```tsx
import { Button, Form, Input, Label } from "@ldkj/web-ui";

export function Example() {
  return (
    <Form
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <div className="space-y-2">
        <Label htmlFor="account">账号</Label>
        <Input id="account" name="account" placeholder="请输入账号" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">邮箱</Label>
        <Input id="email" type="email" name="email" placeholder="name@example.com" />
      </div>
      <Button type="submit">提交</Button>
    </Form>
  );
}
```

表单容器布局示例：

```tsx
import { Button, Form, Input } from "@ldkj/web-ui";

export function InlineExample() {
  return (
    <Form
      className="space-y-0"
      sx={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "end",
        gap: 12,
        padding: 16,
        border: "1px solid #e2e8f0",
        borderRadius: 12,
        backgroundColor: "#ffffff",
      }}
    >
      <Input placeholder="关键词" />
      <Button type="submit">搜索</Button>
    </Form>
  );
}
```

## API

### Form

`Form` 直接继承原生 `form` 的全部属性，同时额外支持本库统一的样式入口。

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `children` | 表单内容 | `React.ReactNode` | - |
| `className` | 自定义类名 | `string` | - |
| `class` | 类名别名 | `string` | - |
| `style` | 原生样式 | `React.CSSProperties` | - |
| `sx` | CSS-in-JS 样式入口 | `SxProps` | - |
| `onSubmit` | 提交回调 | `React.FormEventHandler<HTMLFormElement>` | - |
| `action` | 表单提交地址 | `string` | - |
| `method` | 提交方法 | `"get" \| "post" \| string` | - |
| `noValidate` | 是否关闭浏览器原生校验 | `boolean` | `false` |
| `encType` | 提交编码类型 | `string` | - |
| `target` | 提交目标窗口 | `string` | - |

其余属性均透传给原生 `form`。

## 行为规则 / 优先级

- `Form` 默认会附加 `space-y-4`，用于生成常见的纵向表单间距。
- `className` 与 `class` 都会被合并，`tailwind-merge` 会让后写入的工具类覆盖默认值。
- `style` 与 `sx` 会合并，`sx` 的解析结果会叠加到原生样式之上。
- 组件本身不处理表单校验逻辑，浏览器原生校验与业务校验依旧由 `form`、`input` 和上层逻辑负责。
- 如果在 `onSubmit` 中调用 `event.preventDefault()`，表单将维持当前页面，不会发生跳转。

## Notes

- `Form` 只是容器，不会替代 `fieldset`、`legend` 或业务层表单校验。
- 横向搜索栏、按钮组表单等场景，建议显式加 `className="space-y-0"` 或直接在内部使用 `Flex` / `Box` 组织布局。
- 如果表单需要原生提交到后端，优先传入 `name`、`action` 和 `method`，让浏览器参与标准表单链路。
