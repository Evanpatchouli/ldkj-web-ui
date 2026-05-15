import { Space, Chip, Box } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const code = `import { Space, Chip } from "@ldkj/web-ui";

export function Example() {
  return (
    <Space
      direction={{ xs: "vertical", md: "horizontal" }}
      size={{
        xs: "sm",
        md: { row: "md", column: "xl" },
      }}
      align={{ xs: "stretch", md: "center" }}
    >
      <Chip>订单</Chip>
      <Chip variant="success">支付成功</Chip>
      <Chip variant="warning">待复核</Chip>
    </Space>
  );
}`;

export default function SpaceResponsiveDemo() {
  return (
    <CodeView code={code}>
      <Box className="rounded-xl border border-slate-200 bg-white p-4">
        <Space
          direction={{ xs: "vertical", md: "horizontal" }}
          size={{ xs: "sm", md: { row: "md", column: "xl" } }}
          align={{ xs: "stretch", md: "center" }}
        >
          <Chip>订单</Chip>
          <Chip variant="success">支付成功</Chip>
          <Chip variant="warning">待复核</Chip>
        </Space>
      </Box>
    </CodeView>
  );
}

