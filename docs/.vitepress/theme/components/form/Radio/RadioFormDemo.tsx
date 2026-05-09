import * as React from "react";
import { Button } from "@/components/interact/button";
import { RadioGroup } from "@/components/form/radio";
import CodeView from "../../CodeView";

const code = `import * as React from "react";
import { Button, RadioGroup } from "@ldkj/web-ui";

export function Example() {
  const [result, setResult] = React.useState("");

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        setResult(String(formData.get("invoiceType") ?? ""));
      }}
    >
      <RadioGroup
        name="invoiceType"
        defaultValue="normal"
        options={[
          { label: "普通发票", value: "normal" },
          { label: "专用发票", value: "special" },
        ]}
      />
      <Button type="submit">提交</Button>
      <div>提交值：{result || "未提交"}</div>
    </form>
  );
}`;

function Example() {
  const [result, setResult] = React.useState("");

  return (
    <form
      className="grid gap-4"
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        setResult(String(formData.get("invoiceType") ?? ""));
      }}
    >
      <RadioGroup
        name="invoiceType"
        defaultValue="normal"
        options={[
          { label: "普通发票", value: "normal" },
          { label: "专用发票", value: "special" },
        ]}
      />
      <div className="flex items-center gap-3">
        <Button type="submit">提交</Button>
        <div className="text-sm text-slate-600">
          提交值：{result || "未提交"}
        </div>
      </div>
    </form>
  );
}

export default function RadioFormDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
