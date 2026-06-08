# Tabs

`Tabs` 用于在同一页面区域内切换相关内容，适合配置面板、详情页分组、数据视图切换等场景。

## Basic

组合式 API 直接使用 `TabsList`、`TabsTrigger` 与 `TabsContent`，适合需要精细控制结构的场景。

<TabsBasicDemo />

## Items

`items` 可以快速生成一组标签页，适合简单内容切换或配置驱动的页面。

<TabsItemsDemo />

## SX Styling

`Tabs`、`TabsList`、`TabsTrigger` 与 `TabsContent` 都支持 `sx`。

<TabsSxDemo />

## Borderless

如果内容区不需要默认面板边框，可以在 `TabsContent` 或 `items[].contentProps` 中传入 `borderless`，同时内边距和背景色也将消失。

<TabsBorderlessDemo />

## Custom Content

如果业务内容区需要完全自定义，也可以只使用 `Tabs`、`TabsList` 和 `TabsTrigger`，通过受控 `value` 自己渲染内容。

<TabsCustomContentDemo />

## 常见场景

### 基础导航

用于页面跳转、层级定位或内容切换，帮助用户理解当前位置。

### 受控状态

当前项、展开项、页码或激活项需要和路由/查询参数同步时，使用受控模式。

### 可访问操作

导航项应保持可聚焦、可读，并在禁用或当前状态时给出明确语义。

## Usage

组合模式：

```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@ldkj/web-ui";

export function Example() {
  return (
    <Tabs defaultValue="overview">
      <TabsList>
        <TabsTrigger value="overview">总览</TabsTrigger>
        <TabsTrigger value="logs">日志</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">总览内容</TabsContent>
      <TabsContent value="logs">日志内容</TabsContent>
    </Tabs>
  );
}
```

配置模式：

```tsx
import { Tabs } from "@ldkj/web-ui";

export function ItemsExample() {
  return (
    <Tabs
      defaultValue="profile"
      items={[
        { value: "profile", label: "资料", content: "维护账号基本资料。" },
        { value: "security", label: "安全", content: "配置登录安全策略。" },
      ]}
    />
  );
}
```

## API

### Tabs

| 属性             | 说明                                | 类型                                                        | 默认值         |
| ---------------- | ----------------------------------- | ----------------------------------------------------------- | -------------- |
| `items`          | 快捷创建标签页的配置数组            | `TabsItemConfig[]`                                          | -              |
| `listProps`      | `items` 模式下透传给内部 `TabsList` | `TabsListProps`                                             | -              |
| `defaultValue`   | 默认激活项                          | `string`                                                    | -              |
| `value`          | 受控激活项                          | `string`                                                    | -              |
| `onValueChange`  | 激活项变化回调                      | `(value: string) => void`                                   | -              |
| `orientation`    | 标签方向                            | `"horizontal" \| "vertical"`                                | `"horizontal"` |
| `activationMode` | 激活模式                            | `"automatic" \| "manual"`                                   | `"automatic"`  |
| `className`      | 追加类名                            | `string`                                                    | -              |
| `class`          | 历史类名别名                        | `string`                                                    | -              |
| `style`          | 内联样式                            | `React.CSSProperties`                                       | -              |
| `sx`             | CSS-in-JS 样式入口                  | `SxProps`                                                   | -              |
| `children`       | 组合式内容                          | `React.ReactNode`                                           | -              |
| `...rest`        | Radix Tabs Root 属性透传            | `React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>` | -              |

### TabsList / TabsTrigger / TabsContent

| 属性        | 说明                      | 类型                                | 默认值 |
| ----------- | ------------------------- | ----------------------------------- | ------ |
| `className` | 追加类名                  | `string`                            | -      |
| `class`     | 历史类名别名              | `string`                            | -      |
| `style`     | 内联样式                  | `React.CSSProperties`               | -      |
| `sx`        | CSS-in-JS 样式入口        | `SxProps`                           | -      |
| `...rest`   | 对应 Radix 子组件属性透传 | `React.ComponentPropsWithoutRef<T>` | -      |

### TabsContent

| 属性         | 说明                             | 类型                                                           | 默认值  |
| ------------ | -------------------------------- | -------------------------------------------------------------- | ------- |
| `borderless` | 是否隐藏默认内容面板边框和内边距 | `boolean`                                                      | `false` |
| `className`  | 追加类名                         | `string`                                                       | -       |
| `class`      | 历史类名别名                     | `string`                                                       | -       |
| `style`      | 内联样式                         | `React.CSSProperties`                                          | -       |
| `sx`         | CSS-in-JS 样式入口               | `SxProps`                                                      | -       |
| `...rest`    | Radix Tabs Content 属性透传      | `React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>` | -       |

### TabsItemConfig

| 属性           | 说明                                      | 类型                                                          | 默认值  |
| -------------- | ----------------------------------------- | ------------------------------------------------------------- | ------- |
| `value`        | 标签页唯一值                              | `string`                                                      | -       |
| `label`        | 触发器内容                                | `React.ReactNode`                                             | -       |
| `content`      | 内容区域                                  | `React.ReactNode`                                             | -       |
| `disabled`     | 禁用触发器                                | `boolean`                                                     | `false` |
| `triggerProps` | 透传给 `TabsTrigger`                      | `Omit<TabsTriggerProps, "value" \| "children" \| "disabled">` | -       |
| `contentProps` | 透传给 `TabsContent`，可包含 `borderless` | `Omit<TabsContentProps, "value" \| "children">`               | -       |

## 行为规则 / 优先级

- 导航组件应让当前项、禁用项和跳转目标保持一致。
- `className` 与 `class` 用于追加类名；如同时传入原生 `style`，内联样式会按 React 规则覆盖同名 CSS。
- 复杂内容优先通过组合能力传入，避免在组件内部硬编码业务文案。
- Tabs 的默认值应服务于最常见场景，特殊场景通过显式 props 覆盖。

## Notes

- `Tabs` 基于 Radix Tabs，保留键盘导航与无障碍语义。
- `items` 模式适合轻量场景，复杂布局推荐组合式 API。
- 受控使用时请同时传入 `value` 与 `onValueChange`。
