import { Splitter } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const Example = () => (
  <Splitter
    lazy
    className="h-[320px] rounded-lg border border-slate-200 bg-white"
    classNames={{ dragger: "bg-slate-50/70" }}
    styles={{ panel: { backgroundClip: "padding-box" } }}
  >
    <Splitter.Panel defaultSize={180} min={120} collapsible={{ end: true, showCollapsibleIcon: true }}>
      <div className="flex h-full flex-col gap-2 border-r border-slate-100 p-4">
        <div className="text-sm font-medium text-slate-900">资源树</div>
        {["总览", "交易", "会员", "风控"].map((item) => (
          <div key={item} className="rounded px-3 py-2 text-sm text-slate-600 hover:bg-slate-50">
            {item}
          </div>
        ))}
      </div>
    </Splitter.Panel>
    <Splitter.Panel min={260}>
      <Splitter orientation="vertical">
        <Splitter.Panel defaultSize="58%" min={140}>
          <div className="h-full p-4">
            <div className="mb-3 text-sm font-medium text-slate-900">趋势图</div>
            <div className="h-[calc(100%-28px)] rounded-lg bg-gradient-to-br from-slate-100 to-white" />
          </div>
        </Splitter.Panel>
        <Splitter.Panel min={100} collapsible={{ start: true, showCollapsibleIcon: "auto" }}>
          <div className="grid h-full grid-cols-3 gap-3 bg-slate-50 p-4">
            {["访问", "成交", "退款"].map((item) => (
              <div key={item} className="rounded-lg border border-slate-200 bg-white p-3 text-sm text-slate-600">
                {item}
              </div>
            ))}
          </div>
        </Splitter.Panel>
      </Splitter>
    </Splitter.Panel>
  </Splitter>
);

const code = `import { Splitter } from "@ldkj/web-ui";

const Example = () => (
  <Splitter
    lazy
    className="h-[320px] rounded-lg border border-slate-200 bg-white"
    classNames={{ dragger: "bg-slate-50/70" }}
    styles={{ panel: { backgroundClip: "padding-box" } }}
  >
    <Splitter.Panel defaultSize={180} min={120} collapsible={{ end: true, showCollapsibleIcon: true }}>
      <div className="flex h-full flex-col gap-2 border-r border-slate-100 p-4">
        <div className="text-sm font-medium text-slate-900">资源树</div>
        {["总览", "交易", "会员", "风控"].map((item) => (
          <div key={item} className="rounded px-3 py-2 text-sm text-slate-600 hover:bg-slate-50">
            {item}
          </div>
        ))}
      </div>
    </Splitter.Panel>
    <Splitter.Panel min={260}>
      <Splitter orientation="vertical">
        <Splitter.Panel defaultSize="58%" min={140}>
          <div className="h-full p-4">
            <div className="mb-3 text-sm font-medium text-slate-900">趋势图</div>
            <div className="h-[calc(100%-28px)] rounded-lg bg-gradient-to-br from-slate-100 to-white" />
          </div>
        </Splitter.Panel>
        <Splitter.Panel min={100} collapsible={{ start: true, showCollapsibleIcon: "auto" }}>
          <div className="grid h-full grid-cols-3 gap-3 bg-slate-50 p-4">
            {["访问", "成交", "退款"].map((item) => (
              <div key={item} className="rounded-lg border border-slate-200 bg-white p-3 text-sm text-slate-600">
                {item}
              </div>
            ))}
          </div>
        </Splitter.Panel>
      </Splitter>
    </Splitter.Panel>
  </Splitter>
);`;

export default function SplitterComplexDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
