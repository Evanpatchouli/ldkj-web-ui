import { Splitter } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const Example = () => (
  <Splitter orientation="vertical" className="h-[300px] rounded-lg border border-slate-200 bg-white">
    <Splitter.Panel defaultSize={110} min={80} max="55%">
      <div className="grid h-full grid-cols-3 gap-3 p-4">
        {["销售额", "订单", "转化率"].map((item, index) => (
          <div key={item} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
            <div className="text-xs text-slate-500">{item}</div>
            <div className="mt-2 text-lg font-semibold text-slate-900">
              {index === 0 ? "¥128k" : index === 1 ? "3,420" : "18.6%"}
            </div>
          </div>
        ))}
      </div>
    </Splitter.Panel>
    <Splitter.Panel min={120}>
      <div className="h-full p-4">
        <div className="mb-3 text-sm font-medium text-slate-900">明细区域</div>
        <div className="grid gap-2 text-sm text-slate-600">
          <div className="rounded border border-slate-200 px-3 py-2">华东区域 · GMV 环比 +12%</div>
          <div className="rounded border border-slate-200 px-3 py-2">新增会员 · 8,240 人</div>
          <div className="rounded border border-slate-200 px-3 py-2">复购率 · 42.3%</div>
        </div>
      </div>
    </Splitter.Panel>
  </Splitter>
);

const code = `import { Splitter } from "@ldkj/web-ui";

const Example = () => (
  <Splitter orientation="vertical" className="h-[300px] rounded-lg border border-slate-200 bg-white">
    <Splitter.Panel defaultSize={110} min={80} max="55%">
      <div className="grid h-full grid-cols-3 gap-3 p-4">
        {["销售额", "订单", "转化率"].map((item, index) => (
          <div key={item} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
            <div className="text-xs text-slate-500">{item}</div>
            <div className="mt-2 text-lg font-semibold text-slate-900">
              {index === 0 ? "¥128k" : index === 1 ? "3,420" : "18.6%"}
            </div>
          </div>
        ))}
      </div>
    </Splitter.Panel>
    <Splitter.Panel min={120}>
      <div className="h-full p-4">
        <div className="mb-3 text-sm font-medium text-slate-900">明细区域</div>
        <div className="grid gap-2 text-sm text-slate-600">
          <div className="rounded border border-slate-200 px-3 py-2">华东区域 · GMV 环比 +12%</div>
          <div className="rounded border border-slate-200 px-3 py-2">新增会员 · 8,240 人</div>
          <div className="rounded border border-slate-200 px-3 py-2">复购率 · 42.3%</div>
        </div>
      </div>
    </Splitter.Panel>
  </Splitter>
);`;

export default function SplitterVerticalDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
