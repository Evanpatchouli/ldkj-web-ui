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
        gap: 12,
        maxWidth: 460,
        padding: 16,
        borderRadius: 8,
        border: "1px solid #e2e8f0",
        background: "#f8fafc",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 600, color: "#0f172a" }}>播放音量</div>
          <div style={{ marginTop: 4, fontSize: 12, color: "#64748b" }}>
            拖拽时同步更新右侧数值。
          </div>
        </div>
        <div style={{ minWidth: 56, textAlign: "right", fontSize: 16, fontWeight: 700, color: "#0284c7" }}>
          {volume}%
        </div>
      </div>
      <Slider min={0} max={100} value={volume} onValueChange={setVolume} aria-label="播放音量" />
    </div>
  );
};`;

const Example = () => {
  const [volume, setVolume] = React.useState(68);

  return (
    <div
      style={{
        display: "grid",
        gap: 12,
        maxWidth: 460,
        padding: 16,
        borderRadius: 8,
        border: "1px solid #e2e8f0",
        background: "#f8fafc",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 600, color: "#0f172a" }}>播放音量</div>
          <div style={{ marginTop: 4, fontSize: 12, color: "#64748b" }}>
            拖拽时同步更新右侧数值。
          </div>
        </div>
        <div
          style={{
            minWidth: 56,
            textAlign: "right",
            fontSize: 16,
            fontWeight: 700,
            color: "#0284c7",
          }}
        >
          {volume}%
        </div>
      </div>
      <Slider min={0} max={100} value={volume} onValueChange={setVolume} aria-label="播放音量" />
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
