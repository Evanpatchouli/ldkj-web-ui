import * as React from "react";
import { CheckboxGroup } from "@/components/form/checkbox";
import CodeView from "../../CodeView";

const options = [
  { label: "标准版", value: "standard" },
  { label: "专业版", value: "pro" },
  { label: "企业版", value: "enterprise" },
];

const code = `import * as React from "react";
import { CheckboxGroup } from "@ldkj/web-ui";

const options = [
  { label: "标准版", value: "standard" },
  { label: "专业版", value: "pro" },
  { label: "企业版", value: "enterprise" },
];

export function Example() {
  const [value, setValue] = React.useState<string | undefined>("pro");

  return (
    <CheckboxGroup
      type="single"
      name="plan"
      value={value}
      onChange={setValue}
      options={options}
      direction="horizontal"
    />
  );
}`;

function Example() {
  const [value, setValue] = React.useState<string | undefined>("pro");

  return (
    <div className="grid gap-3">
      <CheckboxGroup
        type="single"
        name="plan"
        value={value}
        onChange={setValue}
        options={options}
        direction="horizontal"
      />
      <div className="text-sm text-slate-600">
        当前选择：{value ?? "未选择"}
      </div>
    </div>
  );
}

export default function CheckboxGroupSingleDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
