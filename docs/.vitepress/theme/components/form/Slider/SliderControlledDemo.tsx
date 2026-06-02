import * as React from "react";
import { Slider } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const code = `
import * as React from "react";
import { Slider } from "@ldkj/web-ui";

const Example = () => {
  const [volume, setVolume] = React.useState(68);

  return (
    <div
      style={{
        display: "grid",
        gap: 16,
        maxWidth: 480,
        padding: 20,
        borderRadius: 18,
        border: "1px solid #e2e8f0",
        background:
          "radial-gradient(circle at 18% 0%, rgba(14, 165, 233, 0.14), transparent 34%), #ffffff",
        boxShadow: "0 18px 46px -32px rgba(15, 23, 42, 0.45)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#0f172a" }}>
            播放音量
          </div>
          <div style={{ marginTop: 4, fontSize: 12, color: "#64748b" }}>
            拖拽时同步更新右侧数值。
          </div>
        </div>
        <div
          style={{
            minWidth: 64,
            textAlign: "right",
            fontSize: 22,
            fontWeight: 800,
            letterSpacing: "-0.03em",
            color: "#0369a1",
          }}
        >
          {volume}%
        </div>
      </div>
      <Slider min={0} max={100} value={volume} onValueChange={setVolume} aria-label="播放音量" />
      <div
        style={{
          height: 6,
          borderRadius: 999,
          background: "linear-gradient(90deg, #bae6fd, #38bdf8, #2563eb)",
          opacity: 0.32,
        }}
      />
    </div>
  );
};`;

const Example = () => {
  const [volume, setVolume] = React.useState(68);

  return (
    <div
      style={{
        display: "grid",
        gap: 16,
        maxWidth: 480,
        padding: 20,
        borderRadius: 18,
        border: "1px solid #e2e8f0",
        background:
          "radial-gradient(circle at 18% 0%, rgba(14, 165, 233, 0.14), transparent 34%), #ffffff",
        boxShadow: "0 18px 46px -32px rgba(15, 23, 42, 0.45)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#0f172a" }}>
            播放音量
          </div>
          <div style={{ marginTop: 4, fontSize: 12, color: "#64748b" }}>
            拖拽时同步更新右侧数值。
          </div>
        </div>
        <div
          style={{
            minWidth: 64,
            textAlign: "right",
            fontSize: 22,
            fontWeight: 800,
            letterSpacing: "-0.03em",
            color: "#0369a1",
          }}
        >
          {volume}%
        </div>
      </div>
      <Slider min={0} max={100} value={volume} onValueChange={setVolume} aria-label="播放音量" />
      <div
        style={{
          height: 6,
          borderRadius: 999,
          background: "linear-gradient(90deg, #bae6fd, #38bdf8, #2563eb)",
          opacity: 0.32,
        }}
      />
    </div>
  );
};

export default function SliderControlledDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
