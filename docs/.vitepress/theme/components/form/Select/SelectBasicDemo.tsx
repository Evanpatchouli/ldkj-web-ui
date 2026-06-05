import {
  Select,
  SelectContent,
  SelectItems,
  SelectTrigger,
  SelectValue,
} from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const options = [
  { label: "全部状态", value: "all" },
  { label: "待处理", value: "pending" },
  { label: "处理中", value: "processing" },
  { label: "已完成", value: "done" },
];

const code = `import {
  Select,
  SelectContent,
  SelectItems,
  SelectTrigger,
  SelectValue,
} from "@ldkj/web-ui";

const options = [
  { label: "全部状态", value: "all" },
  { label: "待处理", value: "pending" },
  { label: "处理中", value: "processing" },
  { label: "已完成", value: "done" },
];

const Example = () => (
  <div className="grid gap-2">
    <label className="text-sm font-medium text-slate-700">订单状态</label>
    <Select defaultValue="all">
      <SelectTrigger className="w-64" aria-label="订单状态">
        <SelectValue placeholder="请选择订单状态" />
      </SelectTrigger>
      <SelectContent>
        <SelectItems options={options} />
      </SelectContent>
    </Select>
  </div>
);`;

const Example = () => (
  <div className="grid gap-2">
    <label className="text-sm font-medium text-slate-700">订单状态</label>
    <Select defaultValue="all">
      <SelectTrigger className="w-64" aria-label="订单状态">
        <SelectValue placeholder="请选择订单状态" />
      </SelectTrigger>
      <SelectContent>
        <SelectItems options={options} />
      </SelectContent>
    </Select>
  </div>
);

export default function SelectBasicDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}

