import CodeView from "../../CodeView";
import { Loading } from "@ldkj/web-ui";

const code = `import { Loading } from "@ldkj/web-ui";

const Example = () => (
  <Loading variant="overlay" text="正在刷新订单..." spinning>
    <div className="grid gap-3 rounded-md border border-slate-200 bg-white p-4">
      <div className="text-sm font-medium text-slate-900">订单列表</div>
      <div className="h-3 w-3/4 rounded bg-slate-100" />
      <div className="h-3 w-2/3 rounded bg-slate-100" />
      <div className="h-3 w-5/6 rounded bg-slate-100" />
    </div>
  </Loading>
);`;

const Example = () => (
  <Loading variant="overlay" text="正在刷新订单..." spinning>
    <div className="grid gap-3 rounded-md border border-slate-200 bg-white p-4">
      <div className="text-sm font-medium text-slate-900">订单列表</div>
      <div className="h-3 w-3/4 rounded bg-slate-100" />
      <div className="h-3 w-2/3 rounded bg-slate-100" />
      <div className="h-3 w-5/6 rounded bg-slate-100" />
    </div>
  </Loading>
);

export default function LoadingOverlayDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
