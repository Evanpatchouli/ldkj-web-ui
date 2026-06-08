# Required

必填标记组件，用于表单字段提示。

## Basic
<RequiredDemo />

## 常见场景

### 基础表单

在普通表单项中使用 Required，保持 label、错误提示和控件状态清晰可见。

### 受控状态

当字段值需要联动查询、校验或提交时，使用受控 props 管理状态。

### 禁用与校验

禁用、必填、错误等状态应由表单层统一管理，再传递给 Required。

## Usage

```tsx
import { Required } from "@ldkj/web-ui";

export function Example() {
  return <Required />;
}
```

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `children` | 自定义必填标记内容 | `React.ReactNode` | `"*"` |
| `className` | 自定义类名 | `string` | - |
| `class` | 类名别名 | `string` | - |
| `style` | 原生样式 | `React.CSSProperties` | - |

## 行为规则 / 优先级

- 表单组件优先由外部表单层管理值、校验和提交状态。
- `className` 与 `class` 用于追加类名；如同时传入原生 `style`，内联样式会按 React 规则覆盖同名 CSS。
- 复杂内容优先通过组合能力传入，避免在组件内部硬编码业务文案。
- Required 的默认值应服务于最常见场景，特殊场景通过显式 props 覆盖。

## Notes

- 表单场景中建议同时提供 label、错误提示和禁用态，避免只靠颜色表达状态。
- 文档 demo 展示的是推荐组合方式；生产代码中可按业务密度调整间距和尺寸。
- 修改组件能力时需要同步更新本页 Demo、Usage、API 与行为规则。
