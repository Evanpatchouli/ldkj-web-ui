import { Button, Header, Icon, Navigator } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const items = [
  { key: "home", label: "首页", href: "#home" },
  {
    key: "products",
    label: "产品",
    children: [
      {
        key: "console",
        label: "管理控制台",
        description: "统一管理业务资源和权限",
        href: "#console",
        icon: "dashboard",
      },
      {
        key: "analytics",
        label: "数据分析",
        description: "沉淀指标、看板和异常洞察",
        href: "#analytics",
        icon: "equalizer",
      },
    ],
  },
  { key: "docs", label: "文档", href: "#docs" },
];

const Example = () => (
  <Header
    maxWidth={1040}
    brand={
      <span className="flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-slate-900 text-xs font-semibold text-white">
          N
        </span>
        Navigator
      </span>
    }
    nav={<Navigator defaultActiveKey="home" items={items} />}
    actions={
      <>
        <Button type="button" variant="ghost" size="icon" aria-label="搜索">
          <Icon name="search" size={18} />
        </Button>
        <Button type="button" size="sm">
          登录
        </Button>
      </>
    }
  />
);

const code = `import { Button, Header, Icon, Navigator } from "@ldkj/web-ui";

const items = [
  { key: "home", label: "首页", href: "#home" },
  {
    key: "products",
    label: "产品",
    children: [
      {
        key: "console",
        label: "管理控制台",
        description: "统一管理业务资源和权限",
        href: "#console",
        icon: "dashboard",
      },
      {
        key: "analytics",
        label: "数据分析",
        description: "沉淀指标、看板和异常洞察",
        href: "#analytics",
        icon: "equalizer",
      },
    ],
  },
  { key: "docs", label: "文档", href: "#docs" },
];

const Example = () => (
  <Header
    maxWidth={1040}
    brand={<span className="font-semibold">Navigator</span>}
    nav={<Navigator defaultActiveKey="home" items={items} />}
    actions={
      <>
        <Button type="button" variant="ghost" size="icon" aria-label="搜索">
          <Icon name="search" size={18} />
        </Button>
        <Button type="button" size="sm">
          登录
        </Button>
      </>
    }
  />
);`;

export default function NavigatorHeaderDemo() {
  return (
    <CodeView code={code} allowOverflow>
      <Example />
    </CodeView>
  );
}
