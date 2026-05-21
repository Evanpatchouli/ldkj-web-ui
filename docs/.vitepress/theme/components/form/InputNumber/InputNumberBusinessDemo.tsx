import { InputNumber, useInputNumberState } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const Example = () => {
  const price = useInputNumberState({
    clampOnBlur: true,
    defaultValue: 129.9,
    min: 0,
    precision: 1,
    step: 0.1,
  });
  const stock = useInputNumberState({
    clampOnBlur: true,
    defaultValue: 48,
    min: 0,
    step: 1,
  });

  return (
    <div style={{ display: "grid", gap: 16, maxWidth: 360 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <label style={{ display: "grid", gap: 6, color: "#334155", fontSize: 14 }}>
          售价
          <InputNumber {...price.inputProps} />
        </label>
        <label style={{ display: "grid", gap: 6, color: "#334155", fontSize: 14 }}>
          库存
          <InputNumber {...stock.inputProps} />
        </label>
      </div>
      <div
        style={{
          border: "1px solid #e2e8f0",
          borderRadius: 8,
          color: "#475569",
          display: "grid",
          fontSize: 13,
          gap: 4,
          padding: 12,
        }}
      >
        <span>订单快照</span>
        <strong style={{ color: "#0f172a", fontSize: 18 }}>
          ¥{price.value || "0"} · {stock.value || "0"} 件可售
        </strong>
      </div>
    </div>
  );
};

const code = `
import { InputNumber, useInputNumberState } from "@ldkj/web-ui";

const Example = () => {
  const price = useInputNumberState({
    clampOnBlur: true,
    defaultValue: 129.9,
    min: 0,
    precision: 1,
    step: 0.1,
  });
  const stock = useInputNumberState({
    clampOnBlur: true,
    defaultValue: 48,
    min: 0,
    step: 1,
  });

  return (
    <div style={{ display: "grid", gap: 16, maxWidth: 360 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <label style={{ display: "grid", gap: 6, color: "#334155", fontSize: 14 }}>
          售价
          <InputNumber {...price.inputProps} />
        </label>
        <label style={{ display: "grid", gap: 6, color: "#334155", fontSize: 14 }}>
          库存
          <InputNumber {...stock.inputProps} />
        </label>
      </div>
      <div
        style={{
          border: "1px solid #e2e8f0",
          borderRadius: 8,
          color: "#475569",
          display: "grid",
          fontSize: 13,
          gap: 4,
          padding: 12,
        }}
      >
        <span>订单快照</span>
        <strong style={{ color: "#0f172a", fontSize: 18 }}>
          ¥{price.value || "0"} · {stock.value || "0"} 件可售
        </strong>
      </div>
    </div>
  );
};`;

export default function InputNumberBusinessDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
