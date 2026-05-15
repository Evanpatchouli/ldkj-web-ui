import { Space, Anchor, Box } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const code = `import { Space, Anchor } from "@ldkj/web-ui";

export function Example() {
  return (
    <Space split={<span className="text-slate-300">|</span>} size="lg">
      <Anchor id="overview">概览</Anchor>
      <Anchor id="traffic">流量</Anchor>
      <Anchor id="conversion">转化</Anchor>
    </Space>
  );
}`;

export default function SpaceSplitDemo() {
  return (
    <CodeView code={code}>
      <Box className="rounded-xl border border-slate-200 bg-white p-4">
        <Space split={<span className="text-slate-300">|</span>} size="lg">
          <Anchor id="overview">概览</Anchor>
          <Anchor id="traffic">流量</Anchor>
          <Anchor id="conversion">转化</Anchor>
        </Space>
      </Box>
    </CodeView>
  );
}

