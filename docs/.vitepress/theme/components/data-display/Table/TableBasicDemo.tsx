import { Table } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const data = [
  { id: 1, name: "订单中心", owner: "林澄", status: "运行中" },
  { id: 2, name: "支付网关", owner: "周予", status: "维护中" },
  { id: 3, name: "消息队列", owner: "陈一", status: "运行中" },
];

const code = `import { Table } from "@ldkj/web-ui";

const data = [
  { id: 1, name: "订单中心", owner: "林澄", status: "运行中" },
  { id: 2, name: "支付网关", owner: "周予", status: "维护中" },
  { id: 3, name: "消息队列", owner: "陈一", status: "运行中" },
];

export function Example() {
  return <Table dataSource={data} />;
}`;

export default function TableBasicDemo() {
  return (
    <CodeView code={code}>
      <Table dataSource={data} />
    </CodeView>
  );
}

