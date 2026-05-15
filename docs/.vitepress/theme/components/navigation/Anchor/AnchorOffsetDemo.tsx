import { Anchor, Box } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const code = `import { Anchor } from "@ldkj/web-ui";

export function Example() {
  return (
    <Anchor
      id="anchor-target-offset"
      offset={48}
      onNavigate={(targetId) => console.log("navigate:", targetId)}
      sx={{ color: "#0284c7", fontWeight: 600 }}
    >
      偏移 48px 跳转
    </Anchor>
  );
}`;

export default function AnchorOffsetDemo() {
  return (
    <CodeView code={code}>
      <Box className="space-y-4 rounded-xl border border-slate-200 bg-white p-4">
        <Anchor
          id="anchor-target-offset"
          offset={48}
          onNavigate={() => {
            // 文档演示中仅示意回调可用
          }}
          sx={{ color: "#0284c7", fontWeight: 600 }}
        >
          偏移 48px 跳转
        </Anchor>
        <Box className="h-24 rounded-lg bg-slate-50 p-3 text-sm text-slate-500">
          此示例用于演示 `offset` 与 `sx`
        </Box>
        <Box className="h-24 rounded-lg bg-slate-50 p-3 text-sm text-slate-500" />
        <Box
          id="anchor-target-offset"
          className="rounded-lg border border-cyan-200 bg-cyan-50 p-3 text-sm"
        >
          已到达偏移跳转目标（id: anchor-target-offset）
        </Box>
      </Box>
    </CodeView>
  );
}

