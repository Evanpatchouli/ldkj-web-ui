import { Input } from "@/components/form/input";
import CodeView from "../../CodeView";

const code = `import { Input } from "@ldkj/web-ui";

export function Example() {
  return (
    <div className="grid gap-3">
      <Input defaultValue="只读内容" readOnly />
      <Input defaultValue="禁用内容" disabled />
      <Input type="password" placeholder="请输入密码" />
      <Input type="file" />
    </div>
  );
}`;

function Example() {
  return (
    <div className="grid gap-3">
      <Input defaultValue="只读内容" readOnly />
      <Input defaultValue="禁用内容" disabled />
      <Input type="password" placeholder="请输入密码" />
      <Input type="file" />
    </div>
  );
}

export default function InputStatesDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
