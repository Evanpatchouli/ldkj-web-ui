import { Columns } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const labels = ["概览", "待办", "项目", "成员", "日程", "归档"];

const Example = () => (
  <Columns columns={3} gap={12}>
    {labels.map((label, index) => (
      <div
        key={label}
        className="rounded-lg border border-slate-200 bg-white p-3 text-sm text-slate-700 shadow-sm"
        style={{ minHeight: 48 + (index % 3) * 20 }}
      >
        {label}
      </div>
    ))}
  </Columns>
);

const code = `import { Columns } from "@ldkj/web-ui";

const labels = ["概览", "待办", "项目", "成员", "日程", "归档"];

const Example = () => (
  <Columns columns={3} gap={12}>
    {labels.map((label, index) => (
      <div
        key={label}
        className="rounded-lg border border-slate-200 bg-white p-3 text-sm text-slate-700 shadow-sm"
        style={{ minHeight: 48 + (index % 3) * 20 }}
      >
        {label}
      </div>
    ))}
  </Columns>
);`;

export default function ColumnsBasicDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
