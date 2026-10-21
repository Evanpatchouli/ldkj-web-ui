# MobilePage

`RootPage`、`SubPage` 和 `TabRootPage` 是移动端页面壳组件，适合 H5 页面、嵌入式活动页和轻量业务应用。它们从业务项目迁移而来，但在本库中不绑定 Mantine、Tabler、react-router 或业务版权组件。

## Basic

`RootPage` 提供顶部标题栏、内容区、可选底部安全区、版权插槽和下拉刷新能力。

<MobilePageBasicDemo />

## 常见场景

### 子页面返回

`SubPage` 在 `RootPage` 基础上增加返回按钮，返回动作通过 `onBack` 交给业务侧处理。

<MobilePageSubDemo />

### 下拉刷新

传入 `onPullRefresh` 后，内容区在滚动顶部支持移动端下拉刷新；嵌入式页面也可以从页头向下拖动触发。回调 Promise 结束后自动退出刷新态。

<MobilePageRefreshDemo />

### 底部导航页

`TabRootPage` 组合 `RootPage` 和底部安全区导航，适合首页类多 Tab 页面。

<MobilePageTabsDemo />

## Usage

```tsx
import { RootPage, SubPage, TabRootPage } from "@ldkj/web-ui";

export function Example() {
  return (
    <SubPage
      title="订单详情"
      onBack={(target) => {
        if (target === "$prev") {
          window.history.back();
        }
      }}
      onPullRefresh={() => fetch("/api/orders/refresh")}
      contentProps={{ style: { padding: 16, gap: 12 } }}
    >
      <section>订单内容</section>
    </SubPage>
  );
}
```

## API

### RootPage

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `title` | 标题内容，设为 `false` 时不渲染头部 | `React.ReactNode \| false` | - |
| `documentTitle` | 写入 `document.title` 的页面标题 | `string` | - |
| `headerLeft` | 头部左侧插槽 | `React.ReactNode` | - |
| `headerRight` | 头部右侧插槽 | `React.ReactNode` | - |
| `onPullRefresh` | 下拉刷新回调，支持 Promise | `() => void \| Promise<void>` | - |
| `refreshing` | 受控刷新态，用于外部请求或桌面 Demo 展示刷新条 | `boolean` | `false` |
| `pullRefreshLabels` | 自定义下拉、释放、刷新中文案 | `PagePullRefreshLabels` | - |
| `contentProps` | 内容区原生属性透传 | `div props` | - |
| `footer` | 根节点底部插槽 | `React.ReactNode` | - |
| `copyright` | 版权区域；`true` 使用默认文案，也可传自定义节点 | `React.ReactNode \| boolean` | - |
| `safeAreaBottom` | 是否在尾部补底部安全区 | `boolean` | `false` |
| `headerSticky` | 头部是否吸顶 | `boolean` | `true` |
| `className` / `style` | 根节点样式 | `string` / `React.CSSProperties` | - |

### SubPage

`SubPage` 继承 `RootPage`，支持 `documentTitle`、`onPullRefresh`、`refreshing`、`pullRefreshLabels`、`contentProps`、`copyright` 等页面壳属性，并增加返回相关属性。

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `back` | 返回目标。`false` 隐藏默认返回按钮 | `"$parent" \| "$prev" \| string \| false` | `"$parent"` |
| `backLabel` | 返回按钮可访问名称 | `string` | `"返回"` |
| `backIcon` | 自定义返回图标 | `React.ReactNode` | - |
| `onBack` | 点击返回按钮回调 | `(target, event) => void` | - |
| `headerLeft` | 自定义左侧内容；存在时覆盖默认返回按钮 | `React.ReactNode` | - |

### TabRootPage

`TabRootPage` 继承 `RootPage`，并增加底部 Tab 属性。

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `tabs` | 底部导航配置 | `PageTabDefinition[]` | - |
| `tabId` | 当前激活 Tab id | `string` | - |
| `onTabChange` | 点击 Tab 回调 | `(tabId, tab) => void` | - |
| `tabContentId` | 内容区 id | `string` | - |
| `tabContentProps` | Tab 内容区属性透传 | `div props` | - |
| `tabBarProps` | 底部导航容器属性透传 | `div props` | - |
| `copyright` | 内容区尾部版权区域 | `React.ReactNode \| boolean` | - |

### PageTabDefinition

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `id` | Tab 唯一标识 | `string` | - |
| `title` | Tab 文案 | `React.ReactNode` | - |
| `icon` | Tab 图标或按激活态渲染的函数 | `React.ReactNode \| (active) => React.ReactNode` | - |
| `route` | 业务路由标识，仅透传给回调中的 tab 对象 | `string` | - |
| `disabled` | 是否禁用 | `boolean` | `false` |

## 行为规则 / 优先级

- `RootPage` 只负责页面壳结构，不内置业务路由、接口请求或版权实现。
- `title=false` 时不渲染头部；否则头部左右插槽各保留最小宽度，标题居中并截断。
- 下拉刷新仅在内容区滚动顶部生效；可从内容区或页头向下拖动触发，`onPullRefresh` 返回 Promise 时，内部刷新态持续到 Promise settled。
- `refreshing` 可由外部受控显示刷新条，适合按钮刷新、接口轮询或文档演示；它不会自动触发 `onPullRefresh`。
- `SubPage` 的 `headerLeft` 优先级高于默认返回按钮；`back=false` 会隐藏默认返回按钮。
- `TabRootPage` 的 Tab 点击只触发 `onTabChange`，不会主动读取 `route` 或执行导航。

## Notes

- 业务侧使用 react-router 时，建议在 `onBack` 和 `onTabChange` 中调用 `navigate`，不要把路由实例传入组件库。
- 图标建议传入本项目已有 Icon 组件、SVG 组件或业务图标节点。
- 页面根节点默认 `min-height: 100dvh`，嵌入文档或弹窗时可通过 `style` 覆盖高度。
- 下拉刷新依赖触摸事件，桌面浏览器可用移动设备模拟模式验证。
