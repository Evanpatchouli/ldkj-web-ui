import {
  Select,
  SelectContent,
  SelectItems,
  SelectTrigger,
  SelectValue,
} from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const options = [
  { label: "允许页面滚动", value: "free" },
  { label: "保持当前位置", value: "stable" },
  { label: "锁定背景滚动", value: "locked" },
];

const code = `import {
  Select,
  SelectContent,
  SelectItems,
  SelectTrigger,
  SelectValue,
} from "@ldkj/web-ui";

const options = [
  { label: "允许页面滚动", value: "free" },
  { label: "保持当前位置", value: "stable" },
  { label: "锁定背景滚动", value: "locked" },
];

const Example = () => (
  <div className="grid gap-4 sm:grid-cols-2">
    <div className="grid gap-2">
      <label className="text-sm font-medium text-slate-700">页面筛选</label>
      <Select defaultValue="free">
        <SelectTrigger className="w-64" aria-label="页面筛选">
          <SelectValue placeholder="请选择滚动策略" />
        </SelectTrigger>
        <SelectContent>
          <SelectItems options={options} />
        </SelectContent>
      </Select>
    </div>

    <div className="grid gap-2">
      <label className="text-sm font-medium text-slate-700">浮层任务</label>
      <Select defaultValue="locked" lockScroll>
        <SelectTrigger className="w-64" aria-label="浮层任务">
          <SelectValue placeholder="请选择滚动策略" />
        </SelectTrigger>
        <SelectContent>
          <SelectItems options={options} />
        </SelectContent>
      </Select>
    </div>
  </div>
);`;

const Example = () => (
  <div className="grid gap-4 sm:grid-cols-2">
    <div className="grid gap-2">
      <label className="text-sm font-medium text-slate-700">页面筛选</label>
      <Select defaultValue="free">
        <SelectTrigger className="w-64" aria-label="页面筛选">
          <SelectValue placeholder="请选择滚动策略" />
        </SelectTrigger>
        <SelectContent>
          <SelectItems options={options} />
        </SelectContent>
      </Select>
    </div>

    <div className="grid gap-2">
      <label className="text-sm font-medium text-slate-700">浮层任务</label>
      <Select defaultValue="locked" lockScroll>
        <SelectTrigger className="w-64" aria-label="浮层任务">
          <SelectValue placeholder="请选择滚动策略" />
        </SelectTrigger>
        <SelectContent>
          <SelectItems options={options} />
        </SelectContent>
      </Select>
    </div>
  </div>
);

export default function SelectScrollBehaviorDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
