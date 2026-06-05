import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItems,
  SelectTrigger,
  SelectValue,
} from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const options = [
  { label: "华东一区", value: "east-1" },
  { label: "华南一区", value: "south-1" },
  { label: "西南一区", value: "west-1" },
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
  { label: "华东一区", value: "east-1" },
  { label: "华南一区", value: "south-1" },
  { label: "西南一区", value: "west-1" },
];

const Example = () => {
  const [value, setValue] = React.useState("east-1");
  const selectedLabel = options.find((item) => item.value === value)?.label;

  return (
    <div className="grid gap-3">
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger className="w-64" aria-label="区域">
          <SelectValue placeholder="请选择区域" />
        </SelectTrigger>
        <SelectContent>
          <SelectItems options={options} />
        </SelectContent>
      </Select>
      <div className="text-sm text-slate-600">当前区域：{selectedLabel}</div>
    </div>
  );
};`;

const Example = () => {
  const [value, setValue] = React.useState("east-1");
  const selectedLabel = options.find((item) => item.value === value)?.label;

  return (
    <div className="grid gap-3">
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger className="w-64" aria-label="区域">
          <SelectValue placeholder="请选择区域" />
        </SelectTrigger>
        <SelectContent>
          <SelectItems options={options} />
        </SelectContent>
      </Select>
      <div className="text-sm text-slate-600">当前区域：{selectedLabel}</div>
    </div>
  );
};

export default function SelectControlledDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}

