import { Slider } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const code = `
import { Slider } from "@ldkj/web-ui";

const Example = () => (
  <div
    style={{
      display: "grid",
      gap: 18,
      maxWidth: 460,
      padding: 20,
      borderRadius: 18,
      border: "1px solid #dbeafe",
      background:
        "linear-gradient(135deg, #f8fbff 0%, #eef8ff 48%, #f8fafc 100%)",
      boxShadow: "0 18px 40px -28px rgba(15, 23, 42, 0.42)",
    }}
  >
    <div style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
      <div>
        <div style={{ fontSize: 15, fontWeight: 700, color: "#0f172a" }}>
          部署完成度
        </div>
        <div style={{ marginTop: 4, fontSize: 12, color: "#64748b" }}>
          默认样式已经包含填充渐变、焦点环和拖拽反馈。
        </div>
      </div>
      <div
        style={{
          alignSelf: "start",
          borderRadius: 999,
          padding: "4px 10px",
          background: "#e0f2fe",
          color: "#0369a1",
          fontSize: 13,
          fontWeight: 700,
        }}
      >
        35%
      </div>
    </div>
    <Slider min={0} max={100} defaultValue={35} aria-label="部署完成度" />
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#94a3b8" }}>
      <span>准备</span>
      <span>构建</span>
      <span>发布</span>
    </div>
  </div>
);`;

const Example = () => (
  <div
    style={{
      display: "grid",
      gap: 18,
      maxWidth: 460,
      padding: 20,
      borderRadius: 18,
      border: "1px solid #dbeafe",
      background:
        "linear-gradient(135deg, #f8fbff 0%, #eef8ff 48%, #f8fafc 100%)",
      boxShadow: "0 18px 40px -28px rgba(15, 23, 42, 0.42)",
    }}
  >
    <div style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
      <div>
        <div style={{ fontSize: 15, fontWeight: 700, color: "#0f172a" }}>
          部署完成度
        </div>
        <div style={{ marginTop: 4, fontSize: 12, color: "#64748b" }}>
          默认样式已经包含填充渐变、焦点环和拖拽反馈。
        </div>
      </div>
      <div
        style={{
          alignSelf: "start",
          borderRadius: 999,
          padding: "4px 10px",
          background: "#e0f2fe",
          color: "#0369a1",
          fontSize: 13,
          fontWeight: 700,
        }}
      >
        35%
      </div>
    </div>
    <Slider min={0} max={100} defaultValue={35} aria-label="部署完成度" />
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#94a3b8" }}>
      <span>准备</span>
      <span>构建</span>
      <span>发布</span>
    </div>
  </div>
);

export default function SliderBasicDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
