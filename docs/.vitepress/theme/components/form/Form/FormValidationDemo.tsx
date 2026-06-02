import * as React from "react";
import { Button, Form, Input } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

type InviteFormValues = {
  account: string;
  email: string;
};

function Example() {
  const [form] = Form.useForm<InviteFormValues>();
  const [result, setResult] = React.useState("等待提交");

  return (
    <Form
      form={form}
      initialValues={{ account: "", email: "" }}
      onFinish={(values) => {
        setResult(`提交成功：${JSON.stringify(values)}`);
      }}
      onFinishFailed={({ errorFields }) => {
        setResult(`还有 ${errorFields.length} 个字段需要处理`);
      }}
      sx={{
        maxWidth: 440,
        padding: 20,
        border: "1px solid #dbe3ee",
        borderRadius: 12,
        backgroundColor: "#ffffff",
      }}
    >
      <Form.Item
        name="account"
        label="账号"
        required
        validateFirst
        validateTrigger={["onChange", "onBlur"]}
        rules={[
          { required: true, message: "请输入账号" },
          {
            message: "账号 admin 已被占用",
            validator: async (value) => {
              await new Promise((resolve) => window.setTimeout(resolve, 300));
              return String(value).trim() !== "admin";
            },
          },
        ]}
      >
        <Input placeholder="试试输入 admin" />
      </Form.Item>
      <Form.Item
        name="email"
        label="邮箱"
        required
        validateTrigger="onBlur"
        rules={[
          { required: true, message: "请输入邮箱" },
          {
            message: "请输入有效邮箱",
            validator: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value)),
          },
        ]}
      >
        <Input placeholder="name@example.com" />
      </Form.Item>
      <div className="flex flex-wrap gap-2">
        <Button type="submit">提交邀请</Button>
        <Button type="button" variant="outline" onClick={() => form.resetFields()}>
          重置
        </Button>
      </div>
      <div className="rounded-md bg-slate-50 px-3 py-2 text-sm text-slate-700">
        {result}
      </div>
    </Form>
  );
}

const code = `import * as React from "react";
import { Button, Form, Input } from "@ldkj/web-ui";

type InviteFormValues = {
  account: string;
  email: string;
};

function Example() {
  const [form] = Form.useForm<InviteFormValues>();
  const [result, setResult] = React.useState("等待提交");

  return (
    <Form
      form={form}
      initialValues={{ account: "", email: "" }}
      onFinish={(values) => {
        setResult(\`提交成功：\${JSON.stringify(values)}\`);
      }}
      onFinishFailed={({ errorFields }) => {
        setResult(\`还有 \${errorFields.length} 个字段需要处理\`);
      }}
    >
      <Form.Item
        name="account"
        label="账号"
        required
        validateFirst
        validateTrigger={["onChange", "onBlur"]}
        rules={[
          { required: true, message: "请输入账号" },
          {
            message: "账号 admin 已被占用",
            validator: async (value) => {
              await new Promise((resolve) => window.setTimeout(resolve, 300));
              return String(value).trim() !== "admin";
            },
          },
        ]}
      >
        <Input placeholder="试试输入 admin" />
      </Form.Item>
      <Form.Item
        name="email"
        label="邮箱"
        required
        validateTrigger="onBlur"
        rules={[
          { required: true, message: "请输入邮箱" },
          {
            message: "请输入有效邮箱",
            validator: (value) => /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(String(value)),
          },
        ]}
      >
        <Input placeholder="name@example.com" />
      </Form.Item>
      <div className="flex flex-wrap gap-2">
        <Button type="submit">提交邀请</Button>
        <Button type="button" variant="outline" onClick={() => form.resetFields()}>
          重置
        </Button>
      </div>
      <div>{result}</div>
    </Form>
  );
}`;

export default function FormValidationDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}

