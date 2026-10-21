import { Splitter } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const Example = () => (
  <Splitter className="h-[240px] rounded-lg border border-slate-200 bg-white">
    <Splitter.Panel defaultSize="32%" min={160} max="55%">
      <div className="flex h-full flex-col gap-3 p-4">
        <div>
          <div className="text-sm font-medium text-slate-900">项目列表</div>
          <div className="text-xs text-slate-500">按业务线筛选工作区</div>
        </div>
        {["交易中台", "会员增长", "数据看板"].map((item) => (
          <div key={item} className="rounded border border-slate-200 px-3 py-2 text-sm text-slate-700">
            {item}
          </div>
        ))}
      </div>
    </Splitter.Panel>
    <Splitter.Panel min={220}>
      <div className="grid h-full grid-rows-[auto_1fr] gap-3 p-4">
        <div>
          <div className="text-sm font-medium text-slate-900">当前工作区</div>
          <div className="text-xs text-slate-500">拖拽中间控制条调整左右区域</div>
        </div>
        <div className="rounded-lg bg-slate-50 p-4 text-sm leading-6 text-slate-600">
          Splitter 适合文件管理、详情编辑、图表分析等需要用户临时调整空间的布局。
        </div>
      </div>
    </Splitter.Panel>
  </Splitter>
);

const code = `import { Splitter } from "@ldkj/web-ui";

const Example = () => (
  <Splitter className="h-[240px] rounded-lg border border-slate-200 bg-white">
    <Splitter.Panel defaultSize="32%" min={160} max="55%">
      <div className="flex h-full flex-col gap-3 p-4">
        <div>
          <div className="text-sm font-medium text-slate-900">项目列表</div>
          <div className="text-xs text-slate-500">按业务线筛选工作区</div>
        </div>
        {["交易中台", "会员增长", "数据看板"].map((item) => (
          <div key={item} className="rounded border border-slate-200 px-3 py-2 text-sm text-slate-700">
            {item}
          </div>
        ))}
      </div>
    </Splitter.Panel>
    <Splitter.Panel min={220}>
      <div className="grid h-full grid-rows-[auto_1fr] gap-3 p-4">
        <div>
          <div className="text-sm font-medium text-slate-900">当前工作区</div>
          <div className="text-xs text-slate-500">拖拽中间控制条调整左右区域</div>
        </div>
        <div className="rounded-lg bg-slate-50 p-4 text-sm leading-6 text-slate-600">
          Splitter 适合文件管理、详情编辑、图表分析等需要用户临时调整空间的布局。
        </div>
      </div>
    </Splitter.Panel>
  </Splitter>
);`;

export default function SplitterBasicDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
