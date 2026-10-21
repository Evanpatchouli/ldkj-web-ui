import * as React from "react";
import { Navigator } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const items = [
  { key: "pipeline", label: "流水线", href: "#pipeline" },
  { key: "release", label: "发布单", href: "#release" },
  { key: "audit", label: "审计", href: "#audit" },
];

const Example = () => {
  const [activeKey, setActiveKey] = React.useState("release");

  return (
    <div className="grid gap-3">
      <Navigator
        activeKey={activeKey}
        onActiveKeyChange={setActiveKey}
        items={items}
      />
      <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600">
        当前导航：{activeKey}
      </div>
    </div>
  );
};

const code = `import * as React from "react";
import { Navigator } from "@ldkj/web-ui";

const items = [
  { key: "pipeline", label: "流水线", href: "#pipeline" },
  { key: "release", label: "发布单", href: "#release" },
  { key: "audit", label: "审计", href: "#audit" },
];

const Example = () => {
  const [activeKey, setActiveKey] = React.useState("release");

  return (
    <Navigator
      activeKey={activeKey}
      onActiveKeyChange={setActiveKey}
      items={items}
    />
  );
};`;

export default function NavigatorControlledDemo() {
  return (
    <CodeView code={code} allowOverflow>
      <Example />
    </CodeView>
  );
}
