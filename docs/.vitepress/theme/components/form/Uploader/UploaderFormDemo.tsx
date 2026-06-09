import * as React from "react";
import CodeView from "../../CodeView";
import { Button, Form, Uploader } from "@ldkj/web-ui";

type FormValues = {
  attachment?: File | null;
};

const Example = () => {
  const [result, setResult] = React.useState("未提交");

  return (
    <Form<FormValues>
      onFinish={(values) => {
        setResult(values.attachment?.name ?? "未选择附件");
      }}
      style={{ display: "grid", gap: 16, maxWidth: 520 }}
    >
      <Form.Item
        label="合同附件"
        name="attachment"
        required
        rules={[{ required: true, message: "请上传合同附件" }]}
        extra="未配置 request 时，字段值保持为原始 File。"
      >
        <Uploader accept=".pdf,.doc,.docx" />
      </Form.Item>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Button type="submit" size="sm">
          提交
        </Button>
        <span style={{ color: "#475569", fontSize: 13 }}>提交值: {result}</span>
      </div>
    </Form>
  );
};

const code = `
import * as React from "react";
import { Button, Form, Uploader } from "@ldkj/web-ui";

type FormValues = {
  attachment?: File | null;
};

const Example = () => {
  const [result, setResult] = React.useState("未提交");

  return (
    <Form<FormValues>
      onFinish={(values) => {
        setResult(values.attachment?.name ?? "未选择附件");
      }}
      style={{ display: "grid", gap: 16, maxWidth: 520 }}
    >
      <Form.Item
        label="合同附件"
        name="attachment"
        required
        rules={[{ required: true, message: "请上传合同附件" }]}
        extra="未配置 request 时，字段值保持为原始 File。"
      >
        <Uploader accept=".pdf,.doc,.docx" />
      </Form.Item>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Button type="submit" size="sm">
          提交
        </Button>
        <span style={{ color: "#475569", fontSize: 13 }}>提交值: {result}</span>
      </div>
    </Form>
  );
};`;

export default function UploaderFormDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}

