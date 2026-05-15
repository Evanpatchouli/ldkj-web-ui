import { Card } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const code = `import { Card } from "@ldkj/web-ui";

function Example() {
  return (
    <Card
      header={<div className="font-medium">订单概览</div>}
      footer={<div className="text-xs text-gray-500">更新于 2 分钟前</div>}
    >
      <div className="text-sm text-gray-600">今日新增订单 128 笔，支付成功率 96.4%。</div>
    </Card>
  );
}`;

function Example() {
  return (
    <Card
      header={<div className="font-medium">订单概览</div>}
      footer={<div className="text-xs text-gray-500">更新于 2 分钟前</div>}
    >
      <div className="text-sm text-gray-600">今日新增订单 128 笔，支付成功率 96.4%。</div>
    </Card>
  );
}

export default function CardBasicDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}

