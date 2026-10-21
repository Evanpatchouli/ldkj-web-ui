import { useState } from "react";
import { Button, Splitter } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const Example = () => {
  const [sizes, setSizes] = useState([220, 360]);

  return (
    <div className="grid gap-3">
      <div className="flex items-center justify-between">
        <div className="text-sm text-slate-600">左侧 {Math.round(sizes[0])}px</div>
        <Button size="sm" variant="outline" onClick={() => setSizes([220, 360])}>
          重置
        </Button>
      </div>
      <Splitter
        className="h-[220px] rounded-lg border border-slate-200 bg-white"
        onResize={setSizes}
        onDraggerDoubleClick={() => setSizes([220, 360])}
      >
        <Splitter.Panel size={sizes[0]} min={160} max={360}>
          <div className="h-full p-4 text-sm text-slate-600">受控面板通过 size + onResize 管理尺寸。</div>
        </Splitter.Panel>
        <Splitter.Panel size={sizes[1]} min={240}>
          <div className="h-full bg-slate-50 p-4 text-sm text-slate-600">
            双击拖拽条或点击按钮可恢复默认尺寸。
          </div>
        </Splitter.Panel>
      </Splitter>
    </div>
  );
};

const code = `import { useState } from "react";
import { Button, Splitter } from "@ldkj/web-ui";

const Example = () => {
  const [sizes, setSizes] = useState([220, 360]);

  return (
    <div className="grid gap-3">
      <div className="flex items-center justify-between">
        <div className="text-sm text-slate-600">左侧 {Math.round(sizes[0])}px</div>
        <Button size="sm" variant="outline" onClick={() => setSizes([220, 360])}>
          重置
        </Button>
      </div>
      <Splitter
        className="h-[220px] rounded-lg border border-slate-200 bg-white"
        onResize={setSizes}
        onDraggerDoubleClick={() => setSizes([220, 360])}
      >
        <Splitter.Panel size={sizes[0]} min={160} max={360}>
          <div className="h-full p-4 text-sm text-slate-600">受控面板通过 size + onResize 管理尺寸。</div>
        </Splitter.Panel>
        <Splitter.Panel size={sizes[1]} min={240}>
          <div className="h-full bg-slate-50 p-4 text-sm text-slate-600">
            双击拖拽条或点击按钮可恢复默认尺寸。
          </div>
        </Splitter.Panel>
      </Splitter>
    </div>
  );
};`;

export default function SplitterControlledDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
