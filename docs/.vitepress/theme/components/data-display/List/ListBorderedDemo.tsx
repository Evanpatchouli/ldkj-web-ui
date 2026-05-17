import CodeView from "../../CodeView";
import { List } from "@ldkj/web-ui";

const code = `import { List } from "@ldkj/web-ui";

export function Example() {
  return (
    <List bordered className="max-w-xl bg-white">
      <li className="flex items-center justify-between px-4 py-3">
        <span className="text-sm font-medium text-slate-800">订单 1001</span>
        <span className="text-xs text-emerald-700">已完成</span>
      </li>
      <li className="flex items-center justify-between px-4 py-3">
        <span className="text-sm font-medium text-slate-800">订单 1002</span>
        <span className="text-xs text-amber-700">处理中</span>
      </li>
      <li className="flex items-center justify-between px-4 py-3">
        <span className="text-sm font-medium text-slate-800">订单 1003</span>
        <span className="text-xs text-slate-500">待确认</span>
      </li>
    </List>
  );
}`;

function Example() {
  return (
    <List bordered className="max-w-xl bg-white">
      <li className="flex items-center justify-between px-4 py-3">
        <span className="text-sm font-medium text-slate-800">订单 1001</span>
        <span className="text-xs text-emerald-700">已完成</span>
      </li>
      <li className="flex items-center justify-between px-4 py-3">
        <span className="text-sm font-medium text-slate-800">订单 1002</span>
        <span className="text-xs text-amber-700">处理中</span>
      </li>
      <li className="flex items-center justify-between px-4 py-3">
        <span className="text-sm font-medium text-slate-800">订单 1003</span>
        <span className="text-xs text-slate-500">待确认</span>
      </li>
    </List>
  );
}

export default function ListBorderedDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
