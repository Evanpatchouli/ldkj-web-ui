import { Card } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const code = `import { Card } from "@ldkj/web-ui";

function Example() {
  return (
    <Card>
      <Card.Header className="border-b border-gray-100 p-4 font-medium">
        Compound API
      </Card.Header>
      <Card.Content className="p-4 text-sm text-gray-600">
        使用 Card.Header / Card.Content / Card.Footer 组织复杂结构。
      </Card.Content>
      <Card.Footer className="border-t border-gray-100 p-4">
        <button className="text-xs text-blue-600">确认</button>
      </Card.Footer>
    </Card>
  );
}`;

function Example() {
  return (
    <Card>
      <Card.Header className="border-b border-gray-100 p-4 font-medium">
        Compound API
      </Card.Header>
      <Card.Content className="p-4 text-sm text-gray-600">
        使用 Card.Header / Card.Content / Card.Footer 组织复杂结构。
      </Card.Content>
      <Card.Footer className="border-t border-gray-100 p-4">
        <button className="text-xs text-blue-600">确认</button>
      </Card.Footer>
    </Card>
  );
}

export default function CardCompoundDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}

