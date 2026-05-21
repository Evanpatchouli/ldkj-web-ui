import * as React from "react";
import { InputOPT } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const Example = () => {
  const [code, setCode] = React.useState("");

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <InputOPT
        value={code}
        length={6}
        placeholder="-"
        separator={(index) => (index === 2 ? "-" : null)}
        pasteTransformer={(value) => value.replace(/\s|-/g, "")}
        onChange={setCode}
        aria-label="带分隔符的验证码"
      />
      <div style={{ color: "#64748b", fontSize: 13 }}>
        可以粘贴 `123-456` 或 `123 456`，组件会过滤后顺序填入。
      </div>
    </div>
  );
};

const code = `
import * as React from "react";
import { InputOPT } from "@ldkj/web-ui";

const Example = () => {
  const [code, setCode] = React.useState("");

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <InputOPT
        value={code}
        length={6}
        placeholder="-"
        separator={(index) => (index === 2 ? "-" : null)}
        pasteTransformer={(value) => value.replace(/\\s|-/g, "")}
        onChange={setCode}
        aria-label="带分隔符的验证码"
      />
      <div style={{ color: "#64748b", fontSize: 13 }}>
        可以粘贴 \`123-456\` 或 \`123 456\`，组件会过滤后顺序填入。
      </div>
    </div>
  );
};`;

export default function InputOPTPasteDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
