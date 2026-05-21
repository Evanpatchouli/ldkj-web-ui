import { InputNumber } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const Example = () => (
  <div style={{ display: "grid", gap: 12, maxWidth: 320 }}>
    <InputNumber defaultValue={30} readOnly aria-label="只读数量" />
    <InputNumber defaultValue={0} disabled aria-label="禁用数量" />
    <InputNumber required min={1} placeholder="必填数量" aria-label="必填数量" />
  </div>
);

const code = `
import { InputNumber } from "@ldkj/web-ui";

const Example = () => (
  <div style={{ display: "grid", gap: 12, maxWidth: 320 }}>
    <InputNumber defaultValue={30} readOnly aria-label="只读数量" />
    <InputNumber defaultValue={0} disabled aria-label="禁用数量" />
    <InputNumber required min={1} placeholder="必填数量" aria-label="必填数量" />
  </div>
);`;

export default function InputNumberStatesDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
