import { Space, Card, Box } from "@/index";
import CodeView from "../../CodeView";

const code = `import { Space, Card } from "@ldkj/web-ui";

export function Example() {
  return (
    <Space size={{ row: "sm", column: "md" }} align="stretch">
      <Space.Item flex="1 1 220px">
        <Card>
          <Card.Header>概览</Card.Header>
          <Card.Content>今日订单 1,284</Card.Content>
        </Card>
      </Space.Item>
      <Space.Item flex="2 1 360px">
        <Card>
          <Card.Header>趋势</Card.Header>
          <Card.Content>近 7 日支付成功率 98.7%</Card.Content>
        </Card>
      </Space.Item>
    </Space>
  );
}`;

export default function SpaceItemDemo() {
  return (
    <CodeView code={code}>
      <Box className="rounded-xl border border-slate-200 bg-white p-4">
        <Space size={{ row: "sm", column: "md" }} align="stretch">
          <Space.Item flex="1 1 220px">
            <Card>
              <Card.Header>概览</Card.Header>
              <Card.Content>今日订单 1,284</Card.Content>
            </Card>
          </Space.Item>
          <Space.Item flex="2 1 360px">
            <Card>
              <Card.Header>趋势</Card.Header>
              <Card.Content>近 7 日支付成功率 98.7%</Card.Content>
            </Card>
          </Space.Item>
        </Space>
      </Box>
    </CodeView>
  );
}
