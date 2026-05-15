import { Input } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const code = `import { Input } from "@ldkj/web-ui";

export function Example() {
  return (
    <Input
      placeholder="搜索订单号、客户或备注"
      sx={{
        height: 44,
        borderRadius: 999,
        borderColor: "#0ea5e9",
        backgroundColor: "#f0f9ff",
        "&:focus-visible": {
          borderColor: "#0284c7",
          boxShadow: "0 0 0 3px rgba(14, 165, 233, 0.2)",
        },
      }}
    />
  );
}`;

function Example() {
  return (
    <Input
      placeholder="搜索订单号、客户或备注"
      sx={{
        height: 44,
        borderRadius: 999,
        borderColor: "#0ea5e9",
        backgroundColor: "#f0f9ff",
        "&:focus-visible": {
          borderColor: "#0284c7",
          boxShadow: "0 0 0 3px rgba(14, 165, 233, 0.2)",
        },
      }}
    />
  );
}

export default function InputSxDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}

