import CodeView from "../../CodeView";
import { Empty } from "@ldkj/web-ui";

const code = `import { Empty } from "@ldkj/web-ui";

export function Example() {
  return (
    <Empty
      description="当前区域暂无数据"
      rounded="xl"
      shadow="lg"
      sx={{
        border: "1px solid #0ea5e9",
        backgroundColor: "#e0f2fe",
        color: "#0f172a",
        minHeight: 200,
        "& .text-sm": {
          fontWeight: 600,
        },
      }}
    />
  );
}`;

function Example() {
  return (
    <Empty
      description="当前区域暂无数据"
      rounded="xl"
      shadow="lg"
      sx={{
        border: "1px solid #0ea5e9",
        backgroundColor: "#e0f2fe",
        color: "#0f172a",
        minHeight: 200,
        "& .text-sm": {
          fontWeight: 600,
        },
      }}
    />
  );
}

export default function EmptyBoxDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
