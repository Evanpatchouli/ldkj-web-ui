import { Button, Form, Input, Label } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const code = `import { Button, Form, Input, Label } from "@ldkj/web-ui";

export function Example() {
  return (
    <Form
      onSubmit={(event) => {
        event.preventDefault();
      }}
      sx={{
        maxWidth: 420,
        padding: 24,
        border: "1px solid #cbd5e1",
        borderRadius: 16,
        backgroundColor: "#f8fafc",
      }}
    >
      <div className="space-y-2">
        <Label htmlFor="username">用户名</Label>
        <Input id="username" name="username" placeholder="请输入用户名" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">密码</Label>
        <Input id="password" name="password" type="password" placeholder="请输入密码" />
      </div>
      <Button type="submit" className="w-full">
        登录
      </Button>
    </Form>
  );
}`;

function Example() {
  return (
    <Form
      onSubmit={(event) => {
        event.preventDefault();
      }}
      sx={{
        maxWidth: 420,
        padding: 24,
        border: "1px solid #cbd5e1",
        borderRadius: 16,
        backgroundColor: "#f8fafc",
      }}
    >
      <div className="space-y-2">
        <Label htmlFor="username">用户名</Label>
        <Input id="username" name="username" placeholder="请输入用户名" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">密码</Label>
        <Input id="password" name="password" type="password" placeholder="请输入密码" />
      </div>
      <Button type="submit" className="w-full">
        登录
      </Button>
    </Form>
  );
}

export default function FormLoginDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
