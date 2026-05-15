import { Card } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const code = `import { Card } from "@ldkj/web-ui";

function Example() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Card variant="outlined">outlined</Card>
      <Card variant="elevated">elevated</Card>
      <Card variant="filled">filled</Card>
      <Card variant="ghost">ghost</Card>
    </div>
  );
}`;

function Example() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Card variant="outlined">outlined</Card>
      <Card variant="elevated">elevated</Card>
      <Card variant="filled">filled</Card>
      <Card variant="ghost">ghost</Card>
    </div>
  );
}

export default function CardVariantDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}

