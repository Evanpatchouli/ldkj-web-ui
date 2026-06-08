import * as React from "react";
import { InputNumber } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const Example = () => {
  const [value, setValue] = React.useState("25");

  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 340 }}>
      <label style={{ display: "grid", gap: 6, color: "#334155", fontSize: 14 }}>
        加购数量（5 的倍数）
        <InputNumber
          value={value}
          onValueChange={(_, meta) => setValue(meta.valueAsString)}
          clampOnBlur
          max={100}
          min={0}
          step={5}
        />
      </label>
      <div style={{ color: "#64748b", fontSize: 13 }}>
        当前输入：{value || "未填写"}。试试输入 103、-4 或 97，失焦后会归一化为 100、0 或 95。
      </div>
    </div>
  );
};

const code = `
import * as React from "react";
import { InputNumber } from "@ldkj/web-ui";

const Example = () => {
  const [value, setValue] = React.useState("25");

  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 340 }}>
      <label style={{ display: "grid", gap: 6, color: "#334155", fontSize: 14 }}>
        加购数量（5 的倍数）
        <InputNumber
          value={value}
          onValueChange={(_, meta) => setValue(meta.valueAsString)}
          clampOnBlur
          max={100}
          min={0}
          step={5}
        />
      </label>
      <div style={{ color: "#64748b", fontSize: 13 }}>
        当前输入：{value || "未填写"}。试试输入 103、-4 或 97，失焦后会归一化为 100、0 或 95。
      </div>
    </div>
  );
};`;

export default function InputNumberRangeStepDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
