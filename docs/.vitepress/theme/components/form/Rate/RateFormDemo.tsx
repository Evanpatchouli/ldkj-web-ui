import * as React from "react";
import { Rate } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const code = `import * as React from "react";
import { Rate } from "@ldkj/web-ui";

const Example = () => {
  const [submitted, setSubmitted] = React.useState<number | null>(null);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        setSubmitted(Number(formData.get("serviceRate")));
      }}
      style={{ display: "grid", gap: 12 }}
    >
      <Rate name="serviceRate" defaultValue={4} />
      <button
        type="submit"
        style={{
          width: "fit-content",
          borderRadius: 8,
          border: "1px solid #cbd5e1",
          background: "#fff",
          padding: "8px 14px",
          fontSize: 14,
        }}
      >
        提交
      </button>
      <div style={{ fontSize: 13, color: "#64748b" }}>
        表单值：{submitted === null ? "尚未提交" : submitted}
      </div>
    </form>
  );
};`;

function Example() {
  const [submitted, setSubmitted] = React.useState<number | null>(null);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        setSubmitted(Number(formData.get("serviceRate")));
      }}
      style={{ display: "grid", gap: 12 }}
    >
      <Rate name="serviceRate" defaultValue={4} />
      <button
        type="submit"
        style={{
          width: "fit-content",
          borderRadius: 8,
          border: "1px solid #cbd5e1",
          background: "#fff",
          padding: "8px 14px",
          fontSize: 14,
        }}
      >
        提交
      </button>
      <div style={{ fontSize: 13, color: "#64748b" }}>
        表单值：{submitted === null ? "尚未提交" : submitted}
      </div>
    </form>
  );
}

export default function RateFormDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
