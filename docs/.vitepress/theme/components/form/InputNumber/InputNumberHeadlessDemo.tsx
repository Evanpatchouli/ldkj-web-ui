import { Input, useNumberInput } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const Example = () => {
  const amount = useNumberInput({
    clampOnBlur: true,
    defaultValue: 25,
    max: 100,
    min: 0,
    step: 5,
  });

  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 340 }}>
      <label style={{ display: "grid", gap: 6, color: "#334155", fontSize: 14 }}>
        自定义数字输入
        <Input
          {...amount.getInputProps({
            "aria-label": "自定义数字输入",
            placeholder: "请输入 0-100 的数值",
          })}
        />
      </label>
      <div style={{ color: "#64748b", fontSize: 13 }}>
        展示值：{amount.value || "未填写"}；解析值：
        {amount.numberValue ?? "无有效数字"}
      </div>
    </div>
  );
};

const code = `
import { Input, useNumberInput } from "@ldkj/web-ui";

const Example = () => {
  const amount = useNumberInput({
    clampOnBlur: true,
    defaultValue: 25,
    max: 100,
    min: 0,
    step: 5,
  });

  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 340 }}>
      <label style={{ display: "grid", gap: 6, color: "#334155", fontSize: 14 }}>
        自定义数字输入
        <Input
          {...amount.getInputProps({
            "aria-label": "自定义数字输入",
            placeholder: "请输入 0-100 的数值",
          })}
        />
      </label>
      <div style={{ color: "#64748b", fontSize: 13 }}>
        展示值：{amount.value || "未填写"}；解析值：
        {amount.numberValue ?? "无有效数字"}
      </div>
    </div>
  );
};`;

export default function InputNumberHeadlessDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
