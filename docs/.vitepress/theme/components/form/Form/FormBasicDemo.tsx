import { Button, Form, Input, Label } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const code = `import { Button, Form, Input, Label } from "@ldkj/web-ui";

export function Example() {
  return (
    <Form
      onSubmit={(event) => {
        event.preventDefault();
      }}
      style={{ maxWidth: 380 }}
    >
      <div className="space-y-2">
        <Label htmlFor="account">账号</Label>
        <Input id="account" name="account" placeholder="请输入账号" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">邮箱</Label>
        <Input id="email" type="email" name="email" placeholder="name@example.com" />
      </div>
      <Button type="submit">提交</Button>
    </Form>
  );
}`;

function Example() {
  return (
    <Form
      onSubmit={(event) => {
        event.preventDefault();
      }}
      style={{ maxWidth: 380 }}
    >
      <div className="space-y-2">
        <Label htmlFor="account">账号</Label>
        <Input id="account" name="account" placeholder="请输入账号" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">邮箱</Label>
        <Input id="email" type="email" name="email" placeholder="name@example.com" />
      </div>
      <Button type="submit">提交</Button>
    </Form>
  );
}

export default function FormBasicDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
