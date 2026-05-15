import * as React from "react";
import { Button, CheckboxGroup } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const options = [
  { label: "邮件通知", value: "email" },
  { label: "短信通知", value: "sms" },
  { label: "站内信", value: "inbox" },
];

const code = `import * as React from "react";
import { Button, CheckboxGroup } from "@ldkj/web-ui";

export function Example() {
  const [result, setResult] = React.useState("");

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        setResult(formData.getAll("notify").join(", ") || "无");
      }}
    >
      <CheckboxGroup name="notify" defaultValue={["email"]} options={options} />
      <Button type="submit" className="mt-3">提交</Button>
      <div>提交值：{result}</div>
    </form>
  );
}`;

function Example() {
  const [result, setResult] = React.useState("");

  return (
    <form
      className="grid gap-3"
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        setResult(formData.getAll("notify").join(", ") || "无");
      }}
    >
      <CheckboxGroup name="notify" defaultValue={["email"]} options={options} />
      <div className="flex items-center gap-3">
        <Button type="submit">提交</Button>
        <span className="text-sm text-slate-600">
          提交值：{result || "尚未提交"}
        </span>
      </div>
    </form>
  );
}

export default function CheckboxGroupFormDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}

