import * as React from "react";
import { InputOPT } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const Example = () => {
  const [submitted, setSubmitted] = React.useState("");

  return (
    <form
      style={{ display: "grid", gap: 12 }}
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        setSubmitted(String(formData.get("otp") ?? ""));
      }}
    >
      <InputOPT name="otp" length={6} required autoFocus={false} aria-label="登录验证码" />
      <button
        type="submit"
        style={{
          background: "#0f172a",
          border: 0,
          borderRadius: 6,
          color: "white",
          cursor: "pointer",
          fontSize: 14,
          height: 36,
          justifySelf: "start",
          padding: "0 14px",
        }}
      >
        提交验证码
      </button>
      <div style={{ color: "#64748b", fontSize: 13 }}>
        表单提交值：{submitted || "尚未提交"}
      </div>
    </form>
  );
};

const code = `
import * as React from "react";
import { InputOPT } from "@ldkj/web-ui";

const Example = () => {
  const [submitted, setSubmitted] = React.useState("");

  return (
    <form
      style={{ display: "grid", gap: 12 }}
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        setSubmitted(String(formData.get("otp") ?? ""));
      }}
    >
      <InputOPT name="otp" length={6} required autoFocus={false} aria-label="登录验证码" />
      <button
        type="submit"
        style={{
          background: "#0f172a",
          border: 0,
          borderRadius: 6,
          color: "white",
          cursor: "pointer",
          fontSize: 14,
          height: 36,
          justifySelf: "start",
          padding: "0 14px",
        }}
      >
        提交验证码
      </button>
      <div style={{ color: "#64748b", fontSize: 13 }}>
        表单提交值：{submitted || "尚未提交"}
      </div>
    </form>
  );
};`;

export default function InputOPTFormDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
