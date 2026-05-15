import * as React from "react";
import { CheckboxGroup } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const options = [
  { label: "订单管理", value: "orders" },
  { label: "库存管理", value: "inventory" },
  { label: "财务报表", value: "finance", disabled: true },
];

const code = `import * as React from "react";
import { CheckboxGroup } from "@ldkj/web-ui";

const options = [
  { label: "订单管理", value: "orders" },
  { label: "库存管理", value: "inventory" },
  { label: "财务报表", value: "finance", disabled: true },
];

export function Example() {
  const [value, setValue] = React.useState(["orders"]);

  return (
    <CheckboxGroup
      name="modules"
      value={value}
      onChange={setValue}
      options={options}
    />
  );
}`;

function Example() {
  const [value, setValue] = React.useState<string[]>(["orders"]);

  return (
    <div className="grid gap-3">
      <CheckboxGroup
        name="modules"
        value={value}
        onChange={setValue}
        options={options}
      />
      <div className="text-sm text-slate-600">
        当前选择：{value.join(", ") || "无"}
      </div>
    </div>
  );
}

export default function CheckboxGroupMultipleDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}

