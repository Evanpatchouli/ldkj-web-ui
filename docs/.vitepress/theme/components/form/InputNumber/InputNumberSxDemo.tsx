import { InputNumber } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const Example = () => (
  <div style={{ display: "grid", gap: 12, maxWidth: 320 }}>
    <InputNumber
      defaultValue={88}
      min={0}
      max={100}
      aria-label="完成率"
      sx={{
        borderColor: "#14b8a6",
        borderRadius: 12,
        boxShadow: "0 8px 24px rgba(20, 184, 166, 0.16)",
        color: "#0f766e",
        fontWeight: 700,
        height: 44,
        "&:focus-visible": {
          borderColor: "#0d9488",
          boxShadow: "0 0 0 3px rgba(20, 184, 166, 0.25)",
        },
      }}
    />
  </div>
);

const code = `
import { InputNumber } from "@ldkj/web-ui";

const Example = () => (
  <div style={{ display: "grid", gap: 12, maxWidth: 320 }}>
    <InputNumber
      defaultValue={88}
      min={0}
      max={100}
      aria-label="完成率"
      sx={{
        borderColor: "#14b8a6",
        borderRadius: 12,
        boxShadow: "0 8px 24px rgba(20, 184, 166, 0.16)",
        color: "#0f766e",
        fontWeight: 700,
        height: 44,
        "&:focus-visible": {
          borderColor: "#0d9488",
          boxShadow: "0 0 0 3px rgba(20, 184, 166, 0.25)",
        },
      }}
    />
  </div>
);`;

export default function InputNumberSxDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
