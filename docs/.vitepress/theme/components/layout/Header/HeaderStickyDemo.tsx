import { Button, Header } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const Example = () => (
  <div className="h-56 overflow-auto rounded-lg border border-slate-200 bg-slate-50">
    <Header
      sticky
      maxWidth="100%"
      brand={<span className="font-semibold">数据看板</span>}
      nav={
        <>
          <a className="rounded-md px-3 py-1.5 text-sm hover:bg-slate-100" href="#">
            今日
          </a>
          <a className="rounded-md px-3 py-1.5 text-sm hover:bg-slate-100" href="#">
            本周
          </a>
        </>
      }
      actions={
        <Button type="button" size="sm">
          刷新
        </Button>
      }
    />
    <div className="grid gap-3 p-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          className="rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-600"
          key={index}
        >
          指标卡片 {index + 1}
        </div>
      ))}
    </div>
  </div>
);

const code = `import { Button, Header } from "@ldkj/web-ui";

const Example = () => (
  <div className="h-56 overflow-auto rounded-lg border border-slate-200 bg-slate-50">
    <Header
      sticky
      maxWidth="100%"
      brand={<span className="font-semibold">数据看板</span>}
      nav={
        <>
          <a className="rounded-md px-3 py-1.5 text-sm hover:bg-slate-100" href="#">
            今日
          </a>
          <a className="rounded-md px-3 py-1.5 text-sm hover:bg-slate-100" href="#">
            本周
          </a>
        </>
      }
      actions={
        <Button type="button" size="sm">
          刷新
        </Button>
      }
    />
    <div className="grid gap-3 p-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          className="rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-600"
          key={index}
        >
          指标卡片 {index + 1}
        </div>
      ))}
    </div>
  </div>
);`;

export default function HeaderStickyDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
