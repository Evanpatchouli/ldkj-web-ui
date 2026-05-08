import * as React from "react";
import { Box, Table, type TableColumn } from "@/index";
import CodeView from "../../CodeView";

type User = {
  id: number;
  name: string;
  role: string;
};

const data: User[] = [
  { id: 1, name: "林澄", role: "管理员" },
  { id: 2, name: "周予", role: "运营" },
  { id: 3, name: "陈一", role: "只读" },
];

const columns: TableColumn<User>[] = [
  { dataIndex: "name", title: "姓名" },
  { dataIndex: "role", title: "角色" },
];

const code = `import * as React from "react";
import { Table } from "@ldkj/web-ui";

export function Example() {
  const [selectedRowKeys, setSelectedRowKeys] = React.useState<React.Key[]>([1]);

  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={data}
      rowSelection={{
        selectedRowKeys,
        onChange: setSelectedRowKeys,
        getCheckboxProps: (record) => ({ disabled: record.role === "只读" }),
      }}
    />
  );
}`;

export default function TableSelectionDemo() {
  const [selectedRowKeys, setSelectedRowKeys] = React.useState<React.Key[]>([1]);

  return (
    <CodeView code={code}>
      <Box className="space-y-3">
        <Table
          rowKey="id"
          columns={columns}
          dataSource={data}
          rowSelection={{
            selectedRowKeys,
            onChange: setSelectedRowKeys,
            getCheckboxProps: (record) => ({ disabled: record.role === "只读" }),
          }}
        />
        <Box className="text-sm text-slate-600">
          已选择：{selectedRowKeys.join(", ") || "无"}
        </Box>
      </Box>
    </CodeView>
  );
}
