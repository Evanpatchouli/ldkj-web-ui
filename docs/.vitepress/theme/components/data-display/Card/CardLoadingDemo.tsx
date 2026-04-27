import { Card } from "@/index";
import CodeView from "../../CodeView";

const code = `import { Card } from "@ldkj/web-ui";

function Example() {
  return (
    <Card
      header={<div className="font-medium">内容加载</div>}
      contentLoading
      contentProps={{ className: "min-h-28" }}
    >
      <div className="text-sm text-gray-600">内容区支持独立 loading。</div>
    </Card>
  );
}`;

function Example() {
  return (
    <Card
      header={<div className="font-medium">内容加载</div>}
      contentLoading
      contentProps={{ className: "min-h-28" }}
    >
      <div className="text-sm text-gray-600">内容区支持独立 loading。</div>
    </Card>
  );
}

export default function CardLoadingDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
