import CodeView from "../../CodeView";
import { Typography } from "@ldkj/web-ui";

const code = `import { Typography } from "@ldkj/web-ui";

export function Example() {
  return (
    <article className="grid gap-3">
      <Typography component="h1" variant="h1">
        订单详情
      </Typography>
      <Typography component="p" variant="body">
        选择合适的 component 可以保留正确语义，同时复用统一视觉层级。
      </Typography>
      <Typography
        component="a"
        href="#"
        variant="body"
        sx={{
          color: "#2563eb",
          textDecoration: "none",
          "&:hover": { textDecoration: "underline" },
        }}
      >
        查看完整记录
      </Typography>
    </article>
  );
}`;

function Example() {
  return (
    <article className="grid gap-3">
      <Typography component="h1" variant="h1">
        订单详情
      </Typography>
      <Typography component="p" variant="body">
        选择合适的 component 可以保留正确语义，同时复用统一视觉层级。
      </Typography>
      <Typography
        component="a"
        href="#"
        variant="body"
        sx={{
          color: "#2563eb",
          textDecoration: "none",
          "&:hover": { textDecoration: "underline" },
        }}
      >
        查看完整记录
      </Typography>
    </article>
  );
}

export default function TypographySemanticDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
