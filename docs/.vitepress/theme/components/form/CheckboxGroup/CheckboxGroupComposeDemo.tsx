import * as React from "react";
import { Checkbox, CheckboxGroup } from "@/components/form/checkbox";
import { Label } from "@/components/form/label";
import CodeView from "../../CodeView";

const code = `import * as React from "react";
import { Checkbox, CheckboxGroup, Label } from "@ldkj/web-ui";

export function Example() {
  const [value, setValue] = React.useState(["orders"]);

  return (
    <CheckboxGroup name="modules" value={value} onChange={setValue}>
      <Label className="inline-flex items-center gap-2">
        <Checkbox value="orders" />
        订单管理
      </Label>
      <Label className="inline-flex items-center gap-2">
        <Checkbox value="inventory" />
        库存管理
      </Label>
      <Label className="inline-flex items-center gap-2">
        <Checkbox value="finance" disabled />
        财务报表
      </Label>
    </CheckboxGroup>
  );
}`;

function Example() {
  const [value, setValue] = React.useState<string[]>(["orders"]);

  return (
    <div className="grid gap-3">
      <CheckboxGroup name="modules" value={value} onChange={setValue}>
        <Label className="inline-flex items-center gap-2 text-sm text-slate-700">
          <Checkbox value="orders" />
          订单管理
        </Label>
        <Label className="inline-flex items-center gap-2 text-sm text-slate-700">
          <Checkbox value="inventory" />
          库存管理
        </Label>
        <Label className="inline-flex items-center gap-2 text-sm text-slate-400">
          <Checkbox value="finance" disabled />
          财务报表
        </Label>
      </CheckboxGroup>
      <div className="text-sm text-slate-600">
        当前选择：{value.join(", ") || "无"}
      </div>
    </div>
  );
}

export default function CheckboxGroupComposeDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
