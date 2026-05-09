import * as React from "react";
import { RadioGroup } from "@/components/form/radio";
import CodeView from "../../CodeView";

const options = [
  { label: "按日汇总", value: "day" },
  { label: "按周汇总", value: "week" },
  { label: "按月汇总", value: "month" },
];

const code = `import * as React from "react";
import { RadioGroup } from "@ldkj/web-ui";

const options = [
  { label: "按日汇总", value: "day" },
  { label: "按周汇总", value: "week" },
  { label: "按月汇总", value: "month" },
];

export function Example() {
  const [value, setValue] = React.useState("week");

  return (
    <RadioGroup
      name="range"
      value={value}
      onValueChange={setValue}
      options={options}
    />
  );
}`;

function Example() {
  const [value, setValue] = React.useState("week");

  return (
    <div className="grid gap-3">
      <RadioGroup
        name="range"
        value={value}
        onValueChange={setValue}
        options={options}
      />
      <div className="text-sm text-slate-600">当前选择：{value}</div>
    </div>
  );
}

export default function RadioControlledDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
