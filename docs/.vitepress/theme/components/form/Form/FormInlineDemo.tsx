import { Button, Form, Input, Label } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const code = `import { Button, Form, Input, Label } from "@ldkj/web-ui";

export function Example() {
  return (
    <Form
      className="space-y-0"
      onSubmit={(event) => {
        event.preventDefault();
      }}
      sx={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "end",
        gap: 12,
        padding: 16,
        border: "1px solid #e2e8f0",
        borderRadius: 12,
        backgroundColor: "#ffffff",
      }}
    >
      <div className="min-w-56 flex-1 space-y-2">
        <Label htmlFor="keyword">关键词</Label>
        <Input id="keyword" name="keyword" placeholder="订单号 / 客户名 / 备注" />
      </div>
      <div className="min-w-40 space-y-2">
        <Label htmlFor="status">状态</Label>
        <Input id="status" name="status" placeholder="全部" />
      </div>
      <Button type="submit">搜索</Button>
    </Form>
  );
}`;

function Example() {
  return (
    <Form
      className="space-y-0"
      onSubmit={(event) => {
        event.preventDefault();
      }}
      sx={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "end",
        gap: 12,
        padding: 16,
        border: "1px solid #e2e8f0",
        borderRadius: 12,
        backgroundColor: "#ffffff",
      }}
    >
      <div className="min-w-56 flex-1 space-y-2">
        <Label htmlFor="keyword">关键词</Label>
        <Input id="keyword" name="keyword" placeholder="订单号 / 客户名 / 备注" />
      </div>
      <div className="min-w-40 space-y-2">
        <Label htmlFor="status">状态</Label>
        <Input id="status" name="status" placeholder="全部" />
      </div>
      <Button type="submit">搜索</Button>
    </Form>
  );
}

export default function FormInlineDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
