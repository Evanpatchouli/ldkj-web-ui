import { Chip, Table, type TableColumn } from "@/index";
import CodeView from "../../CodeView";

type Service = {
  id: number;
  name: string;
  owner: string;
  status: "运行中" | "维护中" | "告警";
};

const data: Service[] = [
  { id: 1, name: "订单中心", owner: "林澄", status: "运行中" },
  { id: 2, name: "支付网关", owner: "周予", status: "维护中" },
  { id: 3, name: "消息队列", owner: "陈一", status: "告警" },
];

const columns: TableColumn<Service>[] = [
  { dataIndex: "name", title: "服务" },
  { dataIndex: "owner", title: "负责人" },
  {
    dataIndex: "status",
    title: "状态",
    render: (value) => (
      <Chip
        variant={
          value === "运行中" ? "success" : value === "维护中" ? "warning" : "danger"
        }
        size="sm"
      >
        {String(value)}
      </Chip>
    ),
  },
];

const code = `import { Chip, Table, type TableColumn } from "@ldkj/web-ui";

type Service = {
  id: number;
  name: string;
  owner: string;
  status: "运行中" | "维护中" | "告警";
};

const columns: TableColumn<Service>[] = [
  { dataIndex: "name", title: "服务" },
  { dataIndex: "owner", title: "负责人" },
  {
    dataIndex: "status",
    title: "状态",
    render: (value) => (
      <Chip variant={value === "运行中" ? "success" : "warning"} size="sm">
        {String(value)}
      </Chip>
    ),
  },
];

export function Example() {
  return <Table columns={columns} dataSource={data} rowKey="id" />;
}`;

export default function TableRenderDemo() {
  return (
    <CodeView code={code}>
      <Table columns={columns} dataSource={data} rowKey="id" />
    </CodeView>
  );
}
