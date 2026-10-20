import * as React from "react";
import { Button, DateTimePicker, Form, useForm } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const Example = () => {
  const [form] = useForm<{ startsAt?: Date }>();
  const [result, setResult] = React.useState("等待提交");
  return (
    <Form
      form={form}
      onFinish={(values) =>
        setResult(
          values.startsAt?.toLocaleString("zh-CN", { hour12: false }) ?? "",
        )
      }
      style={{ maxWidth: 360 }}
    >
      <Form.Item
        name="startsAt"
        label="活动开始时间"
        rules={[{ required: true, message: "请选择活动开始时间" }]}
      >
        <DateTimePicker placeholder="安排活动开始时间" />
      </Form.Item>
      <div style={{ display: "flex", gap: 8 }}>
        <Button type="submit">保存排期</Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            form.resetFields();
            setResult("等待提交");
          }}
        >
          重置
        </Button>
      </div>
      <output data-testid="date-time-form-value">{result}</output>
    </Form>
  );
};

const code = `
import * as React from "react";
import { Button, DateTimePicker, Form, useForm } from "@ldkj/web-ui";

const Example = () => {
  const [form] = useForm<{ startsAt?: Date }>();
  const [result, setResult] = React.useState("等待提交");
  return (
    <Form
      form={form}
      onFinish={(values) =>
        setResult(
          values.startsAt?.toLocaleString("zh-CN", { hour12: false }) ?? "",
        )
      }
      style={{ maxWidth: 360 }}
    >
      <Form.Item
        name="startsAt"
        label="活动开始时间"
        rules={[{ required: true, message: "请选择活动开始时间" }]}
      >
        <DateTimePicker placeholder="安排活动开始时间" />
      </Form.Item>
      <div style={{ display: "flex", gap: 8 }}>
        <Button type="submit">保存排期</Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            form.resetFields();
            setResult("等待提交");
          }}
        >
          重置
        </Button>
      </div>
      <output data-testid="date-time-form-value">{result}</output>
    </Form>
  );
};`;

export default function DateTimePickerFormDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
