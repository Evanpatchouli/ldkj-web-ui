# Collapse

`Collapse` 用于把相关内容折叠成可展开面板，适合详情页分组、FAQ、配置项、审批记录和低频信息收纳。  
组件同时提供 `items` 数据式 API 和 `Collapse.Item` 组合式 API，支持单开、多开、受控、禁用、懒挂载、销毁隐藏内容、自定义图标与额外操作。

## Basic

最小可用示例使用 `items` 配置面板，并通过 `defaultActiveKey` 指定默认展开项。

<CollapseBasicDemo />

## Accordion

开启 `accordion` 后，同一时间只允许展开一个面板。默认情况下，当前展开面板不能再次点击关闭；需要允许全部收起时传入 `collapsible`。

<CollapseAccordionDemo />

## Multiple

默认模式允许多个面板同时展开，适合详情页中的多段信息查看。

<CollapseMultipleDemo />

## Controlled

通过 `activeKey` 和 `onChange` 接管状态，适合把展开状态同步到筛选条件、URL、埋点或外部按钮。

<CollapseControlledDemo />

## Items API

`items` 支持 `extra`、`disabled`、`showArrow`、`bodyProps` 等常用配置，适合接口数据或配置数组驱动的场景。

<CollapseItemsDemo />

## Compound API

组合式 API 适合复杂结构：可以明确控制标题层级、触发器、内容和操作区。

<CollapseCompoundDemo />

## Extra Actions

`Collapse.Actions` 会阻止点击事件继续触发展开收起，适合放置预览、下载、编辑等按钮。

<CollapseActionsDemo />

## Lazy / Destroy

复杂内容建议启用 `lazyMount` 或 `destroyOnHidden`，减少初始渲染成本。

<CollapseLazyDemo />

## Variants / Sizes

通过 `variant` 和 `size` 调整密度与视觉层级。

<CollapseVariantsDemo />

## SX Custom

`sx` 可用于容器级样式，`bodyProps`、`itemProps`、`triggerProps` 等 slot props 可用于局部样式。

<CollapseSxDemo />

## Nested / FAQ

嵌套 Collapse 适合 FAQ、帮助中心或分层配置。内层建议使用 `variant="plain"` 和较小尺寸，避免视觉层级过重。

<CollapseNestedDemo />

## 常见场景

### 详情页信息分组

把订单、客户、物流、审批、附件等信息拆成面板，降低页面首屏复杂度。

### FAQ / 帮助中心

使用 `accordion collapsible`，让用户一次聚焦一个问题，同时允许全部收起。

### 设置页高级配置

把低频、高风险或高级配置折叠，配合 `extra` 放置状态标识或快捷操作。

### 大内容性能优化

大表格、图表、日志明细等内容优先使用 `lazyMount`；如果关闭后不需要保留内部状态，使用 `destroyOnHidden`。

## Usage

```tsx
import { Collapse } from "@ldkj/web-ui";

export function Example() {
  return (
    <Collapse
      accordion
      collapsible
      defaultActiveKey="base"
      items={[
        {
          key: "base",
          label: "基础信息",
          children: "展示基础资料、联系人和业务主体。",
        },
        {
          key: "risk",
          label: "风控信息",
          extra: <span className="text-xs text-green-700">已通过</span>,
          children: "展示风控等级、命中规则和复核建议。",
        },
      ]}
    />
  );
}
```

组合式写法：

```tsx
import { Collapse } from "@ldkj/web-ui";

export function Example() {
  return (
    <Collapse defaultActiveKey="log">
      <Collapse.Item value="log">
        <Collapse.Header headingLevel={3}>
          <Collapse.Trigger>操作记录</Collapse.Trigger>
          <Collapse.Actions>
            <button type="button">导出</button>
          </Collapse.Actions>
        </Collapse.Header>
        <Collapse.Content>
          最近一次操作由系统管理员在 2026-06-09 10:30 完成。
        </Collapse.Content>
      </Collapse.Item>
    </Collapse>
  );
}
```

## API

### Collapse

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `items` | 数据式面板配置 | `CollapseItemConfig[]` | - |
| `activeKey` | 当前展开项，受控使用 | `CollapseKey \| CollapseKey[] \| null` | - |
| `defaultActiveKey` | 默认展开项 | `CollapseKey \| CollapseKey[] \| null` | - |
| `onChange` | 展开项变化回调 | `(activeKey) => void` | - |
| `accordion` | 是否启用手风琴模式 | `boolean` | `false` |
| `multiple` | 是否允许多个面板同时展开；`accordion` 优先 | `boolean` | `true` |
| `collapsible` | 单开模式下已展开面板是否可再次点击关闭 | `boolean` | `!accordion` |
| `disabled` | 禁用整个 Collapse | `boolean` | `false` |
| `bordered` | 是否显示外边框与分割线 | `boolean` | `true` |
| `size` | 面板尺寸 | `"sm" \| "md" \| "lg"` | `"md"` |
| `variant` | 视觉变体 | `"outlined" \| "filled" \| "plain" \| "ghost"` | `"outlined"` |
| `expandIconPosition` | 展开图标位置 | `"start" \| "end"` | `"end"` |
| `expandIcon` | 自定义展开图标 | `(props) => React.ReactNode` | - |
| `lazyMount` | 内容首次展开时才挂载 | `boolean` | `false` |
| `destroyOnHidden` | 面板关闭时卸载内容 | `boolean` | `false` |
| `forceRender` | 始终挂载内容 | `boolean` | `false` |
| `itemProps` | 数据式 API 下的默认 Item props | `CollapseItemProps` | - |
| `headerProps` | 数据式 API 下的默认 Header props | `CollapseHeaderProps` | - |
| `triggerProps` | 数据式 API 下的默认 Trigger props | `CollapseTriggerProps` | - |
| `contentProps` | 数据式 API 下的默认 Content props | `CollapseContentProps` | - |
| `bodyProps` | 数据式 API 下的默认内容 body props | `StyledDivProps` | - |
| `className` | 追加类名 | `string` | - |
| `class` | 历史类名别名 | `string` | - |
| `style` | 内联样式 | `React.CSSProperties` | - |
| `sx` | CSS-in-JS 样式入口 | `SxProps` | - |
| `children` | 组合式子组件 | `React.ReactNode` | - |
| `...rest` | 原生 div 属性透传 | `React.HTMLAttributes<HTMLDivElement>` | - |

### CollapseItemConfig

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `key` | 面板唯一值 | `string \| number` | - |
| `label` | 面板标题 | `React.ReactNode` | - |
| `children` | 面板内容 | `React.ReactNode` | - |
| `disabled` | 禁用当前面板 | `boolean` | `false` |
| `collapsible` | 当前面板是否允许触发展开收起 | `boolean` | - |
| `extra` | 标题右侧额外内容 | `React.ReactNode` | - |
| `forceRender` | 当前面板始终挂载 | `boolean` | - |
| `lazyMount` | 当前面板首次展开时才挂载 | `boolean` | - |
| `destroyOnHidden` | 当前面板关闭时卸载 | `boolean` | - |
| `showArrow` | 是否显示展开图标 | `boolean` | `true` |
| `itemProps` | 当前面板 Item props | `CollapseItemProps` | - |
| `headerProps` | 当前面板 Header props | `CollapseHeaderProps` | - |
| `triggerProps` | 当前面板 Trigger props | `CollapseTriggerProps` | - |
| `contentProps` | 当前面板 Content props | `CollapseContentProps` | - |
| `bodyProps` | 当前面板内容 body props | `StyledDivProps` | - |

### Compound API

| 组件 | 说明 |
| --- | --- |
| `Collapse.Item` | 单个面板容器，必须设置 `value` |
| `Collapse.Header` | 标题行容器，可用 `headingLevel` 设置标题层级 |
| `Collapse.Trigger` | 展开收起按钮，自动绑定 ARIA 与键盘行为 |
| `Collapse.Content` | 内容区域，自动绑定 `role="region"` |
| `Collapse.Actions` | 标题操作区，点击不会触发展开收起 |

## 行为规则 / 优先级

1. `activeKey` 存在时组件进入受控模式，内部不再自行保存展开状态。
2. `accordion` 优先于 `multiple`；二者同时传入时按单开处理。
3. `collapsible` 未显式传入时，普通多开模式默认可关闭，`accordion` 模式默认不可关闭。
4. `forceRender` 优先级最高；传入后内容始终挂载。
5. `destroyOnHidden` 会在关闭时卸载内容；它优先于 `lazyMount`。
6. `lazyMount` 只影响首次挂载；首次展开后内容会保留，除非同时使用 `destroyOnHidden`。
7. `disabled` 会阻止触发器获得焦点和切换状态。
8. `Collapse.Actions` 内部点击不会触发展开收起。

## A11Y

- `Collapse.Trigger` 使用原生 `button`，自动设置 `aria-expanded` 和 `aria-controls`。
- `Collapse.Content` 使用 `role="region"`，并通过 `aria-labelledby` 关联触发器。
- 触发器支持 `Enter` / `Space` 原生按钮行为。
- 触发器支持 `ArrowUp` / `ArrowDown` / `ArrowLeft` / `ArrowRight` / `Home` / `End` 在面板标题间移动焦点。
- 使用组合式 API 时，建议通过 `headingLevel` 让标题层级符合页面结构。

## Notes

- 面板内容里包含表单、表格、图表等重组件时，优先考虑 `lazyMount`。
- 需要关闭后重置内部状态时使用 `destroyOnHidden`。
- FAQ 和帮助中心推荐 `accordion collapsible`。
- 嵌套 Collapse 时，内层建议使用 `variant="plain"`、`bordered={false}` 或 `size="sm"`。
- `items` 更适合配置驱动；复杂布局、额外操作和自定义标题结构优先使用组合式 API。
