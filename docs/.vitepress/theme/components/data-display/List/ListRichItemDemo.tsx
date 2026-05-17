import CodeView from "../../CodeView";
import { List } from "@ldkj/web-ui";

const code = `import { List } from "@ldkj/web-ui";

const items = [
  { title: "合同审批", description: "法务已确认条款，等待业务负责人签署。", meta: "2 分钟前" },
  { title: "客户回访", description: "需要补充本季度采购计划和联系人信息。", meta: "今天 09:20" },
  { title: "发票寄送", description: "纸质发票已生成，待行政统一寄出。", meta: "昨天" },
];

export function Example() {
  return (
    <List bordered className="max-w-2xl bg-white">
      {items.map((item) => (
        <li key={item.title} className="grid gap-1 px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm font-medium text-slate-900">{item.title}</span>
            <span className="shrink-0 text-xs text-slate-500">{item.meta}</span>
          </div>
          <p className="m-0 text-sm leading-6 text-slate-600">{item.description}</p>
        </li>
      ))}
    </List>
  );
}`;

const items = [
  {
    title: "合同审批",
    description: "法务已确认条款，等待业务负责人签署。",
    meta: "2 分钟前",
  },
  {
    title: "客户回访",
    description: "需要补充本季度采购计划和联系人信息。",
    meta: "今天 09:20",
  },
  {
    title: "发票寄送",
    description: "纸质发票已生成，待行政统一寄出。",
    meta: "昨天",
  },
];

function Example() {
  return (
    <List bordered className="max-w-2xl bg-white">
      {items.map((item) => (
        <li key={item.title} className="grid gap-1 px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm font-medium text-slate-900">
              {item.title}
            </span>
            <span className="shrink-0 text-xs text-slate-500">
              {item.meta}
            </span>
          </div>
          <p className="m-0 text-sm leading-6 text-slate-600">
            {item.description}
          </p>
        </li>
      ))}
    </List>
  );
}

export default function ListRichItemDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
