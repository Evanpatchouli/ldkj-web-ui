import CodeView from "../../CodeView";
import { Typography } from "@ldkj/web-ui";

const code = `import { Typography } from "@ldkj/web-ui";

export function Example() {
  return (
    <div className="grid gap-3">
      <Typography
        variant="h3"
        sx={{
          color: "#0f766e",
          letterSpacing: "0",
        }}
      >
        自定义强调标题
      </Typography>
      <Typography
        sx={{
          maxWidth: 520,
          color: "#475569",
          backgroundColor: "#f8fafc",
          borderLeft: "3px solid #14b8a6",
          padding: "12px 14px",
          borderRadius: 6,
        }}
      >
        sx 可用于补充局部视觉，不需要为一次性排版状态新增组件属性。
      </Typography>
    </div>
  );
}`;

function Example() {
  return (
    <div className="grid gap-3">
      <Typography
        variant="h3"
        sx={{
          color: "#0f766e",
          letterSpacing: "0",
        }}
      >
        自定义强调标题
      </Typography>
      <Typography
        sx={{
          maxWidth: 520,
          color: "#475569",
          backgroundColor: "#f8fafc",
          borderLeft: "3px solid #14b8a6",
          padding: "12px 14px",
          borderRadius: 6,
        }}
      >
        sx 可用于补充局部视觉，不需要为一次性排版状态新增组件属性。
      </Typography>
    </div>
  );
}

export default function TypographySxDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
