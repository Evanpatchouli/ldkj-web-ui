import { Input } from "@/components/form/input";
import CodeView from "../../CodeView";

const code = `import { Input } from "@ldkj/web-ui";

export function Example() {
  return (
    <div className="grid gap-3">
      <Input placeholder="请输入项目名称" />
      <Input type="email" placeholder="name@example.com" />
    </div>
  );
}`;

function Example() {
  return (
    <div className="grid gap-3">
      <Input placeholder="请输入项目名称" />
      <Input type="email" placeholder="name@example.com" />
    </div>
  );
}

export default function InputBasicDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
