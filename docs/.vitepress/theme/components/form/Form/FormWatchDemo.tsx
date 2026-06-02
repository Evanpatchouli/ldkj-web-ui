import * as React from "react";
import {
  Form,
  Input,
  Select,
  SelectContent,
  SelectItems,
  SelectTrigger,
  SelectValue,
  Switch,
} from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const planOptions = [
  { label: "标准版", value: "standard" },
  { label: "专业版", value: "pro" },
  { label: "企业版", value: "enterprise" },
];

function Preview() {
  const account = Form.useFormWatch<string>("account") ?? "";
  const plan = Form.useFormWatch<string>("plan") ?? "standard";
  const enabled = Form.useFormWatch<boolean>("enabled");
  const values = Form.useFormValue<Record<string, unknown>>();

  return (
    <div className="rounded-md border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
      <div className="font-medium text-slate-900">
        {account || "未命名账号"} · {plan}
      </div>
      <div className="mt-1">状态：{enabled ? "启用" : "停用"}</div>
      <pre className="mt-3 overflow-auto rounded bg-white p-2 text-xs leading-5">
        {JSON.stringify(values, null, 2)}
      </pre>
    </div>
  );
}

function Example() {
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      initialValues={{ account: "demo-account", enabled: true, plan: "pro" }}
      sx={{ maxWidth: 520 }}
    >
      <Form.Item name="account" label="账号">
        <Input placeholder="请输入账号" />
      </Form.Item>
      <Form.Item name="plan" label="套餐">
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="请选择套餐" />
          </SelectTrigger>
          <SelectContent>
            <SelectItems options={planOptions} />
          </SelectContent>
        </Select>
      </Form.Item>
      <Form.Item name="enabled" label="账号状态">
        <Switch label="启用账号" />
      </Form.Item>
      <Preview />
    </Form>
  );
}

const code = `import * as React from "react";
import {
  Form,
  Input,
  Select,
  SelectContent,
  SelectItems,
  SelectTrigger,
  SelectValue,
  Switch,
} from "@ldkj/web-ui";

const planOptions = [
  { label: "标准版", value: "standard" },
  { label: "专业版", value: "pro" },
  { label: "企业版", value: "enterprise" },
];

function Preview() {
  const account = Form.useFormWatch<string>("account") ?? "";
  const plan = Form.useFormWatch<string>("plan") ?? "standard";
  const enabled = Form.useFormWatch<boolean>("enabled");
  const values = Form.useFormValue<Record<string, unknown>>();

  return (
    <div>
      <div>{account || "未命名账号"} · {plan}</div>
      <div>状态：{enabled ? "启用" : "停用"}</div>
      <pre>{JSON.stringify(values, null, 2)}</pre>
    </div>
  );
}

function Example() {
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      initialValues={{ account: "demo-account", enabled: true, plan: "pro" }}
    >
      <Form.Item name="account" label="账号">
        <Input placeholder="请输入账号" />
      </Form.Item>
      <Form.Item name="plan" label="套餐">
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="请选择套餐" />
          </SelectTrigger>
          <SelectContent>
            <SelectItems options={planOptions} />
          </SelectContent>
        </Select>
      </Form.Item>
      <Form.Item name="enabled" label="账号状态">
        <Switch label="启用账号" />
      </Form.Item>
      <Preview />
    </Form>
  );
}`;

export default function FormWatchDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}

