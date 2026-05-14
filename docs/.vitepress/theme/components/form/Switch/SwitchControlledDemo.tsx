import * as React from "react";
import { Switch } from "@/components/form/switch";
import CodeView from "../../CodeView";

const code = `import * as React from "react";
import { Switch } from "@ldkj/web-ui";

export function Example() {
  const [enabled, setEnabled] = React.useState(true);

  return (
    <div className="flex items-center gap-3">
      <Switch
        checked={enabled}
        onCheckedChange={setEnabled}
        aria-label="自动同步"
      />
      <span className="text-sm text-slate-700">
        自动同步：{enabled ? "已开启" : "已关闭"}
      </span>
    </div>
  );
}`;

function Example() {
  const [enabled, setEnabled] = React.useState(true);

  return (
    <div className="flex items-center gap-3">
      <Switch
        checked={enabled}
        onCheckedChange={setEnabled}
        aria-label="自动同步"
      />
      <span className="text-sm text-slate-700">
        自动同步：{enabled ? "已开启" : "已关闭"}
      </span>
    </div>
  );
}

export default function SwitchControlledDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
