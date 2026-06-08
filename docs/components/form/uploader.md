# Uploader

文件上传触发组件，封装文件选择入口，并通过 `onChange(FileList | null)` 暴露文件列表。

## Basic
<UploaderDemo />

## 常见场景

### 基础表单

在普通表单项中使用 Uploader，保持 label、错误提示和控件状态清晰可见。

### 受控状态

当字段值需要联动查询、校验或提交时，使用受控 props 管理状态。

### 禁用与校验

禁用、必填、错误等状态应由表单层统一管理，再传递给 Uploader。

## Usage

```tsx
import { Uploader } from "@ldkj/web-ui";

export function Example() {
  return <Uploader />;
}
```

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `accept` | 文件类型限制 | `string` | - |
| `multiple` | 是否多选 | `boolean` | `false` |
| `name` | 原生文件输入名称，放入 `Form.Item` 时会自动透传 | `string` | - |
| `disabled` | 是否禁用 | `boolean` | `false` |
| `onChange` | 文件列表变更回调 | `(files: FileList \| null) => void` | - |
| `children` | 自定义上传触发内容 | `React.ReactNode` | - |
| `className` | 自定义类名 | `string` | - |
| `class` | 类名别名 | `string` | - |

## 行为规则 / 优先级

- 表单组件优先由外部表单层管理值、校验和提交状态。
- `className` 与 `class` 用于追加类名；如同时传入原生 `style`，内联样式会按 React 规则覆盖同名 CSS。
- 复杂内容优先通过组合能力传入，避免在组件内部硬编码业务文案。
- Uploader 的默认值应服务于最常见场景，特殊场景通过显式 props 覆盖。

## Notes

- `Uploader` 可以放入 `Form.Item`，表单会收集 `FileList | null`。
- 浏览器不允许安全地受控设置文件输入值，因此 `Form.Item` 不会向 `Uploader` 注入 `value`。
