import { InputNumber } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const Example = () => (
  <div style={{ display: "grid", gap: 12, maxWidth: 320 }}>
    <label style={{ display: "grid", gap: 6, color: "#334155", fontSize: 14 }}>
      采购数量
      <InputNumber placeholder="请输入数量" min={1} />
    </label>
    <label style={{ display: "grid", gap: 6, color: "#334155", fontSize: 14 }}>
      折扣比例
      <InputNumber placeholder="0.00" min={0} max={1} step={0.01} />
    </label>
  </div>
);

const code = `
import { InputNumber } from "@ldkj/web-ui";

const Example = () => (
  <div style={{ display: "grid", gap: 12, maxWidth: 320 }}>
    <label style={{ display: "grid", gap: 6, color: "#334155", fontSize: 14 }}>
      采购数量
      <InputNumber placeholder="请输入数量" min={1} />
    </label>
    <label style={{ display: "grid", gap: 6, color: "#334155", fontSize: 14 }}>
      折扣比例
      <InputNumber placeholder="0.00" min={0} max={1} step={0.01} />
    </label>
  </div>
);`;

export default function InputNumberDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
