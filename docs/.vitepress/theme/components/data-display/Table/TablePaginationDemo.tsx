import { Table, type TableColumn } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

type Log = {
  id: number;
  event: string;
  level: string;
};

const data: Log[] = Array.from({ length: 18 }, (_, index) => ({
  id: index + 1,
  event: `任务 #${index + 1}`,
  level: index % 3 === 0 ? "warning" : "info",
}));

const columns: TableColumn<Log>[] = [
  { dataIndex: "event", title: "事件" },
  { dataIndex: "level", title: "级别" },
];

const code = `import { Table } from "@ldkj/web-ui";

export function Example() {
  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={data}
      pagination={{ pageSize: 5, position: "right" }}
    />
  );
}`;

export default function TablePaginationDemo() {
  return (
    <CodeView code={code}>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 5, position: "right" }}
      />
    </CodeView>
  );
}

