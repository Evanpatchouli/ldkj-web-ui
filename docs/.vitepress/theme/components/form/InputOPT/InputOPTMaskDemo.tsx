import * as React from "react";
import { InputOPT } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const Example = () => {
  const [code, setCode] = React.useState("A7");

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <InputOPT
        value={code}
        length={4}
        type="alphanumeric"
        mask
        size="lg"
        onChange={setCode}
        aria-label="安全校验码"
      />
      <div style={{ color: "#64748b", fontSize: 13 }}>
        字母数字混合验证码可以使用 `type="alphanumeric"`，敏感场景可开启 `mask`。
      </div>
    </div>
  );
};

const code = `
import * as React from "react";
import { InputOPT } from "@ldkj/web-ui";

const Example = () => {
  const [code, setCode] = React.useState("A7");

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <InputOPT
        value={code}
        length={4}
        type="alphanumeric"
        mask
        size="lg"
        onChange={setCode}
        aria-label="安全校验码"
      />
      <div style={{ color: "#64748b", fontSize: 13 }}>
        字母数字混合验证码可以使用 \`type="alphanumeric"\`，敏感场景可开启 \`mask\`。
      </div>
    </div>
  );
};`;

export default function InputOPTMaskDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
