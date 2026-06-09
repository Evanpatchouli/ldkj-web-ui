import { useState } from "react";
import CodeView from "../../CodeView";
import { Button, Collapse, type CollapseActiveKey } from "@ldkj/web-ui";

const code = `import { useState } from "react";
import { Button, Collapse, type CollapseActiveKey } from "@ldkj/web-ui";

export function Example() {
  const [activeKey, setActiveKey] = useState<CollapseActiveKey>("todo");

  return (
    <div className="grid gap-3">
      <div className="flex flex-wrap gap-2">
        <Button size="sm" variant="minor" onClick={() => setActiveKey("todo")}>
          待处理
        </Button>
        <Button size="sm" variant="minor" onClick={() => setActiveKey("done")}>
          已完成
        </Button>
        <Button size="sm" variant="minor" onClick={() => setActiveKey(null)}>
          收起
        </Button>
      </div>
      <Collapse
        accordion
        collapsible
        activeKey={activeKey}
        onChange={setActiveKey}
        items={[
          {
            key: "todo",
            label: "待处理事项",
            children: "还有 6 条售后单需要在今天 18:00 前处理。",
          },
          {
            key: "done",
            label: "已完成事项",
            children: "今日已完成 18 条售后单和 4 条退款审核。",
          },
        ]}
      />
    </div>
  );
}`;

function Example() {
  const [activeKey, setActiveKey] = useState<CollapseActiveKey>("todo");

  return (
    <div className="grid gap-3">
      <div className="flex flex-wrap gap-2">
        <Button size="sm" variant="minor" onClick={() => setActiveKey("todo")}>
          待处理
        </Button>
        <Button size="sm" variant="minor" onClick={() => setActiveKey("done")}>
          已完成
        </Button>
        <Button size="sm" variant="minor" onClick={() => setActiveKey(null)}>
          收起
        </Button>
      </div>
      <Collapse
        accordion
        collapsible
        activeKey={activeKey}
        onChange={setActiveKey}
        items={[
          {
            key: "todo",
            label: "待处理事项",
            children: "还有 6 条售后单需要在今天 18:00 前处理。",
          },
          {
            key: "done",
            label: "已完成事项",
            children: "今日已完成 18 条售后单和 4 条退款审核。",
          },
        ]}
      />
    </div>
  );
}

export default function CollapseControlledDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}

