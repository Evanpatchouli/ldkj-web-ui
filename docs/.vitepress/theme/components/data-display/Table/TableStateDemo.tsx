import { Box, Table } from "@/index";
import CodeView from "../../CodeView";

const code = `import { Table } from "@ldkj/web-ui";

export function Example() {
  return (
    <>
      <Table loading dataSource={[{ id: 1, name: "加载中" }]} />
      <Table columns={[{ dataIndex: "name", title: "名称" }]} dataSource={[]} />
    </>
  );
}`;

export default function TableStateDemo() {
  return (
    <CodeView code={code}>
      <Box className="space-y-4">
        <Table loading dataSource={[{ id: 1, name: "加载中" }]} />
        <Table
          columns={[{ dataIndex: "name", title: "名称" }]}
          dataSource={[]}
          empty="没有匹配的数据"
        />
      </Box>
    </CodeView>
  );
}
