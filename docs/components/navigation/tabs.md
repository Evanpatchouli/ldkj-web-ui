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

## Notes

- `Tabs` 基于 Radix Tabs，保留键盘导航与无障碍语义。
- `items` 模式适合轻量场景，复杂布局推荐组合式 API。
- 受控使用时请同时传入 `value` 与 `onValueChange`。
