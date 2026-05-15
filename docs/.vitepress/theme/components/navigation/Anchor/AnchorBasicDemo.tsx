import { Anchor, Box } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const code = `import { Anchor } from "@ldkj/web-ui";

export function Example() {
  return (
    <Anchor id="anchor-target-basic" hash>
      跳转到目标位置
    </Anchor>
  );
}`;

export default function AnchorBasicDemo() {
  return (
    <CodeView code={code}>
      <Box className="space-y-4 rounded-xl border border-slate-200 bg-white p-4">
        <Anchor id="anchor-target-basic" hash className="text-blue-600 hover:underline">
          跳转到目标位置
        </Anchor>
        <Box className="h-32 rounded-lg bg-slate-50 p-3 text-sm text-slate-500">
          向下滚动可看到目标锚点
        </Box>
        <Box className="h-32 rounded-lg bg-slate-50 p-3 text-sm text-slate-500" />
        <Box id="anchor-target-basic" className="rounded-lg border border-blue-200 bg-blue-50 p-3 text-sm">
          已到达目标锚点（id: anchor-target-basic）
        </Box>
      </Box>
    </CodeView>
  );
}

