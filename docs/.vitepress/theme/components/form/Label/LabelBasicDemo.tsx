import { Input } from "@/components/form/input";
import { Label } from "@/components/form/label";
import CodeView from "../../CodeView";

const code = `import { Input, Label } from "@ldkj/web-ui";

export function Example() {
  return (
    <div className="grid gap-2">
      <Label htmlFor="projectName">项目名称</Label>
      <Input id="projectName" placeholder="请输入项目名称" />
    </div>
  );
}`;

function Example() {
  return (
    <div className="grid gap-2">
      <Label htmlFor="projectName">项目名称</Label>
      <Input id="projectName" placeholder="请输入项目名称" />
    </div>
  );
}

export default function LabelBasicDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
