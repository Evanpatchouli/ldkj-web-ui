import { Button, Header, Icon } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const Example = () => (
  <div className="mx-auto max-w-sm overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
    <Header
      safeArea
      fluid
      size="sm"
      bordered
      brand={<span className="font-semibold">移动工作台</span>}
      start={
        <Button type="button" variant="ghost" size="icon" aria-label="菜单">
          <Icon name="menu" size={18} />
        </Button>
      }
      actions={
        <Button type="button" variant="ghost" size="icon" aria-label="通知">
          <Icon name="notifications" size={18} />
        </Button>
      }
    />
    <div className="grid gap-3 p-4 text-sm text-slate-600">
      <div className="rounded-lg bg-slate-50 p-3">待办审批 12 项</div>
      <div className="rounded-lg bg-slate-50 p-3">今日巡检 4 个站点</div>
    </div>
  </div>
);

const code = `import { Button, Header, Icon } from "@ldkj/web-ui";

const Example = () => (
  <div className="mx-auto max-w-sm overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
    <Header
      safeArea
      fluid
      size="sm"
      bordered
      brand={<span className="font-semibold">移动工作台</span>}
      start={
        <Button type="button" variant="ghost" size="icon" aria-label="菜单">
          <Icon name="menu" size={18} />
        </Button>
      }
      actions={
        <Button type="button" variant="ghost" size="icon" aria-label="通知">
          <Icon name="notifications" size={18} />
        </Button>
      }
    />
    <div className="grid gap-3 p-4 text-sm text-slate-600">
      <div className="rounded-lg bg-slate-50 p-3">待办审批 12 项</div>
      <div className="rounded-lg bg-slate-50 p-3">今日巡检 4 个站点</div>
    </div>
  </div>
);`;

export default function HeaderResponsiveDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
