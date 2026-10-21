import CodeView from "../../CodeView";
import { Timeline } from "@ldkj/web-ui";

const items = [
  { oppositeContent: "09:00", content: "客户提交退款申请" },
  { oppositeContent: "09:08", content: "客服完成初审", color: "success" as const },
  { oppositeContent: "09:30", content: "仓库确认商品已入库", color: "success" as const },
];

const Example = () => (
  <div style={{ display: "grid", gap: 24 }}>
    <Timeline items={items} pending="财务正在打款" />
    <Timeline items={items} reverse pending="流程继续处理中" variant="soft" />
  </div>
);

const code = `import { Timeline } from "@ldkj/web-ui";

const items = [
  { oppositeContent: "09:00", content: "客户提交退款申请" },
  { oppositeContent: "09:08", content: "客服完成初审", color: "success" },
  { oppositeContent: "09:30", content: "仓库确认商品已入库", color: "success" },
];

export function Example() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      <Timeline items={items} pending="财务正在打款" />
      <Timeline items={items} reverse pending="流程继续处理中" variant="soft" />
    </div>
  );
}`;

export default function TimelinePendingDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
