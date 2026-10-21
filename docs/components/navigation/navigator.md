# Navigator

`Navigator` 是基于 Radix NavigationMenu 的顶部导航组件，适合应用页头、官网导航、控制台横向导航和 Mega Menu。它负责导航项、当前项和悬浮面板交互；页头容器、吸顶和安全区请交给 [Header](/components/layout/header)。

## Basic

通过 `items` 可以快速创建链接和带下拉面板的导航。

<NavigatorBasicDemo />

## 常见场景

### Header 组合

`Header` 负责外壳，`Navigator` 负责导航内容，两者组合时职责清晰。

<NavigatorHeaderDemo />

### Mega Menu

带 `children` 的导航项会渲染为触发器和面板，面板项支持图标、描述和链接。

<NavigatorMegaDemo />

### 受控当前项

`activeKey` 可与业务路由、查询参数或页面状态同步。

<NavigatorControlledDemo />

### 组合式 API

复杂结构可以使用 `Navigator.List`、`Navigator.Item`、`Navigator.Trigger`、`Navigator.Content`、`Navigator.Link` 自由组合。

<NavigatorCompoundDemo />

## Usage

```tsx
import { Header, Navigator } from "@ldkj/web-ui";

export function Example() {
  return (
    <Header
      brand={<span className="font-semibold">控制台</span>}
      nav={
        <Navigator
          defaultActiveKey="overview"
          items={[
            { key: "overview", label: "概览", href: "/overview" },
            {
              key: "workspace",
              label: "工作台",
              children: [
                {
                  key: "tasks",
                  label: "任务中心",
                  description: "跟进待办、审批和执行进度",
                  href: "/tasks",
                  icon: "article",
                },
              ],
            },
          ]}
        />
      }
    />
  );
}
```

## API

### Navigator

继承 `@radix-ui/react-navigation-menu` Root 属性，支持 `value`、`defaultValue`、`onValueChange`、`orientation`、`delayDuration`、`skipDelayDuration` 等。

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `items` | 配置式导航项 | `NavigatorItemConfig[]` | - |
| `activeKey` | 受控当前导航 key | `string` | - |
| `defaultActiveKey` | 默认当前导航 key | `string` | - |
| `onActiveKeyChange` | 当前导航变化回调 | `(key: string) => void` | - |
| `showViewport` | 是否渲染 Radix Viewport | `boolean` | `true` |
| `showIndicator` | 是否渲染 Radix Indicator | `boolean` | `true` |
| `listProps` | 透传给 `Navigator.List` | `NavigatorListProps` | - |
| `viewportProps` | 透传给 `Navigator.Viewport` | `NavigatorViewportProps` | - |
| `indicatorProps` | 透传给 `Navigator.Indicator` | `NavigatorIndicatorProps` | - |
| `className` | 追加类名 | `string` | - |
| `class` | 历史类名别名 | `string` | - |
| `style` | 内联样式 | `React.CSSProperties` | - |
| `sx` | CSS-in-JS 样式入口 | `SxProps` | - |
| `children` | 组合式子组件 | `React.ReactNode` | - |

### NavigatorItemConfig

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `key` | 导航项 key，未传时回退到 `href` 或索引 | `string` | - |
| `label` | 导航项内容 | `React.ReactNode` | - |
| `description` | 简短描述，常用于面板链接 | `React.ReactNode` | - |
| `icon` | 本库图标名 | `IconProps["name"]` | - |
| `href` | 普通链接地址 | `string` | - |
| `disabled` | 是否禁用 | `boolean` | `false` |
| `content` | 自定义下拉面板内容 | `React.ReactNode` | - |
| `children` | 下拉面板链接配置 | `NavigatorPanelItemConfig[]` | - |
| `itemProps` | 透传给 `Navigator.Item` | `NavigatorItemProps` | - |
| `triggerProps` | 透传给 `Navigator.Trigger` | `NavigatorTriggerProps` | - |
| `contentProps` | 透传给 `Navigator.Content` | `NavigatorContentProps` | - |
| `linkProps` | 透传给 `Navigator.Link` | `NavigatorLinkProps` | - |

### NavigatorPanelItemConfig

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `key` | 面板项 key，未传时回退到 `href` 或索引 | `string` | - |
| `label` | 面板项标题 | `React.ReactNode` | - |
| `description` | 面板项描述 | `React.ReactNode` | - |
| `icon` | 本库图标名 | `IconProps["name"]` | - |
| `href` | 链接地址 | `string` | - |
| `disabled` | 是否禁用 | `boolean` | `false` |
| `span` | 在默认面板网格中跨几列 | `number` | - |
| `linkProps` | 透传给 `Navigator.Link` | `NavigatorLinkProps` | - |

## Compound API

| 子组件 | 说明 |
| --- | --- |
| `Navigator.List` | 导航列表 |
| `Navigator.Item` | 导航项容器 |
| `Navigator.Trigger` | 带面板项的触发器 |
| `Navigator.Content` | 下拉面板内容 |
| `Navigator.Link` | 普通链接或面板链接 |
| `Navigator.Viewport` | Radix 面板视口 |
| `Navigator.Indicator` | 触发器下方指示器 |

## 行为规则 / 优先级

- `Navigator` 管导航交互，不管页头布局；需要品牌区、操作区、吸顶或安全区时组合 `Header`。
- `activeKey` 只表达当前导航项，不等同于 Radix Root 的 `value`；`value` 控制当前展开面板。
- `items` 存在时优先渲染配置式导航；没有 `items` 时渲染 `children`。
- `content` 优先级高于 `children`，适合完全自定义面板。
- `showViewport=false` 时不会渲染默认 Viewport，使用组合式 API 时需要自行处理面板容器。

## Notes

- `Navigator` 不内置业务路由；需要接入路由库时，在 `href`、`onClick` 或组合式 `Navigator.Link asChild` 中处理。
- 图标使用本库 `Icon`，组件源码不依赖 `lucide-react`。
- 顶部导航项不宜过多；超过横向空间时建议转为移动端菜单、侧边栏 `Menu` 或业务折叠入口。
- 只有图标或含糊文案的导航项应补充可读文本或 `aria-label`。
