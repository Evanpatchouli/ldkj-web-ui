import { Checkbox } from "@/components/form/checkbox";
import CodeView from "../../CodeView";

const code = `import { Checkbox } from "@ldkj/web-ui";

export function Example() {
  return (
    <div className="flex flex-col gap-3">
      <label className="flex items-center gap-2 text-sm text-slate-700">
        <Checkbox defaultChecked />
        接收系统通知
      </label>
      <label className="flex items-center gap-2 text-sm text-slate-700">
        <Checkbox />
        订阅产品更新
      </label>
    </div>
  );
}`;

function Example() {
  return (
    <div className="flex flex-col gap-3">
      <label className="flex items-center gap-2 text-sm text-slate-700">
        <Checkbox defaultChecked />
        接收系统通知
      </label>
      <label className="flex items-center gap-2 text-sm text-slate-700">
        <Checkbox />
        订阅产品更新
      </label>
    </div>
  );
}

export default function CheckboxBasicDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
