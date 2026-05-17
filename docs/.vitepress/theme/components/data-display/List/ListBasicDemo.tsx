import CodeView from "../../CodeView";
import { List } from "@ldkj/web-ui";

const code = `import { List } from "@ldkj/web-ui";

export function Example() {
  return (
    <List className="grid gap-2">
      <li className="rounded-md bg-slate-50 px-3 py-2 text-sm text-slate-700">
        今日待办
      </li>
      <li className="rounded-md bg-slate-50 px-3 py-2 text-sm text-slate-700">
        本周跟进
      </li>
      <li className="rounded-md bg-slate-50 px-3 py-2 text-sm text-slate-700">
        已归档事项
      </li>
    </List>
  );
}`;

function Example() {
  return (
    <List className="grid gap-2">
      <li className="rounded-md bg-slate-50 px-3 py-2 text-sm text-slate-700">
        今日待办
      </li>
      <li className="rounded-md bg-slate-50 px-3 py-2 text-sm text-slate-700">
        本周跟进
      </li>
      <li className="rounded-md bg-slate-50 px-3 py-2 text-sm text-slate-700">
        已归档事项
      </li>
    </List>
  );
}

export default function ListBasicDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
