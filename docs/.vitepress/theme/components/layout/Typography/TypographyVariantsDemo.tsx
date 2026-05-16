import CodeView from "../../CodeView";
import { Typography } from "@ldkj/web-ui";

const code = `import { Typography } from "@ldkj/web-ui";

export function Example() {
  return (
    <div className="grid gap-3">
      <Typography variant="h1">h1 页面主标题</Typography>
      <Typography variant="h2">h2 区块标题</Typography>
      <Typography variant="h3">h3 小节标题</Typography>
      <Typography variant="body">
        body 正文文本适合说明、描述、表单提示和普通内容段落。
      </Typography>
      <Typography variant="caption">
        caption 用于时间、来源、辅助解释等弱化信息。
      </Typography>
    </div>
  );
}`;

function Example() {
  return (
    <div className="grid gap-3">
      <Typography variant="h1">h1 页面主标题</Typography>
      <Typography variant="h2">h2 区块标题</Typography>
      <Typography variant="h3">h3 小节标题</Typography>
      <Typography variant="body">
        body 正文文本适合说明、描述、表单提示和普通内容段落。
      </Typography>
      <Typography variant="caption">
        caption 用于时间、来源、辅助解释等弱化信息。
      </Typography>
    </div>
  );
}

export default function TypographyVariantsDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
