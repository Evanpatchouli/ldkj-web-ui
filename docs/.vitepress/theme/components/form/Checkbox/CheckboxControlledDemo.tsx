import * as React from "react";
import { Checkbox } from "@/components/form/checkbox";
import CodeView from "../../CodeView";

const code = `import * as React from "react";
import { Checkbox } from "@ldkj/web-ui";

export function Example() {
  const [checked, setChecked] = React.useState(false);

  return (
    <div className="flex items-center gap-3">
      <Checkbox
        checked={checked}
        onCheckedChange={(value) => setChecked(value === true)}
      />
      <span className="text-sm text-slate-700">
        当前状态：{checked ? "已启用" : "未启用"}
      </span>
    </div>
  );
}`;

function Example() {
  const [checked, setChecked] = React.useState(false);

  return (
    <div className="flex items-center gap-3">
      <Checkbox
        checked={checked}
        onCheckedChange={(value) => setChecked(value === true)}
      />
      <span className="text-sm text-slate-700">
        当前状态：{checked ? "已启用" : "未启用"}
      </span>
    </div>
  );
}

export default function CheckboxControlledDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
