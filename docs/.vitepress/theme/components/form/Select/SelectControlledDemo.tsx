import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItems,
  SelectTrigger,
  SelectValue,
} from "@/components/form/select";
import CodeView from "../../CodeView";

const options = [
  { label: "按日汇总", value: "day" },
  { label: "按周汇总", value: "week" },
  { label: "按月汇总", value: "month" },
];

const code = `import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItems,
  SelectTrigger,
  SelectValue,
} from "@ldkj/web-ui";

const options = [
  { label: "按日汇总", value: "day" },
  { label: "按周汇总", value: "week" },
  { label: "按月汇总", value: "month" },
];

export function Example() {
  const [value, setValue] = React.useState("week");

  return (
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger className="w-64">
        <SelectValue placeholder="请选择周期" />
      </SelectTrigger>
      <SelectContent>
        <SelectItems options={options} />
      </SelectContent>
    </Select>
  );
}`;

function Example() {
  const [value, setValue] = React.useState("week");

  return (
    <div className="grid gap-3">
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger className="w-64">
          <SelectValue placeholder="请选择周期" />
        </SelectTrigger>
        <SelectContent>
          <SelectItems options={options} />
        </SelectContent>
      </Select>
      <div className="text-sm text-slate-600">当前选择：{value}</div>
    </div>
  );
}

export default function SelectControlledDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
