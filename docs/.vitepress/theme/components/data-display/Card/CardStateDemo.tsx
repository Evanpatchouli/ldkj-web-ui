import { Card } from "@/index";
import CodeView from "../../CodeView";

const code = `import { Card } from "@ldkj/web-ui";

function Example() {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      <Card hoverable>hoverable</Card>
      <Card selected>selected</Card>
      <Card disabled>disabled</Card>
    </div>
  );
}`;

function Example() {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      <Card hoverable>hoverable</Card>
      <Card selected>selected</Card>
      <Card disabled>disabled</Card>
    </div>
  );
}

export default function CardStateDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
