import { Chip, Table } from "@/index";
import CodeView from "../../CodeView";

const data = [
  { id: 1, name: "订单中心", owner: "林澄", status: "运行中" },
  { id: 2, name: "支付网关", owner: "周予", status: "维护中" },
  { id: 3, name: "消息队列", owner: "陈一", status: "运行中" },
];

const code = `import { Chip, Table } from "@ldkj/web-ui";

export function Example() {
  return (
    <Table dataSource={data} rowKey="id">
      <Table.Column dataIndex="name" title="服务" />
      <Table.Column dataIndex="owner" title="负责人" />
      <Table.Column
        dataIndex="status"
        title="状态"
        render={(value) => (
          <Chip variant={value === "运行中" ? "success" : "warning"} size="sm">
            {String(value)}
          </Chip>
        )}
      />
    </Table>
  );
}`;

export default function TableColumnDemo() {
  return (
    <CodeView code={code}>
      <Table dataSource={data} rowKey="id">
        <Table.Column dataIndex="name" title="服务" />
        <Table.Column dataIndex="owner" title="负责人" />
        <Table.Column
          dataIndex="status"
          title="状态"
          render={(value) => (
            <Chip
              variant={value === "运行中" ? "success" : "warning"}
              size="sm"
            >
              {String(value)}
            </Chip>
          )}
        />
      </Table>
    </CodeView>
  );
}
