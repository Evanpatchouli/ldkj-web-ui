import CodeView from "../../CodeView";
import { Typography } from "@ldkj/web-ui";

const code = `import { Typography } from "@ldkj/web-ui";

export function Example() {
  return (
    <div className="grid gap-2">
      <Typography variant="h2">项目概览</Typography>
      <Typography>
        Typography 用于承载页面中的标题、正文与辅助说明，默认渲染为 p 标签。
      </Typography>
      <Typography variant="caption">
        最近更新: 2026-05-17 14:30
      </Typography>
    </div>
  );
}`;

function Example() {
  return (
    <div className="grid gap-2">
      <Typography variant="h2">项目概览</Typography>
      <Typography>
        Typography 用于承载页面中的标题、正文与辅助说明，默认渲染为 p 标签。
      </Typography>
      <Typography variant="caption">最近更新: 2026-05-17 14:30</Typography>
    </div>
  );
}

export default function TypographyBasicDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
