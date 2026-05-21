import { InputOPT } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const Example = () => (
  <div style={{ display: "grid", gap: 16 }}>
    <div style={{ display: "grid", gap: 6 }}>
      <span style={{ color: "#334155", fontSize: 14 }}>错误态</span>
      <InputOPT value="123" length={6} invalid autoFocus={false} aria-label="错误验证码" />
    </div>
    <div style={{ display: "grid", gap: 6 }}>
      <span style={{ color: "#334155", fontSize: 14 }}>只读态</span>
      <InputOPT value="246810" readOnly autoFocus={false} aria-label="只读验证码" />
    </div>
    <div style={{ display: "grid", gap: 6 }}>
      <span style={{ color: "#334155", fontSize: 14 }}>禁用态</span>
      <InputOPT value="135790" disabled autoFocus={false} aria-label="禁用验证码" />
    </div>
  </div>
);

const code = `
import { InputOPT } from "@ldkj/web-ui";

const Example = () => (
  <div style={{ display: "grid", gap: 16 }}>
    <div style={{ display: "grid", gap: 6 }}>
      <span style={{ color: "#334155", fontSize: 14 }}>错误态</span>
      <InputOPT value="123" length={6} invalid autoFocus={false} aria-label="错误验证码" />
    </div>
    <div style={{ display: "grid", gap: 6 }}>
      <span style={{ color: "#334155", fontSize: 14 }}>只读态</span>
      <InputOPT value="246810" readOnly autoFocus={false} aria-label="只读验证码" />
    </div>
    <div style={{ display: "grid", gap: 6 }}>
      <span style={{ color: "#334155", fontSize: 14 }}>禁用态</span>
      <InputOPT value="135790" disabled autoFocus={false} aria-label="禁用验证码" />
    </div>
  </div>
);`;

export default function InputOPTStatesDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
