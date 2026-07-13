import { Columns } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const tasks = [
  { title: "设计评审", meta: "今天 · 14:00", height: 84 },
  { title: "发布检查", meta: "3 项待确认", height: 112 },
  { title: "客户反馈", meta: "8 条未读", height: 72 },
  { title: "版本计划", meta: "下周一发布", height: 96 },
  { title: "数据复盘", meta: "本周转化 +12%", height: 76 },
];

const Example = () => (
  <Columns columns={2} gap="1rem">
    {tasks.map((task) => (
      <article
        key={task.title}
        className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
        style={{ minHeight: task.height }}
      >
        <p className="text-sm font-semibold text-slate-900">{task.title}</p>
        <p className="mt-2 text-xs text-slate-500">{task.meta}</p>
      </article>
    ))}
  </Columns>
);

const code = `import { Columns } from "@ldkj/web-ui";

const tasks = [
  { title: "设计评审", meta: "今天 · 14:00", height: 84 },
  { title: "发布检查", meta: "3 项待确认", height: 112 },
  { title: "客户反馈", meta: "8 条未读", height: 72 },
  { title: "版本计划", meta: "下周一发布", height: 96 },
  { title: "数据复盘", meta: "本周转化 +12%", height: 76 },
];

const Example = () => (
  <Columns columns={2} gap="1rem">
    {tasks.map((task) => (
      <article
        key={task.title}
        className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
        style={{ minHeight: task.height }}
      >
        <p className="text-sm font-semibold text-slate-900">{task.title}</p>
        <p className="mt-2 text-xs text-slate-500">{task.meta}</p>
      </article>
    ))}
  </Columns>
);`;

export default function ColumnsCardsDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
