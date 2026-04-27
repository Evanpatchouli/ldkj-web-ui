import { Card } from "@/index";
import CodeView from "../../CodeView";

const code = `import { Card } from "@ldkj/web-ui";

function Example() {
  return (
    <Card
      start={<div className="text-sm font-medium">侧栏</div>}
      end={<div className="text-xs text-gray-500">操作区</div>}
      header={<div className="font-medium">区域化 Card</div>}
      footer={<button className="text-xs text-blue-600">查看详情</button>}
      startProps={{ className: "w-24 bg-gray-50 p-4" }}
      endProps={{ className: "w-28 bg-gray-50 p-4" }}
    >
      <div className="text-sm text-gray-600">内容区会自动填充中间空间。</div>
    </Card>
  );
}`;

function Example() {
  return (
    <Card
      start={<div className="text-sm font-medium">侧栏</div>}
      end={<div className="text-xs text-gray-500">操作区</div>}
      header={<div className="font-medium">区域化 Card</div>}
      footer={<button className="text-xs text-blue-600">查看详情</button>}
      startProps={{ className: "w-24 bg-gray-50 p-4" }}
      endProps={{ className: "w-28 bg-gray-50 p-4" }}
    >
      <div className="text-sm text-gray-600">内容区会自动填充中间空间。</div>
    </Card>
  );
}

export default function CardSlotsDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
