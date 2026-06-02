import { Slider } from "@ldkj/web-ui";
import CodeView from "../../CodeView";

const code = `
import { Slider } from "@ldkj/web-ui";

const Example = () => (
  <div style={{ display: "grid", gap: 20, maxWidth: 480 }}>
    <label style={{ display: "grid", gap: 10, fontSize: 14, color: "#334155" }}>
      纯色风格（默认）
      <Slider min={0} max={100} defaultValue={42} />
    </label>
    <label style={{ display: "grid", gap: 10, fontSize: 14, color: "#334155" }}>
      渐变风格
      <Slider variant="gradient" min={0} max={100} defaultValue={64} />
    </label>
    <label style={{ display: "grid", gap: 10, fontSize: 14, color: "#334155" }}>
      暖色强调（纯色）
      <Slider
        min={0}
        max={100}
        defaultValue={76}
        trackSize={11}
        thumbSize={24}
        sx={{
          "--ldkj-slider-fill": "#fb923c",
          "--ldkj-slider-fill-end": "#fb923c",
          "--ldkj-slider-focus-ring": "rgb(251 146 60 / 0.24)",
          "--ldkj-slider-thumb": "#fb923c",
          "--ldkj-slider-thumb-ring": "rgb(251 146 60 / 0.18)",
          "--ldkj-slider-track": "#ffedd5",
        }}
      />
    </label>
    <label style={{ display: "grid", gap: 10, fontSize: 14, color: "#94a3b8" }}>
      禁用状态
      <Slider min={0} max={100} defaultValue={72} disabled />
    </label>
  </div>
);`;

const Example = () => (
  <div style={{ display: "grid", gap: 20, maxWidth: 480 }}>
    <label style={{ display: "grid", gap: 10, fontSize: 14, color: "#334155" }}>
      纯色风格（默认）
      <Slider min={0} max={100} defaultValue={42} />
    </label>
    <label style={{ display: "grid", gap: 10, fontSize: 14, color: "#334155" }}>
      渐变风格
      <Slider variant="gradient" min={0} max={100} defaultValue={64} />
    </label>
    <label style={{ display: "grid", gap: 10, fontSize: 14, color: "#334155" }}>
      暖色强调（纯色）
      <Slider
        min={0}
        max={100}
        defaultValue={76}
        trackSize={11}
        thumbSize={24}
        sx={{
          "--ldkj-slider-fill": "#fb923c",
          "--ldkj-slider-fill-end": "#fb923c",
          "--ldkj-slider-focus-ring": "rgb(251 146 60 / 0.24)",
          "--ldkj-slider-thumb": "#fb923c",
          "--ldkj-slider-thumb-ring": "rgb(251 146 60 / 0.18)",
          "--ldkj-slider-track": "#ffedd5",
        }}
      />
    </label>
    <label style={{ display: "grid", gap: 10, fontSize: 14, color: "#94a3b8" }}>
      禁用状态
      <Slider min={0} max={100} defaultValue={72} disabled />
    </label>
  </div>
);

export default function SliderStateDemo() {
  return (
    <CodeView code={code}>
      <Example />
    </CodeView>
  );
}
