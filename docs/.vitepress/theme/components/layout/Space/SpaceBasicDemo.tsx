import { Space, Button, Box } from "@/index";
import CodeView from "../../CodeView";

const code = `import { Space, Button } from "@ldkj/web-ui";

export function Example() {
  return (
    <Space size="md">
      <Button size="sm">保存</Button>
      <Button size="sm" variant="secondary">预览</Button>
      <Button size="sm" variant="outline">取消</Button>
    </Space>
  );
}`;

export default function SpaceBasicDemo() {
  return (
    <CodeView code={code}>
      <Box className="rounded-xl border border-slate-200 bg-white p-4">
        <Space size="md">
          <Button size="sm">保存</Button>
          <Button size="sm" variant="secondary">
            预览
          </Button>
          <Button size="sm" variant="outline">
            取消
          </Button>
        </Space>
      </Box>
    </CodeView>
  );
}
