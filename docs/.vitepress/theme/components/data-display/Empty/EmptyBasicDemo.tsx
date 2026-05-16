import CodeView from "../../CodeView";
import { Empty } from "@ldkj/web-ui";

const code = `import { Empty } from "@ldkj/web-ui";

export function Example() {
  return <Empty description="当前筛选下暂无记录" />;
}`;

function Example() {
  return <Empty description="当前筛选下暂无记录" />;
}

export default function EmptyBasicDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
