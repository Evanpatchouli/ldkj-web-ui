import { Table, type TableColumn } from "@/index";
import CodeView from "../../CodeView";

type Service = {
  id: number;
  name: string;
  latency: string;
};

const data: Service[] = [
  { id: 1, name: "订单中心", latency: "32ms" },
  { id: 2, name: "支付网关", latency: "48ms" },
  { id: 3, name: "消息队列", latency: "27ms" },
];

const columns: TableColumn<Service>[] = [
  { dataIndex: "name", title: "服务" },
  { dataIndex: "latency", title: "延迟", align: "right", headerAlign: "right" },
];

const code = `import { Table } from "@ldkj/web-ui";

export function Example() {
  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey="id"
      striped
      sx={{
        borderColor: "#bae6fd",
        "& th": { backgroundColor: "#e0f2fe" },
      }}
    />
  );
}`;

export default function TableSxDemo() {
  return (
    <CodeView code={code}>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        striped
        sx={{
          borderColor: "#bae6fd",
          "& th": { backgroundColor: "#e0f2fe" },
        }}
      />
    </CodeView>
  );
}
