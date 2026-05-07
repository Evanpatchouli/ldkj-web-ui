# Menu

`Menu` 用于承载应用侧边栏、控制台导航和分组入口，支持嵌套展开、选中状态、受控状态、命令式控制与 `sx` 样式入口。

## Basic

组合式 API 适合需要精细控制节点结构的场景。

<MenuBasicDemo />

## Items

传递 `items` 可以快速生成菜单，适合由配置或后端数据驱动的导航。

<MenuItemsDemo />

## useMenuRef

`useMenuRef` 用于创建 `Menu` 的命令式控制引用，避免每次手写 `React.useRef<MenuRef>(null)`。

```tsx
import { Menu, useMenuRef } from "@ldkj/web-ui";

export function Example() {
  const menuRef = useMenuRef();

  return (
    <Menu menuRef={menuRef}>
      <Menu.Item itemKey="home">首页</Menu.Item>
    </Menu>
  );
}
```

## Controlled

`selectedKeys` 与 `openKeys` 可以完全受控，也可以通过 `menuRef` 做外部命令式控制。

<MenuControlledDemo />

## Multiple

`multiple` 为 `true` 时，允许多个菜单项同时保持选中状态，适合偏好设置、订阅入口等多选场景。

<MenuMultipleDemo />

## Accordion

`accordion` 为 `true` 时，同一父级下只保留一个子菜单展开，适合侧边栏层级较多、需要减少垂直占用的场景。

<MenuAccordionDemo />

## Indent

`indent` 控制每一层菜单的缩进像素，可根据侧边栏宽度和层级深度调整。

<MenuIndentDemo />

## Item Gap

`itemGap` 控制菜单项之间的间距，也会同步作用于 `Menu.Sub` 头部和内部列表之间，保持层级展开后的视觉节奏一致。

<MenuItemGapDemo />

## SX + Colors

`Menu` 支持 `sx`，也可以通过 `itemColors` 批量调整菜单项的常见状态色。

<MenuSxDemo />

## Usage

组合模式：

```tsx
import { Menu } from "@ldkj/web-ui";

export function Example() {
  return (
    <Menu defaultSelectedKeys={["overview"]} defaultOpenKeys={["workspace"]}>
      <Menu.Item itemKey="overview" icon="dashboard" href="/overview">
        总览
      </Menu.Item>
      <Menu.Sub itemKey="workspace" label="工作台" icon="folder">
        <Menu.Item itemKey="projects" icon="view_list">
          项目列表
        </Menu.Item>
        <Menu.Item itemKey="members" icon="group">
          成员管理
        </Menu.Item>
      </Menu.Sub>
    </Menu>
  );
}
```

配置模式：

```tsx
import { Menu } from "@ldkj/web-ui";

export function ItemsExample() {
  return (
    <Menu
      defaultSelectedKeys={["release"]}
      defaultOpenKeys={["devops"]}
      items={[
        { key: "home", label: "首页", icon: "home", href: "/" },
        {
          key: "devops",
          label: "发布中心",
          icon: "publish",
          children: [
            { key: "pipeline", label: "流水线", icon: "dns" },
            { key: "release", label: "发布单", icon: "description" },
          ],
        },
      ]}
    />
  );
}
```

## API

### Menu

| 属性                   | 说明                            | 类型                   | 默认值  |
| ---------------------- | ------------------------------- | ---------------------- | ------- |
| `items`                | 快捷创建菜单的配置数组          | `MenuItemConfig[]`     | -       |
| `selectedKeys`         | 受控选中 key                    | `string[]`             | -       |
| `defaultSelectedKeys`  | 默认选中 key                    | `string[]`             | `[]`    |
| `onSelectedKeysChange` | 选中变化回调                    | `(keys, info) => void` | -       |
| `openKeys`             | 受控展开 key                    | `string[]`             | -       |
| `defaultOpenKeys`      | 默认展开 key                    | `string[]`             | `[]`    |
| `onOpenKeysChange`     | 展开变化回调                    | `(keys, info) => void` | -       |
| `multiple`             | 是否允许多个 item 同时选中      | `boolean`              | `false` |
| `accordion`            | 是否同层只保留一个子菜单展开    | `boolean`              | `false` |
| `indent`               | 每一层缩进像素                  | `number`               | `18`    |
| `itemGap`              | 菜单项之间的间距，数字自动转 px | `number \| string`     | `4`     |
| `itemColors`           | 菜单项状态色                    | `MenuItemColors`       | -       |
| `menuRef`              | 命令式控制引用                  | `React.Ref<MenuRef>`   | -       |
| `listProps`            | 透传给内部 `ul`                 | `Menu.List` props      | -       |
| `component`            | 自定义根节点元素                | `React.ElementType`    | `"nav"` |
| `className`            | 追加类名                        | `string`               | -       |
| `class`                | 历史类名别名                    | `string`               | -       |
| `style`                | 内联样式                        | `React.CSSProperties`  | -       |
| `sx`                   | CSS-in-JS 样式入口              | `SxProps`              | -       |
| `...rest`              | 继承 `Box` 的能力和原生属性透传 | `BoxProps<T>`          | -       |

### Menu.Item

| 属性                       | 说明                            | 类型                                | 默认值              |
| -------------------------- | ------------------------------- | ----------------------------------- | ------------------- |
| `itemKey`                  | 菜单项唯一 key                  | `string`                            | -                   |
| `label`                    | 菜单项内容；也可使用 `children` | `React.ReactNode`                   | -                   |
| `icon`                     | 左侧图标名                      | `IconProps["name"]`                 | -                   |
| `iconProps`                | 透传给 `Icon`                   | `Omit<IconProps, "name">`           | -                   |
| `href`                     | 链接地址；存在时默认渲染为 `a`  | `string`                            | -                   |
| `component`                | 自定义渲染元素                  | `React.ElementType`                 | `"button"` 或 `"a"` |
| `disabled`                 | 禁用菜单项                      | `boolean`                           | `false`             |
| `selected`                 | 强制指定当前项选中态            | `boolean`                           | -                   |
| `unselectOnClick`          | 单选模式下再次点击是否取消选中  | `boolean`                           | `false`             |
| `onSelect`                 | 当前项被选中时触发              | `(key: string) => void`             | -                   |
| `className/class/style/sx` | 样式入口                        | -                                   | -                   |
| `...rest`                  | 原生属性透传                    | `React.ComponentPropsWithoutRef<T>` | -                   |

### Menu.Sub

| 属性                       | 说明               | 类型                                   | 默认值  |
| -------------------------- | ------------------ | -------------------------------------- | ------- |
| `itemKey`                  | 子菜单唯一 key     | `string`                               | -       |
| `label`                    | 子菜单标题         | `React.ReactNode`                      | -       |
| `icon`                     | 左侧图标名         | `IconProps["name"]`                    | -       |
| `iconProps`                | 透传给 `Icon`      | `Omit<IconProps, "name">`              | -       |
| `disabled`                 | 禁用展开触发       | `boolean`                              | `false` |
| `children`                 | 子菜单内容         | `React.ReactNode`                      | -       |
| `className/class/style/sx` | 样式入口           | -                                      | -       |
| `...rest`                  | 原生 `li` 属性透传 | `React.ComponentPropsWithoutRef<"li">` | -       |

### Menu.Group

| 属性                       | 说明               | 类型                                   | 默认值 |
| -------------------------- | ------------------ | -------------------------------------- | ------ |
| `label`                    | 分组标题           | `React.ReactNode`                      | -      |
| `children`                 | 分组内容           | `React.ReactNode`                      | -      |
| `className/class/style/sx` | 样式入口           | -                                      | -      |
| `...rest`                  | 原生 `li` 属性透传 | `React.ComponentPropsWithoutRef<"li">` | -      |

### MenuItemConfig

| 属性         | 说明                                     | 类型                         | 默认值   |
| ------------ | ---------------------------------------- | ---------------------------- | -------- |
| `key`        | 菜单 key；未传时回退到 `href` 或索引路径 | `string`                     | -        |
| `label`      | 菜单文本或节点                           | `React.ReactNode`            | -        |
| `icon`       | 左侧图标名                               | `IconProps["name"]`          | -        |
| `href`       | 链接地址                                 | `string`                     | -        |
| `disabled`   | 禁用当前项                               | `boolean`                    | `false`  |
| `children`   | 子节点配置                               | `MenuItemConfig[]`           | -        |
| `type`       | 节点类型                                 | `"item" \| "sub" \| "group"` | 自动推断 |
| `itemProps`  | 透传给 `Menu.Item`                       | `MenuItemProps`              | -        |
| `subProps`   | 透传给 `Menu.Sub`                        | `MenuSubProps`               | -        |
| `groupProps` | 透传给 `Menu.Group`                      | `MenuGroupProps`             | -        |

### MenuRef

| 方法                | 说明                 |
| ------------------- | -------------------- |
| `select(key)`       | 选中指定项           |
| `unselect(key)`     | 取消指定项           |
| `open(key)`         | 展开指定子菜单       |
| `close(key)`        | 收起指定子菜单       |
| `toggleOpen(key)`   | 切换指定子菜单展开态 |
| `getSelectedKeys()` | 获取当前选中 key     |
| `getOpenKeys()`     | 获取当前展开 key     |

## Notes

- `Menu` 不内置业务路由；需要路由库时，可通过 `component` 或 `onClick` 接入。
- `accordion` 以同层子菜单为边界，不会影响其他层级的展开状态。
- 当 `selectedKeys/openKeys` 受控时，需要在对应 change 回调里同步外部状态。
