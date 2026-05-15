import { Checkbox } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const code = `import { Checkbox } from "@ldkj/web-ui";

export function Example() {
  return (
    <div className="grid gap-3 text-sm text-slate-700">
      <label className="flex items-center gap-2">
        <Checkbox />
        默认
      </label>
      <label className="flex items-center gap-2">
        <Checkbox defaultChecked />
        已选中
      </label>
      <label className="flex items-center gap-2">
        <Checkbox checked="indeterminate" />
        半选
      </label>
      <label className="flex items-center gap-2 text-slate-400">
        <Checkbox disabled />
        禁用
      </label>
      <label className="flex items-center gap-2 text-slate-400">
        <Checkbox disabled checked />
        禁用选中
      </label>
    </div>
  );
}`;

function Example() {
  return (
    <div className="grid gap-3 text-sm text-slate-700">
      <label className="flex items-center gap-2">
        <Checkbox />
        默认
      </label>
      <label className="flex items-center gap-2">
        <Checkbox defaultChecked />
        已选中
      </label>
      <label className="flex items-center gap-2">
        <Checkbox checked="indeterminate" />
        半选
      </label>
      <label className="flex items-center gap-2 text-slate-400">
        <Checkbox disabled />
        禁用
      </label>
      <label className="flex items-center gap-2 text-slate-400">
        <Checkbox disabled checked />
        禁用选中
      </label>
    </div>
  );
}

export default function CheckboxStatesDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}

