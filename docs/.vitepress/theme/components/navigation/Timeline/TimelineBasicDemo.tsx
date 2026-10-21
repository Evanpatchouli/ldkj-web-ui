import CodeView from "../../CodeView";
import { Timeline } from "@ldkj/web-ui";

const items = [
  {
    oppositeContent: "09:30",
    content: (
      <div style={{ display: "grid", gap: 4 }}>
        <strong>创建采购申请</strong>
        <span>申请人提交办公设备采购需求，预算 12,800 元。</span>
      </div>
    ),
  },
  {
    oppositeContent: "10:15",
    content: (
      <div style={{ display: "grid", gap: 4 }}>
        <strong>部门负责人审批</strong>
        <span>确认预算归属与业务必要性，进入财务复核。</span>
      </div>
    ),
    color: "success" as const,
  },
  {
    oppositeContent: "11:40",
    content: (
      <div style={{ display: "grid", gap: 4 }}>
        <strong>财务复核</strong>
        <span>等待财务补充发票类目和成本中心。</span>
      </div>
    ),
    color: "warning" as const,
  },
];

const Example = () => <Timeline items={items} />;

const code = `import { Timeline } from "@ldkj/web-ui";

const items = [
  {
    oppositeContent: "09:30",
    content: (
      <div style={{ display: "grid", gap: 4 }}>
        <strong>创建采购申请</strong>
        <span>申请人提交办公设备采购需求，预算 12,800 元。</span>
      </div>
    ),
  },
  {
    oppositeContent: "10:15",
    content: (
      <div style={{ display: "grid", gap: 4 }}>
        <strong>部门负责人审批</strong>
        <span>确认预算归属与业务必要性，进入财务复核。</span>
      </div>
    ),
    color: "success",
  },
  {
    oppositeContent: "11:40",
    content: (
      <div style={{ display: "grid", gap: 4 }}>
        <strong>财务复核</strong>
        <span>等待财务补充发票类目和成本中心。</span>
      </div>
    ),
    color: "warning",
  },
];

export function Example() {
  return <Timeline items={items} />;
}`;

export default function TimelineBasicDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
