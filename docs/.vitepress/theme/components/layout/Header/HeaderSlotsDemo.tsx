import { Button, Header, Icon } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const Example = () => (
  <Header
    variant="subtle"
    size="lg"
    maxWidth={960}
    start={
      <Button type="button" variant="ghost" size="icon" aria-label="打开菜单">
        <Icon name="menu" size={18} />
      </Button>
    }
    brand={<span className="font-semibold">订单中心</span>}
    nav={
      <div className="flex items-center gap-1 rounded-lg bg-white p-1 shadow-sm">
        <a className="rounded-md bg-blue-600 px-3 py-1.5 text-sm !text-white" href="#">
          待处理
        </a>
        <a className="rounded-md px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100" href="#">
          售后
        </a>
        <a className="rounded-md px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100" href="#">
          统计
        </a>
      </div>
    }
    actions={
      <>
        <Button type="button" variant="outline" size="sm">
          导出
        </Button>
        <Button type="button" size="sm">
          创建订单
        </Button>
      </>
    }
    end={<span className="text-xs text-slate-500">今日 128 单</span>}
  />
);

const code = `import { Button, Header, Icon } from "@ldkj/web-ui";

const Example = () => (
  <Header
    variant="subtle"
    size="lg"
    maxWidth={960}
    start={
      <Button type="button" variant="ghost" size="icon" aria-label="打开菜单">
        <Icon name="menu" size={18} />
      </Button>
    }
    brand={<span className="font-semibold">订单中心</span>}
    nav={
      <div className="flex items-center gap-1 rounded-lg bg-white p-1 shadow-sm">
        <a className="rounded-md bg-blue-600 px-3 py-1.5 text-sm !text-white" href="#">
          待处理
        </a>
        <a className="rounded-md px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100" href="#">
          售后
        </a>
        <a className="rounded-md px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100" href="#">
          统计
        </a>
      </div>
    }
    actions={
      <>
        <Button type="button" variant="outline" size="sm">
          导出
        </Button>
        <Button type="button" size="sm">
          创建订单
        </Button>
      </>
    }
    end={<span className="text-xs text-slate-500">今日 128 单</span>}
  />
);`;

export default function HeaderSlotsDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
